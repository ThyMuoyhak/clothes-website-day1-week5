import React from 'react';

const ProductGrid = () => {
    const categories = [
        {
            id: 1,
            title: "Men's Fashion",
            description: "Casual & formal wear",
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            items: "120+ Products"
        },
        {
            id: 2,
            title: "Women's Collection",
            description: "Elegant & contemporary",
            image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            items: "95+ Products"
        },
        {
            id: 3,
            title: "Accessories",
            description: "Jewelry & watches",
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            items: "80+ Products"
        },
        {
            id: 4,
            title: "Electronics",
            description: "Gadgets & devices",
            image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            items: "65+ Products"
        }
    ];

    return (
        <div className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        Shop by <span className="text-blue-600">Category</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Browse our curated collections for every style and occasion
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <a 
                            key={category.id}
                            href="#"
                            className="group block"
                        >
                            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4">
                                <img 
                                    src={category.image} 
                                    alt={category.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-6 left-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="text-sm font-semibold mb-1">{category.items}</div>
                                    <h3 className="text-xl font-bold">{category.title}</h3>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-slate-600">{category.description}</p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <a 
                        href="#"
                        className="inline-flex items-center border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-3 rounded-full text-sm font-semibold transition-all duration-200"
                    >
                        View All Categories
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;