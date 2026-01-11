import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartUpdated, setIsCartUpdated] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Cart', path: '/cart' }
    ];

    // Fetch products for search suggestions
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, []);

    // Load cart count from localStorage and listen for updates
    useEffect(() => {
        const updateCartCount = () => {
            try {
                const savedCart = localStorage.getItem('webstore_cart');
                const cartItems = savedCart ? JSON.parse(savedCart) : [];
                const count = cartItems.reduce((total, item) => total + item.quantity, 0);
                setCartCount(count);
                
                // Trigger animation when cart updates
                if (count > 0) {
                    setIsCartUpdated(true);
                    setTimeout(() => setIsCartUpdated(false), 300);
                }
            } catch (error) {
                console.error('Error loading cart:', error);
                setCartCount(0);
            }
        };

        updateCartCount();
        window.addEventListener('cartUpdated', updateCartCount);
        window.addEventListener('storage', (e) => {
            if (e.key === 'webstore_cart') updateCartCount();
        });

        return () => {
            window.removeEventListener('cartUpdated', updateCartCount);
            window.removeEventListener('storage', updateCartCount);
        };
    }, []);

    // Filter products based on search query
    useEffect(() => {
        if (searchQuery.trim() && products.length > 0) {
            const query = searchQuery.toLowerCase().trim();
            const results = products.filter(product => 
                product.title.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            ).slice(0, 5); // Limit to 5 suggestions
            
            setFilteredProducts(results);
            setShowDropdown(true);
        } else {
            setFilteredProducts([]);
            setShowDropdown(false);
        }
    }, [searchQuery, products]);

    // Handle search submission
    const handleSearch = (e) => {
        e?.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setShowDropdown(false);
            setIsOpen(false);
        }
    };

    // Handle key press (Enter for search)
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        } else if (e.key === 'Escape') {
            setShowDropdown(false);
        }
    };

    // Handle search icon click
    const handleSearchIconClick = () => {
        handleSearch();
    };

    // Select a suggestion
    const handleSelectSuggestion = (productTitle) => {
        setSearchQuery(productTitle);
        setTimeout(() => handleSearch(), 100);
    };

    // Clear search and close dropdown
    const clearSearch = () => {
        setSearchQuery('');
        setFilteredProducts([]);
        setShowDropdown(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.search-container')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    return (
        <>
            <style>{`
                @keyframes bounce-once {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }
                .animate-bounce-once {
                    animation: bounce-once 0.3s ease-in-out;
                }
                .search-dropdown {
                    animation: slideDown 0.2s ease-out;
                }
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 font-['Outfit']">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center h-20">
                        
                        {/* Logo Area */}
                        <div className="flex items-center gap-12">
                            <Link 
                                to="/" 
                                className="text-2xl font-black tracking-tight text-slate-900 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                            >
                                WEB<span className="text-blue-500">STORE</span>
                            </Link>
                            
                            {/* Desktop Links */}
                            <div className="hidden md:flex items-center space-x-10">
                                {navItems.slice(0, 4).map((item) => (
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
                                        end={item.path === '/'}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        {/* Right Side Tools */}
                        <div className="flex items-center gap-4 md:gap-6">
                            {/* Modern Search Bar with Dropdown */}
                            <form onSubmit={handleSearch} className="hidden lg:block search-container relative">
                                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all duration-300 group relative z-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 group-focus-within:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input 
                                        type="text" 
                                        placeholder="Search products..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        onFocus={() => searchQuery && setShowDropdown(true)}
                                        className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-48 placeholder-gray-400 focus:placeholder-blue-300"
                                    />
                                    {searchQuery && (
                                        <button 
                                            type="button"
                                            onClick={clearSearch}
                                            className="ml-2 text-gray-400 hover:text-gray-600"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                    {/* Search Icon Button */}
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={handleSearchIconClick}
                                            className="ml-2 p-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                            title="Search"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {/* Search Dropdown */}
                                {showDropdown && filteredProducts.length > 0 && (
                                    <div className="search-dropdown absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                                        <div className="py-2">
                                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Products ({filteredProducts.length})
                                            </div>
                                            {filteredProducts.map((product) => (
                                                <button
                                                    key={product.id}
                                                    type="button"
                                                    onClick={() => handleSelectSuggestion(product.title)}
                                                    className="w-full text-left px-4 py-3 hover:bg-blue-50/50 flex items-center gap-3 group transition-colors duration-150"
                                                >
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                                        <img 
                                                            src={product.image} 
                                                            alt={product.title}
                                                            className="w-full h-full object-contain p-1"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                                                            {product.title}
                                                        </div>
                                                        <div className="text-xs text-gray-500 capitalize">
                                                            {product.category}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-bold text-blue-600 flex-shrink-0">
                                                        {formatPrice(product.price)}
                                                    </div>
                                                </button>
                                            ))}
                                            <div className="border-t border-gray-100 px-4 py-2">
                                                <button
                                                    type="button"
                                                    onClick={handleSearch}
                                                    className="w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-700 py-2 hover:bg-blue-50 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                    View all results for "{searchQuery}"
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* No results dropdown */}
                                {showDropdown && searchQuery.trim() && filteredProducts.length === 0 && (
                                    <div className="search-dropdown absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                                        <div className="p-4 text-center">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">
                                                No products found for "{searchQuery}"
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Try different keywords
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </form>

                            {/* Mobile Search Button */}
                            <button 
                                onClick={() => setIsOpen(true)}
                                className="lg:hidden p-2 text-slate-700 hover:bg-gray-100 rounded-full transition-all"
                                aria-label="Search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>

                            {/* Cart */}
                            <Link 
                                to="/cart" 
                                className="relative p-2 text-slate-700 hover:bg-gray-100 rounded-full transition-all group"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className={`absolute top-1 right-1 bg-blue-600 text-[10px] font-bold text-white h-4 min-w-4 rounded-full flex items-center justify-center px-1 ${isCartUpdated ? 'animate-bounce-once' : ''}`}>
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                                <span className="sr-only">Cart ({cartCount} items)</span>
                            </Link>

                            {/* User Account */}
                            <Link 
                                to="/account" 
                                className="hidden md:block p-2 text-slate-700 hover:bg-gray-100 rounded-full transition-all"
                                aria-label="Account"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button 
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden p-2 text-slate-700 hover:bg-gray-100 rounded-full transition-all"
                                aria-label={isOpen ? "Close menu" : "Open menu"}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out`}>
                        <div className="flex flex-col space-y-4 pb-6 pt-2">
                            {navItems.map((item) => (
                                <NavLink 
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => 
                                        `text-lg font-medium transition-colors duration-200 flex items-center justify-between ${
                                            isActive 
                                                ? 'text-blue-500' 
                                                : 'text-slate-700 hover:text-blue-500'
                                        }`
                                    }
                                    end={item.path === '/'}
                                >
                                    <span>{item.name}</span>
                                    {item.name === 'Cart' && cartCount > 0 && (
                                        <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                    {item.name === 'Cart' && cartCount === 0 && (
                                        <span className="text-slate-400 text-sm">Empty</span>
                                    )}
                                </NavLink>
                            ))}
                            
                            {/* Mobile Search */}
                            <div className="pt-4 mt-4 border-t border-gray-100">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="flex-1 bg-gray-100 border border-gray-200 rounded-l-full px-4 py-2 text-slate-700 focus:outline-none focus:border-blue-500"
                                    />
                                    <button 
                                        type="button"
                                        onClick={handleSearch}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-r-full hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;