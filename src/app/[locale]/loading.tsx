"use client";

import React from 'react';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex h-screen w-full flex-col bg-[#B71C1C] font-sans overflow-hidden">
            {/* Styles for the animations as requested */}
            <style jsx global>{`
                @keyframes urgent-pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(0.98); }
                }
                @keyframes fill-up {
                    0% { clip-path: inset(100% 0 0 0); }
                    100% { clip-path: inset(0% 0 0 0); }
                }
                @keyframes heartbeat {
                    0% { transform: scale(1); }
                    14% { transform: scale(1.15); }
                    28% { transform: scale(1); }
                    42% { transform: scale(1.15); }
                    70% { transform: scale(1); }
                }
                .animate-urgent-pulse {
                    animation: urgent-pulse 0.6s ease-in-out infinite;
                }
                .animate-fill-fast {
                    animation: fill-up 1.2s ease-in-out infinite;
                }
                .animate-heartbeat-fast {
                    animation: heartbeat 0.8s ease-in-out infinite;
                }
            `}</style>

            <div className="relative flex h-full grow flex-col justify-center items-center">
                <div className="flex flex-col max-w-[480px] w-full items-center px-6">
                    <div className="mb-10 flex flex-col items-center animate-heartbeat-fast">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <span className="material-symbols-outlined absolute text-white !text-8xl opacity-30" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                                water_drop
                            </span>
                            <span className="material-symbols-outlined absolute text-white !text-8xl animate-fill-fast" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
                                water_drop
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 w-full text-center">
                        <h1 className="text-white text-3xl font-bold tracking-tight">
                            Sehat-ID Emergency
                        </h1>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-white text-lg font-semibold animate-urgent-pulse">
                                CRITICAL: Finding immediate donors...
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-12 px-6 w-full max-w-[520px]">
                    <div className="bg-white rounded-xl p-6 shadow-2xl border-l-[8px] border-[#B71C1C] flex items-center gap-4">
                        <div className="bg-[#B71C1C]/10 p-2 rounded-full">
                            <span className="material-symbols-outlined text-[#B71C1C] !text-3xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
                                notification_important
                            </span>
                        </div>
                        <p className="text-[#B71C1C] font-bold text-sm md:text-base leading-tight">
                            URGENT REQUEST DETECTED: Multiple donors being notified in your area.
                        </p>
                    </div>
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#ffffff_0%,_transparent_70%)]"></div>
            </div>
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(183,28,28,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]"></div>
        </div>
    );
}
