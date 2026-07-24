"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Terminal, ArrowRight, AlertTriangle, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
    const router = useRouter();
    const { checkSession } = useAuthStore();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Authentication failed.");
            }

            await checkSession();

            router.push("/workspace");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blueprint-base flex items-center justify-center relative px-6">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#24334D_1px,transparent_1px),linear-gradient(to_bottom,#24334D_1px,transparent_1px)] bg-size-[64px_64px] z-0"></div>

            <div className="relative z-10 w-full max-w-md bg-blueprint-surface/80 border border-blueprint-line p-8 corner-brackets backdrop-blur-sm">

                <div className="mb-8">
                    <span className="inline-flex items-center gap-2 px-2 py-1 bg-blueprint-azure/10 border border-blueprint-azure/30 font-mono text-xs text-blueprint-azure uppercase tracking-wider mb-4">
                        <Terminal className="w-3.5 h-3.5" />
                        Auth_Gateway
                    </span>
                    <h1 className="text-3xl font-bold text-blueprint-text">System Login</h1>
                    <p className="text-blueprint-muted text-sm mt-2 font-mono">
                        Enter credentials to access the workspace.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-blueprint-error/10 border border-blueprint-error/50 flex items-start gap-3 text-blueprint-error text-sm">
                        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-mono text-blueprint-muted uppercase tracking-wider">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-blueprint-base border border-blueprint-line p-3 text-blueprint-text focus:outline-none focus:border-blueprint-azure focus:ring-1 focus:ring-blueprint-azure transition-all font-mono text-sm"
                            placeholder="user@system.com"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-mono text-blueprint-muted uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-blueprint-base border border-blueprint-line p-3 text-blueprint-text focus:outline-none focus:border-blueprint-azure focus:ring-1 focus:ring-blueprint-azure transition-all font-mono text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 flex items-center justify-center gap-2 bg-blueprint-azure/10 border border-blueprint-azure p-3 text-blueprint-azure hover:bg-blueprint-azure hover:text-white transition-all font-mono text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                        {loading ? "Authenticating..." : "Initialize Session"}
                    </button>
                </form>

                <div className="mt-6 text-center border-t border-blueprint-line pt-6">
                    <p className="text-blueprint-muted text-sm font-mono">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-blueprint-azure hover:underline">
                            Create One
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}