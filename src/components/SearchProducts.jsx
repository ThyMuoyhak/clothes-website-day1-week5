import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SearchProducts = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get search query from URL parameters
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('q') || '';
    
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(!!initialQuery);
    const [addingToCart, setAddingToCart] = useState({});

    // Fetch all products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
                
                // If there's an initial query, perform search
                if (initialQuery) {
                    performSearch(data, initialQuery);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [initialQuery]);

    // Perform search
    const performSearch = (productList, query) => {
        if (!query.trim()) {
            setFilteredProducts([]);
            setSearchPerformed(false);
            return;
        }

        const lowerQuery = query.toLowerCase().trim();
        const results = productList.filter(product => 
            product.title.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        );
        
        setFilteredProducts(results);
        setSearchPerformed(true);
        
        // Update URL without reloading
        navigate(`/search?q=${encodeURIComponent(query)}`, { replace: true });
    };

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            performSearch(products, searchQuery);
        }
    };

    // Clear search
    const clearSearch = () => {
        setSearchQuery('');
        setFilteredProducts([]);
        setSearchPerformed(false);
        navigate('/search', { replace: true });
    };

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(price);
    };

    // Truncate text
    const truncateText = (text, maxLength = 60) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // Capitalize first letter
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Add item to cart
    const addToCart = async (product, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        setAddingToCart(prev => ({ ...prev, [product.id]: true }));
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        try {
            const savedCart = localStorage.getItem('webstore_cart');
            const cartItems = savedCart ? JSON.parse(savedCart) : [];
            
            const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
            let updatedCart;
            
            if (existingItemIndex >= 0) {
                updatedCart = [...cartItems];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + 1
                };
            } else {
                const newCartItem = {
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                    size: "M",
                    color: "Default",
                    image: product.image,
                    category: product.category,
                    stock: 10
                };
                updatedCart = [...cartItems, newCartItem];
            }
            
            localStorage.setItem('webstore_cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('cartUpdated'));
            
            // Show success toast (you can reuse your notification system)
            const event = new CustomEvent('showNotification', {
                detail: {
                    type: 'success',
                    message: `${product.title.substring(0, 30)}... added to cart`
                }
            });
            window.dispatchEvent(event);
            
        } catch (error) {
            console.error('Error adding to cart:', error);
            const event = new CustomEvent('showNotification', {
                detail: {
                    type: 'error',
                    message: 'Failed to add item to cart'
                }
            });
            window.dispatchEvent(event);
        } finally {
            setAddingToCart(prev => ({ ...prev, [product.id]: false }));
        }
    };

    // Handle key press (Enter for search, Escape to clear)
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        } else if (e.key === 'Escape') {
            clearSearch();
        }
    };

    if (loading && !searchPerformed) {
        return (
            <div className="bg-white min-h-screen py-16 font-['Outfit']">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-center items-center h-96">
                        <div className="text-slate-600">Loading products...</div>
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
        <div className="bg-white min-h-screen font-['Outfit']">
            

            {/* Search Results */}
            <div className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-6">
                    {searchPerformed ? (
                        <>
                            {/* Results Header */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        Search Results for "{searchQuery}"
                                    </h2>
                                    <p className="text-slate-600 mt-2">
                                        Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                                    </p>
                                </div>
                                
                                {filteredProducts.length > 0 && (
                                    <button
                                        onClick={clearSearch}
                                        className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors duration-200 flex items-center"
                                    >
                                        Clear Search
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Results Grid */}
                            {filteredProducts.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">No products found</h3>
                                    <p className="text-slate-600 mb-6 max-w-md mx-auto">
                                        We couldn't find any products matching "{searchQuery}". Try different keywords or browse our categories.
                                    </p>
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        <button 
                                            onClick={() => setSearchQuery('electronics')}
                                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                                        >
                                            Electronics
                                        </button>
                                        <button 
                                            onClick={() => setSearchQuery('jewelery')}
                                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                                        >
                                            Jewelry
                                        </button>
                                        <button 
                                            onClick={() => setSearchQuery("men's clothing")}
                                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                                        >
                                            Men's Clothing
                                        </button>
                                        <button 
                                            onClick={() => setSearchQuery("women's clothing")}
                                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                                        >
                                            Women's Clothing
                                        </button>
                                    </div>
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
                                                                {truncateText(product.title, 50)}
                                                            </h3>
                                                            <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                                                                {truncateText(product.description, 80)}
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
                        </>
                    ) : (
                        /* Browse Categories Section (when no search performed) */
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">What are you looking for?</h3>
                            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                                Start typing in the search bar above or browse our popular categories
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                                {['electronics', 'jewelery', "men's clothing", "women's clothing"].map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setSearchQuery(category);
                                            performSearch(products, category);
                                        }}
                                        className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-md transition-all duration-300 group text-left"
                                    >
                                        <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-slate-900 mb-2 capitalize">
                                            {category.replace("'s", "'s ")}
                                        </h4>
                                        <p className="text-sm text-slate-600">
                                            Browse our {category} collection
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchProducts;