import { Activity } from "lucide-react";

export default function TokenHUD({ user, usage, tokenDelta }) {
  const getHealthColor = () => {
    if (!usage) return "#8CA0BF";
    const ratio = usage.remaining / usage.limit;
    if (ratio < 0.2) return "#F45B69"; // Critical (Error)
    if (ratio < 0.5) return "#F5A623"; // Warning (Amber)
    return "#4CC2FF"; // Nominal (Accent)
  };

  const healthColor = getHealthColor();
  const progressPercent = usage ? (usage.remaining / usage.limit) * 100 : 0;

  return (
    <header className="flex-none border-b border-blueprint-line bg-blueprint-surface px-3 md:px-4 py-2 flex items-center justify-between text-[10px] md:text-xs tracking-wider z-10">
      <div className="flex items-center gap-2 md:gap-4">
        <span className="flex items-center gap-1.5 md:gap-2 text-blueprint-muted">
          <Activity className="w-3.5 h-3.5 text-blueprint-azure" />
          <span className="hidden sm:inline">[POE_SYS]</span>
        </span>
        <span className="text-blueprint-muted">
          <span className="hidden sm:inline">USER: </span>
          <span className="text-blueprint-text truncate max-w-20 md:max-w-xs inline-block align-bottom">
            {user?.username || "GUEST"}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-3 relative">
        <span className="text-blueprint-muted hidden sm:inline">
          TOKENS LEFT:
        </span>
        <span className="text-blueprint-muted sm:hidden">TOKENS:</span>

        {usage === null ? (
          <span className="text-blueprint-muted animate-pulse">
            [ AWAITING ]
          </span>
        ) : (
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden xs:block w-12 sm:w-24 md:w-32 h-1.5 bg-blueprint-base overflow-hidden rounded-full">
              <div
                className="h-full transition-all duration-1000 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: healthColor,
                }}
              />
            </div>
            <span
              className="w-12 md:w-16 text-right font-bold transition-colors duration-500"
              style={{ color: healthColor }}
            >
              {usage.remaining.toLocaleString()}
            </span>

            {tokenDelta && (
              <span className="absolute -bottom-4 right-0 text-blueprint-amber font-bold animate-[slideUpFade_2s_ease-out_forwards]">
                -{tokenDelta}
              </span>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
