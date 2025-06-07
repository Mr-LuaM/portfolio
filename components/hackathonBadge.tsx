"use client";
import { useState } from 'react';

const HackathonBadge = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation(); // Prevent link from closing the dropdown
    };

    return (
<div className="relative w-full md:w-auto">
            {/* Main Badge */}
            <div className="flex items-center hackathon-badge rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer w-full md:w-auto"
                 style={{
                     background: 'linear-gradient(135deg, rgb(251, 191, 36) 0%, rgb(245, 158, 11) 50%, rgb(217, 119, 6) 100%)',
                     boxShadow: 'rgba(251, 191, 36, 0.4) 0px 10px 25px -5px, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
                 }} 
                 onClick={() => setIsOpen(!isOpen)}>
                <a
                    href="https://dict.gov.ph/news-and-updates/21070"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-7 md:h-8 items-center rounded-l-lg px-2.5 md:px-4 text-[10px] md:text-xs font-medium text-white transition-all duration-300 hover:brightness-110 gap-1 md:gap-1.5 whitespace-nowrap relative overflow-hidden group flex-1 justify-center md:justify-start"
                    style={{
                        background: 'linear-gradient(135deg, rgb(251, 191, 36) 0%, rgb(245, 158, 11) 50%, rgb(217, 119, 6) 100%)',
                        textShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px',
                    }} 
                    onClick={handleClick}
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M476.624,55.698C468.257,22.9,440.129,0,408.219,0c-0.005,0-0.012,0-0.017,0h-40.814H144.609H103.8 c-0.006,0-0.011,0-0.017,0c-31.91,0-60.039,22.902-68.406,55.696c-4.265,16.718-5.249,43.19,14.293,74.356 c14.927,23.808,39.204,45.759,72.2,65.384c4.091,62.185,50.632,112.966,110.857,123.567v50.975h-72.204 c-12.853,0-23.273,10.418-23.273,23.273v95.476c0,12.851,10.42,23.273,23.273,23.273h190.954 c12.853,0,23.273-10.422,23.273-23.273v-95.476c0-12.854-10.42-23.273-23.273-23.273h-72.204v-50.933 c60.38-10.512,107.061-61.412,111.096-123.75c32.875-19.588,57.069-41.491,71.962-65.243 C481.873,98.887,480.889,72.417,476.624,55.698z M80.476,67.204c3.463-13.565,14.344-20.658,23.315-20.658h0.005h17.574 l0.13,92.639C85.513,111.52,75.944,84.973,80.476,67.204z M390.662,139.062V46.545h17.548h0.005c8.965,0,19.85,7.095,23.312,20.66 C436.05,84.947,426.516,111.441,390.662,139.062z"></path>
                    </svg>
                    <span className="relative z-10">DICT OpenGov Hackathon 2025 Champion</span>
                </a>

                {/* Dropdown Toggle Button */}
                <button
                    className="inline-flex h-7 md:h-8 items-center rounded-r-lg px-1.5 md:px-2 text-white transition-all duration-300 hover:brightness-110 border-l border-white/20 relative overflow-hidden group brightness-110"
                    style={{
                        background: 'linear-gradient(135deg, rgb(245, 158, 11) 0%, rgb(217, 119, 6) 50%, rgb(180, 83, 9) 100%)',
                        textShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px',
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg className="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="hackathon-dropdown bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-3 backdrop-blur-sm"
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)', // Positions the dropdown directly below the badge
                        left: '0',
                        zIndex: 2147483647,
                        width: '320px',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3 px-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                        Other Hackathon Achievements
                    </div>
                    <div className="space-y-2">
                        {/* Achievement items */}
                        <div className="px-3 py-1.5 text-[10px] text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 dark:hover:from-yellow-900/20 dark:hover:to-amber-900/20 transition-all duration-200 cursor-default border border-transparent hover:border-yellow-200 dark:hover:border-yellow-600 hover:shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></div>
                                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                    <span className="font-medium truncate">National AI Prompt Design Challenge Finalist</span>
                                    <span className="text-[8px] bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap flex-shrink-0">AAP</span>
                                </div>
                            </div>
                        </div>
                        {/* Repeat for other achievements */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HackathonBadge;
