import {
  Cpu,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  Zap,
} from "lucide-react";

export default function OptimizerConsole({
  formData,
  handleChange,
  isAdvancedOpen,
  setIsAdvancedOpen,
  isOptimizing,
  optimizeError,
  handleOptimize,
}) {
  return (
    <section className="w-full md:w-80 lg:w-100 flex-none border-b md:border-b-0 md:border-r border-blueprint-line bg-blueprint-base flex flex-col max-h-[45vh] md:max-h-none overflow-y-auto custom-scrollbar">
      <div className="p-3 md:p-4 border-b border-blueprint-line bg-blueprint-surface/50 flex items-center gap-2 sticky top-0 z-10 backdrop-blur-sm">
        <Cpu className="w-4 h-4 text-blueprint-muted" />
        <h2 className="text-xs md:text-sm font-semibold tracking-wide uppercase text-blueprint-muted">
          Optimizer_Console
        </h2>
      </div>

      <div className="p-3 md:p-4 space-y-4 md:space-y-6">
        <div className="space-y-2 group">
          <label
            htmlFor="task"
            className="text-xs text-blueprint-azure flex items-center gap-1 uppercase"
          >
            <ChevronRight className="w-3 h-3" /> Target_Task [REQ]
          </label>
          <div className="relative">
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-blueprint-azure/50 transition-opacity group-focus-within:border-blueprint-azure" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-blueprint-azure/50 transition-opacity group-focus-within:border-blueprint-azure" />
            <textarea
              id="task"
              name="task"
              rows={3}
              required
              value={formData.task}
              onChange={handleChange}
              className="w-full bg-blueprint-surface border border-blueprint-line p-3 text-xs md:text-sm focus:outline-none focus:border-blueprint-azure resize-none text-blueprint-text placeholder-blueprint-line transition-colors"
              placeholder="Define the primary objective..."
            />
          </div>
        </div>

        <div className="border border-blueprint-line bg-blueprint-surface/30">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="w-full p-2.5 md:p-3 flex items-center justify-between text-[10px] md:text-xs text-blueprint-muted hover:text-blueprint-text hover:bg-blueprint-line/50 transition-colors uppercase tracking-wider"
          >
            <span className="flex items-center gap-2">
              {isAdvancedOpen ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
              Advanced_Telemetry
            </span>
          </button>

          {isAdvancedOpen && (
            <div className="p-3 pt-0 space-y-3 border-t border-blueprint-line">
              {["role", "tone", "format", "constraints", "example"].map(
                (field) => (
                  <div key={field} className="space-y-1.5">
                    <label
                      htmlFor={field}
                      className="text-[9px] md:text-[10px] text-blueprint-muted uppercase tracking-wider"
                    >
                      {field}
                    </label>
                    <input
                      id={field}
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full bg-blueprint-base border border-blueprint-line p-2 text-xs focus:outline-none focus:border-blueprint-azure text-blueprint-text"
                    />
                  </div>
                ),
              )}
            </div>
          )}
        </div>

        {optimizeError && (
          <div className="p-2.5 bg-blueprint-error/10 border border-blueprint-error/30 text-blueprint-error text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{optimizeError}</p>
          </div>
        )}

        <button
          onClick={handleOptimize}
          disabled={isOptimizing || !formData.task.trim()}
          className="w-full py-3 bg-blueprint-azure/10 border border-blueprint-azure text-blueprint-azure hover:bg-blueprint-azure hover:text-blueprint-base disabled:opacity-50 disabled:hover:bg-blueprint-azure/10 disabled:hover:text-blueprint-azure disabled:cursor-not-allowed transition-all uppercase text-[10px] md:text-xs tracking-wider flex items-center justify-center gap-2 font-bold"
        >
          {isOptimizing ? (
            <span className="animate-pulse">Optimizing...</span>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5" /> Initiate_Optimization
            </>
          )}
        </button>
      </div>
    </section>
  );
}
