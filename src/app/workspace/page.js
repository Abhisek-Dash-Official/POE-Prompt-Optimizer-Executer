"use client";

import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import TokenHUD from "@/components/workspace/TokenHUD";
import OptimizerConsole from "@/components/workspace/OptimizerConsole";
import SessionTerminal from "@/components/workspace/SessionTerminal";

export default function WorkspacePage() {
    const { user, usage, updateUsage } = useAuthStore();

    // Optimizer Form State
    const [formData, setFormData] = useState({
        task: "", role: "", tone: "", format: "", constraints: "", example: ""
    });
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    // Execution State
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizeError, setOptimizeError] = useState(null);
    const [optimizedPrompt, setOptimizedPrompt] = useState("");

    const [isExecuting, setIsExecuting] = useState(false);
    const [executeError, setExecuteError] = useState(null);
    const [finalOutput, setFinalOutput] = useState("");
    const terminalEndRef = useRef(null);

    const [tokenDelta, setTokenDelta] = useState(null);

    // Auto-scroll terminal
    useEffect(() => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [finalOutput, isExecuting]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const triggerTokenFlash = (amount) => {
        if (amount > 0) {
            setTokenDelta(amount);
            setTimeout(() => setTokenDelta(null), 2500);
        }
    };

    const handleOptimize = async () => {
        if (!formData.task.trim()) return;
        setIsOptimizing(true);
        setOptimizeError(null);
        setFinalOutput("");

        try {
            const res = await fetch("/api/ai/optimize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Optimization failed.");

            setOptimizedPrompt(data.optimizedPrompt);

            if (data.usage) {
                triggerTokenFlash(data.usage.thisRequest);
                updateUsage({
                    used: data.usage.used, limit: data.usage.limit, remaining: data.usage.remaining
                });
            }
        } catch (err) {
            setOptimizeError(err.message);
        } finally {
            setIsOptimizing(false);
        }
    };

    const handleExecute = async () => {
        if (!optimizedPrompt.trim()) return;
        setIsExecuting(true);
        setExecuteError(null);
        setFinalOutput("");

        try {
            const res = await fetch("/api/ai/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: optimizedPrompt }),
            });

            const usedHeader = res.headers.get("X-Tokens-Used");
            const limitHeader = res.headers.get("X-Tokens-Limit");
            const remainingHeader = res.headers.get("X-Tokens-Remaining");

            if (usedHeader && remainingHeader && usage) {
                const newRemaining = parseInt(remainingHeader, 10);
                const cost = Math.max(0, usage.remaining - newRemaining);

                triggerTokenFlash(cost);
                updateUsage({
                    used: parseInt(usedHeader, 10), limit: parseInt(limitHeader, 10), remaining: newRemaining
                });
            }

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Execution failed.");
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                setFinalOutput((prev) => prev + chunk);
            }

        } catch (err) {
            setExecuteError(err.message);
        } finally {
            setIsExecuting(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-blueprint-base text-blueprint-text font-mono overflow-hidden">

            {/* TOP HUD Component */}
            <TokenHUD user={user} usage={usage} tokenDelta={tokenDelta} />

            {/* MAIN CONSOLE LAYOUT */}
            <main className="flex flex-col md:flex-row flex-1 overflow-hidden">

                {/* LEFT COLUMN Component */}
                <OptimizerConsole
                    formData={formData}
                    handleChange={handleChange}
                    isAdvancedOpen={isAdvancedOpen}
                    setIsAdvancedOpen={setIsAdvancedOpen}
                    isOptimizing={isOptimizing}
                    optimizeError={optimizeError}
                    handleOptimize={handleOptimize}
                />

                {/* RIGHT COLUMN Component */}
                <SessionTerminal
                    optimizedPrompt={optimizedPrompt}
                    setOptimizedPrompt={setOptimizedPrompt}
                    isOptimizing={isOptimizing}
                    handleOptimize={handleOptimize}
                    isExecuting={isExecuting}
                    handleExecute={handleExecute}
                    executeError={executeError}
                    finalOutput={finalOutput}
                    terminalEndRef={terminalEndRef}
                />
            </main>

            {/* Global Styles */}
            <style jsx global>{`
                @keyframes slideUpFade {
                0% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-20px); }
                }
                @media (min-width: 475px) { .xs\\:block { display: block; } }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                @media (min-width: 768px) { .custom-scrollbar::-webkit-scrollbar { width: 6px; } }
                .custom-scrollbar::-webkit-scrollbar-track { background: #0B1220; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #24334D; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #8CA0BF; }
            `}
            </style>
        </div>
    );
}