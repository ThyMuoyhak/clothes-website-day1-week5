import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Account = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]);

    // Mock user data (replace with actual authentication)
    useEffect(() => {
        // Simulate loading user data
        setTimeout(() => {
            const mockUser = {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+1 (555) 123-4567',
                joined: 'January 15, 2023',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe',
                tier: 'Gold Member'
            };

            const mockOrders = [
                { id: 1, orderId: 'ORD-78945', date: '2024-01-15', total: 129.99, status: 'Delivered', items: 3 },
                { id: 2, orderId: 'ORD-78946', date: '2024-01-10', total: 89.99, status: 'Processing', items: 2 },
                { id: 3, orderId: 'ORD-78947', date: '2024-01-05', total: 249.99, status: 'Shipped', items: 5 },
                { id: 4, orderId: 'ORD-78948', date: '2023-12-28', total: 59.99, status: 'Delivered', items: 1 }
            ];

            const mockAddresses = [
                { id: 1, type: 'Home', name: 'John Doe', address: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'USA', phone: '+1 (555) 123-4567', isDefault: true },
                { id: 2, type: 'Office', name: 'John Doe', address: '456 Business Ave', city: 'Brooklyn', state: 'NY', zip: '11201', country: 'USA', phone: '+1 (555) 987-6543', isDefault: false }
            ];

            setUser(mockUser);
            setOrders(mockOrders);
            setAddresses(mockAddresses);
            setLoading(false);
        }, 800);
    }, []);

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format currency
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    // Get status color
    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'shipped': return 'bg-blue-100 text-blue-800';
            case 'processing': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="bg-white min-h-screen py-16 font-['Outfit']">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-center items-center h-96">
                        <div className="text-slate-600">Loading account...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-['Outfit']">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <img 
                                    src={user.avatar} 
                                    alt={user.name}
                                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {user.tier}
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
                                <p className="text-slate-600 mt-1">{user.email}</p>
                                <p className="text-sm text-slate-500 mt-2">
                                    Member since {user.joined}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors duration-200"
                            >
                                ← Back to Store
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Navigation */}
                        <div className="lg:w-1/4">
                            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm sticky top-24">
                                <nav className="space-y-2">
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                                            activeTab === 'profile' 
                                                ? 'bg-blue-50 text-blue-600 font-semibold' 
                                                : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('orders')}
                                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                                            activeTab === 'orders' 
                                                ? 'bg-blue-50 text-blue-600 font-semibold' 
                                                : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        Orders
                                        <span className="ml-auto bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded-full">
                                            {orders.length}
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('addresses')}
                                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                                            activeTab === 'addresses' 
                                                ? 'bg-blue-50 text-blue-600 font-semibold' 
                                                : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Addresses
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('security')}
                                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                                            activeTab === 'security' 
                                                ? 'bg-blue-50 text-blue-600 font-semibold' 
                                                : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Security
                                    </button>
                                    <div className="pt-4 mt-4 border-t border-slate-100">
                                        <button
                                            onClick={() => {/* Logout logic */}}
                                            className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-red-600 hover:bg-red-50 transition-all duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </nav>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:w-3/4">
                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <div className="space-y-8">
                                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                                        <h2 className="text-xl font-bold text-slate-900 mb-6">Personal Information</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900">
                                                    {user.name}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900">
                                                    {user.email}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                                                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900">
                                                    {user.phone}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Member Since</label>
                                                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900">
                                                    {user.joined}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-8">
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200">
                                                Edit Profile
                                            </button>
                                        </div>
                                    </div>

                                    {/* Statistics */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
                                            <div className="text-blue-600 font-bold text-3xl mb-2">{orders.length}</div>
                                            <div className="text-blue-900 font-semibold">Total Orders</div>
                                            <div className="text-blue-700 text-sm mt-2">All time purchases</div>
                                        </div>
                                        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
                                            <div className="text-green-600 font-bold text-3xl mb-2">{orders.filter(o => o.status === 'Delivered').length}</div>
                                            <div className="text-green-900 font-semibold">Delivered</div>
                                            <div className="text-green-700 text-sm mt-2">Successful deliveries</div>
                                        </div>
                                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
                                            <div className="text-purple-600 font-bold text-3xl mb-2">Gold</div>
                                            <div className="text-purple-900 font-semibold">Member Tier</div>
                                            <div className="text-purple-700 text-sm mt-2">Exclusive benefits</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Orders Tab */}
                            {activeTab === 'orders' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-slate-900">Order History</h2>
                                        <div className="text-sm text-slate-600">
                                            {orders.length} order{orders.length !== 1 ? 's' : ''}
                                        </div>
                                    </div>
                                    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-slate-100">
                                                <thead className="bg-slate-50">
                                                    <tr>
                                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Order ID</th>
                                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Date</th>
                                                        <th className="px 6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Items</th>
                                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Total</th>
                                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {orders.map((order) => (
                                                        <tr key={order.id} className="hover:bg-slate-50 transition-colors duration-150">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm font-medium text-blue-600">{order.orderId}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-slate-900">{formatDate(order.date)}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-slate-900">{order.items} item{order.items !== 1 ? 's' : ''}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm font-semibold text-slate-900">{formatPrice(order.total)}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                                                    {order.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                                    View Details
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        {orders.length === 0 && (
                                            <div className="text-center py-12">
                                                <div className="text-slate-400 mb-4">No orders yet</div>
                                                <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
                                                    Start Shopping →
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Addresses Tab */}
                            {activeTab === 'addresses' && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-slate-900">Saved Addresses</h2>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-200 text-sm">
                                            + Add New Address
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {addresses.map((address) => (
                                            <div key={address.id} className={`bg-white border rounded-2xl p-6 ${address.isDefault ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-100'}`}>
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold text-slate-900">{address.type}</span>
                                                            {address.isDefault && (
                                                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                                                                    Default
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-slate-500 mt-1">{address.name}</div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button className="text-slate-400 hover:text-blue-600">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button className="text-slate-400 hover:text-red-600">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="text-slate-700 space-y-1">
                                                    <div>{address.address}</div>
                                                    <div>{address.city}, {address.state} {address.zip}</div>
                                                    <div>{address.country}</div>
                                                    <div className="pt-2 text-slate-500">{address.phone}</div>
                                                </div>
                                                {!address.isDefault && (
                                                    <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                        Set as Default
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Security Tab */}
                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                                        <h2 className="text-xl font-bold text-slate-900 mb-6">Security Settings</h2>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-medium text-slate-900">Password</h3>
                                                    <p className="text-sm text-slate-600 mt-1">Last changed 3 months ago</p>
                                                </div>
                                                <button className="text-blue-600 hover:text-blue-700 font-medium">
                                                    Change Password
                                                </button>
                                            </div>
                                            <div className="border-t border-slate-100 pt-6">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-medium text-slate-900">Two-Factor Authentication</h3>
                                                        <p className="text-sm text-slate-600 mt-1">Add an extra layer of security</p>
                                                    </div>
                                                    <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-xl transition-colors duration-200">
                                                        Enable 2FA
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="border-t border-slate-100 pt-6">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-medium text-slate-900">Sessions</h3>
                                                        <p className="text-sm text-slate-600 mt-1">Manage your active sessions</p>
                                                    </div>
                                                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                                                        View Sessions
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;