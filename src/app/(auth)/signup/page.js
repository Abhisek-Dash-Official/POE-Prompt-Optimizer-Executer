"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Terminal, UserPlus, AlertTriangle, Loader2, Check } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        avatar_id: "0"
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Generate array [0, 1, ..., 20] for avatars
    const avatars = Array.from({ length: 21 }, (_, i) => i.toString());

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const handleAvatarSelect = (id) => {
        setFormData({ ...formData, avatar_id: id });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed.");
            }

            router.push("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blueprint-base flex items-center justify-center relative py-12 px-4 sm:px-6">
            {/* Background grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#24334D_1px,transparent_1px),linear-gradient(to_bottom,#24334D_1px,transparent_1px)] bg-size-[64px_64px] z-0"></div>

            <div className="relative z-10 w-full max-w-xl bg-blueprint-surface/80 border border-blueprint-line p-6 sm:p-8 corner-brackets backdrop-blur-sm">

                <div className="mb-6 sm:mb-8">
                    <span className="inline-flex items-center gap-2 px-2 py-1 bg-blueprint-azure/10 border border-blueprint-azure/30 font-mono text-xs text-blueprint-azure uppercase tracking-wider mb-4">
                        <Terminal className="w-3.5 h-3.5" />
                        New_Identity
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-blueprint-text">Register Account</h1>
                    <p className="text-blueprint-muted text-xs sm:text-sm mt-2 font-mono">
                        Create a new account for system access.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-blueprint-error/10 border border-blueprint-error/50 flex items-start gap-3 text-blueprint-error text-xs sm:text-sm">
                        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-mono text-blueprint-muted uppercase tracking-wider">Username</label>
                            <input
                                type="text"
                                name="username"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full bg-blueprint-base border border-blueprint-line p-3 text-blueprint-text focus:outline-none focus:border-blueprint-azure focus:ring-1 focus:ring-blueprint-azure transition-all font-mono text-sm"
                                placeholder="username here"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-mono text-blueprint-muted uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-blueprint-base border border-blueprint-line p-3 text-blueprint-text focus:outline-none focus:border-blueprint-azure focus:ring-1 focus:ring-blueprint-azure transition-all font-mono text-sm"
                                placeholder="user@gmail.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-mono text-blueprint-muted uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            minLength={6}
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-blueprint-base border border-blueprint-line p-3 text-blueprint-text focus:outline-none focus:border-blueprint-azure focus:ring-1 focus:ring-blueprint-azure transition-all font-mono text-sm"
                            placeholder="Min 6 characters"
                        />
                    </div>

                    {/* Avatar Selector */}
                    <div className="space-y-3 pt-2">
                        <label className="text-xs font-mono text-blueprint-muted uppercase tracking-wider flex items-center justify-between">
                            Select Avatar
                            <span className="text-blueprint-azure">ID: {formData.avatar_id}</span>
                        </label>

                        <div
                            className="grid grid-cols-4 sm:grid-cols-6 gap-3 max-h-56 overflow-y-auto p-3 bg-blueprint-base border border-blueprint-line"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#24334D #0B1220'
                            }}
                        >
                            {avatars.map((id) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => handleAvatarSelect(id)}
                                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${formData.avatar_id === id
                                        ? "border-blueprint-azure scale-105 shadow-[0_0_12px_rgba(59,130,246,0.6)] z-10"
                                        : "border-blueprint-line/40 hover:border-blueprint-azure/50 opacity-80 hover:opacity-100"
                                        }`}
                                >
                                    <Image
                                        src={`/avatars/avatar-${id}.png`}
                                        alt={`Avatar ${id}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 25vw, 15vw"
                                    />
                                    {formData.avatar_id === id && (
                                        <div className="absolute inset-0 bg-blueprint-azure/30 flex items-center justify-center">
                                            <Check className="w-5 h-5 text-white drop-shadow-md" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 flex items-center justify-center gap-2 bg-blueprint-azure/10 border border-blueprint-azure p-3 text-blueprint-azure hover:bg-blueprint-azure hover:text-white transition-all font-mono text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                        {loading ? "Allocating Identity..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-6 text-center border-t border-blueprint-line pt-6">
                    <p className="text-blueprint-muted text-xs sm:text-sm font-mono">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blueprint-azure hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}