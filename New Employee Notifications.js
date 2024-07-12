function onEdit(e) {
  var range = e.range;
  var sheet = range.getSheet();
  var editedColumn = range.getColumn();
  var editedRow = range.getRow();
  

  // Set the datestamp and time when a new name is added in the first column
  if (editedColumn === 1 && editedRow > 1 && range.getValue() !== '') {
    var dateStampCell = sheet.getRange(editedRow, 15); // Assuming column 15 is the datestamp column
    var timeCell = sheet.getRange(editedRow, 16); // Assuming column 16 is the time column
    if (!dateStampCell.getValue()) {
      dateStampCell.setValue(new Date()).setNumberFormat("yyyy-MM-dd");
    }
    if (!timeCell.getValue()) {
      timeCell.setValue(new Date()).setNumberFormat("HH:mm:ss");
    }
  }

  // Check if the checkbox in column K is checked to set the request date and time in columns Q and R
  if (editedColumn === 11 && editedRow > 1 && range.isChecked()) {
    var dateCell = sheet.getRange(editedRow, 17); // Column Q for the date the request was made
    var timeCell = sheet.getRange(editedRow, 18); // Column R for the time the request was made
    dateCell.setValue(new Date()).setNumberFormat("yyyy-MM-dd");
    timeCell.setValue(new Date()).setNumberFormat("HH:mm:ss");

    // Ensure the function only triggers when the checkbox changes from unchecked to checked
    if (e.oldValue !== 'TRUE' && e.value === 'TRUE') {
      Logger.log("Checkbox in column K was checked. Triggering sendNewHireEmail.");
      sendNewHireEmail(sheet, editedRow);
    }
  }

  // Check if the checkbox in column L is checked to set the request date in column S
  if (editedColumn === 12 && editedRow > 1 && range.isChecked()) {
    var requestDateCell = sheet.getRange(editedRow, 19); // Column S for the request date when checkbox in column L is checked
    requestDateCell.setValue(new Date()).setNumberFormat("yyyy-MM-dd");
  }

  // Check if the checkbox in column M is checked to set the request date in column T
  if (editedColumn === 13 && editedRow > 1 && range.isChecked()) {
    var completionDateCell = sheet.getRange(editedRow, 20); // Column T for the date when checkbox in column M is checked
    completionDateCell.setValue(new Date()).setNumberFormat("yyyy-MM-dd");
  }

  // Check if the checkbox in column N is checked to set the request date in column U
  if (editedColumn === 14 && editedRow > 1 && range.isChecked()) {
    var finalDateCell = sheet.getRange(editedRow, 21); // Column U for the date when checkbox in column N is checked
    finalDateCell.setValue(new Date()).setNumberFormat("yyyy-MM-dd");
  }

  // Additional functionalities for email notifications based on other column edits
  var columnsToCheck = [12, 13, 14]; // Columns L, M, N for completion checks
  if (columnsToCheck.includes(editedColumn) && editedRow > 1) {
    checkAndSendCompletionEmail(sheet, editedRow, columnsToCheck);
  }
}

function sendNewHireEmail(sheet, row) {
  // Check if the sheet object is valid
  if (!sheet || typeof sheet.getRange !== 'function') {
    Logger.log("Invalid sheet object passed to sendNewHireEmail.");
    return; // Exit the function if the sheet is not valid
  }

  // Fetch row data
  var rowData = sheet.getRange(row, 1, 1, 21).getValues()[0];
  var subject = 'Setup Required for New Hire';
  var startDate = Utilities.formatDate(new Date(rowData[2]), Session.getScriptTimeZone(), "yyyy-MM-dd");
  var sheetLink = 'https://docs.google.com/spreadsheets/d/1b0VKjDs0nFkFcEL94M0xVxp2uP0_h__3G0zhXZoDaN4/edit?usp=sharing'; // Ensure this link is correct
  var ccEmail = '{}'; // Your email to be CC'd on all correspondences

  // IT email setup for laptop
  if (rowData[4]) {
    var itEmail = '{}';  // Update with the actual IT email
    var itBody = `<p>Hello Lee,</p>
                  <p>We're excited to welcome <strong>${rowData[0]} ${rowData[1]}</strong>, who was recently hired to join our HR team starting <strong>${startDate}</strong>. Please set up the <strong>${rowData[4]}</strong> laptop for them.</p>
                  <p>Please mark the setup as complete in our <a href="${sheetLink}">onboarding spreadsheet</a>.</p>
                  <p>Thank you very much!</p>
                  <p>Best regards,</p>
                  <p>MeadowBrook Construction Team</p>`;
    MailApp.sendEmail(itEmail, subject, "", {htmlBody: itBody, cc: ccEmail});
  }

  // Admin email setup for phone, vehicle, and fob keys
  var adminEmail = '{}';  // Update with the actual Admin email
  var adminBody = `<p>Hello Steph,</p>
                   <p><strong>${rowData[0]} ${rowData[1]}</strong> is starting with us on <strong>${startDate}</strong> in HR. Please arrange the following for their smooth start:</p>
                   <ul>`;
  if (rowData[5]) { adminBody += `<li><strong>Phone</strong></li>`; }
  if (rowData[6]) { adminBody += `<li><strong>Vehicle</strong></li>`; }
  if (rowData[9]) { adminBody += `<li><strong>Fob keys</strong></li>`; }
  adminBody += `</ul>
                <p>Kindly confirm setup completion in our <a href="${sheetLink}">onboarding spreadsheet</a>.</p>
                <p>Thanks for your assistance!</p>
                <p>Best regards,</p>
                <p>MeadowBrook Construction Team</p>`;
  if (rowData[5] || rowData[6] || rowData[9]) {
    MailApp.sendEmail(adminEmail, subject, "", {htmlBody: adminBody, cc: ccEmail});
  }

  // Accounting email setup for gas cards, Home Depot cards, and general setup
  var accountingEmail = 'csamonte@meadowb.com';  // Update with the actual Accounting email
  var accountingBody = `<p>Hello Criselda,</p>
                        <p><strong>${rowData[0]} ${rowData[1]}</strong> is joining us starting <strong>${startDate}</strong> in HR. Please prepare the following:</p>
                        <ul>`;
  if (rowData[7]) { accountingBody += `<li><strong>Gas card</strong></li>`; }
  if (rowData[8]) { accountingBody += `<li><strong>Home Depot Card</strong></li>`; }
  if (!rowData[7] && !rowData[8]) {
    accountingBody += `<li>Please ensure their details are set up in our system.</li>`;
  }
  accountingBody += `</ul>
                     <p>Please confirm once these tasks are completed in our <a href="${sheetLink}">onboarding spreadsheet</a>.</p>
                     <p>Thank you for your diligent work!</p>
                     <p>Best regards,</p>
                     <p>MeadowBrook Construction Team</p>`;
  MailApp.sendEmail(accountingEmail, subject, "", {htmlBody: accountingBody, cc: ccEmail});
}


function checkAndSendCompletionEmail(sheet, row, columnsToCheck) {
  var checkboxes = sheet.getRange(row, 12, 1, 3).getValues()[0]; // Get values from columns L, M, N
  if (checkboxes.every(value => value === true)) {
    var rowData = sheet.getRange(row, 1, 1, 14).getValues()[0];
    var emailAddress = '{}';
    var subject = 'Task Completion Confirmation';
    var body = `<p>Hello,</p>
                <p>This is to confirm that all assignments for <strong>${rowData[0]} ${rowData[1]}</strong>, who started on ${Utilities.formatDate(new Date(rowData[2]), Session.getScriptTimeZone(), "yyyy-MM-dd")} in the <strong>${rowData[3]}</strong> department, have been completed as required.</p>
                <p>Please verify and proceed with the next steps.</p>
                <p>Best regards,</p>
                <p>MeadowBrook Construction Team</p>`;

    MailApp.sendEmail(emailAddress, subject, body, {htmlBody: body});
    Logger.log('Confirmation email sent to: ' + emailAddress);
  } else {
    Logger.log('Not all assignments are completed yet.');
  }
}
