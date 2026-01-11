import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="bg-white min-h-screen flex items-center justify-center px-4 font-['Outfit']">
            <div className="text-center max-w-lg">
                {/* Animated 404 Illustration */}
                <div className="relative mb-8">
                    <div className="w四十 h-40 mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-2xl opacity-50"></div>
                        <div className="relative">
                            <div className="text-9xl font-black text-slate-900 opacity-10">404</div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Page Not Found
                </h1>
                <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                    Oops! The page you're looking for seems to have wandered off into the digital void.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link
                        to="/"
                        className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:scale-105 shadow-sm"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </span>
                    </Link>
                    <Link
                        to="/products"
                        className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:scale-105 shadow-sm"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Browse Products
                        </span>
                    </Link>
                </div>

                {/* Search Section */}
                <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        Can't find what you're looking for?
                    </h3>
                    <p className="text-slate-600 mb-4">
                        Try searching our store:
                    </p>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="flex-1 bg-white border border-slate-200 rounded-l-full px-6 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.value.trim()) {
                                    window.location.href = `/search?q=${encodeURIComponent(e.target.value)}`;
                                }
                            }}
                        />
                        <button
                            onClick={(e) => {
                                const input = e.target.previousElementSibling;
                                if (input.value.trim()) {
                                    window.location.href = `/search?q=${encodeURIComponent(input.value)}`;
                                }
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-r-full transition-colors duration-200 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search
                        </button>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="text-sm text-slate-500">
                    <p className="mb-2">Or try one of these pages:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link to="/about" className="text-blue-600 hover:text-blue-700 hover:underline">
                            About Us
                        </Link>
                        <span className="text-slate-300">•</span>
                        <Link to="/contact" className="text-blue-600 hover:text-blue-700 hover:underline">
                            Contact
                        </Link>
                        <span className="text-slate-300">•</span>
                        <Link to="/cart" className="text-blue-600 hover:text-blue-700 hover:underline">
                            Your Cart
                        </Link>
                        <span className="text-slate-300">•</span>
                        <a href="#help" className="text-blue-600 hover:text-blue-700 hover:underline">
                            Help Center
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;