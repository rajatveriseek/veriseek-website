"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  amount: number; // in INR (e.g. 2999)
  program: "sharkathon" | "thedealroom";
  studentName: string;
  email?: string;
  phone?: string;
  buttonText?: string;
  className?: string;
  onSuccess?: (paymentId: string) => void;
  onFailure?: (error: string) => void;
}

export default function RazorpayCheckout({
  amount,
  program,
  studentName,
  email = "",
  phone = "",
  buttonText = "Pay Now",
  className = "",
  onSuccess,
  onFailure,
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay SDK");
      }

      // 1. Create order on server
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, program, studentName, email, phone }),
      });

      if (!orderRes.ok) {
        throw new Error("Failed to create order");
      }

      const orderData = await orderRes.json();

      // 2. Open Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Veriseek Education",
        description:
          program === "sharkathon"
            ? "Sharkathon Registration"
            : "The Deal Room Registration",
        order_id: orderData.orderId,
        prefill: {
          name: studentName,
          email,
          contact: phone,
        },
        theme: {
          color: "#011C41",
        },
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          // 3. Verify payment on server
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                program,
                studentName,
                email,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              onSuccess?.(verifyData.paymentId);
            } else {
              onFailure?.(verifyData.error || "Payment verification failed");
            }
          } catch {
            onFailure?.("Payment verification failed");
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        onFailure?.(
          response.error?.description || "Payment failed. Please try again."
        );
        setLoading(false);
      });
      rzp.open();
    } catch (error: any) {
      onFailure?.(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={loading} className={className}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
}
