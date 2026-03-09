/**
 * ═══════════════════════════════════════════════════════════════
 * Google Apps Script — Sharkathon Enquiry Form → Google Sheets
 * ═══════════════════════════════════════════════════════════════
 *
 * SETUP INSTRUCTIONS:
 * 1. Open Google Sheets → Extensions → Apps Script
 * 2. Paste this entire script, replacing the default code
 * 3. Click Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL
 * 5. Paste it into .env.local as:
 *    SHARKATHON_ENQUIRY_SHEET_URL=https://script.google.com/macros/s/YOUR_ID/exec
 * 6. Redeploy the Next.js app
 *
 * SHEET COLUMNS (auto-created on first submission):
 *   A: Timestamp | B: Name | C: Phone | D: School | E: Email | F: Source
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Phone", "School", "Email", "Source"]);
      // Bold the header
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.phone || "",
      data.school || "",
      data.email || "",
      data.source || "sharkathon_enquiry",
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 6);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok", row: sheet.getLastRow() })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: GET handler to verify the script is deployed
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Sharkathon Enquiry Sheet is active" })
  ).setMimeType(ContentService.MimeType.JSON);
}
