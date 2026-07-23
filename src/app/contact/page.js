import { Terminal, Mail, MapPin } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons"

export const metadata = {
    title: "Contact",
    description: "Communication channels and system contact information.",
};

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-blueprint-base">
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#24334D_1px,transparent_1px),linear-gradient(to_bottom,#24334D_1px,transparent_1px)] bg-size-[64px_64px] z-0"></div>

            <div className="max-w-3xl mx-auto px-6 py-24 relative z-10 w-full">

                <div className="mb-12">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blueprint-surface border border-blueprint-line mb-6 font-mono text-xs text-blueprint-azure uppercase tracking-wider">
                        <Terminal className="w-3.5 h-3.5" />
                        Ping_System.sh
                    </span>
                    <h1 className="text-4xl font-bold tracking-tight text-blueprint-text mb-4">
                        Initialize Connection
                    </h1>
                    <p className="text-blueprint-muted leading-relaxed">
                        We do not use generic contact forms. If you wish to report a bug, request a feature, or discuss architecture, please use the verified channels below.
                    </p>
                </div>

                <div className="space-y-6 font-mono">

                    {/* Email Channel */}
                    <div className="bg-blueprint-surface/50 border border-blueprint-line p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 corner-brackets hover:border-blueprint-azure transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blueprint-base border border-blueprint-line flex items-center justify-center text-blueprint-muted group-hover:text-blueprint-azure transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-xs text-blueprint-muted uppercase tracking-wider mb-1">Primary Protocol</span>
                                <span className="text-blueprint-text text-sm">hello@example.com</span>
                            </div>
                        </div>
                        <a href="mailto:hello@example.com" className="text-xs text-blueprint-azure border border-blueprint-azure/30 bg-blueprint-azure/5 px-3 py-1.5 hover:bg-blueprint-azure/10 transition-colors w-fit">
                            SEND EMAIL
                        </a>
                    </div>

                    {/* Location Channel */}
                    <div className="bg-blueprint-surface/50 border border-blueprint-line p-6 flex items-center gap-4 corner-brackets hover:border-blueprint-azure transition-colors group">
                        <div className="w-10 h-10 bg-blueprint-base border border-blueprint-line flex items-center justify-center text-blueprint-muted group-hover:text-blueprint-azure transition-colors">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="block text-xs text-blueprint-muted uppercase tracking-wider mb-1">Server Location</span>
                            <span className="text-blueprint-text text-sm">Odisha, India</span>
                        </div>
                    </div>

                    {/* GitHub Channel */}
                    <div className="bg-blueprint-surface/50 border border-blueprint-line p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 corner-brackets hover:border-blueprint-azure transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blueprint-base border border-blueprint-line flex items-center justify-center text-blueprint-muted group-hover:text-blueprint-azure transition-colors">
                                <GithubIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-xs text-blueprint-muted uppercase tracking-wider mb-1">Source Control</span>
                                <span className="text-blueprint-text text-sm">@Abhisek-Dash</span>
                            </div>
                        </div>
                        <a href="https://github.com/Abhisek-Dash-Official" target="_blank" rel="noreferrer" className="text-xs text-blueprint-azure border border-blueprint-azure/30 bg-blueprint-azure/5 px-3 py-1.5 hover:bg-blueprint-azure/10 transition-colors w-fit">
                            VIEW REPO
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}