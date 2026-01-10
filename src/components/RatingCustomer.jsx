import React, { useState, useEffect } from 'react';

const RatingCustomer = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Fashion Blogger",
            content: "WEBSTORE has completely transformed my wardrobe. The quality is exceptional and the minimalist designs are exactly what I've been looking for.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            purchase: "Summer Collection 2024"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Software Engineer",
            content: "As someone who values simplicity and quality, WEBSTORE delivers on both fronts. The shipping was fast and the customer service was excellent.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            purchase: "Urban Streetwear Bundle"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            role: "Marketing Director",
            content: "The attention to detail in every product is remarkable. I've recommended WEBSTORE to all my colleagues and they're equally impressed.",
            rating: 4,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            purchase: "Elegant Evening Wear"
        },
        {
            id: 4,
            name: "David Park",
            role: "Architect",
            content: "Finally found an online store that understands minimalist aesthetic. The materials feel premium and the fit is perfect every time.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            purchase: "Athleisure Activewear"
        },
        {
            id: 5,
            name: "Lisa Thompson",
            role: "Interior Designer",
            content: "Shopping at WEBSTORE feels like discovering a hidden gem. Every piece is thoughtfully designed and the quality exceeds expectations.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            purchase: "Accessories Collection"
        }
    ];

    // Auto-rotate testimonials
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    // Render star rating
    const renderStars = (rating) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${i < rating ? 'text-amber-400' : 'text-slate-300'}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white py-16 md:py-24 font-['Outfit']">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        Customer <span className="text-blue-600">Stories</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        See what our customers are saying about their WEBSTORE experience
                    </p>
                </div>

                {/* Main Testimonial */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-8 md:p-12 shadow-sm">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                            {/* Customer Image & Info */}
                            <div className="text-center lg:text-left lg:w-1/3">
                                <div className="mb-6">
                                    <img 
                                        src={testimonials[activeIndex].image} 
                                        alt={testimonials[activeIndex].name}
                                        className="w-24 h-24 rounded-full object-cover mx-auto lg:mx-0 border-4 border-white shadow-sm"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">
                                    {testimonials[activeIndex].name}
                                </h3>
                                <p className="text-slate-600 mb-3">
                                    {testimonials[activeIndex].role}
                                </p>
                                <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    {testimonials[activeIndex].purchase}
                                </div>
                            </div>

                            {/* Testimonial Content */}
                            <div className="lg:w-2/3">
                                {/* Quote Icon */}
                                <div className="mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>

                                {/* Rating */}
                                <div className="mb-6">
                                    {renderStars(testimonials[activeIndex].rating)}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-xl md:text-2xl text-slate-900 font-medium leading-relaxed mb-8">
                                    "{testimonials[activeIndex].content}"
                                </blockquote>

                                {/* Controls */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                                            className={`p-2 rounded-full border transition-all duration-200 ${
                                                isAutoPlaying 
                                                    ? 'bg-slate-900 text-white border-slate-900' 
                                                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                                            }`}
                                            aria-label={isAutoPlaying ? 'Pause auto-play' : 'Play auto-play'}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                {isAutoPlaying ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                )}
                                            </svg>
                                        </button>
                                        <span className="text-sm text-slate-500">
                                            {isAutoPlaying ? 'Auto-playing' : 'Paused'}
                                        </span>
                                    </div>

                                    {/* Navigation Dots */}
                                    <div className="flex space-x-2">
                                        {testimonials.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setActiveIndex(index);
                                                    setIsAutoPlaying(false);
                                                }}
                                                className={`transition-all duration-300 ${
                                                    index === activeIndex 
                                                        ? 'w-8 bg-slate-900' 
                                                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                                                } h-2 rounded-full`}
                                                aria-label={`Go to testimonial ${index + 1}`}
                                            ></button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <div 
                            key={testimonial.id}
                            className={`bg-white border rounded-xl p-6 hover:border-slate-200 hover:shadow-sm transition-all duration-300 cursor-pointer ${
                                index === activeIndex ? 'border-blue-200' : 'border-slate-100'
                            }`}
                            onClick={() => {
                                setActiveIndex(index);
                                setIsAutoPlaying(false);
                            }}
                        >
                            <div className="flex items-start mb-4">
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                {renderStars(testimonial.rating)}
                            </div>
                            <p className="text-slate-700 line-clamp-3">
                                "{testimonial.content}"
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-16 pt-12 border-t border-slate-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">4.9/5</div>
                            <div className="text-sm text-slate-600">Average Rating</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">10K+</div>
                            <div className="text-sm text-slate-600">Happy Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">98%</div>
                            <div className="text-sm text-slate-600">Would Recommend</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">24h</div>
                            <div className="text-sm text-slate-600">Avg. Response Time</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingCustomer;