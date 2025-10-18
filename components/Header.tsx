
import React from 'react';

interface HeaderProps {
    onHelpClick: () => void;
}

// FIX: Implement the Header component.
export const Header: React.FC<HeaderProps> = ({ onHelpClick }) => {
    return (
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-3">
                         <svg
                            className="h-8 w-8 text-indigo-600"
                            viewBox="0 0 128 128"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128Z"
                            fill="#F1F3FB"
                            />
                            <path
                            d="M93.8123 64C93.8123 80.395 80.395 93.8123 64 93.8123C47.605 93.8123 34.1877 80.395 34.1877 64C34.1877 47.605 47.605 34.1877 64 34.1877C80.395 34.1877 93.8123 47.605 93.8123 64Z"
                            fill="#939BFC"
                            />
                            <path
                            d="M64.0002 81.947C73.912 81.947 81.9472 73.9118 81.9472 64.0001C81.9472 54.0883 73.912 46.0531 64.0002 46.0531C54.0884 46.0531 46.0532 54.0883 46.0532 64.0001C46.0532 73.9118 54.0884 81.947 64.0002 81.947Z"
                            fill="#F1F3FB"
                            />
                            <path
                            d="M64 50.3158C56.5457 50.3158 50.3158 56.5457 50.3158 64C50.3158 71.4543 56.5457 77.6842 64 77.6842C71.4543 77.6842 77.6842 71.4543 77.6842 64C77.6842 56.5457 71.4543 50.3158 64 50.3158Z"
                            fill="#4655F6"
                            />
                        </svg>
                        <span className="text-xl font-semibold text-slate-800">Gemini Iris Classifier</span>
                    </div>
                    <button
                        onClick={onHelpClick}
                        className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        aria-label="Help"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};
