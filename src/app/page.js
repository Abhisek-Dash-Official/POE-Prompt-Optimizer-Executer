"use client";

import Link from "next/link";
import { ArrowRight, Terminal, Cpu, Zap, CheckCircle2, Sliders, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-28 px-6 border-b border-blueprint-line overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#24334D_1px,transparent_1px),linear-gradient(to_bottom,#24334D_1px,transparent_1px)] bg-size-[64px_64px]"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blueprint-surface border border-blueprint-line mb-6 font-mono text-xs text-blueprint-azure">
            <span className="w-1.5 h-1.5 rounded-full bg-blueprint-azure animate-ping"></span>
            PROMPT OPTIMIZER & EXECUTOR ARCHITECTURE
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-blueprint-text mb-6 leading-[1.1]">
            Stop typing brute-force prompts. <br />
            <span className="text-blueprint-azure font-mono">Engineer the output.</span>
          </h1>

          <p className="text-lg md:text-xl text-blueprint-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            LLMs fail when given vague instructions. POE transforms your casual, unstructured text into a highly constrained master prompt, then executes it at lightning speed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/workspace"
              className="corner-brackets w-full sm:w-auto bg-blueprint-azure text-blueprint-base px-8 py-4 font-semibold hover:bg-blueprint-azure/90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blueprint-azure/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-azure"
            >
              Initialize Workspace <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto bg-blueprint-surface border border-blueprint-line text-blueprint-text px-8 py-4 font-medium hover:border-blueprint-azure transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-azure"
            >
              View Architecture
            </a>
          </div>

          {/* MINI-DEMO TRANSFORM PREVIEW */}
          <div className="max-w-4xl mx-auto w-full bg-blueprint-surface border border-blueprint-line rounded-xl p-4 md:p-8 text-left shadow-2xl corner-brackets overflow-hidden">

            <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-blueprint-line">
              <div className="flex items-center gap-2 font-mono text-xs text-blueprint-muted min-w-0">
                <Terminal className="w-4 h-4 shrink-0 text-blueprint-azure" />
                <span>TRANSFORMATION_PREVIEW</span>
              </div>
              <div className="hidden sm:flex gap-1.5 shrink-0">
                <span className="w-3 h-3 rounded-full bg-blueprint-line"></span>
                <span className="w-3 h-3 rounded-full bg-blueprint-line"></span>
                <span className="w-3 h-3 rounded-full bg-blueprint-azure/40"></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Raw Input Box */}
              <div className="bg-blueprint-base/60 p-4 border border-blueprint-line rounded-lg flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-blueprint-muted uppercase block mb-3 tracking-wider">
                    [01] Raw User Input
                  </span>
                  <div className="space-y-2 text-sm font-mono text-blueprint-muted italic">
                    &quot;give me a diet plan to lose weight. i don&apos;t have much time to cook. make it easy and healthy.&quot;
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-blueprint-line/50 text-xs font-mono text-blueprint-error">
                  Status: High ambiguity, lacks parameters
                </div>
              </div>

              {/* Optimized Master Prompt Box */}
              <div className="bg-blueprint-base/60 p-4 border border-blueprint-azure/40 rounded-lg flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blueprint-azure/10 text-blueprint-azure px-2 py-0.5 text-[10px] font-mono border-b border-l border-blueprint-azure/30">
                  ENGINED BY GEMINI
                </div>
                <div>
                  <span className="text-xs font-mono text-blueprint-amber uppercase block mb-3 tracking-wider">
                    [02] POE Master Prompt
                  </span>
                  <p className="text-[11px] leading-relaxed text-blueprint-text font-mono">
                    <span className="text-blueprint-amber">[ROLE]:</span> Certified Clinical Nutritionist & Meal Prep Coach.<br /><br />
                    <span className="text-blueprint-amber">[CONTEXT]:</span> User seeks a caloric deficit for weight loss but has severe time constraints for daily cooking.<br /><br />
                    <span className="text-blueprint-amber">[TASK]:</span> Design a 7-day time-efficient, high-protein meal plan.<br /><br />
                    <span className="text-blueprint-amber">[CONSTRAINTS]:</span><br />
                    - No recipe may exceed 15 mins prep time.<br />
                    - Affordable ingredients.<br />
                    - Include exact macronutrient estimates.<br /><br />
                    <span className="text-blueprint-amber">[FORMAT]:</span><br />
                    1. Categorized Grocery List<br />
                    2. Daily Schedule (Table)
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-blueprint-line/50 text-xs font-mono text-blueprint-success flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">Ready for LPU Execution</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS (Architecture Pipeline) */}
      <section id="how-it-works" className="py-24 px-6 border-b border-blueprint-line bg-blueprint-base">
        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-blueprint-azure tracking-widest uppercase block mb-3">
              SYSTEM PIPELINE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-blueprint-text">
              How the Dual-Engine Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-blueprint-surface border border-blueprint-line p-8 rounded-xl relative group hover:border-blueprint-azure transition-colors">
              <span className="text-4xl font-mono font-bold text-blueprint-line group-hover:text-blueprint-azure/40 transition-colors absolute top-6 right-6">
                01
              </span>
              <div className="w-12 h-12 bg-blueprint-base border border-blueprint-line flex items-center justify-center text-blueprint-azure mb-6 rounded-lg">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blueprint-text mb-3">Input Parameters</h3>
              <p className="text-blueprint-muted text-sm leading-relaxed">
                Provide your core task. Optionally define role, tone, format, and explicit constraints to guide the system.
              </p>
            </div>

            <div className="bg-blueprint-surface border border-blueprint-line p-8 rounded-xl relative group hover:border-blueprint-azure transition-colors">
              <span className="text-4xl font-mono font-bold text-blueprint-line group-hover:text-blueprint-azure/40 transition-colors absolute top-6 right-6">
                02
              </span>
              <div className="w-12 h-12 bg-blueprint-base border border-blueprint-line flex items-center justify-center text-blueprint-azure mb-6 rounded-lg">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blueprint-text mb-3">Optimization Layer</h3>
              <p className="text-blueprint-muted text-sm leading-relaxed">
                Our reasoning engine processes your input through advanced prompt engineering templates to build a Master Prompt.
              </p>
            </div>

            <div className="bg-blueprint-surface border border-blueprint-line p-8 rounded-xl relative group hover:border-blueprint-azure transition-colors">
              <span className="text-4xl font-mono font-bold text-blueprint-line group-hover:text-blueprint-azure/40 transition-colors absolute top-6 right-6">
                03
              </span>
              <div className="w-12 h-12 bg-blueprint-base border border-blueprint-line flex items-center justify-center text-blueprint-azure mb-6 rounded-lg">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blueprint-text mb-3">Real-Time Execution</h3>
              <p className="text-blueprint-muted text-sm leading-relaxed">
                The optimized prompt is instantly executed by a high-speed inference model, streaming the final structured output to you.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 px-6 bg-blueprint-surface/40">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono text-blueprint-azure tracking-widest uppercase block mb-3">
                DESIGN THINKING ADVANTAGE
              </span>
              <h2 className="text-3xl font-bold text-blueprint-text mb-6">
                Built for everyone who wants precise AI outputs.
              </h2>
              <p className="text-blueprint-muted leading-relaxed mb-8">
                Most AI tools hide the prompt engineering layer, leaving you guessing why results fluctuate. POE exposes the intermediate transformation so you maintain absolute control over the instructions sent to the executor.
              </p>

              <ul className="space-y-4 font-mono text-sm text-blueprint-text">
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-blueprint-success" /> Eliminates AI hallucinations via strict structural constraints
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-blueprint-success" /> Enterprise-grade session security and account privacy
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-blueprint-success" /> Zero-lag real-time execution streaming
                </li>
              </ul>
            </div>

            {/* Performance Specs */}
            <div className="bg-blueprint-base border border-blueprint-line p-8 rounded-2xl corner-brackets">
              <div className="font-mono text-xs text-blueprint-muted mb-4 uppercase tracking-wider">
                User Impact // Performance
              </div>
              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-blueprint-line">
                  <span className="text-blueprint-muted">Output Quality</span>
                  <span className="text-blueprint-azure">Professional-Grade</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blueprint-line">
                  <span className="text-blueprint-muted">AI Guesswork</span>
                  <span className="text-blueprint-azure">Completely Eliminated</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blueprint-line">
                  <span className="text-blueprint-muted">Formatting Match</span>
                  <span className="text-blueprint-azure">100% Precise</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-blueprint-muted">Wait Time</span>
                  <span className="text-blueprint-azure">Instant (Real-Time)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}