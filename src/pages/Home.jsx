import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search, ArrowRight, Star, Loader2, Hotel, Plane as PlaneIcon } from 'lucide-react';
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
        <div className="bg-white pb-20">

            {/* Hero Section */}
            <div className="relative h-[600px] w-full overflow-hidden">
                {/* Hero Background Image */}
                <div className="absolute inset-0 bg-gray-900">
                    <img
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000"
                        alt="Travel Hero"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>

                <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center z-10 pt-20">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
                        Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">Undiscovered</span>
                    </h1>
                    <p className="text-xl text-gray-200 mb-12 max-w-2xl drop-shadow-md">
                        Personalized itineraries and unbeatable deals, curated just for you.
                    </p>

                    {/* Modern Floating Search Bar */}
                    <div className="bg-white p-2 rounded-full shadow-2xl flex flex-col md:flex-row gap-2 w-full max-w-4xl animate-fade-in pl-6 md:pl-8">

                        {/* Destination */}
                        <div className="flex-1 flex items-center gap-3 relative group">
                            <MapPin className="w-5 h-5 text-brand-primary" />
                            <div className="flex-1 text-left">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Where to?</label>
                                <input
                                    type="text"
                                    placeholder="Search destinations"
                                    className="w-full outline-none text-gray-900 font-medium placeholder-gray-400"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                            </div>
                            <div className="w-px h-8 bg-gray-100 hidden md:block mx-2"></div>
                        </div>

                        {/* Dates */}
                        <div className="md:w-1/4 flex items-center gap-3 relative group cursor-pointer hover:bg-gray-50 rounded-xl px-2 transition-colors">
                            <Calendar className="w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors" />
                            <div className="text-left">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</label>
                                <span className="text-sm font-medium text-gray-800">Add dates</span>
                            </div>
                            <div className="w-px h-8 bg-gray-100 hidden md:block mx-2 ml-auto"></div>
                        </div>

                        {/* Guests */}
                        <div className="md:w-1/4 flex items-center gap-3 relative group cursor-pointer hover:bg-gray-50 rounded-xl px-2 transition-colors">
                            <Users className="w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors" />
                            <div className="text-left">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Who</label>
                                <span className="text-sm font-medium text-gray-800">Add guests</span>
                            </div>
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="md:w-16 md:h-16 w-full h-12 bg-brand-primary hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:shadow-blue-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <Search className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-20 relative z-20 pb-12">
                {/* Features Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {[
                        { title: "Best Price Guarantee", desc: "We match any competitor's price.", icon: "💎" },
                        { title: "24/7 Expert Support", desc: "Real humans, ready to help anytime.", icon: "🛡️" },
                        { title: "Curated Experiences", desc: "Hand-picked activities for every city.", icon: "✨" }
                    ].map((f, i) => (
                        <div key={i} className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20 card-hover">
                            <div className="text-4xl mb-4">{f.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-brand-dark">{f.title}</h3>
                            <p className="text-gray-500">{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Search Results */}
                {searchResults && (
                    <div id="search-results" className="mb-24">
                        <h2 className="text-3xl font-bold mb-8">Search Results for "{destination}"</h2>

                        {/* Hotels Section */}
                        {searchResults.hotels && searchResults.hotels.length > 0 && (
                            <div className="mb-12">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                        <Hotel className="w-6 h-6 text-brand-primary" />
                                        Hotels
                                    </h3>
                                    <button
                                        onClick={() => navigate('/hotels')}
                                        className="text-brand-primary font-semibold hover:gap-3 transition-all flex items-center gap-2"
                                    >
                                        View all <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {searchResults.hotels.map((hotel) => (
                                        <div
                                            key={hotel.id}
                                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                                        >
                                            <div className="h-48 overflow-hidden">
                                                <img
                                                    src={hotel.image}
                                                    alt={hotel.name}
                                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold text-lg mb-2">{hotel.name}</h4>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                        <span className="font-medium">{hotel.rating}</span>
                                                    </div>
                                                    <p className="text-brand-primary font-bold">₹{hotel.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Packages Section */}
                        {searchResults.packages && searchResults.packages.length > 0 && (
                            <div className="mb-12">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                        <PlaneIcon className="w-6 h-6 text-brand-primary" />
                                        Holiday Packages
                                    </h3>
                                    <button
                                        onClick={() => navigate('/packages')}
                                        className="text-brand-primary font-semibold hover:gap-3 transition-all flex items-center gap-2"
                                    >
                                        View all <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {searchResults.packages.map((pkg) => (
                                        <div
                                            key={pkg.id}
                                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                                        >
                                            <div className="h-48 overflow-hidden relative">
                                                <img
                                                    src={pkg.image}
                                                    alt={pkg.name}
                                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => {
                                                        e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800';
                                                    }}
                                                />
                                                <div className="absolute top-3 right-3 bg-white/95 px-2 py-1 rounded-full text-xs font-bold">
                                                    {pkg.duration}
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold text-lg mb-2 line-clamp-1">{pkg.name}</h4>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                        <span className="font-medium">{pkg.rating.toFixed(1)}</span>
                                                    </div>
                                                    <p className="text-brand-primary font-bold">₹{pkg.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Trending Section */}
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="section-title">Trending Now</h2>
                        <p className="section-subtitle mb-0">Popular destinations this week</p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-brand-primary font-semibold hover:gap-3 transition-all">
                        See all <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trendingCities.map((city, idx) => (
                        <div key={idx} className="group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100">
                            <div className="h-64 overflow-hidden relative">
                                <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {city.rating}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                                        <p className="text-sm text-gray-400">{city.country}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400">from</p>
                                        <p className="text-lg font-bold text-brand-primary">{city.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Home;
