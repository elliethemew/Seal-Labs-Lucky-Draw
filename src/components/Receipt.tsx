import { motion } from 'framer-motion';
import { Share2, Download } from 'lucide-react';
import type { ClaimResult } from '../api/client';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import { getTier } from '../data/tiers';

interface ReceiptProps {
    result: ClaimResult;
}

export function Receipt({ result }: ReceiptProps) {
    const isSuccess = result.status === 'SUCCESS' || result.status === 'ALREADY_CLAIMED';
    const tier = getTier(result.amount);
    const receiptRef = useRef<HTMLDivElement>(null);
    const [capturing, setCapturing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleShare = async () => {
        if (!receiptRef.current) return;
        setCapturing(true);
        try {
            const canvas = await html2canvas(receiptRef.current, {
                scale: 3,
                backgroundColor: '#E5C698', // Seal Ivory
                logging: false,
                useCORS: true,
            });

            canvas.toBlob(async (blob) => {
                if (!blob) {
                    alert("Failed to generate image.");
                    setCapturing(false);
                    return;
                }

                const file = new File([blob], `seal-lucky-money-${result.employee_code || 'receipt'}.png`, { type: 'image/png' });

                // Try native share first (Mobile)
                if (navigator.share) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: 'Seal Labs Lucky Money',
                            text: 'I got my lucky money!'
                        });
                        setCapturing(false);
                        return;
                    } catch (err) {
                        console.log('Native share canceled/failed, falling back to modal');
                    }
                }

                // Fallback to Premium Modal (Desktop)
                const url = URL.createObjectURL(blob);
                setPreviewUrl(url);
                setShowModal(true);
                setCapturing(false);
            }, 'image/png');

        } catch (error: any) {
            console.error("Capture failed:", error);
            alert("Error generating receipt.");
            setCapturing(false);
        }
    };

    const handleDownload = () => {
        if (!previewUrl) return;
        const link = document.createElement('a');
        link.href = previewUrl;
        link.download = `seal-lucky-money-${result.employee_code || 'receipt'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCopy = async () => {
        if (!previewUrl) return;
        try {
            const response = await fetch(previewUrl);
            const blob = await response.blob();
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error("Copy failed", err);
            alert("Failed to copy image.");
        }
    };

    if (!isSuccess) return null;

    return (
        <>
            <div
                ref={receiptRef}
                className="w-[92vw] max-w-[520px] mx-auto p-6 rounded-2xl relative overflow-hidden"
                style={{
                    backgroundColor: '#E5C698', // Seal Ivory
                    color: '#5E1213', // Seal Dark (Deep Red)
                    border: '1px solid rgba(94, 18, 19, 0.1)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
            >
                <div className="absolute top-0 right-0 p-2 opacity-50">
                    <span className="text-xs font-mono" style={{ color: '#5E1213' }}>SEAL LABS • 2026</span>
                </div>

                {/* Stamp Effect */}
                <motion.div
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                    <div
                        className="w-48 h-48 rounded-full flex items-center justify-center -rotate-12"
                        style={{ border: '6px solid rgba(140, 24, 27, 0.1)' }}
                    >
                        <span className="text-4xl font-black uppercase" style={{ color: 'rgba(140, 24, 27, 0.1)' }}>
                            {result.status === 'ALREADY_CLAIMED' ? 'REISSUED' : 'APPROVED'}
                        </span>
                    </div>
                </motion.div>

                <div className="text-center mb-6 pt-4">
                    {tier.icon && (
                        <div
                            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center font-bold text-3xl mb-2 shadow-sm"
                            style={{ backgroundColor: '#5E1213', color: '#E5C698' }}
                        >
                            {tier.icon}
                        </div>
                    )}
                    <h3 className="type-h2 uppercase tracking-widest px-2 leading-tight" style={{ color: '#5E1213' }}>
                        {tier.title}
                    </h3>
                    <p className="type-caption italic mt-1 px-4 opacity-80" style={{ color: '#5E1213' }}>
                        "{tier.message}"
                    </p>
                </div>

                <div className="space-y-4 pt-6" style={{ borderTop: '1px dashed rgba(94, 18, 19, 0.2)' }}>
                    <div className="flex justify-between items-baseline">
                        <span className="text-sm opacity-70" style={{ color: '#5E1213' }}>Code</span>
                        <span className="font-bold break-all font-mono" style={{ color: '#5E1213' }}>{result.employee_code || result.email}</span>
                    </div>

                    <div className="flex justify-between items-baseline">
                        <span className="text-sm opacity-70" style={{ color: '#5E1213' }}>Amount</span>
                        <span className="font-display font-bold text-3xl tabular-nums" style={{ color: '#8C181B' }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(result.amount)}
                        </span>
                    </div>

                    <div className="flex justify-between items-baseline">
                        <span className="text-xs opacity-70" style={{ color: '#5E1213' }}>Receipt ID</span>
                        <span className="font-mono text-xs opacity-70" style={{ color: '#5E1213' }}>{result.receipt_id}</span>
                    </div>

                    <div className="flex justify-between items-baseline">
                        <span className="text-xs opacity-70" style={{ color: '#5E1213' }}>Time</span>
                        <span className="font-mono text-xs opacity-70" style={{ color: '#5E1213' }}>
                            {new Date(result.timestamp).toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="mt-8 pt-4 text-center" style={{ borderTop: '1px solid rgba(94, 18, 19, 0.1)' }}>
                    <button
                        onClick={handleShare}
                        disabled={capturing}
                        className="w-full py-3 font-bold rounded-lg transition-all flex items-center justify-center gap-2 hover:opacity-90"
                        style={{
                            backgroundColor: '#5E1213',
                            color: '#E5C698',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        data-html2canvas-ignore
                    >
                        {capturing ? 'Preparing...' : (
                            <>
                                <Share2 className="w-4 h-4" /> Share Receipt
                            </>
                        )}
                    </button>
                    <p className="mt-2 text-[10px] opacity-60 font-mono" style={{ color: '#5E1213' }}>
                        ID: {result.receipt_id}
                    </p>
                    <div
                        className="w-full h-2 rounded-full mt-4"
                        style={{
                            background: 'linear-gradient(to right, #5E1213, #8C181B, #5E1213)',
                            opacity: 0.1
                        }}
                    />
                </div>
            </div>

            {/* Premium Share Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm overflow-hidden"
                    >
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Share2 className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Ready to Share!</h3>
                            <p className="text-gray-500 text-sm mt-1">Your receipt has been generated.</p>
                        </div>

                        {previewUrl && (
                            <div className="mb-6 rounded-lg overflow-hidden border border-gray-200 shadow-inner bg-gray-50">
                                <img src={previewUrl} alt="Receipt Preview" className="w-full h-auto opacity-90" />
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleDownload}
                                className="w-full py-3 bg-seal-gold hover:bg-yellow-400 text-seal-dark font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                            >
                                <Download className="w-4 h-4" /> Download Image
                            </button>
                            {/* Copy is supported on most modern desktop browsers */}
                            <button
                                onClick={handleCopy}
                                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                            >
                                Copy to Clipboard
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="mt-2 text-gray-400 text-sm hover:text-gray-600"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}
