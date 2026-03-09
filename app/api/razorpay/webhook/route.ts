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

      const email = payment.email || payment.notes?.email;
      const name =
        payment.notes?.studentName ||
        payment.notes?.name ||
        payment.customer_name ||
        "Student";
      const program =
        payment.notes?.program || payment.description?.toLowerCase() || "";

      if (!email) {
        console.log("Webhook: no email found, skipping email send");
        return NextResponse.json({ status: "ok" });
      }

      // Check if this is the testing payment page — send both emails
      const paymentLinkEntity = event.payload?.payment_link?.entity || {};
      const paymentLinkId = paymentLinkEntity.id || "";
      const shortUrl = paymentLinkEntity.short_url || "";
      const description =
        payment.description || payment.notes?.description || paymentLinkEntity.description || "";
      const allFields = `${description} ${program} ${paymentLinkId} ${shortUrl} ${JSON.stringify(payment.notes || {})}`.toLowerCase();
      const isTesting = allFields.includes("thedealroomtesting") || allFields.includes("the deal room testing");

      console.log("Webhook debug:", { description, program, shortUrl, paymentLinkId, isTesting });

      if (isTesting) {
        // Testing mode — send both emails to verify templates
        const emails = [
          sharkathonRegistrationEmail(name),
          dealRoomRegistrationEmail(name),
        ];
        for (const emailData of emails) {
          try {
            await sendEmail({
              to: email,
              subject: emailData.subject,
              html: emailData.html,
            });
            console.log(`Webhook (test): sent "${emailData.subject}" to ${email}`);
          } catch (emailError) {
            console.error("Webhook (test): failed to send email:", emailError);
          }
        }
      } else {
        // Normal flow — send one email based on program
        let emailData;
        if (
          program.includes("deal room") ||
          program.includes("dealroom") ||
          program.includes("thedealroom")
        ) {
          emailData = dealRoomRegistrationEmail(name);
        } else {
          emailData = sharkathonRegistrationEmail(name);
        }

        try {
          await sendEmail({
            to: email,
            subject: emailData.subject,
            html: emailData.html,
          });
          console.log(`Webhook: confirmation email sent to ${email}`);
        } catch (emailError) {
          console.error("Webhook: failed to send email:", emailError);
        }
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
