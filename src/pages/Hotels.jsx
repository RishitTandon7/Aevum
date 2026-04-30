import React, { useState } from 'react';
import { Search, MapPin, Calendar, Star, Loader2, Hotel, ArrowRight, ShieldCheck, Zap, AlertCircle, Building2 } from 'lucide-react';

const Hotels = () => {
    const [destination, setDestination] = useState('Goa');
    const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
    const [checkOut, setCheckOut] = useState(new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]);
    const [guests, setGuests] = useState(2);
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState('');

    const searchHotels = async () => {
        if (!destination) {
            setError("Please enter a destination");
            return;
        }
        setLoading(true);
        setError('');
        setHotels([]);

        try {
            const queryParams = new URLSearchParams({ destination, checkIn, checkOut, guests });
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            const response = await fetch(`${API_BASE}/api/search/hotels?${queryParams}`);
            const data = await response.json();

            if (data.success) {
                setHotels(data.data);
            } else {
                setError(data.error || 'Failed to fetch hotels');
            }
        } catch (err) {
            setError('Failed to connect to hotel servers');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white selection:bg-indigo-500 selection:text-white">
            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-10 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-200">
                        Compare Hotel Prices
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Scraping <span className="text-white font-semibold">Booking.com, Agoda, and Trivago</span> to get you the lowest rates instantly.
                    </p>
                </div>

                {/* Search Panel */}
                <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-white/5 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="input-group group relative">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Destination</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder-slate-500"
                                    placeholder="City, Region or Hotel"
                                />
                            </div>
                        </div>

                        <div className="input-group group relative">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Check In</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="input-group group relative">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Check Out</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={searchHotels}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3.5 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Search />}
                                Search Hotels
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-fade-in">
                        <Loader2 className="w-16 h-16 text-purple-400 animate-spin" />
                        <p className="text-xl font-medium text-slate-300">Comparing prices on 10+ booking sites...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center gap-3 mb-8 animate-fade-in">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Results Grid */}
                {!loading && hotels.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                        {hotels.map((hotel) => (
                            <div key={hotel.id} className="glass-panel p-0 rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all group bg-slate-900/40 hover:bg-slate-800/60 flex flex-col h-full">
                                {/* Image */}
                                <div className="h-56 relative overflow-hidden">
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                        {hotel.rating}
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                        Best Deal Found
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex-1 mb-4">
                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{hotel.name}</h3>
                                        <div className="flex items-center text-sm text-slate-400 mb-3">
                                            <MapPin className="w-4 h-4 mr-1 text-purple-400" />
                                            {hotel.location}
                                        </div>

                                        {/* Amenities */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-white/5 rounded-lg text-xs text-slate-300 border border-white/10">
                                                    {amenity}
                                                </span>
                                            ))}
                                            {hotel.amenities.length > 3 && (
                                                <span className="px-2 py-1 bg-white/5 rounded-lg text-xs text-slate-300 border border-white/10">
                                                    +{hotel.amenities.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-slate-400">found on {hotel.source}</p>
                                            <p className="text-2xl font-bold text-white">₹{hotel.price.toLocaleString()}</p>
                                        </div>
                                        <button className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-purple-50 transition-colors shadow-lg active:scale-95 flex items-center gap-2">
                                            View
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Hotels;
