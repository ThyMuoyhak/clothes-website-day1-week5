import React from 'react';

const Services = () => {
    const services = [
        {
            id: 1,
            title: "Fast Delivery",
            description: "Get your orders delivered within 24-48 hours in major cities",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            accentColor: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            id: 2,
            title: "Secure Payment",
            description: "100% secure payment with multiple payment options",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            accentColor: "text-emerald-600",
            bgColor: "bg-emerald-50"
        },
        {
            id: 3,
            title: "24/7 Support",
            description: "Round-the-clock customer support for all your queries",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            accentColor: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            id: 4,
            title: "Easy Returns",
            description: "Hassle-free 30-day return policy on all products",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            ),
            accentColor: "text-amber-600",
            bgColor: "bg-amber-50"
        }
    ];

    return (
        <div className="bg-white py-16 md:py-24 font-['Outfit']">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        Why Choose <span className="text-blue-600">WEBSTORE</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        We provide exceptional service to ensure your shopping experience is seamless and enjoyable
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <div 
                            key={service.id}
                            className="group relative bg-white border border-slate-100 rounded-2xl p-6 hover:border-slate-200 transition-all duration-300 hover:shadow-sm"
                        >
                            {/* Icon Container */}
                            <div className={`${service.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105`}>
                                <div className={service.accentColor}>
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                {service.description}
                            </p>

                            {/* Learn More Link */}
                            <a 
                                href="#"
                                className="inline-flex items-center text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors duration-200"
                            >
                                Learn more
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>

                            {/* Subtle Hover Effect */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-100 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="mt-16 pt-8 border-t border-slate-100">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full md:w-auto">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">10K+</div>
                                <div className="text-sm text-slate-600 font-medium">Happy Customers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">24/7</div>
                                <div className="text-sm text-slate-600 font-medium">Support Available</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">100%</div>
                                <div className="text-sm text-slate-600 font-medium">Secure Payment</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">30 Days</div>
                                <div className="text-sm text-slate-600 font-medium">Easy Returns</div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center md:text-right">
                            <a 
                                href="#"
                                className="inline-flex items-center bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 shadow-sm"
                            >
                                View All Services
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;