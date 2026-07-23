import { Terminal, HelpCircle, ChevronRight } from "lucide-react";
import { faqs } from "@/config/faq"

export const metadata = {
    title: "FAQ",
    description: "Frequently asked questions about the POE system architecture and capabilities.",
};

export default function FAQPage() {
    return (
        <div className="flex flex-col min-h-screen bg-blueprint-base">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#24334D_1px,transparent_1px),linear-gradient(to_bottom,#24334D_1px,transparent_1px)] bg-size-[64px_64px] z-0"></div>

            <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 w-full">

                {/* Header */}
                <div className="mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blueprint-surface border border-blueprint-line mb-6 font-mono text-xs text-blueprint-azure uppercase tracking-wider">
                        <Terminal className="w-3.5 h-3.5" />
                        Query_Index.log
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blueprint-text mb-6">
                        System FAQs
                    </h1>
                    <p className="text-lg text-blueprint-muted leading-relaxed">
                        Technical specifications, operational capabilities, and general queries regarding the Prompt Optimizer and Executor architecture.
                    </p>
                </div>

                {/* FAQ Grid / List */}
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-blueprint-surface/50 border border-blueprint-line p-6 lg:p-8 corner-brackets hover:border-blueprint-azure/50 transition-colors group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1 shrink-0 text-blueprint-azure">
                                    <HelpCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-blueprint-text mb-3 flex items-center gap-2">
                                        {faq.question}
                                    </h3>
                                    <div className="flex gap-3">
                                        <div className="mt-1.5 shrink-0 text-blueprint-line group-hover:text-blueprint-azure/40 transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                        <p className="text-blueprint-muted leading-relaxed text-sm">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}