// src/services/api.js

const API_BASE_URL = 'https://fakestoreapi.com';

// Common headers configuration
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
});

// Generic fetch wrapper with error handling
const fetchWrapper = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...getHeaders(),
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
};

// Products API
export const productsApi = {
    // Get all products
    getAll: () => fetchWrapper('/products'),

    // Get single product by ID
    getById: (id) => fetchWrapper(`/products/${id}`),

    // Create new product
    create: (productData) => fetchWrapper('/products', {
        method: 'POST',
        body: JSON.stringify(productData),
    }),

    // Update product by ID
    update: (id, productData) => fetchWrapper(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
    }),

    // Delete product by ID
    delete: (id) => fetchWrapper(`/products/${id}`, {
        method: 'DELETE',
    }),

    // Get products by category
    getByCategory: (category) => fetchWrapper(`/products/category/${category}`),

    // Get all categories
    getCategories: () => fetchWrapper('/products/categories'),
};

// Users API (if needed)
export const usersApi = {
    getAll: () => fetchWrapper('/users'),
    getById: (id) => fetchWrapper(`/users/${id}`),
    create: (userData) => fetchWrapper('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
    }),
    update: (id, userData) => fetchWrapper(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
    }),
    delete: (id) => fetchWrapper(`/users/${id}`, {
        method: 'DELETE',
    }),
    login: (credentials) => fetchWrapper('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),
};

// Carts API (if needed)
export const cartsApi = {
    getAll: () => fetchWrapper('/carts'),
    getById: (id) => fetchWrapper(`/carts/${id}`),
    getUserCart: (userId) => fetchWrapper(`/carts/user/${userId}`),
    create: (cartData) => fetchWrapper('/carts', {
        method: 'POST',
        body: JSON.stringify(cartData),
    }),
    update: (id, cartData) => fetchWrapper(`/carts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(cartData),
    }),
    delete: (id) => fetchWrapper(`/carts/${id}`, {
        method: 'DELETE',
    }),
};

// Custom hooks for React components
export const useApi = () => {
    const callApi = async (apiCall, ...args) => {
        try {
            const data = await apiCall(...args);
            return { data, error: null, loading: false };
        } catch (error) {
            return { data: null, error, loading: false };
        }
    };

    return { callApi };
};

// Utility functions
export const apiUtils = {
    // Format product price
    formatPrice: (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(price);
    },

    // Truncate text
    truncateText: (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    // Capitalize first letter
    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    // Generate unique ID (for local state management)
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Validate product data
    validateProduct: (product) => {
        const errors = [];
        if (!product.title?.trim()) errors.push('Title is required');
        if (!product.price || product.price <= 0) errors.push('Valid price is required');
        if (!product.description?.trim()) errors.push('Description is required');
        if (!product.category?.trim()) errors.push('Category is required');
        return errors;
    },

    // Sanitize product data for API
    sanitizeProductData: (product) => ({
        title: product.title?.trim() || '',
        price: parseFloat(product.price) || 0,
        description: product.description?.trim() || '',
        category: product.category?.trim() || '',
        image: product.image?.trim() || 'https://via.placeholder.com/300',
    }),
};

// Example usage in components:
/*
import { productsApi, apiUtils } from '../services/api';

// In your component:
const fetchProducts = async () => {
    const products = await productsApi.getAll();
    return products.map(p => ({
        ...p,
        formattedPrice: apiUtils.formatPrice(p.price),
        shortDescription: apiUtils.truncateText(p.description, 60)
    }));
};
*/

export default {
    products: productsApi,
    users: usersApi,
    carts: cartsApi,
    utils: apiUtils,
};