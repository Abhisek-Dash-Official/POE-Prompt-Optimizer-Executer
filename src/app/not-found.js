import Link from "next/link";
import { Terminal, AlertTriangle, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col grow items-center justify-center bg-blueprint-base relative py-24 min-h-[80vh]">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#24334D_1px,transparent_1px),linear-gradient(to_bottom,#24334D_1px,transparent_1px)] bg-size-[64px_64px] z-0"></div>

            <div className="relative z-10 w-full max-w-lg mx-auto px-6 text-center">

                {/* Error Icon & Status */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-blueprint-surface border border-blueprint-error/50 flex items-center justify-center rounded-sm corner-brackets text-blueprint-error">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                </div>

                {/* 404 Heading */}
                <h1 className="text-7xl md:text-8xl font-bold font-mono tracking-tighter text-blueprint-text mb-4 drop-shadow-md">
                    404
                </h1>

                {/* Sub-text */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blueprint-error/10 border border-blueprint-error/30 mb-6 font-mono text-xs text-blueprint-error uppercase tracking-wider">
                    <Terminal className="w-3.5 h-3.5" />
                    ERR_MODULE_NOT_FOUND
                </div>

                <p className="text-blueprint-muted leading-relaxed mb-10 text-sm md:text-base">
                    The requested path does not exist in the current directory tree. The sector might be corrupted, moved, or deleted.
                </p>

                {/* Action Button */}
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 corner-brackets bg-blueprint-surface border border-blueprint-line px-6 py-3 text-sm font-medium text-blueprint-text hover:border-blueprint-azure hover:text-blueprint-azure transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-azure"
                >
                    <ArrowLeft className="w-4 h-4" /> Return to Root Directory
                </Link>
            </div>
        </div>
    );
}