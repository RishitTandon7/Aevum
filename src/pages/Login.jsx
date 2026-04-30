import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../AuthContext';

const Login = () => {
    const { login, signup } = useAuth();
    const navigate = useNavigate();
    const [mode, setMode] = useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const submit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (mode === 'signup') await signup(name, email, password);
            else await login(email, password);
            navigate('/flights');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 bg-slate-950 text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-900/80 border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-indigo-600 p-2 rounded-xl">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{mode === 'signup' ? 'Create account' : 'Welcome back'}</h1>
                        <p className="text-sm text-slate-400">Sign in to book and pay securely.</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-5 bg-red-500/10 border border-red-500/40 text-red-200 p-3 rounded-xl flex gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        {error}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    {mode === 'signup' && (
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Full name"
                            />
                        </div>
                    )}
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Email"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 rounded-xl py-3 font-bold flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {mode === 'signup' ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                <button
                    onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                    className="w-full mt-5 text-sm text-indigo-300 hover:text-indigo-200"
                >
                    {mode === 'signup' ? 'Already have an account? Sign in' : 'New here? Create an account'}
                </button>
            </div>
        </div>
    );
};

export default Login;
