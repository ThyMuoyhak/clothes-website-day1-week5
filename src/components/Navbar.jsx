import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 font-['Outfit']">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Logo Area */}
                    <div className="flex items-center gap-12">
                        <Link to="/" className="text-2xl font-black tracking-tight text-slate-900 cursor-pointer">
                            WEB<span className="text-blue-500">STORE</span>
                        </Link>
                        
                        {/* Desktop Links - Minimalist style */}
                        <div className="hidden md:flex items-center space-x-10">
                            {navItems.map((item) => (
                                <NavLink 
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) => 
                                        `text-sm font-semibold transition-colors duration-200 ${
                                            isActive 
                                                ? 'text-blue-500' 
                                                : 'text-slate-600 hover:text-blue-500'
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Right Side Tools */}
                    <div className="flex items-center gap-6">
                        {/* Modern Search Bar */}
                        <div className="hidden lg:flex items-center bg-gray-100 px-4 py-2 rounded-full border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input 
                                type="text" 
                                placeholder="Search products..." 
                                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-48 placeholder-gray-400"
                            />
                        </div>

                        {/* Cart with subtle glow */}
                        <Link to="/cart" className="relative p-2 text-slate-700 hover:bg-gray-100 rounded-full transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="absolute top-1 right-1 bg-blue-600 text-[10px] font-bold text-white h-4 w-4 rounded-full flex items-center justify-center">
                                3
                            </span>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-slate-700"
                            aria-label="Toggle menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Animated Slide Down */}
                <div className={`${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out`}>
                    <div className="flex flex-col space-y-4 pb-6 pt-2">
                        {navItems.map((item) => (
                            <NavLink 
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => 
                                    `text-lg font-medium transition-colors duration-200 ${
                                        isActive 
                                            ? 'text-blue-500' 
                                            : 'text-slate-700 hover:text-blue-500'
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;