import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import DetailProductPage from './pages/DetailProductPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Cart from './components/Cart';
import SearchProducts from './components/SearchProducts'; // Import the SearchProducts component
import NotFoundPage from './pages/NotFoundPage';
import AccountPage from './pages/AccountPage';

function App() {
    return (
        <Router>
            <div className="font-['Outfit'] bg-white">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<DetailProductPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/cart" element={<Cart />} />
                    {/* Add the SearchProducts route */}
                    <Route path="/search" element={<SearchProducts />} />
                    <Route path="/account" element={<AccountPage></AccountPage>} />
                    <Route path="*" element={<NotFoundPage></NotFoundPage>} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;