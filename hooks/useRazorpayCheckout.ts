"use client";

import { useState, useCallback } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface CheckoutOptions {
  amount: number; // in INR (e.g. 3500)
  program: "sharkathon" | "thedealroom";
  description?: string;
  studentName?: string;
  email?: string;
  phone?: string;
  onSuccess?: (paymentId: string) => void;
  onFailure?: (error: string) => void;
}

export function useRazorpayCheckout(options: CheckoutOptions) {
  const [loading, setLoading] = useState(false);

  const openCheckout = useCallback(async () => {
    setLoading(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("Failed to load Razorpay SDK");

      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: options.amount,
          program: options.program,
          studentName: options.studentName ?? "",
          email: options.email ?? "",
          phone: options.phone ?? "",
        }),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");

      const orderData = await orderRes.json();

      const restoreScroll = () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        document.documentElement.style.overflow = "";
      };

      const rzpOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Veriseek Education",
        description:
          options.description ??
          (options.program === "sharkathon"
            ? "Sharkathon Registration"
            : "The Deal Room Registration"),
        order_id: orderData.orderId,
        theme: { color: "#011C41" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                program: options.program,
                studentName: options.studentName ?? "",
                email: options.email ?? "",
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              options.onSuccess?.(verifyData.paymentId);
            } else {
              options.onFailure?.(verifyData.error ?? "Payment verification failed");
            }
          } catch {
            options.onFailure?.("Payment verification failed");
          }
          restoreScroll();
          setLoading(false);
        },
        modal: {
          ondismiss: () => {
            restoreScroll();
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(rzpOptions);
      rzp.on("payment.failed", (response: any) => {
        options.onFailure?.(
          response.error?.description ?? "Payment failed. Please try again."
        );
        restoreScroll();
        setLoading(false);
      });
      rzp.open();
    } catch {
      setLoading(false);
    }
  }, [options]);

  return { openCheckout, loading };
}
