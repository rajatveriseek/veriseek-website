import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", program, studentName, email, phone } = body;

    if (!amount || !program) {
      return NextResponse.json(
        { error: "amount and program are required" },
        { status: 400 }
      );
    }

    if (!razorpay) {
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 503 }
      );
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency,
      notes: {
        program,
        studentName: studentName || "",
        email: email || "",
        phone: phone || "",
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay create order error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
