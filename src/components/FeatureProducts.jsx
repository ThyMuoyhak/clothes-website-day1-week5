import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const scrollContainerRef = useRef(null);
    const animationRef = useRef(null);
    const navigate = useNavigate(); // Add this hook

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data.slice(0, 8)); // Take first 8 products for better performance
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Auto-scroll animation
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer || products.length === 0 || isPaused) return;

        let scrollPosition = 0;
        const speed = 0.5; // pixels per frame

        const animate = () => {
            if (scrollContainer && !isPaused) {
                scrollPosition += speed;
                
                // Reset position when scrolled past content
                if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                    scrollPosition = 0;
                }
                
                scrollContainer.scrollLeft = scrollPosition;
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [products, isPaused]);

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(price);
    };

    // Truncate title
    const truncateTitle = (text, maxLength = 40) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // Handle product click - navigate to product detail
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    // Handle quick view click
    const handleQuickView = (product, e) => {
        e.stopPropagation(); // Prevent navigation when clicking quick view
        // Here you could implement a modal quick view instead
        console.log('Quick view:', product.title);
        // Or you could open a modal:
        // setQuickViewProduct(product);
        // setIsQuickViewOpen(true);
    };

    if (loading) {
        return (
            <div className="bg-white py-12 md:py-16 font-['Outfit']">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-center items-center h-48">
                        <div className="text-slate-600">Loading featured products...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white py-12 md:py-16 font-['Outfit']">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="text-red-600 mb-4">Error loading products</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white py-12 md:py-16 font-['Outfit']">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 tracking-tight">
                            Featured <span className="text-blue-600">Products</span>
                        </h2>
                        <p className="text-slate-600">
                            Discover our most popular items
                        </p>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className={`p-2 rounded-full border transition-all duration-200 ${
                                isPaused 
                                    ? 'bg-slate-900 text-white border-slate-900' 
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                            aria-label={isPaused ? 'Play auto-scroll' : 'Pause auto-scroll'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isPaused ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                )}
                            </svg>
                        </button>
                        
                        <button 
                            onClick={() => navigate('/products')} // Navigate to all products page
                            className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors duration-200 flex items-center"
                        >
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Auto-scrolling Products Container */}
                <div className="relative overflow-hidden">
                    {/* Gradient overlays for smooth edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                    
                    {/* Scrollable Products Row */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex overflow-x-hidden py-4"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Duplicate products for seamless loop */}
                        {[...products, ...products].map((product, index) => (
                            <div 
                                key={`${product.id}-${index}`}
                                onClick={() => handleProductClick(product.id)} // Add click handler
                                className="flex-shrink-0 w-64 mx-3 group cursor-pointer"
                            >
                                <div className="bg-white border border-slate-100 rounded-xl p-4 hover:border-slate-200 hover:shadow-sm transition-all duration-300">
                                    {/* Product Image */}
                                    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-slate-50">
                                        <img 
                                            src={product.image} 
                                            alt={product.title}
                                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                        {/* Quick action overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <button 
                                                onClick={(e) => handleQuickView(product, e)}
                                                className="bg-white text-slate-900 hover:bg-slate-50 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
                                            >
                                                Quick View
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900 mb-1 leading-tight">
                                            {truncateTitle(product.title)}
                                        </h3>
                                        <p className="text-xs text-slate-500 mb-3 capitalize">
                                            {product.category}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-slate-900">
                                                {formatPrice(product.price)}
                                            </span>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent navigation
                                                    // Add to cart logic here
                                                    console.log('Add to cart:', product.title);
                                                }}
                                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="mt-3 flex items-center">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-500 ml-2">
                                            {product.rating?.rate || '4.5'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="flex justify-center items-center mt-8 space-x-2">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${!isPaused ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                    <span className="text-xs text-slate-500">
                        {isPaused ? 'Paused' : 'Auto-scrolling'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;