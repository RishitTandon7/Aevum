import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Globe, Menu, UserCircle, Sparkles } from 'lucide-react';

const MainLayout = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isBudget = location.pathname === '/budget';
    const isTransparentPage = isHome || isBudget;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-800">

            {/* Modern Floating Header */}
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || !isTransparentPage
                    ? 'bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm py-3'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <NavLink to="/" className="group flex items-center gap-2">
                            <div className={`p-2 rounded-xl transition-all duration-300 ${scrolled || !isTransparentPage ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/10 backdrop-blur-md text-white border border-white/20'}`}>
                                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </div>
                            <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled || !isTransparentPage ? 'text-slate-900' : 'text-white'}`}>
                                Aevum
                            </span>
                        </NavLink>

                        {/* Desktop Nav - Centered Pills */}
                        <nav className={`hidden md:flex items-center p-1.5 rounded-full transition-all duration-300 ${scrolled || !isTransparentPage ? 'bg-slate-100/50 border border-slate-200/50' : 'bg-white/10 border border-white/10 backdrop-blur-md'}`}>
                            {['Home', 'Budget & Packages', 'Hotels', 'Flights'].map((item) => {
                                const path = item === 'Home' ? '/' : item === 'Budget & Packages' ? '/budget' : `/${item.toLowerCase()}`;
                                return (
                                    <NavLink
                                        key={item}
                                        to={path}
                                        className={({ isActive }) => `
                                            px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                                            ${isActive
                                                ? 'bg-white text-indigo-600 shadow-sm font-bold'
                                                : (scrolled || !isTransparentPage
                                                    ? 'text-slate-500 hover:text-indigo-600 hover:bg-white/50'
                                                    : 'text-white/80 hover:text-white hover:bg-white/10')
                                            }
                                        `}
                                    >
                                        {item}
                                    </NavLink>
                                );
                            })}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button className={`hidden md:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all ${scrolled || !isTransparentPage
                                ? 'text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
                                : 'text-white/90 hover:bg-white/10 border border-transparent hover:border-white/20'
                                }`}>
                                <span>INR</span>
                            </button>
                            <button className={`
                                flex items-center gap-2 pl-2 pr-4 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0
                                ${scrolled || !isTransparentPage
                                    ? 'bg-slate-900 text-white hover:bg-indigo-600 shadow-slate-900/10 hover:shadow-indigo-500/20'
                                    : 'bg-white text-indigo-600 hover:bg-indigo-50'}
                            `}>
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                    <UserCircle className="w-4 h-4" />
                                </div>
                                <span>Sign In</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Modern Minimal Footer */}
            <footer className="bg-white border-t border-slate-100 pt-20 pb-10 relative overflow-hidden">
                {/* Footer Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>

                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12 mb-12 relative z-10">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">Aevum</span>
                        </div>
                        <p className="text-slate-500 mb-8 leading-relaxed pr-8">
                            Reimagining travel with AI. We combine cutting-edge technology with premium design to curate the perfect journey for you.
                        </p>
                        <div className="flex gap-4">
                            {['twitter', 'linkedin', 'instagram'].map((social) => (
                                <div key={social} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-indigo-500/30">
                                    <span className="capitalize text-xs">{social[0]}n</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Press</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Support</h4>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Safety</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Cancellation</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Sitemap</a></li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto px-6 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 gap-4">
                    <p>© 2026 Aevum. All rights reserved.</p>
                    <div className="flex gap-6 font-medium">
                        <span className="hover:text-slate-600 cursor-pointer transition-colors">English (IN)</span>
                        <span className="hover:text-slate-600 cursor-pointer transition-colors">INR</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
