import React, { useEffect, useState } from 'react';
import { Package, Map, Sun, Umbrella, Mountain, Users, Loader2, Star, Check, Sparkles, ArrowRight } from 'lucide-react';

const Packages = () => {
    const [theme, setTheme] = useState('Honeymoon');
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        searchPackages('Honeymoon');
    }, []);

    const searchPackages = async (selectedTheme) => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3001/api/search/packages?destination=${encodeURIComponent(selectedTheme)}`
                // Note: API uses 'destination' but logic handles theme as destination for now or general search
            );
            const data = await response.json();

            if (data.success) {
                setPackages(data.data);
            }
        } catch (error) {
            console.error('Error fetching packages:', error);
            setPackages([]);
        } finally {
            setLoading(false);
        }
    };

    const handleThemeClick = (selectedTheme) => {
        setTheme(selectedTheme);
        searchPackages(selectedTheme);
    };

    const themes = [
        { name: "Honeymoon", icon: Sun, color: "from-orange-500/20 to-red-500/20", borderColor: "border-orange-500/50", iconColor: "text-orange-400" },
        { name: "Adventure", icon: Mountain, color: "from-green-500/20 to-emerald-500/20", borderColor: "border-green-500/50", iconColor: "text-green-400" },
        { name: "Beach", icon: Umbrella, color: "from-blue-500/20 to-cyan-500/20", borderColor: "border-blue-500/50", iconColor: "text-blue-400" },
        { name: "Family", icon: Users, color: "from-purple-500/20 to-pink-500/20", borderColor: "border-purple-500/50", iconColor: "text-purple-400" },
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white selection:bg-indigo-500 selection:text-white">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-pink-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">

                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200">
                        Curated Holiday Packages
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Handpicked itineraries for every kind of traveler.
                    </p>
                </div>

                {/* Theme Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
                    {themes.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = theme === item.name;

                        return (
                            <div
                                key={item.name}
                                onClick={() => handleThemeClick(item.name)}
                                className={`p-6 rounded-2xl border backdrop-blur-md cursor-pointer transition-all duration-300 group ${isActive
                                    ? `bg-gradient-to-br ${item.color} ${item.borderColor} shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105`
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                    }`}
                            >
                                <div className="mb-3">
                                    <IconComponent className={`w-8 h-8 transition-colors ${isActive ? 'text-white' : item.iconColor}`} />
                                </div>
                                <h3 className={`font-bold text-lg transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{item.name}</h3>
                                <p className="text-xs text-slate-400 mt-1 group-hover:text-slate-300">
                                    View packages
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Listing */}
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                            {loading ? 'Finding Best Options...' : `Top ${theme} Packages`}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-fade-in">
                            <Loader2 className="w-16 h-16 text-pink-400 animate-spin" />
                            <p className="text-xl font-medium text-slate-300">Curating perfect itineraries...</p>
                        </div>
                    ) : packages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {packages.map((pkg) => (
                                <div
                                    key={pkg.id}
                                    className="glass-panel p-0 rounded-3xl border border-white/10 overflow-hidden hover:border-pink-500/30 transition-all group bg-slate-900/40 hover:bg-slate-800/60 flex flex-col h-full"
                                >
                                    {/* Package Image */}
                                    <div className="h-64 overflow-hidden relative">
                                        <img
                                            src={pkg.image}
                                            alt={pkg.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => {
                                                e.target.src = `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800`;
                                            }}
                                        />
                                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg border border-white/10">
                                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                            {pkg.rating.toFixed(1)}
                                        </div>
                                        <div className="absolute top-4 left-4 bg-pink-600/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg border border-white/10">
                                            {pkg.duration}
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent"></div>
                                    </div>

                                    {/* Package Details */}
                                    <div className="p-6 flex-1 flex flex-col relative">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{pkg.name}</h3>
                                            <p className="text-slate-400 flex items-center gap-1 mb-4 text-sm">
                                                <Map className="w-4 h-4 text-pink-400" />
                                                {pkg.destination}
                                            </p>

                                            {/* Inclusions */}
                                            <div className="space-y-3 mb-6">
                                                {pkg.inclusions.slice(0, 4).map((inc, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                                        <span>{inc}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price & CTA */}
                                        <div className="mt-auto pt-4 border-t border-white/10">
                                            <div className="flex items-end justify-between mb-4">
                                                <div>
                                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Price</p>
                                                    <p className="text-2xl font-bold text-white">₹{pkg.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold hover:bg-pink-50 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                                View Trip Details
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                            <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400 text-lg">No packages found for {theme}. Try another theme.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Packages;
