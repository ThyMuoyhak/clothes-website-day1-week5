import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [addingToCart, setAddingToCart] = useState({});
    const [showAddedNotification, setShowAddedNotification] = useState(false);
    const [addedProductName, setAddedProductName] = useState('');

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Get unique categories
    const categories = ['all', ...new Set(products.map(p => p.category))];

    // Filter and sort products
    const filteredProducts = products
        .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'name':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(price);
    };

    // Truncate title
    const truncateTitle = (text, maxLength = 50) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // Capitalize first letter
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Add item to cart
    const addToCart = async (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Show loading state
        setAddingToCart(prev => ({ ...prev, [product.id]: true }));
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        try {
            // Get current cart from localStorage
            const savedCart = localStorage.getItem('webstore_cart');
            const cartItems = savedCart ? JSON.parse(savedCart) : [];
            
            // Check if product already exists in cart
            const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
            
            let updatedCart;
            if (existingItemIndex >= 0) {
                // Update quantity if product already in cart
                updatedCart = [...cartItems];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + 1
                };
            } else {
                // Add new item to cart
                const newCartItem = {
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                    size: "M", // Default size
                    color: "Default",
                    image: product.image,
                    category: product.category,
                    stock: 10 // Default stock
                };
                updatedCart = [...cartItems, newCartItem];
            }
            
            // Save to localStorage
            localStorage.setItem('webstore_cart', JSON.stringify(updatedCart));
            
            // Notify other components
            window.dispatchEvent(new Event('cartUpdated'));
            
            // Show success notification
            setAddedProductName(product.title);
            setShowAddedNotification(true);
            
            // Auto-hide notification after 3 seconds
            setTimeout(() => {
                setShowAddedNotification(false);
            }, 3000);
            
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add item to cart. Please try again.');
        } finally {
            // Hide loading state
            setAddingToCart(prev => ({ ...prev, [product.id]: false }));
        }
    };

    if (loading) {
        return (
            <div className="bg-white min-h-screen py-16 font-['Outfit']">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-center items-center h-96">
                        <div className="text-slate-600">Loading all products...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white min-h-screen py-16 font-['Outfit']">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="text-red-600 mb-4">Error loading products</div>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Success Notification */}
            {showAddedNotification && (
                <div className="fixed top-24 right-6 z-50 animate-slide-in-right">
                    <div className="bg-white border border-green-200 rounded-xl p-4 shadow-lg max-w-sm">
                        <div className="flex items-center">
                            <div className="bg-green-100 p-2 rounded-lg mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-medium text-slate-900">Added to Cart!</div>
                                <div className="text-sm text-slate-600">
                                    {truncateTitle(addedProductName, 30)} has been added to your cart
                                </div>
                            </div>
                            <button 
                                onClick={() => setShowAddedNotification(false)}
                                className="ml-4 text-slate-400 hover:text-slate-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add CSS for animation */}
            <style>{`
                @keyframes slide-in-right {
                    0% { transform: translateX(100%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.3s ease-out;
                }
            `}</style>

            <div className="bg-white min-h-screen py-16 font-['Outfit']">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <nav className="flex text-sm text-slate-600" aria-label="Breadcrumb">
                            <Link to="/" className="hover:text-blue-600 transition-colors duration-200">
                                Home
                            </Link>
                            <span className="mx-3">/</span>
                            <span className="text-slate-900 font-medium">All Products</span>
                        </nav>
                    </div>

                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            All <span className="text-blue-600">Products</span>
                        </h1>
                        <p className="text-lg text-slate-600">
                            Browse our complete collection of premium products
                        </p>
                    </div>

                    {/* Filters & Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 p-6 bg-slate-50 rounded-2xl">
                        <div>
                            <div className="text-sm font-semibold text-slate-700 mb-3">Filter by Category</div>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                            selectedCategory === category
                                                ? 'bg-slate-900 text-white'
                                                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        {capitalize(category)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-slate-700 mb-3">Sort by</div>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-white border border-slate-200 rounded-full px-4 py-2 pl-10 pr-8 text-sm font-semibold text-slate-700 focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 transition-all duration-200"
                                >
                                    <option value="default">Featured</option>
                                    <option value="name">Name A-Z</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-6 flex justify-between items-center">
                        <div className="text-slate-600">
                            Showing <span className="font-semibold text-slate-900">{filteredProducts.length}</span> products
                            {selectedCategory !== 'all' && (
                                <span> in <span className="font-semibold text-blue-600 capitalize">{selectedCategory}</span></span>
                            )}
                        </div>
                        <div className="text-sm text-slate-500">
                            {products.length} total products
                        </div>
                    </div>

                    {/* Products Grid - 4 cards per row */}
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-slate-600 mb-4">No products found in this category</div>
                            <button 
                                onClick={() => setSelectedCategory('all')}
                                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200"
                            >
                                View All Products
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="group">
                                    <Link to={`/products/${product.id}`}>
                                        <div className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-slate-200 hover:shadow-sm transition-all duration-300 h-full flex flex-col">
                                            {/* Product Image */}
                                            <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-slate-50 flex-shrink-0">
                                                <img 
                                                    src={product.image} 
                                                    alt={product.title}
                                                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                                {/* Category Badge */}
                                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
                                                    {capitalize(product.category)}
                                                </div>
                                                {/* Add to Cart Button (on hover) */}
                                                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <button 
                                                        onClick={(e) => addToCart(product, e)}
                                                        disabled={addingToCart[product.id]}
                                                        className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
                                                            addingToCart[product.id]
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-white text-slate-900 hover:bg-blue-600 hover:text-white'
                                                        }`}
                                                        title="Add to cart"
                                                    >
                                                        {addingToCart[product.id] ? (
                                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex flex-col flex-grow">
                                                <div>
                                                    <h3 className="text-base font-semibold text-slate-900 mb-2 leading-tight">
                                                        {truncateTitle(product.title)}
                                                    </h3>
                                                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                                                        {truncateTitle(product.description, 80)}
                                                    </p>
                                                </div>

                                                <div className="mt-auto">
                                                    {/* Rating */}
                                                    <div className="flex items-center mb-4">
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

                                                    {/* Price & Action */}
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <div className="text-xl font-bold text-slate-900">
                                                                {formatPrice(product.price)}
                                                            </div>
                                                            <div className="text-xs text-slate-500">
                                                                Free shipping
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={(e) => addToCart(product, e)}
                                                            disabled={addingToCart[product.id]}
                                                            className={`p-3 rounded-full transition-all duration-200 ${
                                                                addingToCart[product.id]
                                                                    ? 'bg-blue-100 text-blue-600 cursor-wait'
                                                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 group-hover:bg-blue-600 group-hover:text-white'
                                                            }`}
                                                        >
                                                            {addingToCart[product.id] ? (
                                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Load More Button (if you want pagination) */}
                    {filteredProducts.length > 0 && (
                        <div className="text-center mt-12">
                            <button className="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-200">
                                Load More Products
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AllProducts;