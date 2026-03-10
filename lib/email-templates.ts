import path from "path";

// Shared email shell — accepts a custom header block
function emailShell(headerHtml: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Veriseek Education</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#011C41;padding:32px 40px;text-align:center;">
              ${headerHtml}
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fa;padding:28px 40px;border-top:1px solid #e9ecef;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:14px;color:#495057;line-height:1.7;">
                    <p style="margin:0 0 4px;font-weight:600;color:#011C41;">Warm regards,</p>
                    <p style="margin:0 0 4px;font-weight:600;color:#011C41;">Team Veriseek</p>
                    <p style="margin:0 0 2px;color:#6c757d;">Veriseek Education</p>
                    <p style="margin:0;color:#6c757d;">+91 99533 711 91</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:20px;border-top:1px solid #e9ecef;margin-top:16px;">
                    <p style="margin:0;font-size:12px;color:#adb5bd;text-align:center;">
                      &copy; ${new Date().getFullYear()} Veriseek Education. All rights reserved.<br/>
                      <a href="https://www.veriseekeducation.com" style="color:#011C41;text-decoration:none;">www.veriseekeducation.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Default Veriseek header
function emailLayout(bodyContent: string): string {
  return emailShell(
    `<h1 style="margin:0;font-size:28px;font-weight:700;color:#FAD133;letter-spacing:0.5px;">Veriseek Education</h1>`,
    bodyContent
  );
}

// Sharkathon header — logo image instead of text
function sharkathonEmailLayout(bodyContent: string): string {
  return emailShell(
    `<img src="https://www.veriseekeducation.com/images/11.png" alt="Sharkathon" style="max-width:280px;height:auto;" />`,
    bodyContent
  );
}

// Deal Room header — styled like the hero section
function dealRoomEmailLayout(bodyContent: string): string {
  return emailShell(
    `<h1 style="margin:0;font-family:'Playfair Display',Georgia,'Times New Roman',serif;font-size:36px;font-weight:700;color:#ffffff;letter-spacing:-1px;line-height:1;">
      <span>The </span>Deal Room
    </h1>
    <p style="margin:8px 0 0;font-family:'Playfair Display',Georgia,'Times New Roman',serif;font-style:italic;font-size:16px;color:#f5c842;letter-spacing:0.2px;">Make your First Deal.</p>`,
    bodyContent
  );
}

// ─── Attachment helper ───────────────────────────────────────────────────────

interface EmailAttachment {
  filename: string;
  path: string;
}

// ─── Sharkathon Registration Welcome Email ───────────────────────────────────

export function sharkathonRegistrationEmail(studentName: string): { subject: string; html: string; attachments: EmailAttachment[] } {
  const body = `
    <h2 style="margin:0 0 20px;font-size:22px;color:#011C41;">Welcome to Sharkathon!</h2>
    <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">Dear ${studentName},</p>
    <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">
      Welcome to Sharkathon! We are pleased to have you with us.
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">
      Sharkathon is a learning led competition designed to build practical decision making skills through a structured learning track and three competition rounds. During the programme, you will step into the roles of an entrepreneur, a consultant, and an investor, and work through real world style business scenarios.
    </p>

    <!-- YouTube Video -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;">
      <tr>
        <td align="center">
          <a href="https://youtu.be/lrMrYxct3Tk" style="display:inline-block;text-decoration:none;">
            <img src="https://img.youtube.com/vi/lrMrYxct3Tk/hqdefault.jpg" alt="Watch Sharkathon Video" style="width:100%;max-width:520px;border-radius:8px;border:2px solid #e9ecef;" />
          </a>
          <p style="margin:8px 0 0;font-size:13px;color:#6c757d;">
            <a href="https://youtu.be/lrMrYxct3Tk" style="color:#011C41;text-decoration:underline;">Watch the Sharkathon overview video &rarr;</a>
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 12px;font-size:15px;color:#333;line-height:1.7;">Over the next few days, we will share:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px 8px;">
      <tr>
        <td style="padding:6px 0;font-size:15px;color:#333;vertical-align:top;">
          <span style="display:inline-block;width:24px;height:24px;background-color:#FAD133;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#011C41;margin-right:12px;">1</span>
          Your programme schedule and session links
        </td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:15px;color:#333;vertical-align:top;">
          <span style="display:inline-block;width:24px;height:24px;background-color:#FAD133;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#011C41;margin-right:12px;">2</span>
          Preparation resources and practice material
        </td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:15px;color:#333;vertical-align:top;">
          <span style="display:inline-block;width:24px;height:24px;background-color:#FAD133;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#011C41;margin-right:12px;">3</span>
          Round details, timings, and participation guidelines
        </td>
      </tr>
    </table>

    <!-- WhatsApp CTA -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;">
      <tr>
        <td style="background-color:#f0fdf4;border-left:4px solid #22c55e;border-radius:0 8px 8px 0;padding:16px 20px;">
          <p style="margin:0;font-size:15px;color:#333;line-height:1.7;">
            We would really appreciate it if you could join the <strong>official WhatsApp community</strong>, as this is where we share session links, reminders, resources, and important updates to help you stay on track.
          </p>
          <p style="margin:12px 0 0;">
            <a href="https://whatsapp.com/channel/0029Vb5jLpHISTkGKsJUX32e" style="display:inline-block;background-color:#22c55e;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:10px 24px;border-radius:6px;">
              Join WhatsApp Channel &rarr;
            </a>
          </p>
        </td>
      </tr>
    </table>

    <!-- Attachments Note -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:16px 0;">
      <tr>
        <td style="background-color:#eff6ff;border-left:4px solid #011C41;border-radius:0 8px 8px 0;padding:16px 20px;">
          <p style="margin:0;font-size:15px;color:#333;line-height:1.7;">
            We have attached the <strong>Sharkathon brochure</strong> and <strong>sample questions</strong> to this email for your reference.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:20px 0 0;font-size:15px;color:#333;line-height:1.7;">
      We are looking forward to meeting you in the first session and having you as part of Sharkathon.
    </p>`;

  return {
    subject: "Welcome to Sharkathon",
    html: sharkathonEmailLayout(body),
    attachments: [
      { filename: "Sharkathon Season2.pdf", path: path.join(process.cwd(), "public", "Sharkathon Season2.pdf") },
      { filename: "Sharkathon-Sample Questions.pdf", path: path.join(process.cwd(), "public", "Sharkathon-Sample Questions_compressed.pdf") },
    ],
  };
}

// ─── Sharkathon Enquiry Email ────────────────────────────────────────────────

export function sharkathonEnquiryEmail(name: string): { subject: string; html: string } {
  const body = `
    <h2 style="margin:0 0 20px;font-size:22px;color:#011C41;">Thank You for Your Interest!</h2>
    <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">Dear ${name},</p>
    <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">
      Thank you for showing interest in Sharkathon. We have received your enquiry, and our team will get back to you within 48 hours.
    </p>
    <p style="margin:0 0 12px;font-size:15px;color:#333;line-height:1.7;">
      In the meantime, here are a few resources to help you learn more about the programme:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px 8px;">
      <tr>
        <td style="padding:8px 0;font-size:15px;color:#333;vertical-align:top;">
          <span style="color:#FAD133;font-size:16px;margin-right:10px;">&#9654;</span>
          A short video explaining the format with highlights and participant testimonials
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:15px;color:#333;vertical-align:top;">
          <span style="color:#FAD133;font-size:16px;margin-right:10px;">&#128218;</span>
          The Sharkathon brochure with the programme overview and timeline
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:15px;color:#333;vertical-align:top;">
          <span style="color:#FAD133;font-size:16px;margin-right:10px;">&#128221;</span>
          Sample questions similar to those in Rounds 1, 2, and 3
        </td>
      </tr>
    </table>

    <!-- Contact Info -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;">
      <tr>
        <td style="background-color:#eff6ff;border-left:4px solid #011C41;border-radius:0 8px 8px 0;padding:16px 20px;">
          <p style="margin:0 0 4px;font-size:15px;color:#333;line-height:1.7;">
            If you have any immediate questions, please reply to this email.<br/>
            For urgent support, you can also call or message us on <strong>9953371191</strong>.
          </p>
        </td>
      </tr>
    </table>

    <!-- Programme Link -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto;text-align:center;">
      <tr>
        <td>
          <a href="https://www.veriseekeducation.com/sharkathon" 
             style="display:inline-block;background-color:#011C41;color:#FAD133;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">
            Visit Programme Page &rarr;
          </a>
        </td>
      </tr>
    </table>`;

  return {
    subject: "Thank you for your interest in Sharkathon",
    html: sharkathonEmailLayout(body),
  };
}

// ─── Institutional Partnership Email ─────────────────────────────────────────

export function institutionalPartnershipEmail(name: string, institution: string): { subject: string; html: string } {
  const body = `
    <h2 style="margin:0 0 20px;font-size:22px;color:#011C41;">Thank You for Your Partnership Request</h2>
    <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">Dear ${name},</p>
    <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">
      Thank you for expressing your interest in partnering with Veriseek Education${institution ? ` on behalf of <strong>${institution}</strong>` : ""}.
      We have received your request and our team will get back to you within 48 hours.
    </p>
    <p style="margin:0 0 12px;font-size:15px;color:#333;line-height:1.7;">Our institutional partnerships typically cover:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px 8px;">
      <tr>
        <td style="padding:8px 0;font-size:15px;color:#333;vertical-align:top;">
          <span style="color:#FAD133;font-size:16px;margin-right:10px;">&#9654;</span>
          Customised Sharkathon programmes for your students
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:15px;color:#333;vertical-align:top;">
          <span style="color:#FAD133;font-size:16px;margin-right:10px;">&#128218;</span>
          On-campus workshops and interactive learning sessions
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:15px;color:#333;vertical-align:top;">
          <span style="color:#FAD133;font-size:16px;margin-right:10px;">&#128221;</span>
          Co-branded events and long-term collaborations
        </td>
      </tr>
    </table>

    <!-- Contact Info -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;">
      <tr>
        <td style="background-color:#eff6ff;border-left:4px solid #011C41;border-radius:0 8px 8px 0;padding:16px 20px;">
          <p style="margin:0 0 4px;font-size:15px;color:#333;line-height:1.7;">
            If you have any immediate questions, please reply to this email.<br/>
            For urgent support, you can also call or message us on <strong>9953371191</strong>.
          </p>
        </td>
      </tr>
    </table>

    <!-- Website Link -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto;text-align:center;">
      <tr>
        <td>
          <a href="https://www.veriseekeducation.com" 
             style="display:inline-block;background-color:#011C41;color:#FAD133;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">
            Visit Our Website &rarr;
          </a>
        </td>
      </tr>
    </table>`;

  return {
    subject: "Thank you for your interest in partnering with Veriseek Education",
    html: emailLayout(body),
  };
}

// ─── The Deal Room Registration Email ────────────────────────────────────────

export function dealRoomRegistrationEmail(studentName: string): { subject: string; html: string } {
  const body = `
    <h2 style="margin:0 0 20px;font-size:22px;color:#011C41;">Welcome to The Deal Room!</h2>
    <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">Dear ${studentName},</p>
    <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">
      Welcome to The Deal Room. Thank you for registering.
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">
      Over two days, you will learn how real investment decisions are made through cases, simulations, and an investor-style roleplay lead and mentored by eminent venture capitalists, debt firms, and leading CXOs from startups and MNCs.
    </p>

    <!-- Highlight Box -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;">
      <tr>
        <td style="background-color:#fefce8;border-left:4px solid #FAD133;border-radius:0 8px 8px 0;padding:16px 20px;">
          <p style="margin:0;font-size:15px;color:#333;line-height:1.7;">
            We are looking forward to meeting you on campus.
          </p>
        </td>
      </tr>
    </table>`;

  return {
    subject: "Welcome to The Deal Room",
    html: dealRoomEmailLayout(body),
  };
}
