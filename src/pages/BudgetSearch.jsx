import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Loader2, Plane, Building2, Wallet, ArrowRight, CheckCircle2, AlertCircle, Sparkles, Filter } from 'lucide-react';

const BudgetSearch = () => {
    const [activeTab, setActiveTab] = useState('budget');
    const [loading, setLoading] = useState(false);
    const [scanStep, setScanStep] = useState(0); // 0: Idle, 1: Flights, 2: Hotels, 3: Combining
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    // Form States
    const [from, setFrom] = useState('Mumbai');
    const [destination, setDestination] = useState('Goa');
    const [budget, setBudget] = useState('15000');
    const [passengers, setPassengers] = useState(2);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
    const [checkOut, setCheckOut] = useState(new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]);

    const scanMessages = [
        "Connecting to Flight Aggregators (Skyscanner, Google Flights)...",
        "Scanning Hotel Networks (Booking.com, Agoda, Trivago)...",
        "Analyzing 1,240+ combinations for best value...",
        "Finalizing budget-friendly packages..."
    ];

    const handleSearch = async () => {
        if (!from || !destination || !budget) {
            setError("Please fill in all required fields.");
            return;
        }
        setError('');
        setLoading(true);
        setResults(null);
        setScanStep(0);

        // Simulate scanning progress steps
        const interval = setInterval(() => {
            setScanStep(prev => (prev < 3 ? prev + 1 : prev));
        }, 1500);

        try {
            // Use the correct backend endpoint
            // Note: The python script uses 'date' for flight date
            const queryParams = new URLSearchParams({
                from,
                destination,
                budget,
                passengers,
                date,
                checkIn,
                checkOut
            });

            const response = await fetch(`http://localhost:3001/api/search/budget?${queryParams}`);
            const data = await response.json();

            clearInterval(interval);
            setScanStep(4); // Done

            if (data.success) {
                setResults(data);
            } else {
                setError(data.error || 'Failed to find combinations.');
            }
        } catch (err) {
            clearInterval(interval);
            console.error(err);
            setError('Connection to travel servers failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-slate-950 relative overflow-hidden">

            {/* Vivid Background Mesh */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[128px] mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[128px] mix-blend-screen animate-pulse-slow delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/40 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">

                {/* Header */}
                <div className="text-center mb-10 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-blue-200">
                        Smart Budget Trip Planner
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        AI-powered search across <span className="text-white font-semibold">Booking.com, Skyscanner, and Google Flights</span> to find the perfect trip within your budget.
                    </p>
                </div>

                {/* Search Panel */}
                <div className="relative backdrop-blur-2xl bg-slate-900/60 p-6 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl shadow-indigo-500/10 mb-12 overflow-hidden group">
                    {/* Glossy overlay */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-10 bg-slate-950/50 p-1.5 rounded-2xl w-fit border border-white/5 backdrop-blur-md">
                        <button
                            onClick={() => setActiveTab('budget')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-500 relative ${activeTab === 'budget'
                                ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] ring-1 ring-white/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Budget Search
                        </button>
                        <button
                            onClick={() => setActiveTab('packages')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-500 relative ${activeTab === 'packages'
                                ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] ring-1 ring-white/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Holiday Packages
                        </button>
                    </div>

                    {/* Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        <div className="input-group group relative z-10">
                            <label className="text-[11px] font-bold text-indigo-300/80 uppercase tracking-widest mb-2 block transition-colors group-focus-within:text-indigo-300">From</label>
                            <div className="relative transform transition-all duration-300 group-focus-within:-translate-y-1">
                                <Plane className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="text"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    placeholder="City"
                                    className="w-full bg-slate-950/50 border border-white/5 text-white rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:bg-slate-900/80 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-slate-600 shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="input-group group relative z-10">
                            <label className="text-[11px] font-bold text-indigo-300/80 uppercase tracking-widest mb-2 block transition-colors group-focus-within:text-indigo-300">To</label>
                            <div className="relative transform transition-all duration-300 group-focus-within:-translate-y-1">
                                <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Destination"
                                    className="w-full bg-slate-950/50 border border-white/5 text-white rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:bg-slate-900/80 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-slate-600 shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="input-group group relative z-10">
                            <label className="text-[11px] font-bold text-indigo-300/80 uppercase tracking-widest mb-2 block transition-colors group-focus-within:text-indigo-300">Total Budget (₹)</label>
                            <div className="relative transform transition-all duration-300 group-focus-within:-translate-y-1">
                                <Wallet className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="number"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    placeholder="Ex: 20000"
                                    className="w-full bg-slate-950/50 border border-white/5 text-white rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:bg-slate-900/80 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-slate-600 shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="input-group group relative z-10">
                            <label className="text-[11px] font-bold text-indigo-300/80 uppercase tracking-widest mb-2 block transition-colors group-focus-within:text-indigo-300">Travelers</label>
                            <div className="relative transform transition-all duration-300 group-focus-within:-translate-y-1">
                                <Users className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="number"
                                    value={passengers}
                                    min="1"
                                    onChange={(e) => setPassengers(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-white/5 text-white rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:bg-slate-900/80 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-slate-600 shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Dates Row */}
                        <div className="input-group group md:col-span-2 relative z-10">
                            <label className="text-[11px] font-bold text-indigo-300/80 uppercase tracking-widest mb-2 block transition-colors group-focus-within:text-indigo-300">Flight Date</label>
                            <div className="relative transform transition-all duration-300 group-focus-within:-translate-y-1">
                                <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-white/5 text-white rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:bg-slate-900/80 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200 shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="input-group group md:col-span-2 relative z-10">
                            <label className="text-[11px] font-bold text-indigo-300/80 uppercase tracking-widest mb-2 block transition-colors group-focus-within:text-indigo-300">Hotel Check-in / Check-out</label>
                            <div className="grid grid-cols-2 gap-3 transform transition-all duration-300 group-focus-within:-translate-y-1">
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-white/5 text-white rounded-2xl py-3.5 px-4 focus:outline-none focus:bg-slate-900/80 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200 text-sm shadow-inner"
                                />
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="w-full bg-slate-950/50 border border-white/5 text-white rounded-2xl py-3.5 px-4 focus:outline-none focus:bg-slate-900/80 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200 text-sm shadow-inner"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="mt-10 flex justify-end">
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="w-full md:w-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-[0_4px_20px_rgba(168,85,247,0.4)] hover:shadow-[0_6px_30px_rgba(168,85,247,0.5)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 blur-md"></div>
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin w-5 h-5 relative z-10" />
                                    <span className="relative z-10">Scanning...</span>
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5 relative z-10" />
                                    <span className="relative z-10">Find Best Combinations</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Loading State with Progress */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-fade-in">
                        <div className="relative w-24 h-24">
                            <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-2 text-center">
                            <p className="text-xl font-medium text-white">{scanMessages[Math.min(scanStep, scanMessages.length - 1)]}</p>
                            <p className="text-slate-400 text-sm">Searching multiple data sources real-time...</p>
                        </div>

                        <div className="w-full max-w-md bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500"
                                style={{ width: `${(scanStep / 4) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center gap-3 mb-8 animate-fade-in">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Results */}
                {!loading && results && (
                    <div className="animate-fade-in space-y-8">

                        {/* Stats Header */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-yellow-500" />
                                Top {results.combinations.length} Deals Found
                            </h2>
                            <div className="flex gap-3">
                                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm font-medium">
                                    {results.withinBudget} within budget
                                </div>
                                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300 text-sm font-medium">
                                    {results.flights.length + results.hotels.length} options analyzed
                                </div>
                            </div>
                        </div>

                        {/* Combinations Grid */}
                        <div className="grid grid-cols-1 gap-6">
                            {results.combinations.map((combo, index) => (
                                <div key={index} className="glass-panel p-0 rounded-2xl border border-white/10 overflow-hidden hover:border-indigo-500/30 transition-all group">
                                    <div className="flex flex-col md:flex-row">

                                        {/* Hotel Image Side */}
                                        <div className="md:w-1/3 relative h-48 md:h-auto">
                                            <img
                                                src={combo.hotel.image}
                                                alt={combo.hotel.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                                                <Building2 className="w-3 h-3" />
                                                {combo.hotel.source}
                                            </div>
                                            {combo.savings > 0 && (
                                                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                    Save ₹{combo.savings.toLocaleString()}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Side */}
                                        <div className="p-6 md:w-2/3 flex flex-col justify-between relative bg-gradient-to-br from-slate-900/50 to-slate-800/50">

                                            {/* Top Section */}
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-1">{combo.hotel.name}</h3>
                                                    <div className="flex items-center text-sm text-slate-400 gap-4">
                                                        <span className="flex items-center gap-1 text-yellow-400">
                                                            ★ {combo.hotel.rating}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="w-3 h-3" /> {combo.hotel.location}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-3xl font-bold text-white tracking-tight">₹{combo.totalCost.toLocaleString()}</div>
                                                    <div className="text-xs text-emerald-400 font-medium">Total for {passengers} travelers</div>
                                                </div>
                                            </div>

                                            {/* Breakdown */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                {/* Flight Segment */}
                                                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-bold text-indigo-300 uppercase flex items-center gap-1">
                                                            <Plane className="w-3 h-3" /> {combo.flight.airline}
                                                        </span>
                                                        <span className="text-xs text-slate-400">{combo.flight.source}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <div className="text-white font-medium">{combo.flight.departure}</div>
                                                        <div className="h-[1px] bg-slate-600 flex-1 mx-3 relative">
                                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-slate-400 rounded-full"></div>
                                                        </div>
                                                        <div className="text-white font-medium">{combo.flight.arrival}</div>
                                                    </div>
                                                    <div className="mt-2 text-xs text-slate-400 flex justify-between">
                                                        <span>{combo.flight.duration}</span>
                                                        <span>{combo.flight.stops === 0 ? 'Direct' : `${combo.flight.stops} Stop`}</span>
                                                    </div>
                                                </div>

                                                {/* Hotel Segment */}
                                                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-bold text-amber-300 uppercase flex items-center gap-1">
                                                            <Wallet className="w-3 h-3" /> Cost Breakdown
                                                        </span>
                                                    </div>
                                                    <div className="space-y-1 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-400">Flights (x{passengers})</span>
                                                            <span className="text-white">₹{(combo.flight.price * passengers).toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-slate-400">Hotel Stay</span>
                                                            <span className="text-white">₹{combo.hotel.price.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Bar */}
                                            <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                                <div className="flex items-center gap-2 text-xs text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
                                                    <Sparkles className="w-3 h-3" />
                                                    AI Selection: {combo.aiReason}
                                                </div>
                                                <button className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg active:scale-95 flex items-center gap-2">
                                                    Book This Combo
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BudgetSearch;
