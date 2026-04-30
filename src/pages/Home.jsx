import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search, ArrowRight, Star, Loader2, Hotel, Plane as PlaneIcon, Sparkles, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [destination, setDestination] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const trendingCities = [
        { name: "Jaipur", country: "India", img: "https://images.unsplash.com/photo-1477586957327-81dbac958f5f?auto=format&fit=crop&q=80&w=800", price: "₹3,800", rating: 4.8 },
        { name: "Bali", country: "Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800", price: "₹18,500", rating: 4.9 },
        { name: "Dubai", country: "UAE", img: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?auto=format&fit=crop&q=80&w=800", price: "₹12,200", rating: 4.7 },
        { name: "Kerala", country: "India", img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800", price: "₹6,900", rating: 4.9 },
    ];

    const handleSearch = async () => {
        if (!destination) return;
        setLoading(true);
        try {
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            const response = await fetch(
                `${API_BASE}/api/search?query=${encodeURIComponent(destination)}&type=mixed`
            );
            const data = await response.json();
            if (data.success) {
                setSearchResults(data.data);
                setTimeout(() => {
                    document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        } catch (error) {
            console.error('Error searching:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="bg-slate-950 pb-24 overflow-hidden">

            {/* Premium Hero Section */}
            <section className="relative min-h-screen w-full overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                    {/* Base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
                    
                    {/* Animated orbs */}
                    <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute top-1/3 right-20 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
                </div>

                {/* Content */}
                <div className="relative container mx-auto px-6 h-screen flex flex-col justify-center items-center text-center z-10 pt-20">
                    
                    {/* Badge */}
                    <div className="mb-8 animate-slide-down">
                        <div className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 text-sm font-semibold flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Discover Premium Travel Experiences
                        </div>
                    </div>

                    {/* Main Headline */}
                    <h1 className="heading-premium mb-6 animate-slide-up max-w-4xl">
                        Your <span className="text-gradient">Perfect Journey</span> Awaits
                    </h1>

                    {/* Subheading */}
                    <p className="text-premium max-w-2xl mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        AI-powered search across premium hotels, direct flights, and curated experiences. Find luxury within your budget with our intelligent recommendation engine.
                    </p>

                    {/* Premium Search Bar */}
                    <div className="w-full max-w-5xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <div className="glass-container p-2 shadow-premium-xl">
                            <div className="flex flex-col md:flex-row gap-3 md:gap-1">
                                
                                {/* Destination */}
                                <div className="flex-1 flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
                                    <MapPin className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                    <div className="flex-1 text-left">
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Where to?</label>
                                        <input
                                            type="text"
                                            placeholder="Enter destination"
                                            className="w-full outline-none bg-transparent text-white placeholder:text-slate-500 font-medium text-lg"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                        />
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="hidden md:block w-px h-12 bg-white/10 rounded-full"></div>

                                {/* Date */}
                                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                                    <Calendar className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                    <div className="text-left">
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">When</label>
                                        <span className="text-white font-medium">Flexible</span>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="hidden md:block w-px h-12 bg-white/10 rounded-full"></div>

                                {/* Guests */}
                                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                                    <Users className="w-5 h-5 text-rose-400 flex-shrink-0" />
                                    <div className="text-left">
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Travelers</label>
                                        <span className="text-white font-medium">2 guests</span>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <button
                                    onClick={handleSearch}
                                    disabled={loading}
                                    className="btn-premium md:w-16 md:h-16 w-full h-12 flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            <Search className="w-5 h-5" />
                                            <span className="md:hidden">Search</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="section-premium max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Shield, title: "Best Price Guarantee", desc: "We match any competitor's rate—guaranteed" },
                        { icon: Zap, title: "24/7 Luxury Support", desc: "Concierge team available round the clock" },
                        { icon: Sparkles, title: "Curated Experiences", desc: "Hand-picked destinations & premium packages" }
                    ].map((feature, i) => (
                        <div key={i} className="feature-card transition-all duration-300 hover:bg-opacity-20">
                            <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-rose-500/20 w-fit transition-transform duration-300 hover:scale-110">
                                <feature.icon className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-slate-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trending Destinations */}
            <section className="section-premium max-w-6xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="heading-large mb-4">Trending Destinations</h2>
                    <p className="text-slate-400 text-lg">Discover the most popular travel destinations this season</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingCities.map((city, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="relative h-64 rounded-2xl overflow-hidden glass-card border-0 shadow-premium hover:shadow-premium-lg transition-all hover-lift">
                                {/* Image */}
                                <img
                                    src={city.img}
                                    alt={city.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 transition-opacity hover:opacity-40"></div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6">
                                    <h3 className="text-2xl font-bold text-white mb-1">{city.name}</h3>
                                    <p className="text-slate-300 text-sm mb-4">{city.country}</p>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="text-white font-semibold">{city.rating}</span>
                                        </div>
                                        <span className="text-indigo-300 font-bold">{city.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Search Results */}
            {searchResults && (
                <section className="section-premium max-w-6xl mx-auto px-6" id="search-results">
                    <h2 className="heading-large mb-12">Discover {destination}</h2>

                    {/* Hotels */}
                    {searchResults.hotels && searchResults.hotels.length > 0 && (
                        <div className="mb-20">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-xl bg-indigo-500/20">
                                        <Hotel className="w-6 h-6 text-indigo-300" />
                                    </div>
                                    <h3 className="heading-medium">Luxury Hotels</h3>
                                </div>
                                <button
                                    onClick={() => navigate('/hotels')}
                                    className="btn-premium-secondary text-sm"
                                >
                                    View All <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {searchResults.hotels.map((hotel) => (
                                    <div
                                        key={hotel.id}
                                        className="card-premium-lg p-0 overflow-hidden hover-lift group cursor-pointer"
                                    >
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={hotel.image}
                                                alt={hotel.name}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            />
                                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-indigo-500 text-white text-sm font-bold">
                                                ⭐ {hotel.rating}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h4 className="font-bold text-lg text-white mb-2 line-clamp-2">{hotel.name}</h4>
                                            <p className="text-slate-400 text-sm mb-4">{hotel.location}</p>
                                            
                                            <div className="divider-premium mb-4"></div>
                                            
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-300 text-sm font-medium">{hotel.reviews} reviews</span>
                                                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
                                                    ₹{hotel.price.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Packages */}
                    {searchResults.packages && searchResults.packages.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-xl bg-rose-500/20">
                                        <PlaneIcon className="w-6 h-6 text-rose-300" />
                                    </div>
                                    <h3 className="heading-medium">Holiday Packages</h3>
                                </div>
                                <button
                                    onClick={() => navigate('/packages')}
                                    className="btn-premium-secondary text-sm"
                                >
                                    View All <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {searchResults.packages.map((pkg) => (
                                    <div
                                        key={pkg.id}
                                        className="card-premium-lg hover-lift group cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="font-bold text-white text-lg mb-1">{pkg.name}</h4>
                                                <p className="text-slate-400 text-sm">{pkg.duration}</p>
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold">
                                                ⭐ {pkg.rating.toFixed(1)}
                                            </div>
                                        </div>

                                        <div className="divider-premium my-4"></div>

                                        <div className="mb-4">
                                            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Inclusions</p>
                                            <div className="flex flex-wrap gap-2">
                                                {pkg.inclusions.slice(0, 3).map((item, i) => (
                                                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
                                                ₹{pkg.price.toLocaleString()}
                                            </span>
                                            <button className="btn-premium text-sm px-4 py-2 h-auto">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* CTA Section */}
            <section className="section-premium max-w-6xl mx-auto px-6">
                <div className="glass-container p-12 md:p-16 text-center relative overflow-hidden">
                    {/* Background effect */}
                    <div className="absolute inset-0 -z-10 opacity-30">
                        <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500 blur-3xl"></div>
                        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-rose-500 blur-3xl"></div>
                    </div>

                    <h2 className="heading-large mb-6">Ready for Your Next Adventure?</h2>
                    <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of travelers who've discovered their perfect trips with Aevum.
                    </p>
                    <button className="btn-premium text-lg px-8 py-4">
                        Explore Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
