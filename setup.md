# Backend Setup Guide (v2: Employee Code)

## 1. Google Sheet Setup

1.  Open your existing Sheet `Seal Labs Lunar New Year`.
2.  **Tab 1: `EnvelopePool`**
    *   No change. Make sure it has data (Amounts in Col B).
3.  **Tab 2: `LuckyMoneyClaims`**
    *   Headers: `timestamp`, `employee_code`, `amount`, `receipt_id`, `status`.
    *   (Clear any test data if you want a fresh start).
4.  **CREATE NEW Tab 3: `AccessList`** (Important!)
    *   **Row 1 Header**: `employee_code`
    *   **Data**: List all valid codes in Column A.
        *   `SEAL01`
        *   `SEAL02`
        *   ...

## 2. Deploy Apps Script

1.  In the Google Sheet, go to **Extensions > Apps Script**.
2.  **Replace ALL code** in `Code.gs` with the new code from the `Code.gs` file in this project.
3.  **Check Variable**: Ensure `const SHEET_ID = '...'` is still correct.
4.  **Save** (Floppy disk).
5.  **Deploy > Manage deployments**.
    *   Click the **pencil icon** (Edit) on the existing Active deployment.
    *   **Version**: Select **New version**.
    *   Click **Deploy**.
    *   (This keeps the URL the same, so you don't need to update the frontend `.env`).

## 3. Connect Frontend

1.  The frontend is already updated to send `employee_code`.
2.  Just restart `npm run dev` if you haven't already.
