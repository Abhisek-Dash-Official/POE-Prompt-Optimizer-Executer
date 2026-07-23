import { Terminal, ShieldCheck, Scale, AlertTriangle } from "lucide-react";

export const metadata = {
    title: "Legal & Privacy",
    description: "System terms of service and privacy protocols for POE.",
};

export default function LegalPage() {
    const lastUpdated = "July 24, 2026";

    return (
        <div className="flex flex-col min-h-screen bg-blueprint-base">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#24334D_1px,transparent_1px),linear-gradient(to_bottom,#24334D_1px,transparent_1px)] bg-size-[64px_64px] z-0"></div>

            <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 w-full">

                {/* Header */}
                <div className="mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blueprint-surface border border-blueprint-line mb-6 font-mono text-xs text-blueprint-azure uppercase tracking-wider">
                        <Terminal className="w-3.5 h-3.5" />
                        Compliance_Protocols.md
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blueprint-text mb-4">
                        Legal & Privacy
                    </h1>
                    <p className="text-blueprint-muted font-mono text-sm">
                        LAST_MODIFIED: {lastUpdated} // SYS_STATUS: ACTIVE
                    </p>
                </div>

                <div className="space-y-16">

                    {/* Section 1: Privacy Protocol */}
                    <section>
                        <div className="flex items-center gap-3 mb-8 border-b border-blueprint-line pb-4">
                            <ShieldCheck className="w-6 h-6 text-blueprint-success" />
                            <h2 className="text-2xl font-bold text-blueprint-text">Privacy Protocol (Data Handling)</h2>
                        </div>

                        <div className="space-y-6 text-blueprint-muted text-sm leading-relaxed">
                            <div className="bg-blueprint-surface/50 border border-blueprint-line p-6 corner-brackets">
                                <h3 className="text-blueprint-text font-bold mb-2">1. Transient Data Processing</h3>
                                <p>
                                    POE operates as a real-time middleware optimization layer. Your raw inputs are processed in-memory to generate the master prompt, sent to the execution engine (Groq/Llama), and immediately discarded from our active processing nodes once the stream is complete.
                                </p>
                            </div>

                            <div className="bg-blueprint-surface/50 border border-blueprint-line p-6 corner-brackets">
                                <h3 className="text-blueprint-text font-bold mb-2">2. Zero Model Training Policy</h3>
                                <p>
                                    We absolutely do not use your inputs, optimized prompts, or generated outputs to train, fine-tune, or improve any proprietary or third-party Large Language Models. Your intellectual property remains exclusively yours.
                                </p>
                            </div>

                            <div className="bg-blueprint-surface/50 border border-blueprint-line p-6 corner-brackets">
                                <h3 className="text-blueprint-text font-bold mb-2">3. Third-Party Sub-Processors</h3>
                                <p>
                                    To provide our dual-engine architecture, data is temporarily routed through Google Gemini (Optimization Layer) and Groq (Execution Layer). Both engines are constrained by enterprise agreements that prohibit them from logging or training on your API transmissions.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Terms of Service */}
                    <section>
                        <div className="flex items-center gap-3 mb-8 border-b border-blueprint-line pb-4">
                            <Scale className="w-6 h-6 text-blueprint-azure" />
                            <h2 className="text-2xl font-bold text-blueprint-text">Terms of Service (System Usage)</h2>
                        </div>

                        <div className="space-y-6 text-blueprint-muted text-sm leading-relaxed">
                            <div className="bg-blueprint-surface/50 border border-blueprint-line p-6 corner-brackets">
                                <h3 className="text-blueprint-text font-bold mb-2">1. Acceptable Use & Rate Limiting</h3>
                                <p>
                                    Access to the POE workspace is provided strictly for lawful, non-malicious tasks. To maintain system stability and zero-latency execution, we enforce algorithmic rate limiting. Attempting to bypass these limits via automated scripts (DDoS, prompt spamming) will result in immediate IP and account suspension.
                                </p>
                            </div>

                            <div className="bg-blueprint-surface/50 border border-blueprint-line p-6 corner-brackets">
                                <div className="flex items-center gap-2 mb-2 text-blueprint-amber">
                                    <AlertTriangle className="w-4 h-4" />
                                    <h3 className="text-blueprint-text font-bold">2. Output Liability & Hallucinations</h3>
                                </div>
                                <p>
                                    While our optimization layer drastically reduces LLM hallucinations, AI is inherently probabilistic. POE does not guarantee 100% factual accuracy. You are solely responsible for reviewing, verifying, and testing any code, text, or data generated by the execution layer before deploying it in production environments.
                                </p>
                            </div>

                            <div className="bg-blueprint-surface/50 border border-blueprint-line p-6 corner-brackets">
                                <h3 className="text-blueprint-text font-bold mb-2">3. Service Availability ("As Is")</h3>
                                <p>
                                    The system is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We reserve the right to modify, suspend, or terminate the service (or any part thereof) at any time without prior notice due to upstream API outages, server maintenance, or hardware upgrades.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}