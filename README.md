README for New Hire Onboarding Sheet
Purpose
This Google Sheets document is designed to streamline the onboarding process for new hires at MeadowBrook Construction by tracking and managing the assignment of equipment and access permissions. The associated Google Apps Script automates updates within the sheet and facilitates communication between departments through automated emails.

Getting Started
Prerequisites
Access to the Google Sheets containing the onboarding tracker.
Setup:
1) Have the employee Onboard management sheet
-------------------------------------------------------------------------------------------------------------------------
Spreadsheet Structure and Setup
Columns:
Employee Info:

A: Employee First Name
B: Employee Last Name
C: Start Date
D: Department
Equipment and Access Requests:

E: Laptop
F: Phone
G: Vehicle
H: Gas card
I: Home Depot Card
J: Fob
Request and Confirmation:

K: Request (checkbox for whether the request has been made)
L: Admin Confirmation (checkbox)
M: Accounting Confirmation (checkbox)
N: IT Confirmation (checkbox)
Date and Time Stamps:

O: Date Onboarded
P: Time Onboarded
Q: Date Requested
R: Time Requested
S: Date Admin completed task
T: Date Accounting Completed Task
U: Date IT Completed Task
Steps to Create and Format the Sheet
Step 1: Initialize the Sheet
Open Google Sheets and create a new blank spreadsheet.
Name your spreadsheet relevantly, e.g., "New Hire Equipment Tracker."
Step 2: Input Column Headers
Enter the column titles as mentioned above into the first row of your sheet.
Step 3: Format Columns
Adjust the width of the columns to ensure all data is visible.
For date columns (C, O, Q, S, T, U), set the format to date (Format > Number > Date).
For time columns (P, R), set the format to time (Format > Number > Time).
For checkboxes (E to J, K to N), insert checkboxes (Insert > Checkbox).
Step 4: Add Data Validation
For columns like D (Department), where entries should be consistent, use Data Validation to create a list of selectable options (Data > Data validation).
Step 5: Apply Conditional Formatting
Apply conditional formatting to visually highlight key statuses, like whether all confirmations (L, M, N) are complete.
Step 6: Protect Sensitive Information
Use the Protect range option under Data to restrict editing permissions on sensitive columns to prevent unauthorized modifications.
Setting Up Automation with Apps Script
Step 1: Access the Script Editor
From within your Google Sheets, go to Extensions > Apps Script.
Step 2: Script Coding
Paste the earlier provided script or any custom script into the editor. Adjust references in the script to align with the column indices in your sheet.
Step 3: Configure Script Triggers
Set triggers for the script to run onEdit when changes are made.
Step 4: Testing and Debugging
Make test edits in the sheet to verify that automation (like date stamping and email notifications) functions correctly.
Documentation for Users
Consider adding a sheet within the same document or a separate document detailing instructions for use, any troubleshooting tips, and contact information for IT support or administrative help.
-------------------------------------------------------------------------------------------------------------------------
Editing permissions for the sheet and script.
A basic understanding of Google Sheets and Apps Script functionality.

Script Setup
Open the Google Sheets document.
Navigate to Extensions > Apps Script.
Paste the provided script into the script editor.
Save and close the script editor.
Ensure that triggers are set up for the onEdit function:
Go to Triggers in the Apps Script menu.
Add a new trigger for onEdit function, setting it to run On edit.

Usage Guide
Sheet Structure
Columns A to E: Employee information including first name, last name, start date, and department.
Columns F to J: Equipment and access needs such as laptops, phones, and vehicles.
Columns K to N: Checkboxes for various stages of the setup process. Checking these boxes triggers specific actions in the script.
Columns P to U: Auto-populated date and time stamps recording when certain actions were performed.

Operational Workflow
Entering New Hire Data: Input new hire details in Columns A to J as they are onboarded.
Tracking and Confirmation: As tasks are completed, mark the appropriate checkboxes in Columns K to N. This will automatically update the sheet and send relevant emails.
Monitoring: Use Columns P to U to monitor when entries were made and tasks were completed.

Troubleshooting
Emails Not Sending: Ensure that email permissions are correctly set up in the Apps Script. Check the quotas for email sending in your Google account.
Incorrect Dates/Times: Verify that the device used to edit the sheet is set to the correct time zone.
Script Errors: Review the Apps Script console for error messages that can help diagnose issues.
Security and Permissions
Maintain strict control over who can access and edit the sheet and script to protect sensitive employee information.
Regularly review and update the email addresses and other sensitive data used in the script to ensure they are current and secure.
Support
For further assistance shoot me an email jorgedsp93@gmail.com
