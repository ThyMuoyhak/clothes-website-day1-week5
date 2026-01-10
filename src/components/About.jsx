import React from 'react';

const About = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Alex Morgan",
            role: "Founder & CEO",
            bio: "With 10+ years in fashion retail, Alex envisioned a minimalist approach to online shopping.",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            social: { linkedin: "#", twitter: "#" }
        },
        {
            id: 2,
            name: "Maya Rodriguez",
            role: "Creative Director",
            bio: "Former designer at major fashion houses, Maya curates our minimalist collections.",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            social: { linkedin: "#", instagram: "#" }
        },
        {
            id: 3,
            name: "James Chen",
            role: "Head of Technology",
            bio: "Tech innovator focused on creating seamless shopping experiences.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            social: { linkedin: "#", github: "#" }
        },
        {
            id: 4,
            name: "Sarah Williams",
            role: "Customer Experience",
            bio: "Dedicated to ensuring every customer interaction is exceptional.",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            social: { linkedin: "#", twitter: "#" }
        }
    ];

    const milestones = [
        { year: "2019", title: "Founded", description: "Started with a vision for minimalist e-commerce" },
        { year: "2020", title: "First Collection", description: "Launched our debut minimalist fashion line" },
        { year: "2021", title: "10K Customers", description: "Reached milestone of 10,000 satisfied customers" },
        { year: "2022", title: "Expansion", description: "Expanded to international shipping" },
        { year: "2023", title: "Awards", description: "Won 'Best Minimalist Design' award" },
        { year: "2024", title: "Growth", description: "Featured in top fashion publications" }
    ];

    const values = [
        {
            title: "Minimalism",
            description: "We believe in less is more. Every product is thoughtfully designed to be essential.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: "Quality",
            description: "Premium materials and craftsmanship in every product we offer.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: "Sustainability",
            description: "Ethical sourcing and environmentally conscious practices.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: "Innovation",
            description: "Constantly evolving to provide the best shopping experience.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        }
    ];

    return (
        <div className="bg-white font-['Outfit']">
            {/* Hero Section */}
            <div className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-white"></div>
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-8">
                            <div className="text-2xl font-black text-blue-600">W</div>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                            Redefining <span className="text-blue-600">Minimalist</span> E-commerce
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                            At WEBSTORE, we believe that great design should be accessible, intentional, 
                            and sustainable. We curate only the essentials, eliminating excess to bring 
                            you products that truly matter.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a 
                                href="#story"
                                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-sm"
                            >
                                Our Story
                            </a>
                            <a 
                                href="#values"
                                className="border-2 border-slate-900 text-slate-900 hover:bg-slate-50 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200"
                            >
                                Our Values
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div id="story" className="py-16 md:py-24 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
                                Our Journey
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                                From Vision to <span className="text-blue-600">Reality</span>
                            </h2>
                            <div className="space-y-6">
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    Founded in 2019, WEBSTORE began as a simple idea: to create an online shopping 
                                    experience that focuses on quality over quantity. We noticed a gap in the market 
                                    for thoughtfully curated, minimalist products that prioritize design and durability.
                                </p>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    Today, we've grown into a trusted destination for those seeking intentional 
                                    purchases. Our team of designers, curators, and customer specialists work 
                                    tirelessly to ensure every product meets our high standards.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-slate-50 rounded-2xl p-8">
                                <img 
                                    src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                    alt="Our Workspace"
                                    className="w-full h-auto rounded-xl shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Milestones Timeline */}
                    <div className="mt-16 pt-12 border-t border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our Timeline</h3>
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-slate-200 hidden md:block"></div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {milestones.map((milestone, index) => (
                                    <div 
                                        key={milestone.year}
                                        className={`relative ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12 md:mt-16'}`}
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute left-1/2 transform -translate-x-1/2 md:left-auto md:transform-none md:right-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white z-10 mt-2 md:mt-4"></div>
                                        
                                        <div className="bg-white border border-slate-100 rounded-xl p-6 hover:border-slate-200 hover:shadow-sm transition-all duration-300">
                                            <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                                            <h4 className="text-xl font-semibold text-slate-900 mb-2">{milestone.title}</h4>
                                            <p className="text-slate-600">{milestone.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div id="values" className="py-16 md:py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            Our <span className="text-blue-600">Values</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            These principles guide everything we do at WEBSTORE
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div 
                                key={index}
                                className="bg-white border border-slate-100 rounded-2xl p-8 hover:border-slate-200 hover:shadow-sm transition-all duration-300"
                            >
                                <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                    <div className="text-blue-600">
                                        {value.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            Meet Our <span className="text-blue-600">Team</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            The passionate individuals behind WEBSTORE
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                            <div 
                                key={member.id}
                                className="group text-center"
                            >
                                <div className="relative mb-6">
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-white shadow-sm group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/5 transition-all duration-300"></div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                                <div className="text-blue-600 font-semibold mb-3">{member.role}</div>
                                <p className="text-slate-600 mb-4">{member.bio}</p>
                                <div className="flex justify-center space-x-3">
                                    {Object.entries(member.social).map(([platform, link]) => (
                                        <a 
                                            key={platform}
                                            href={link}
                                            className="text-slate-400 hover:text-blue-600 transition-colors duration-200"
                                            aria-label={platform}
                                        >
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                {platform === 'linkedin' && (
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                )}
                                                {platform === 'twitter' && (
                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                                )}
                                                {platform === 'github' && (
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                )}
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 md:py-24 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                        Join Our Minimalist Community
                    </h2>
                    <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                        Be the first to discover new collections, exclusive offers, and minimalist lifestyle tips.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all duration-200"
                        />
                        <button 
                            type="submit"
                            className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-sm"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;