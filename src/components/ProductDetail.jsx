import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');

    // Auto scroll to top when component mounts or product ID changes
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [id]); // This runs whenever the product ID changes

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) throw new Error('Failed to fetch product');
                const data = await response.json();
                setProduct(data);
                setSelectedImage(data.image);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(price);
    };

    // Sizes array (for clothing products)
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    // Handle quantity changes
    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    // Add to cart handler
    const handleAddToCart = () => {
        // Implement your cart logic here
        console.log('Added to cart:', { 
            product: product.title, 
            quantity, 
            size: selectedSize,
            price: product.price * quantity 
        });
    };

    // Simulated related products (in a real app, you'd fetch these from API)
    const relatedProducts = [
        {
            id: 1,
            title: "Casual T-Shirt",
            price: 29.99,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 2,
            title: "Denim Jacket",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 3,
            title: "Summer Shorts",
            price: 34.99,
            image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        }
    ];

    if (loading) {
        return (
            <div className="bg-white min-h-screen py-16 font-['Outfit']">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-center items-center h-96">
                        <div className="text-slate-600">Loading product details...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white min-h-screen py-16 font-['Outfit']">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <div className="text-red-600 mb-4">Error: {error}</div>
                        <Link 
                            to="/products"
                            className="inline-flex items-center bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200"
                        >
                            Back to Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen py-16 font-['Outfit']">
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <nav className="flex text-sm text-slate-600" aria-label="Breadcrumb">
                        <Link to="/" className="hover:text-blue-600 transition-colors duration-200">
                            Home
                        </Link>
                        <span className="mx-3">/</span>
                        <Link to="/products" className="hover:text-blue-600 transition-colors duration-200">
                            Products
                        </Link>
                        <span className="mx-3">/</span>
                        <span className="text-slate-900 font-medium capitalize">
                            {product.category}
                        </span>
                    </nav>
                </div>

                {/* Product Detail Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div>
                        {/* Main Image */}
                        <div className="bg-slate-50 rounded-2xl p-8 mb-6">
                            <img 
                                src={selectedImage} 
                                alt={product.title}
                                className="w-full h-96 object-contain mix-blend-multiply"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex space-x-4 overflow-x-auto pb-4">
                            {[product.image, ...relatedProducts.slice(0, 3).map(p => p.image)].map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(img)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                        selectedImage === img 
                                            ? 'border-blue-600' 
                                            : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                >
                                    <img 
                                        src={img} 
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Category Badge */}
                        <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4 capitalize">
                            {product.category}
                        </div>

                        {/* Product Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            {product.title}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center mb-6">
                            <div className="flex text-amber-400 mr-3">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-slate-600">
                                {product.rating?.rate || '4.5'} ({product.rating?.count || 120} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-8">
                            <div className="text-3xl font-bold text-slate-900 mb-2">
                                {formatPrice(product.price)}
                            </div>
                            <div className="text-sm text-slate-500">
                                Including VAT • Free shipping
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-slate-900 mb-3">Description</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-slate-900 mb-3">Size</h3>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-full border text-sm font-semibold transition-all duration-200 ${
                                            selectedSize === size
                                                ? 'bg-slate-900 text-white border-slate-900'
                                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="mb-8">
                            <div className="flex items-center gap-4">
                                {/* Quantity Selector */}
                                <div className="flex items-center border border-slate-200 rounded-full px-4 py-2">
                                    <button 
                                        onClick={decrementQuantity}
                                        className="text-slate-500 hover:text-slate-700 p-2"
                                        aria-label="Decrease quantity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <span className="w-12 text-center font-semibold text-slate-900">
                                        {quantity}
                                    </span>
                                    <button 
                                        onClick={incrementQuantity}
                                        className="text-slate-500 hover:text-slate-700 p-2"
                                        aria-label="Increase quantity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-sm flex items-center justify-center gap-3"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add to Cart • {formatPrice(product.price * quantity)}
                                </button>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="border-t border-slate-100 pt-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-center">
                                    <div className="bg-blue-50 p-3 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-slate-900">Free Shipping</div>
                                        <div className="text-xs text-slate-500">On orders over $50</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-blue-50 p-3 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-slate-900">30-Day Returns</div>
                                        <div className="text-xs text-slate-500">Hassle-free returns</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-16 pt-12 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900">Related Products</h2>
                        <Link 
                            to="/products"
                            className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors duration-200 flex items-center"
                        >
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedProducts.map((relatedProduct) => (
                            <Link 
                                key={relatedProduct.id}
                                to={`/products/${relatedProduct.id}`}
                                className="group block"
                                onClick={() => {
                                    // Scroll to top when clicking related product
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                }}
                            >
                                <div className="bg-white border border-slate-100 rounded-xl p-6 hover:border-slate-200 hover:shadow-sm transition-all duration-300">
                                    <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-slate-50">
                                        <img 
                                            src={relatedProduct.image} 
                                            alt={relatedProduct.title}
                                            className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-900 mb-2 truncate">
                                        {relatedProduct.title}
                                    </h3>
                                    <div className="text-lg font-bold text-slate-900">
                                        {formatPrice(relatedProduct.price)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;