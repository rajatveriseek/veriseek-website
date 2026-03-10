import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";
import {
  sharkathonRegistrationEmail,
  dealRoomRegistrationEmail,
} from "@/lib/email-templates";

// Razorpay sends the raw body — we must read it as text for signature verification
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature || !process.env.RAZORPAY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // Handle payment captured / payment link paid events
    if (
      event.event === "payment.captured" ||
      event.event === "payment_link.paid"
    ) {
      const payment =
        event.payload?.payment?.entity || event.payload?.payment_link?.entity;

      if (!payment) {
        return NextResponse.json({ status: "no payment entity" });
      }

      const notes = payment.notes || {};
      const email = payment.email || notes.email;
      const name = notes.full_name || notes.studentName || notes.name || payment.customer_name || "Student";

      if (!email) {
        console.log("Webhook: no email found, skipping email send");
        return NextResponse.json({ status: "ok" });
      }

      // Determine program from notes:
      // - Sharkathon payments have "grade" field in notes
      // - Deal Room payments do NOT have "grade" field
      const isSharkathon = !!notes.grade;

      let emailData;
      if (isSharkathon) {
        emailData = sharkathonRegistrationEmail(name);
      } else {
        emailData = dealRoomRegistrationEmail(name);
      }

      console.log(`Webhook: program=${isSharkathon ? "sharkathon" : "dealroom"}, name=${name}, email=${email}`);

      try {
        await sendEmail({
          to: email,
          subject: emailData.subject,
          html: emailData.html,
          attachments: "attachments" in emailData ? emailData.attachments as Array<{filename: string; path: string}> : undefined,
        });
        console.log(`Webhook: confirmation email sent to ${email}`);
      } catch (emailError) {
        console.error("Webhook: failed to send email:", emailError);
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
