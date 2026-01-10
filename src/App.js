import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import DetailProductPage from './pages/DetailProductPage';
import About from './components/About'; // You'll need to create these
import Contact from './components/Contact'; // You'll need to create these
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

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
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;