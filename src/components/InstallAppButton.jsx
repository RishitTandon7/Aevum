import React, { useEffect, useState } from 'react';
import { Download, CheckCircle2, Smartphone } from 'lucide-react';

const isStandalone = () => (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
);

const InstallAppButton = ({ compact = false }) => {
    const [promptEvent, setPromptEvent] = useState(null);
    const [installed, setInstalled] = useState(isStandalone());

    useEffect(() => {
        const handleBeforeInstall = (event) => {
            event.preventDefault();
            setPromptEvent(event);
        };
        const handleInstalled = () => {
            setInstalled(true);
            setPromptEvent(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstall);
        window.addEventListener('appinstalled', handleInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
            window.removeEventListener('appinstalled', handleInstalled);
        };
    }, []);

    const install = async () => {
        if (!promptEvent) return;
        promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice.outcome === 'accepted') setInstalled(true);
        setPromptEvent(null);
    };

    if (installed) {
        return (
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-200 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Installed
            </div>
        );
    }

    if (!promptEvent) {
        return (
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold">
                <Smartphone className="w-4 h-4 text-indigo-300" />
                Install ready
            </div>
        );
    }

    return (
        <button
            onClick={install}
            className={`items-center justify-center gap-2 rounded-full font-bold transition-all active:scale-95 ${compact
                ? 'flex px-3 py-2 text-xs bg-indigo-600 text-white hover:bg-indigo-500'
                : 'hidden md:flex px-4 py-2 text-sm bg-white text-slate-900 hover:bg-indigo-50 shadow-lg shadow-indigo-500/10'
                }`}
        >
            <Download className="w-4 h-4" />
            <span className={compact ? 'hidden sm:inline' : ''}>Install App</span>
        </button>
    );
};

export default InstallAppButton;
