/* 
 * SEAL LABS LUCKY DRAW - BACKEND (v2: Employee Code)
 * Deploy this as a Web App (Execute as: Me, Access: Anyone)
 */

const SHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // <--- STEP 1: PASTE YOUR SHEET ID HERE

function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    const hasLock = lock.tryLock(10000);
    
    if (!hasLock) {
       return createResponse({
        status: 'ERROR',
        message: 'Server is busy. Please try again in a few seconds.'
      });
    }

    const data = JSON.parse(e.postData.contents);
    const code = data.employee_code ? data.employee_code.trim().toUpperCase() : '';

    // 1. Validation
    if (!code) {
       lock.releaseLock();
       return createResponse({
         status: 'INVALID_CODE',
         message: 'Please provide a valid Employee Code.'
       });
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const claimsSheet = ss.getSheetByName('LuckyMoneyClaims');
    const poolSheet = ss.getSheetByName('EnvelopePool');
    const accessSheet = ss.getSheetByName('AccessList');

    if (!claimsSheet || !poolSheet || !accessSheet) {
      lock.releaseLock();
      return createResponse({ status: 'ERROR', message: 'Sheets not found. Please check setup (EnvelopePool, LuckyMoneyClaims, AccessList).' });
    }

    // 2. Access Control (Check if code exists in AccessList Column A)
    const accessData = accessSheet.getDataRange().getValues(); // [code, name, etc...]
    // Skip header row usually, but simple array find is okay. 
    // Assuming Column A is Employee Code.
    const isValidCode = accessData.some(row => String(row[0]).trim().toUpperCase() === code);

    if (!isValidCode) {
        lock.releaseLock();
        return createResponse({
            status: 'INVALID_CODE',
            message: 'Access Denied: Code not found in Access List.',
            employee_code: code
        });
    }

    // 3. Check if already claimed
    const claimsData = claimsSheet.getDataRange().getValues();
    // Assuming Column B is Employee Code (was email before).
    const existingClaim = claimsData.find(row => String(row[1]).trim().toUpperCase() === code); 

    if (existingClaim) {
        lock.releaseLock();
        return createResponse({
            status: 'ALREADY_CLAIMED',
            message: 'This code has already claimed lucky money.',
            timestamp: existingClaim[0],
            employee_code: existingClaim[1],
            amount: existingClaim[2],
            receipt_id: existingClaim[3]
        });
    }

    // 4. Allocate new envelope
    const poolData = poolSheet.getDataRange().getValues();
    const availableIndices = [];
    for (let i = 1; i < poolData.length; i++) {
        if (!poolData[i][2]) {
            availableIndices.push(i);
        }
    }

    if (availableIndices.length === 0) {
        lock.releaseLock();
        return createResponse({
            status: 'OUT_OF_POOL',
            message: 'All lucky money envelopes have been claimed!',
            employee_code: code
        });
    }

    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const selectedRowIndex = availableIndices[randomIndex];
    const selectedRow = poolData[selectedRowIndex];
    
    const envelopeId = selectedRow[0];
    const amount = selectedRow[1];

    // 5. Update Sheets
    const timestamp = new Date().toISOString();
    const receiptId = 'RCPT-' + Math.floor(Math.random() * 1000000).toString(16).toUpperCase();

    // Mark Pool as Taken
    poolSheet.getRange(selectedRowIndex + 1, 3, 1, 3).setValues([[true, code, timestamp]]);

    // Add to Claims
    claimsSheet.appendRow([timestamp, code, amount, receiptId, 'SUCCESS']);

    SpreadsheetApp.flush();
    lock.releaseLock();

    return createResponse({
        status: 'SUCCESS',
        employee_code: code,
        amount: amount,
        receipt_id: receiptId,
        timestamp: timestamp
    });

  } catch (error) {
    return createResponse({
        status: 'ERROR',
        message: 'Internal Error: ' + error.toString()
    });
  }
}

function createResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return createResponse({ status: 'READY', message: 'Endpoint is active. Use POST with employee_code.' });
}
