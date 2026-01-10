import React, { useState, useEffect } from 'react';

const SlideShow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const slides = [
        {
            id: 1,
            title: "Summer Collection 2024",
            subtitle: "Fresh Styles",
            description: "Lightweight fabrics and vibrant colors for sunny days",
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            buttonText: "Shop Now",
            accentColor: "text-blue-600",
            bgOverlay: "bg-gradient-to-r from-white/95 via-white/90 to-transparent"
        },
        {
            id: 2,
            title: "Urban Streetwear",
            subtitle: "City Ready",
            description: "Bold and comfortable for modern urban lifestyle",
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            buttonText: "Explore",
            accentColor: "text-slate-800",
            bgOverlay: "bg-gradient-to-r from-white/95 via-white/90 to-transparent"
        },
        {
            id: 3,
            title: "Elegant Evening",
            subtitle: "Dress to Impress",
            description: "Stunning pieces for your special occasions",
            image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            buttonText: "View Collection",
            accentColor: "text-purple-700",
            bgOverlay: "bg-gradient-to-r from-white/95 via-white/90 to-transparent"
        },
        {
            id: 4,
            title: "Athleisure",
            subtitle: "Performance Style",
            description: "High-performance activewear with modern design",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
            buttonText: "Shop Active",
            accentColor: "text-emerald-600",
            bgOverlay: "bg-gradient-to-r from-white/95 via-white/90 to-transparent"
        }
    ];

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [currentSlide]);

    return (
        <div className="relative w-full overflow-hidden bg-white font-['Outfit']">
            {/* Slides Container */}
            <div className="relative h-[600px] md:h-[700px]">
                {slides.map((slide, index) => (
                    <div 
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img 
                                src={slide.image} 
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Subtle gradient overlay for text readability */}
                            <div className={`absolute inset-0 ${slide.bgOverlay}`}></div>
                        </div>
                        
                        {/* Content - Minimalist, aligned with navbar */}
                        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
                            <div className="max-w-xl">
                                {/* Subtle subtitle */}
                                <div className="mb-4">
                                    <span className="text-sm font-semibold tracking-wider text-slate-600 uppercase">
                                        {slide.subtitle}
                                    </span>
                                    <div className="w-12 h-0.5 bg-slate-300 mt-2"></div>
                                </div>
                                
                                {/* Main title with accent color */}
                                <h1 className={`text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight ${slide.accentColor}`}>
                                    {slide.title}
                                </h1>
                                
                                {/* Description - clean and minimal */}
                                <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-md">
                                    {slide.description}
                                </p>
                                
                                {/* Buttons - matching navbar interaction style */}
                                <div className="flex flex-wrap gap-3">
                                    <a 
                                        href="#"
                                        className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 shadow-sm"
                                    >
                                        {slide.buttonText}
                                    </a>
                                    <a 
                                        href="#"
                                        className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200"
                                    >
                                        Browse All
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Minimal Navigation Arrows */}
            <button 
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 hover:text-slate-900 p-3 rounded-full border border-slate-200 hover:border-slate-300 transition-all duration-200 z-20 shadow-sm"
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 hover:text-slate-900 p-3 rounded-full border border-slate-200 hover:border-slate-300 transition-all duration-200 z-20 shadow-sm"
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Clean Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (!isAnimating) {
                                setIsAnimating(true);
                                setCurrentSlide(index);
                                setTimeout(() => setIsAnimating(false), 500);
                            }
                        }}
                        className={`transition-all duration-300 ${
                            index === currentSlide 
                                ? 'w-8 bg-slate-900' 
                                : 'w-2 bg-slate-400 hover:bg-slate-600'
                        } h-2 rounded-full`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            {/* Subtle Info Banner - matches navbar aesthetic */}
           
        </div>
    );
};

export default SlideShow;