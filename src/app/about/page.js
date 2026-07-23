import Image from "next/image";
import { Terminal, Cpu, Target } from "lucide-react";
import { members } from "@/config/members";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "@/components/ui/Icons"

export const metadata = {
    title: "About",
    description: "The architecture and vision behind POE (Prompt Optimizer & Executor).",
};

export default function AboutPage() {
    const founder = members[0];

    return (
        <div className="flex flex-col min-h-screen bg-blueprint-base">
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#24334D_1px,transparent_1px),linear-gradient(to_bottom,#24334D_1px,transparent_1px)] bg-size-[64px_64px] z-0"></div>

            <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 w-full">
                <div className="mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blueprint-surface border border-blueprint-line mb-6 font-mono text-xs text-blueprint-azure uppercase tracking-wider">
                        <Terminal className="w-3.5 h-3.5" />
                        System_Manifesto.md
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blueprint-text mb-6">
                        Engineering precision into AI interactions.
                    </h1>
                    <p className="text-lg text-blueprint-muted leading-relaxed">
                        LLMs are powerful, but human language is ambiguous. POE was built to bridge this gap. We don&apos;t just send text to an AI; we compile human intent into strict, parameter-driven master prompts that guarantee structured, professional outputs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                    <div className="bg-blueprint-surface/50 border border-blueprint-line p-6 corner-brackets">
                        <Cpu className="w-6 h-6 text-blueprint-azure mb-4" />
                        <h3 className="font-bold text-blueprint-text mb-2">Deterministic Outputs</h3>
                        <p className="text-sm text-blueprint-muted">
                            By forcing inputs through an optimization layer, we reduce hallucinations and keep the execution model strictly on task.
                        </p>
                    </div>
                    <div className="bg-blueprint-surface/50 border border-blueprint-line p-6 corner-brackets">
                        <Target className="w-6 h-6 text-blueprint-azure mb-4" />
                        <h3 className="font-bold text-blueprint-text mb-2">Zero-Latency Execution</h3>
                        <p className="text-sm text-blueprint-muted">
                            Optimized prompts are worthless if execution is slow. We leverage LPU hardware to stream results faster than you can read them.
                        </p>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-blueprint-line grow"></div>
                        <span className="font-mono text-xs text-blueprint-muted uppercase tracking-widest">
                            System Architect
                        </span>
                        <div className="h-px bg-blueprint-line grow"></div>
                    </div>

                    <div className="bg-blueprint-surface border border-blueprint-line rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                        <div className="relative w-full md:w-64 h-64 md:h-auto border-b md:border-b-0 md:border-r border-blueprint-line bg-blueprint-base shrink-0">
                            <Image
                                src={founder.image}
                                alt={founder.name}
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#24334D_1px,transparent_1px),linear-gradient(to_bottom,#24334D_1px,transparent_1px)] bg-size-[16px_16px] opacity-20 pointer-events-none"></div>
                        </div>

                        <div className="p-8 flex flex-col justify-center">
                            <span className="font-mono text-xs text-blueprint-azure mb-2 uppercase tracking-wider block">
                                {founder.role}
                            </span>
                            <h2 className="text-2xl font-bold text-blueprint-text mb-4">
                                {founder.name}
                            </h2>
                            <p className="text-blueprint-muted text-sm leading-relaxed mb-6 max-w-md">
                                {founder.bio}
                            </p>

                            <div className="flex items-center gap-4">
                                {founder.github && (
                                    <a href={founder.github} target="_blank" rel="noreferrer" className="text-blueprint-muted hover:text-blueprint-text transition-colors">
                                        <GithubIcon className="w-5 h-5" />
                                    </a>
                                )}
                                {founder.twitter && (
                                    <a href={founder.twitter} target="_blank" rel="noreferrer" className="text-blueprint-muted hover:text-blueprint-azure transition-colors">
                                        <TwitterIcon className="w-5 h-5" />
                                    </a>
                                )}
                                {founder.linkedin && (
                                    <a href={founder.linkedin} target="_blank" rel="noreferrer" className="text-blueprint-muted hover:text-[#0077B5] transition-colors">
                                        <LinkedinIcon className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}