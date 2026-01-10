const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center bg-gray-50">
            <div className="absolute inset-0 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Background"
                    className="w-full h-full object-cover opacity-10"
                />
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="text-center">
                    {/* Season Tag */}
                    <div className="inline-block mb-6">
                        <span className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full">
                            FALL COLLECTION 2024
                        </span>
                    </div>
                    
                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 tracking-tight">
                        SIMPLE
                        <span className="block text-gray-600">IS THE NEW</span>
                        <span className="block text-gray-900">LUXURY</span>
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 font-light">
                        Minimalist clothing with maximum impact. Timeless pieces for your everyday elegance.
                    </p>
                    
                    {/* Shop Button */}
                    <button className="group relative inline-flex items-center justify-center px-10 py-4 bg-black text-white text-lg font-medium rounded-none hover:bg-gray-800 transition-all duration-300">
                        SHOP THE COLLECTION
                        <svg 
                            className="ml-3 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                    
                    {/* Featured Products Preview */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { name: "Premium Tees", price: "$49", color: "bg-blue-100" },
                            { name: "Designer Denim", price: "$89", color: "bg-gray-100" },
                            { name: "Cashmere Sweaters", price: "$129", color: "bg-rose-100" }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className={`${item.color} h-48 rounded-lg mb-4 flex items-center justify-center`}>
                                    <div className="text-4xl font-bold text-gray-800">{item.price}</div>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="animate-bounce">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;