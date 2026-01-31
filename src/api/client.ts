export interface ClaimResult {
    employee_code: string;
    amount: number;
    receipt_id: string;
    timestamp: string;
    status: 'SUCCESS' | 'ALREADY_CLAIMED' | 'INVALID_CODE' | 'OUT_OF_POOL' | 'ERROR';
    message?: string;
    // Legacy support if backend returns these
    email?: string;
}

const API_URL = import.meta.env.VITE_API_URL;

// Mock data for development when no API URL is set
const MOCK_DELAY = 1500;

export async function claimLuckyMoney(employee_code: string): Promise<ClaimResult> {
    // Client-side validation: Just allow non-empty string for now, let backend handle the rest
    if (!employee_code.trim()) {
        return {
            employee_code,
            amount: 0,
            receipt_id: '',
            timestamp: new Date().toISOString(),
            status: 'INVALID_CODE',
            message: 'Please enter a valid code.'
        };
    }

    // Use Mock if no API URL provided (Development Mode)
    if (!API_URL) {
        console.warn("⚠️ Using Mock API. Set VITE_API_URL to connect to real backend.");
        await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

        // Simulate randomness
        const random = Math.random();
        if (random < 0.2) {
            return {
                employee_code,
                amount: 500000, // 500k
                receipt_id: `MOCK-${Date.now()}`,
                timestamp: new Date().toISOString(),
                status: 'ALREADY_CLAIMED',
                message: 'This code has already claimed lucky money.'
            };
        }

        return {
            employee_code,
            amount: [100000, 200000, 500000][Math.floor(Math.random() * 3)],
            receipt_id: `RCPT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            timestamp: new Date().toISOString(),
            status: 'SUCCESS'
        };
    }

    try {
        // Backend expects { code: "SEAL01" } OR { email: "..." }
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ code: employee_code }),
            // mode: 'cors', 
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        });

        const data = await response.json();

        // Normalize status to uppercase (Backend returns 'success', frontend expects 'SUCCESS')
        if (data.status && typeof data.status === 'string') {
            data.status = data.status.toUpperCase();
        }

        // Polyfill/Map fields that the backend might skip or name differently
        return {
            ...data,
            employee_code: employee_code, // Ensure we have the code from the request
            receipt_id: data.receiptId || data.receipt_id || 'UNKNOWN', // Map camelCase receiptId
            timestamp: data.timestamp || new Date().toISOString(), // Polyfill timestamp if missing
            status: data.status as any
        };

    } catch (error) {
        console.error("API Error:", error);
        return {
            employee_code,
            amount: 0,
            receipt_id: '',
            timestamp: new Date().toISOString(),
            status: 'ERROR',
            message: 'Network error or server unavailable. Please try again.'
        };
    }
}
