// src/hooks/useApi.js
import { useState, useCallback } from 'react';

export const useApi = (apiFunction) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        try {
            setLoading(true);
            setError(null);
            const result = await apiFunction(...args);
            setData(result);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiFunction]);

    const reset = useCallback(() => {
        setData(null);
        setLoading(false);
        setError(null);
    }, []);

    return {
        data,
        loading,
        error,
        execute,
        reset,
        isSuccess: !error && data,
        isError: !!error,
    };
};

// Usage example:
/*
import { useApi } from '../hooks/useApi';
import { productsApi } from '../services/api';

const ProductsComponent = () => {
    const { data: products, loading, error, execute: fetchProducts } = useApi(productsApi.getAll);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div>
            {products?.map(product => (
                <div key={product.id}>{product.title}</div>
            ))}
        </div>
    );
};
*/