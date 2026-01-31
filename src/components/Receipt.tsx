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
            // Wait for fonts/images to settle
            await new Promise(resolve => setTimeout(resolve, 800));

            const canvas = await html2canvas(receiptRef.current, {
                scale: 3, // Higher resolution for crisp text
                backgroundColor: null,
                logging: false,
                useCORS: true,
                allowTaint: true,
                ignoreElements: (element) => element.hasAttribute('data-html2canvas-ignore')
            });

            canvas.toBlob(async (blob) => {
                if (!blob) throw new Error("Canvas Blob is null");
                const file = new File([blob], `seal-lucky-money-${result.employee_code || 'receipt'}.png`, { type: 'image/png' });

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

                const url = URL.createObjectURL(blob);
                setPreviewUrl(url);
                setShowModal(true);
                setCapturing(false);
            }, 'image/png');

        } catch (error: any) {
            console.error("Capture failed:", error);
            alert(`Error: ${error.message || "Could not generate image"}`);
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
            alert("Copied!");
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    if (!isSuccess) return null;

    return (
        <>
            <div
                ref={receiptRef}
                className="w-[92vw] max-w-[480px] mx-auto rounded-2xl relative overflow-hidden"
                style={{
                    // Material: Warm Ivory Paper (Realism)
                    background: 'linear-gradient(180deg, #F5E6CF 0%, #EFD9B8 100%)',
                    color: '#5E1213',
                    // Depth: Triple Shadow + Inner Warm Stroke
                    boxShadow: `
                        0 20px 50px -10px rgba(0,0,0,0.35),
                        0 0 0 1px rgba(255,255,255,0.4) inset,
                        inset 0 0 0 1px rgba(94, 18, 19, 0.05)
                    `,
                    paddingTop: '64px',
                    paddingBottom: '48px',
                    paddingLeft: '32px',
                    paddingRight: '32px',
                }}
            >
                {/* Texture Overlay: Noise/Grain */}
                <div
                    className="absolute inset-0 pointer-events-none mix-blend-overlay"
                    style={{
                        opacity: 0.15,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />
                {/* Watermark Logo */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: 0.03,
                        backgroundImage: `url("/logo.png")`,
                        backgroundSize: '150px',
                        backgroundRepeat: 'repeat',
                        backgroundPosition: 'center',

                    }}
                />

                {/* Header Section */}
                <div className="relative z-10 text-center pt-6">
                    {/* Authority Eyebrow */}
                    <div className="mb-6 flex justify-center opacity-60">
                        <span
                            className="text-[10px] font-mono uppercase tracking-[0.25em]"
                            style={{ color: '#5E1213' }}
                        >
                            OFFICIAL RECEIPT • VERIFIED • 2026
                        </span>
                    </div>

                    {/* Tier Icon */}
                    {tier.icon && (
                        <div
                            className="w-12 h-12 mx-auto rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-sm relative overflow-hidden"
                            style={{
                                backgroundColor: '#5E1213',
                                color: '#E5C698',
                                border: '1px solid rgba(94, 18, 19, 0.2)'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                            {tier.icon}
                        </div>
                    )}

                    {/* Title: Premium / Clean */}
                    <h3 className="type-h2 uppercase tracking-[0.2em] mb-4 text-base font-bold opacity-90" style={{ color: '#5E1213' }}>
                        {tier.title}
                    </h3>

                    {/* Divider: Clean Separator */}
                    <div className="flex justify-center mb-6 opacity-30">
                        <div style={{ width: '32px', height: '1px', backgroundColor: '#5E1213' }} />
                    </div>

                    {/* Quote: No Label, Just Text */}
                    <div className="flex justify-center mb-8">
                        <p className="font-serif italic text-sm opacity-80 max-w-[90%] leading-relaxed" style={{ color: '#5E1213' }}>
                            "{tier.message}"
                        </p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="relative z-10">
                    {/* Hero Amount */}
                    <div className="text-center py-2 mb-10 relative">
                        <span className="block text-[9px] uppercase tracking-[0.25em] opacity-50 mb-3 font-bold" style={{ color: '#5E1213' }}>Verified Amount</span>

                        <div
                            className="font-display font-bold text-6xl tracking-tighter leading-none relative z-10 flex items-baseline justify-center gap-1"
                            style={{
                                color: '#8C181B',
                                fontVariantNumeric: 'tabular-nums',
                                textShadow: '0 2px 0 rgba(229, 198, 152, 0.5)'
                            }}
                        >
                            {/* International Friendly: Comma Separator */}
                            {new Intl.NumberFormat('en-US').format(result.amount)}
                            <span
                                className="font-serif font-normal opacity-80 relative -top-0.5"
                                style={{ fontSize: '0.5em' }}
                            >
                                đ
                            </span>
                        </div>
                    </div>

                    {/* Security Feature: Tighter Microprint */}
                    <div className="w-full mb-8 opacity-40 select-none relative">
                        <div style={{ height: '1px', backgroundColor: '#5E1213', opacity: 0.25, marginBottom: '2px' }} />
                        <div className="text-[4px] font-mono whitespace-nowrap tracking-[0.15em] text-center uppercase" style={{ color: '#5E1213' }}>
                            SEAL LABS • AUTHENTICATED • RECEIPT HASH • 2026 •
                        </div>
                    </div>

                    {/* Metadata Grid: More spacing, Lighter weights */}
                    <div className="grid grid-cols-[100px_1fr] gap-y-4 px-4 text-left items-baseline">

                        <span className="text-[10px] uppercase tracking-[0.2em] opacity-50" style={{ color: '#5E1213' }}>Recipient</span>
                        <span className="text-sm font-light opacity-80 text-right font-mono leading-relaxed" style={{ color: '#5E1213' }}>{result.employee_code || result.email}</span>

                        <span className="text-[10px] uppercase tracking-[0.2em] opacity-50" style={{ color: '#5E1213' }}>Receipt ID</span>
                        <span className="text-xs opacity-80 text-right font-mono tracking-wide leading-relaxed" style={{ color: '#5E1213' }}>{result.receipt_id}</span>

                        <span className="text-[10px] uppercase tracking-[0.2em] opacity-50" style={{ color: '#5E1213' }}>Time</span>
                        <span className="text-xs opacity-80 text-right font-mono tracking-wide leading-relaxed" style={{ color: '#5E1213' }}>{new Date(result.timestamp).toLocaleString()}</span>

                    </div>
                </div>

                {/* Footer Action */}
                <div className="relative z-10 text-center mt-10">
                    <button
                        onClick={handleShare}
                        disabled={capturing}
                        className="group w-full rounded-xl transition-all flex items-center justify-center gap-3 relative overflow-hidden"
                        style={{
                            // Premium Button: Flatter, Tactile, Inset Highlight
                            background: 'linear-gradient(to bottom, #5E1213, #4a0e0f)',
                            color: '#E5C698',
                            boxShadow: `
                                0 4px 12px rgba(0,0,0,0.15), 
                                inset 0 1px 0 rgba(255, 255, 255, 0.1)
                            `,
                            fontSize: '12px',
                            letterSpacing: '0.15em',
                            paddingTop: '14px',
                            paddingBottom: '14px'
                        }}
                        data-html2canvas-ignore
                    >
                        {/* Hover Motion Wrapper */}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <span className="relative flex items-center gap-3 transition-transform duration-200 group-hover:-translate-y-px group-active:translate-y-px">
                            {capturing ? (
                                <span className="animate-pulse">Processing...</span>
                            ) : (
                                <>
                                    <Share2 className="w-3 h-3 opacity-90" />
                                    <span className="uppercase">Share Receipt</span>
                                </>
                            )}
                        </span>
                    </button>

                    {/* Authenticity Footer */}
                    <div className="mt-8 opacity-60">
                        <img
                            src="/logo.png"
                            className="w-5 h-auto mx-auto mb-2 opacity-50 grayscale"
                        />
                    </div>
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
                            <button
                                onClick={handleCopy}
                                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-seal-dark font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                                style={{ backgroundColor: '#F3F4F6', color: '#374151' }}
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
