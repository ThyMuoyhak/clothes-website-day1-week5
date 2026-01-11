import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState({});
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        address: '',
        notes: ''
    });

    // Telegram Bot Configuration
    const BOT_TOKEN = '8010864557:AAG1JiG6sj80hVxdmxVGKcKaqrg1dmh6WK8';
    const CHAT_ID = '1667587449'; // Your Telegram user ID

    // Load cart from localStorage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem('webstore_cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Listen for cart updates from other components
    useEffect(() => {
        const handleCartUpdate = () => {
            const savedCart = localStorage.getItem('webstore_cart');
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            }
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(price);
    };

    // Calculate subtotal
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Calculate shipping
    const calculateShipping = () => {
        return calculateSubtotal() > 50 ? 0 : 5.99;
    };

    // Apply coupon (simulated)
    const applyCoupon = () => {
        if (couponCode.trim() === '') return;
        
        setIsLoading(true);
        setTimeout(() => {
            if (couponCode.toUpperCase() === 'WEBSTORE10') {
                setCouponApplied(true);
            } else {
                alert('Invalid coupon code. Try "WEBSTORE10"');
            }
            setIsLoading(false);
        }, 500);
    };

    // Remove coupon
    const removeCoupon = () => {
        setCouponApplied(false);
        setCouponCode('');
    };

    // Calculate discount
    const calculateDiscount = () => {
        if (!couponApplied) return 0;
        return calculateSubtotal() * 0.1; // 10% discount
    };

    // Calculate total
    const calculateTotal = () => {
        return calculateSubtotal() + calculateShipping() - calculateDiscount();
    };

    // Update quantity
    const updateQuantity = async (id, newQuantity) => {
        if (newQuantity < 1) {
            removeItem(id);
            return;
        }
        
        setIsUpdating(prev => ({ ...prev, [id]: true }));
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const updatedCart = cartItems.map(item => 
            item.id === id ? { ...item, quantity: Math.min(newQuantity, item.stock || 10) } : item
        );
        
        setCartItems(updatedCart);
        localStorage.setItem('webstore_cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
        
        setIsUpdating(prev => ({ ...prev, [id]: false }));
    };

    // Remove item
    const removeItem = async (id) => {
        setIsUpdating(prev => ({ ...prev, [id]: true }));
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('webstore_cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
        
        setIsUpdating(prev => ({ ...prev, [id]: false }));
    };

    // Clear cart
    const clearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            setCartItems([]);
            localStorage.removeItem('webstore_cart');
            window.dispatchEvent(new Event('cartUpdated'));
        }
    };

    // Format order data for Telegram
    const formatOrderForTelegram = () => {
        const orderId = 'ORD-' + Date.now().toString().slice(-8);
        const orderDate = new Date().toLocaleString();
        
        let message = `🛒 *NEW ORDER RECEIVED!*\n`;
        message += `══════════════════\n`;
        message += `📋 *Order ID:* ${orderId}\n`;
        message += `📅 *Date:* ${orderDate}\n`;
        message += `══════════════════\n\n`;
        
        // Customer Information
        message += `👤 *CUSTOMER INFORMATION*\n`;
        message += `• Name: ${customerInfo.name || 'Not provided'}\n`;
        message += `• Phone: ${customerInfo.phone || 'Not provided'}\n`;
        message += `• Address: ${customerInfo.address || 'Not provided'}\n`;
        if (customerInfo.notes) {
            message += `• Notes: ${customerInfo.notes}\n`;
        }
        message += `\n`;
        
        // Order Items
        message += `📦 *ORDER ITEMS*\n`;
        cartItems.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   Qty: ${item.quantity} × ${formatPrice(item.price)}\n`;
            if (item.size) message += `   Size: ${item.size}\n`;
            if (item.color) message += `   Color: ${item.color}\n`;
            message += `   Subtotal: ${formatPrice(item.price * item.quantity)}\n`;
            message += `\n`;
        });
        
        // Order Summary
        message += `💰 *ORDER SUMMARY*\n`;
        message += `Subtotal: ${formatPrice(calculateSubtotal())}\n`;
        message += `Shipping: ${calculateShipping() === 0 ? 'FREE' : formatPrice(calculateShipping())}\n`;
        if (couponApplied) {
            message += `Discount (10%): -${formatPrice(calculateDiscount())}\n`;
        }
        message += `══════════════════\n`;
        message += `*TOTAL: ${formatPrice(calculateTotal())}*\n`;
        message += `══════════════════\n\n`;
        
        // Payment Status
        message += `💳 *Payment Status:* Pending\n`;
        message += `🚚 *Shipping Status:* Awaiting Processing\n\n`;
        
        // Quick Actions
        message += `⚡ *Quick Actions:*\n`;
        message += `• Contact customer: ${customerInfo.phone || 'Phone not provided'}\n`;
        message += `• View full order: [Click here to view](#)\n`;
        
        return message;
    };

    // Send order to Telegram bot
    const sendOrderToTelegram = async () => {
        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
            alert('Please fill in all required fields: Name, Phone, and Address');
            return;
        }

        setIsLoading(true);
        
        try {
            const orderMessage = formatOrderForTelegram();
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(orderMessage);
            
            // Send to Telegram Bot API
            const response = await fetch(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodedMessage}&parse_mode=Markdown`
            );
            
            const data = await response.json();
            
            if (data.ok) {
                // Show success message
                const event = new CustomEvent('showNotification', {
                    detail: {
                        type: 'success',
                        message: 'Order sent successfully! You will receive a confirmation soon.'
                    }
                });
                window.dispatchEvent(event);
                
                // Clear cart and close modal
                setTimeout(() => {
                    setCartItems([]);
                    localStorage.removeItem('webstore_cart');
                    window.dispatchEvent(new Event('cartUpdated'));
                    setShowCheckoutModal(false);
                    setCustomerInfo({ name: '', phone: '', address: '', notes: '' });
                    setIsLoading(false);
                    
                    // Redirect to confirmation page or home
                    alert('Thank you for your order! We have received it and will contact you soon.');
                    window.location.href = '/';
                }, 1500);
            } else {
                throw new Error('Failed to send order');
            }
        } catch (error) {
            console.error('Error sending order to Telegram:', error);
            alert('Failed to send order. Please try again or contact support.');
            setIsLoading(false);
        }
    };

    // Handle checkout button click
    const handleCheckout = () => {
        setShowCheckoutModal(true);
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Get item total count
    const getItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <div className="bg-white min-h-screen font-['Outfit'] py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <nav className="flex text-sm text-slate-600" aria-label="Breadcrumb">
                        <Link to="/" className="hover:text-blue-600 transition-colors duration-200">
                            Home
                        </Link>
                        <span className="mx-3">/</span>
                        <span className="text-slate-900 font-medium">Shopping Cart</span>
                    </nav>
                </div>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        Shopping <span className="text-blue-600">Cart</span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        Review your items and proceed to checkout
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    // Empty Cart State
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
                        <p className="text-slate-600 mb-8 max-w-md mx-auto">
                            Looks like you haven't added any items to your cart yet.
                        </p>
                        <Link 
                            to="/products"
                            className="inline-flex items-center bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Cart Items */}
                            <div className="lg:col-span-2">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-slate-900">
                                        Items ({cartItems.length}) • {getItemCount()} total items
                                    </h2>
                                    <button
                                        onClick={clearCart}
                                        className="text-sm text-slate-600 hover:text-red-600 transition-colors duration-200 flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Clear Cart
                                    </button>
                                </div>

                                {/* Cart Items List */}
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-slate-200 hover:shadow-sm transition-all duration-300">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Product Image */}
                                                <div className="md:w-32 flex-shrink-0">
                                                    <Link to={`/products/${item.id}`}>
                                                        <div className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors duration-200">
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name}
                                                                className="w-full h-auto object-contain mix-blend-multiply"
                                                            />
                                                        </div>
                                                    </Link>
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-grow">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <Link to={`/products/${item.id}`}>
                                                                <h3 className="font-semibold text-slate-900 mb-1 hover:text-blue-600 transition-colors duration-200">
                                                                    {item.name}
                                                                </h3>
                                                            </Link>
                                                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                                                                {item.size && <span>Size: {item.size}</span>}
                                                                {item.color && <span>Color: {item.color}</span>}
                                                                {item.category && <span className="capitalize">{item.category}</span>}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            disabled={isUpdating[item.id]}
                                                            className={`p-2 transition-colors duration-200 ${
                                                                isUpdating[item.id] 
                                                                    ? 'text-slate-300 cursor-wait' 
                                                                    : 'text-slate-400 hover:text-red-500'
                                                            }`}
                                                            aria-label="Remove item"
                                                        >
                                                            {isUpdating[item.id] ? (
                                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    </div>

                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                        {/* Quantity Selector */}
                                                        <div className="flex items-center">
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1 || isUpdating[item.id]}
                                                                className={`p-2 rounded-l-full border border-slate-200 ${
                                                                    item.quantity <= 1 || isUpdating[item.id]
                                                                        ? 'text-slate-300 cursor-not-allowed' 
                                                                        : 'text-slate-700 hover:bg-slate-50'
                                                                }`}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                                </svg>
                                                            </button>
                                                            <span className="w-12 text-center border-y border-slate-200 py-2 font-medium text-slate-900">
                                                                {isUpdating[item.id] ? (
                                                                    <svg className="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                    </svg>
                                                                ) : (
                                                                    item.quantity
                                                                )}
                                                            </span>
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                disabled={item.quantity >= (item.stock || 10) || isUpdating[item.id]}
                                                                className={`p-2 rounded-r-full border border-slate-200 ${
                                                                    item.quantity >= (item.stock || 10) || isUpdating[item.id]
                                                                        ? 'text-slate-300 cursor-not-allowed' 
                                                                        : 'text-slate-700 hover:bg-slate-50'
                                                                }`}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                                </svg>
                                                            </button>
                                                            <span className="text-sm text-slate-500 ml-3">
                                                                {item.stock || 10} in stock
                                                            </span>
                                                        </div>

                                                        {/* Price */}
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold text-slate-900">
                                                                {formatPrice(item.price * item.quantity)}
                                                            </div>
                                                            <div className="text-sm text-slate-500">
                                                                {formatPrice(item.price)} each
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Continue Shopping Button */}
                                <div className="mt-8">
                                    <Link 
                                        to="/products"
                                        className="flex items-center text-slate-700 hover:text-blue-600 transition-colors duration-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                                        <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

                                        {/* Summary Items */}
                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Subtotal</span>
                                                <span className="font-medium text-slate-900">{formatPrice(calculateSubtotal())}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Shipping</span>
                                                <span className="font-medium text-slate-900">
                                                    {calculateShipping() === 0 ? 'FREE' : formatPrice(calculateShipping())}
                                                </span>
                                            </div>
                                            {couponApplied && (
                                                <div className="flex justify-between">
                                                    <span className="text-green-600">Discount (10%)</span>
                                                    <span className="font-medium text-green-600">-{formatPrice(calculateDiscount())}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Coupon Code */}
                                        <div className="mb-6">
                                            {couponApplied ? (
                                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <div className="text-green-800 font-medium">Coupon applied</div>
                                                            <div className="text-green-600 text-sm">WEBSTORE10 - 10% off</div>
                                                        </div>
                                                        <button
                                                            onClick={removeCoupon}
                                                            className="text-green-600 hover:text-green-800"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex">
                                                    <input
                                                        type="text"
                                                        value={couponCode}
                                                        onChange={(e) => setCouponCode(e.target.value)}
                                                        placeholder="Coupon code"
                                                        className="flex-1 bg-white border border-slate-200 rounded-l-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-blue-500"
                                                    />
                                                    <button
                                                        onClick={applyCoupon}
                                                        disabled={isLoading || !couponCode.trim()}
                                                        className={`bg-slate-900 text-white px-6 py-3 rounded-r-xl font-medium transition-all duration-200 ${
                                                            isLoading || !couponCode.trim()
                                                                ? 'opacity-75 cursor-not-allowed'
                                                                : 'hover:bg-slate-800'
                                                        }`}
                                                    >
                                                        {isLoading ? '...' : 'Apply'}
                                                    </button>
                                                </div>
                                            )}
                                            <p className="text-xs text-slate-500 mt-2">
                                                Try coupon code: <span className="font-medium">WEBSTORE10</span>
                                            </p>
                                        </div>

                                        {/* Total */}
                                        <div className="border-t border-slate-200 pt-6 mb-6">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-slate-900">Total</span>
                                                <span className="text-2xl font-bold text-slate-900">
                                                    {formatPrice(calculateTotal())}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500 mt-2">
                                                Including VAT • Free shipping on orders over $50
                                            </p>
                                        </div>

                                        {/* Checkout Button */}
                                        <button
                                            onClick={handleCheckout}
                                            disabled={isLoading}
                                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.02] shadow-sm flex items-center justify-center ${
                                                isLoading ? 'opacity-75 cursor-not-allowed' : ''
                                            }`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Proceed to Checkout
                                        </button>

                                        {/* Payment Methods */}
                                        <div className="mt-6 pt-6 border-t border-slate-200">
                                            <p className="text-sm text-slate-600 mb-3">We accept</p>
                                            <div className="flex space-x-3">
                                                {['visa', 'mastercard', 'paypal', 'applepay'].map((method) => (
                                                    <div key={method} className="bg-slate-100 p-2 rounded-lg">
                                                        <div className="text-slate-700 font-medium text-xs uppercase">
                                                            {method}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Security Info */}
                                        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">Secure checkout</div>
                                                    <div className="text-xs text-slate-600">Your payment information is encrypted</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Checkout Modal */}
                        {showCheckoutModal && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                                <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-xl font-bold text-slate-900">Complete Your Order</h2>
                                            <button
                                                onClick={() => setShowCheckoutModal(false)}
                                                className="text-slate-400 hover:text-slate-600"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={customerInfo.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your full name"
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-blue-500"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={customerInfo.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your phone number"
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-blue-500"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Shipping Address *
                                                </label>
                                                <textarea
                                                    name="address"
                                                    value={customerInfo.address}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter your complete shipping address"
                                                    rows="3"
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-blue-500"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Additional Notes (Optional)
                                                </label>
                                                <textarea
                                                    name="notes"
                                                    value={customerInfo.notes}
                                                    onChange={handleInputChange}
                                                    placeholder="Any special instructions or notes for your order"
                                                    rows="2"
                                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            {/* Order Summary Preview */}
                                            <div className="bg-slate-50 rounded-xl p-4 mt-6">
                                                <h3 className="font-medium text-slate-900 mb-3">Order Summary</h3>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-600">Items:</span>
                                                        <span className="text-slate-900">{getItemCount()} items</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-600">Subtotal:</span>
                                                        <span className="text-slate-900">{formatPrice(calculateSubtotal())}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-600">Shipping:</span>
                                                        <span className="text-slate-900">
                                                            {calculateShipping() === 0 ? 'FREE' : formatPrice(calculateShipping())}
                                                        </span>
                                                    </div>
                                                    {couponApplied && (
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-green-600">Discount:</span>
                                                            <span className="text-green-600">-{formatPrice(calculateDiscount())}</span>
                                                        </div>
                                                    )}
                                                    <div className="border-t border-slate-200 pt-2 mt-2">
                                                        <div className="flex justify-between font-medium">
                                                            <span className="text-slate-900">Total:</span>
                                                            <span className="text-lg text-slate-900">{formatPrice(calculateTotal())}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <button
                                                    onClick={sendOrderToTelegram}
                                                    disabled={isLoading}
                                                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                                                        isLoading ? 'opacity-75 cursor-not-allowed' : ''
                                                    }`}
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Sending Order...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                            </svg>
                                                            Confirm & Send Order
                                                        </>
                                                    )}
                                                </button>
                                                <p className="text-xs text-slate-500 mt-3 text-center">
                                                    Your order will be sent directly to our Telegram bot for processing
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;