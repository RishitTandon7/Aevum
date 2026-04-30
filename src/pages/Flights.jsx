import React, { useState } from 'react';
import { Plane, Calendar, Users, Search, ArrowRight, Clock, ShieldCheck, Zap, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { startCheckout } from '../payments';

const Flights = () => {
    const [from, setFrom] = useState('Mumbai');
    const [to, setTo] = useState('Delhi');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [passengers, setPassengers] = useState(1);
    const [loading, setLoading] = useState(false);
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user, isAuthenticated, authFetch } = useAuth();
    const navigate = useNavigate();

    const searchFlights = async () => {
        if (!from || !to) {
            setError("Please enter origin and destination");
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');
        setFlights([]);

        try {
            const queryParams = new URLSearchParams({ from, to, date, passengers });
            const response = await fetch(`http://localhost:3001/api/search/flights?${queryParams}`);
            const data = await response.json();

            if (data.success) {
                setFlights(data.data);
            } else {
                setError(data.error || 'Failed to fetch flights');
            }
        } catch (err) {
            setError('Failed to connect to flight servers');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const bookFlight = async (flight) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        setError('');
        setSuccess('');
        try {
            const result = await startCheckout({
                authFetch,
                user,
                amount: flight.price * passengers,
                description: `${flight.airline} ${flight.from} to ${flight.to}`,
                bookingType: 'flight'
            });
            setSuccess(`Booking confirmed: ${result.bookingId}${result.mode === 'mock' ? ' (dev payment mode)' : ''}`);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white selection:bg-indigo-500 selection:text-white">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-5xl">

                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-blue-200">
                        Find Best Flights
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Real-time price comparison across <span className="text-white font-semibold">Skyscanner, Google Flights, and 50+ airlines</span>.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-white/5 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="input-group group relative">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block ml-1">From</label>
                            <div className="relative">
                                <Plane className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="text"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-slate-500"
                                    placeholder="Origin City"
                                />
                            </div>
                        </div>

                        <div className="input-group group relative">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block ml-1">To</label>
                            <div className="relative">
                                <Plane className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors rotate-90" />
                                <input
                                    type="text"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-slate-500"
                                    placeholder="Destination City"
                                />
                            </div>
                        </div>

                        <div className="input-group group relative">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={searchFlights}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white py-3.5 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Search />}
                                Search Flights
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-fade-in">
                        <Loader2 className="w-16 h-16 text-indigo-400 animate-spin" />
                        <p className="text-xl font-medium text-slate-300">Scanning airline databases...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center gap-3 mb-8 animate-fade-in">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {success && (
                    <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-200 p-4 rounded-xl flex items-center gap-3 mb-8 animate-fade-in">
                        <ShieldCheck className="w-5 h-5 shrink-0" />
                        <p>{success}</p>
                    </div>
                )}

                {/* Results Grid */}
                {!loading && flights.length > 0 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center px-2">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-yellow-400" />
                                {flights.length} Flights Found
                            </h2>
                            <span className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">
                                Sorted by Best Value
                            </span>
                        </div>

                        {flights.map((flight) => (
                            <div key={flight.id} className="glass-panel p-0 rounded-2xl border border-white/10 overflow-hidden hover:border-indigo-500/30 transition-all group bg-slate-900/40 hover:bg-slate-800/60">
                                <div className="p-6 flex flex-col md:flex-row items-center gap-6">

                                    {/* Airline Info */}
                                    <div className="flex items-center gap-4 min-w-[180px]">
                                        <div className="w-12 h-12 rounded-full bg-white p-2 shadow-lg flex items-center justify-center">
                                            {flight.logo ? (
                                                <img src={flight.logo} alt={flight.airline} className="w-full h-full object-contain" />
                                            ) : (
                                                <Plane className="text-slate-800 w-6 h-6" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{flight.airline}</h3>
                                            <p className="text-xs text-slate-400">{flight.flightNumber}</p>
                                        </div>
                                    </div>

                                    {/* Flight Timeline */}
                                    <div className="flex-1 flex items-center justify-center gap-6 w-full md:w-auto">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-white">{flight.departure}</div>
                                            <div className="text-xs text-slate-400">{flight.from}</div>
                                        </div>

                                        <div className="flex flex-col items-center flex-1 max-w-[200px]">
                                            <div className="text-xs text-slate-400 mb-1">{flight.duration}</div>
                                            <div className="w-full h-[2px] bg-slate-600 relative flex items-center justify-center">
                                                <div className="w-2 h-2 bg-indigo-500 rounded-full absolute left-0"></div>
                                                <div className="w-2 h-2 bg-indigo-500 rounded-full absolute right-0"></div>
                                                <Plane className="w-4 h-4 text-indigo-400 absolute rotate-90" />
                                            </div>
                                            <div className="text-xs text-emerald-400 mt-1 font-medium">
                                                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop`}
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-white">{flight.arrival}</div>
                                            <div className="text-xs text-slate-400">{flight.to}</div>
                                        </div>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="flex flex-col items-end gap-2 min-w-[140px] w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                                        <div className="text-right">
                                            <p className="text-xs text-slate-400 mb-1">per person</p>
                                            <p className="text-3xl font-bold text-white">₹{flight.price.toLocaleString()}</p>
                                        </div>
                                        <button onClick={() => bookFlight(flight)} className="w-full md:w-auto bg-white text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                            Book Now
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <p className="text-[10px] text-slate-500 flex items-center gap-1">
                                            via {flight.source}
                                        </p>
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

export default Flights;
