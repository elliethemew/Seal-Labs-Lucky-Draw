import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import type { ClaimResult } from '../api/client';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';

interface ReceiptProps {
    result: ClaimResult;
}

export function Receipt({ result }: ReceiptProps) {
    const isSuccess = result.status === 'SUCCESS' || result.status === 'ALREADY_CLAIMED';
    const receiptRef = useRef<HTMLDivElement>(null);
    const [capturing, setCapturing] = useState(false);

    const handleShare = async () => {
        if (!receiptRef.current) return;
        setCapturing(true);
        try {
            const canvas = await html2canvas(receiptRef.current, {
                scale: 3, // Higher quality
                backgroundColor: '#FDFBF7',
                logging: false,
                useCORS: true,
            });

            // Direct download approach for maximum compatibility
            canvas.toBlob(async (blob) => {
                if (!blob) {
                    alert("Failed to generate image.");
                    return;
                }

                const file = new File([blob], `seal-lucky-money-${result.employee_code || 'receipt'}.png`, { type: 'image/png' });

                // Try native share first
                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: 'Seal Labs Lucky Money',
                            text: `I got ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(result.amount)}!`,
                            files: [file]
                        });
                        return; // Share successful
                    } catch (err) {
                        console.log('Share canceled or failed, falling back to download');
                        // Fallthrough to download
                    }
                }

                // Fallback to Download
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `seal-lucky-money-${result.employee_code || 'receipt'}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 'image/png');

        } catch (error: any) {
            console.error("Capture failed:", error);
            alert("Could not save receipt. Please screenshot manually. Error: " + (error?.message || "Unknown"));
        } finally {
            setCapturing(false);
        }
    };

    if (!isSuccess) return null;

    return (
        <div
            ref={receiptRef}
            className="w-full max-w-sm mx-auto p-6 rounded-lg relative overflow-hidden"
            style={{
                backgroundColor: '#FAF9F6',
                color: '#1A0F0F',
                border: '4px solid rgba(255, 215, 0, 0.5)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' // Manual shadow-2xl replacement
            }}
        >
            <div className="absolute top-0 right-0 p-2 opacity-50">
                <span className="text-xs font-mono" style={{ color: '#9CA3AF' }}>SEAL LABS • 2026</span>
            </div>

            {/* Stamp Effect */}
            <motion.div
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
                <div
                    className="w-48 h-48 rounded-full flex items-center justify-center -rotate-12"
                    style={{ border: '6px solid rgba(239, 68, 68, 0.2)' }}
                >
                    <span className="text-4xl font-black uppercase" style={{ color: 'rgba(239, 68, 68, 0.2)' }}>
                        {result.status === 'ALREADY_CLAIMED' ? 'REISSUED' : 'APPROVED'}
                    </span>
                </div>
            </motion.div>

            <div className="text-center mb-6 pt-4">
                <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center font-bold text-2xl mb-2"
                    style={{ backgroundColor: '#D9381E', color: '#FFD700', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                >
                    🧧
                </div>
                <h3 className="text-lg font-bold uppercase tracking-widest" style={{ color: '#6B7280' }}>Lucky Money Receipt</h3>
                <p className="text-sm" style={{ color: '#9CA3AF' }}>Official Allocation</p>
            </div>

            <div className="space-y-4 pt-6" style={{ borderTop: '1px dashed #D1D5DB' }}>
                <div className="flex justify-between items-baseline">
                    <span className="text-sm" style={{ color: '#6B7280' }}>Code</span>
                    <span className="font-bold break-all" style={{ color: '#1A0F0F' }}>{result.employee_code || result.email}</span>
                </div>

                <div className="flex justify-between items-baseline">
                    <span className="text-sm" style={{ color: '#6B7280' }}>Amount</span>
                    <span className="font-display font-bold text-3xl" style={{ color: '#D9381E' }}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(result.amount)}
                    </span>
                </div>

                <div className="flex justify-between items-baseline">
                    <span className="text-xs" style={{ color: '#6B7280' }}>Receipt ID</span>
                    <span className="font-mono text-xs" style={{ color: '#9CA3AF' }}>{result.receipt_id}</span>
                </div>

                <div className="flex justify-between items-baseline">
                    <span className="text-xs" style={{ color: '#6B7280' }}>Time</span>
                    <span className="font-mono text-xs" style={{ color: '#9CA3AF' }}>
                        {new Date(result.timestamp).toLocaleString()}
                    </span>
                </div>
            </div>

            <div className="mt-8 pt-4 text-center" style={{ borderTop: '1px solid #E5E7EB' }}>
                <button
                    onClick={handleShare}
                    disabled={capturing}
                    className="w-full py-2 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                    style={{
                        backgroundColor: '#FFD700',
                        color: '#1A0F0F',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    data-html2canvas-ignore
                >
                    {capturing ? 'Saving...' : (
                        <>
                            <Share2 className="w-4 h-4" /> Share Receipt
                        </>
                    )}
                </button>
                <p className="mt-2 text-[10px]" style={{ color: '#9CA3AF' }}>
                    ID: {result.receipt_id}
                </p>
                <div
                    className="w-full h-2 rounded-full mt-4"
                    style={{
                        background: 'linear-gradient(to right, #D9381E, #FFD700, #D9381E)',
                        opacity: 0.2
                    }}
                />
            </div>
        </div>
    );
}
