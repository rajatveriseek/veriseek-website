"use server"

import { revalidatePath } from "next/cache"
import { sendEmail } from "@/lib/email"
import {
  sharkathonEnquiryEmail,
  sharkathonRegistrationEmail,
  dealRoomRegistrationEmail,
} from "@/lib/email-templates"

// Submit Sharkathon registration / enquiry
export async function submitRegistration(formData: FormData) {
  try {
    // Convert FormData to an object
    const formDataObj = Object.fromEntries(formData.entries())

    // Format data for storage
    const registrationData = {
      first_name: formDataObj.firstName as string,
      last_name: formDataObj.lastName as string,
      email: formDataObj.email as string,
      phone: formDataObj.phone as string,
      school: formDataObj.school as string,
      school_city: formDataObj.schoolCity as string,
      grade: formDataObj.grade as string,
      how_heard: formDataObj.howHeard as string,
      program: (formDataObj.program as string) || "sharkathon",
      status: "pending",
    }

    // Post to Google Sheets
    const sheetUrl = process.env.SHARKATHON_ENQUIRY_SHEET_URL;
    if (sheetUrl && sheetUrl !== "YOUR_DEPLOYMENT_URL_HERE") {
      try {
        await fetch(sheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...registrationData, timestamp: new Date().toISOString(), source: "sharkathon_registration" }),
        });
        console.log("Registration saved to Google Sheets");
      } catch (sheetError) {
        console.error("Failed to save to Google Sheets:", sheetError);
      }
    }

    // Send enquiry confirmation email (non-blocking)
    if (registrationData.email) {
      const studentName = registrationData.first_name || "Student"
      const program = registrationData.program

      try {
        let emailData
        if (program === "thedealroom") {
          emailData = dealRoomRegistrationEmail(studentName)
        } else {
          emailData = sharkathonEnquiryEmail(studentName)
        }

        await sendEmail({
          to: registrationData.email,
          subject: emailData.subject,
          html: emailData.html,
          attachments: "attachments" in emailData ? emailData.attachments as Array<{filename: string; path: string}> : undefined,
        })
        console.log("Confirmation email sent to:", registrationData.email)
      } catch (emailError) {
        // Log but don't fail the registration
        console.error("Failed to send confirmation email:", emailError)
      }
    }

    // Revalidate the admin page
    revalidatePath("/admin")

    return { success: true, message: "Registration submitted successfully!" }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "Failed to submit registration. Please try again." }
  }
}

// Submit contact form
export async function submitContactForm(formData: FormData) {
  try {
    // Convert FormData to an object
    const formDataObj = Object.fromEntries(formData.entries())

    // Format data for storage
    const contactData = {
      name: formDataObj.name as string,
      email: formDataObj.email as string,
      phone: (formDataObj.phone as string) || null,
      subject: formDataObj.subject as string,
      message: formDataObj.message as string,
      status: "new",
    }

    // Log the data for debugging
    console.log("Contact form data:", contactData)

    // Add to client-side store (this will be done via client-side code)
    // We're not actually using Supabase anymore, but we'll keep the API the same

    // Revalidate the admin page
    revalidatePath("/admin/contact")

    // Always return success to the user
    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("Contact form error:", error)
    return { success: false, message: "Failed to send message. Please try again." }
  }
}

// Submit Sharkathon enquiry (from modal forms on sharkathon page)
export async function submitSharkathonEnquiry(data: {
  name: string;
  phone: string;
  school: string;
  email: string;
}) {
  try {
    // 1. Post to Google Sheets
    const sheetUrl = process.env.SHARKATHON_ENQUIRY_SHEET_URL;
    if (sheetUrl && sheetUrl !== "YOUR_DEPLOYMENT_URL_HERE") {
      try {
        await fetch(sheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, timestamp: new Date().toISOString(), source: "sharkathon_enquiry" }),
        });
        console.log("Sharkathon enquiry saved to Google Sheets");
      } catch (sheetError) {
        console.error("Failed to save to Google Sheets:", sheetError);
      }
    }

    // 2. Send enquiry confirmation email
    if (data.email) {
      try {
        const emailData = sharkathonEnquiryEmail(data.name || "Student", "sharkathon");
        await sendEmail({
          to: data.email,
          subject: emailData.subject,
          html: emailData.html,
          attachments: emailData.attachments,
        });
        console.log("Sharkathon enquiry email sent to:", data.email);
      } catch (emailError) {
        console.error("Failed to send enquiry email:", emailError);
      }
    }

    return { success: true, message: "Enquiry submitted successfully!" };
  } catch (error) {
    console.error("Sharkathon enquiry error:", error);
    return { success: false, message: "Failed to submit enquiry. Please try again." };
  }
}

// Submit Sharkathon School enquiry (from modal forms on sharkathon_school page)
export async function submitSharkathonSchoolEnquiry(data: {
  name: string;
  phone: string;
  school: string;
  email: string;
}) {
  try {
    // 1. Post to Google Sheets (reuse sharkathon enquiry sheet)
    const sheetUrl = process.env.SHARKATHON_ENQUIRY_SHEET_URL;
    if (sheetUrl && sheetUrl !== "YOUR_DEPLOYMENT_URL_HERE") {
      try {
        await fetch(sheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, timestamp: new Date().toISOString(), source: "sharkathon_school" }),
        });
        console.log("Sharkathon school enquiry saved to Google Sheets");
      } catch (sheetError) {
        console.error("Failed to save to Google Sheets:", sheetError);
      }
    }

    // 2. Send enquiry confirmation email with school brochure attached
    if (data.email) {
      try {
        const emailData = sharkathonEnquiryEmail(data.name || "Student", "school");
        await sendEmail({
          to: data.email,
          subject: emailData.subject,
          html: emailData.html,
          attachments: emailData.attachments,
        });
        console.log("Sharkathon school enquiry email sent to:", data.email);
      } catch (emailError) {
        console.error("Failed to send school enquiry email:", emailError);
      }
    }

    return { success: true, message: "Enquiry submitted successfully!" };
  } catch (error) {
    console.error("Sharkathon school enquiry error:", error);
    return { success: false, message: "Failed to submit enquiry. Please try again." };
  }
}

// Submit Sharkathon Partnerships enquiry (from modal forms on sharkathon_partnerships page)
export async function submitSharkathonPartnershipEnquiry(data: {
  name: string;
  phone: string;
  school: string;
  email: string;
}) {
  try {
    // 1. Post to Google Sheets (reuse institutional-partnership sheet)
    const sheetUrl = process.env.INSTITUTIONAL_PARTNERSHIP_SHEET_URL;
    if (sheetUrl && sheetUrl !== "YOUR_DEPLOYMENT_URL_HERE") {
      try {
        await fetch(sheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            institution: data.school,
            email: data.email,
            phone: data.phone,
            designation: "",
            timestamp: new Date().toISOString(),
            source: "sharkathon_partnerships",
          }),
        });
        console.log("Sharkathon partnerships enquiry saved to Google Sheets");
      } catch (sheetError) {
        console.error("Failed to save to Google Sheets:", sheetError);
      }
    }

    // 2. Send enquiry confirmation email with partnership brochure attached
    if (data.email) {
      try {
        const emailData = sharkathonEnquiryEmail(data.name || "Student", "partnerships");
        await sendEmail({
          to: data.email,
          subject: emailData.subject,
          html: emailData.html,
          attachments: emailData.attachments,
        });
        console.log("Sharkathon partnerships enquiry email sent to:", data.email);
      } catch (emailError) {
        console.error("Failed to send partnerships enquiry email:", emailError);
      }
    }

    return { success: true, message: "Enquiry submitted successfully!" };
  } catch (error) {
    console.error("Sharkathon partnerships enquiry error:", error);
    return { success: false, message: "Failed to submit enquiry. Please try again." };
  }
}

// Submit Institutional Partnership request
export async function submitInstitutionalPartnership(data: {
  name: string;
  institution: string;
  email: string;
  phone: string;
  designation: string;
}) {
  try {
    // 1. Post to Google Sheets
    const sheetUrl = process.env.INSTITUTIONAL_PARTNERSHIP_SHEET_URL;
    if (sheetUrl && sheetUrl !== "YOUR_DEPLOYMENT_URL_HERE") {
      try {
        await fetch(sheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, timestamp: new Date().toISOString(), source: "institutional_partnership" }),
        });
        console.log("Institutional partnership saved to Google Sheets");
      } catch (sheetError) {
        console.error("Failed to save to Google Sheets:", sheetError);
      }
    }

    // 2. Send confirmation email
    if (data.email) {
      try {
        const { institutionalPartnershipEmail } = await import("@/lib/email-templates");
        const emailData = institutionalPartnershipEmail(data.name || "Partner", data.institution || "");
        await sendEmail({
          to: data.email,
          subject: emailData.subject,
          html: emailData.html,
        });
        console.log("Partnership email sent to:", data.email);
      } catch (emailError) {
        console.error("Failed to send partnership email:", emailError);
      }
    }

    return { success: true, message: "Partnership request submitted successfully!" };
  } catch (error) {
    console.error("Institutional partnership error:", error);
    return { success: false, message: "Failed to submit request. Please try again." };
  }
}

// Subscribe to newsletter
export async function subscribeToNewsletter(formData: FormData) {
  try {
    const email = formData.get("email") as string

    if (!email) {
      throw new Error("Email is required")
    }

    // Log the data for debugging
    console.log("Newsletter subscription:", email)

    // Add to client-side store (this will be done via client-side code)
    // We're not actually using Supabase anymore, but we'll keep the API the same

    // Revalidate the admin page
    revalidatePath("/admin/newsletter")

    // Always return success to the user
    return { success: true, message: "Subscribed successfully!" }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return { success: false, message: "Failed to subscribe. Please try again." }
  }
}

