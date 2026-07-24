import { useState, useRef, useEffect } from "react";
import {
  Terminal,
  ChevronRight,
  RefreshCw,
  Send,
  AlertTriangle,
  Copy,
  Check,
} from "lucide-react";

export default function SessionTerminal({
  optimizedPrompt,
  setOptimizedPrompt,
  isOptimizing,
  handleOptimize,
  isExecuting,
  handleExecute,
  executeError,
  finalOutput,
  terminalEndRef,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [optimizedPrompt]);

  const handleCopy = async () => {
    if (!optimizedPrompt) return;
    try {
      await navigator.clipboard.writeText(optimizedPrompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section className="flex-1 flex flex-col relative min-h-0">
      <div className="p-3 md:p-4 border-b border-blueprint-line bg-blueprint-surface/50 flex items-center gap-2 sticky top-0 z-10 backdrop-blur-sm">
        <Terminal className="w-4 h-4 text-blueprint-muted" />
        <h2 className="text-xs md:text-sm font-semibold tracking-wide uppercase text-blueprint-muted">
          Session_Terminal
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 md:p-6 space-y-4 md:space-y-6">
        <div
          className={`space-y-2 transition-opacity duration-300 ${optimizedPrompt ? "opacity-100" : "opacity-30"}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-[10px] md:text-xs text-blueprint-azure flex items-center gap-1 uppercase">
              <ChevronRight className="w-3 h-3" /> Optimized_Command [EDITABLE]
            </span>

            {optimizedPrompt && (
              <div className="flex flex-wrap gap-2 self-end sm:self-auto">
                <button
                  onClick={handleCopy}
                  className="p-1.5 md:p-2 border border-blueprint-line text-blueprint-muted hover:text-blueprint-text hover:border-blueprint-muted transition-colors shrink-0"
                  title="Copy to clipboard"
                >
                  {isCopied ? (
                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-success" />
                  ) : (
                    <Copy className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  )}
                </button>
                <button
                  onClick={handleOptimize}
                  disabled={isOptimizing || isExecuting}
                  className="p-1.5 md:p-2 border border-blueprint-line text-blueprint-muted hover:text-blueprint-text hover:border-blueprint-muted disabled:opacity-50 transition-colors shrink-0"
                  title="Regenerate from parameters"
                >
                  <RefreshCw
                    className={`w-3 h-3 md:w-3.5 md:h-3.5 ${isOptimizing ? "animate-spin" : ""}`}
                  />
                </button>
                <button
                  onClick={handleExecute}
                  disabled={isExecuting || isOptimizing}
                  className="px-3 md:px-4 py-1.5 md:py-2 border border-blueprint-amber text-blueprint-amber hover:bg-blueprint-amber hover:text-blueprint-base disabled:opacity-50 transition-all uppercase text-[10px] tracking-widest flex items-center gap-1 md:gap-2 shrink-0"
                >
                  <Send className="w-3 h-3" />{" "}
                  {isExecuting ? "Executing..." : "Execute"}
                </button>
              </div>
            )}
          </div>

          <div className="relative group">
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-blueprint-line transition-colors group-focus-within:border-blueprint-amber" />
            <textarea
              ref={textareaRef}
              value={optimizedPrompt}
              onChange={(e) => setOptimizedPrompt(e.target.value)}
              disabled={!optimizedPrompt || isExecuting}
              className="w-full bg-blueprint-surface/50 border border-blueprint-line p-3 md:p-4 text-xs md:text-sm focus:outline-none focus:border-blueprint-amber resize-none overflow-y-auto custom-scrollbar text-blueprint-text transition-colors disabled:opacity-70 font-sans min-h-25 md:min-h-60 max-h-[70vh]"
              placeholder="Awaiting optimization sequence..."
            />
          </div>
        </div>

        {executeError && (
          <div className="p-2.5 bg-blueprint-error/10 border border-blueprint-error text-blueprint-error text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{executeError}</p>
          </div>
        )}

        {(finalOutput || isExecuting) && (
          <div
            className="pt-4 border-t border-blueprint-line font-sans text-sm md:text-[15px] leading-relaxed text-blueprint-text whitespace-pre-wrap wrap-break-word relative"
            aria-live={isExecuting ? "polite" : "off"}
            aria-busy={isExecuting}
          >
            {finalOutput}
            {isExecuting && (
              <span className="inline-block w-2 md:w-2.5 h-3.5 md:h-4 ml-1 bg-blueprint-azure animate-pulse align-middle" />
            )}
            <div ref={terminalEndRef} className="h-1 shrink-0 w-full" />
          </div>
        )}
      </div>
    </section>
  );
}
