import { useState, useEffect } from 'react';

/**
 * CSS-only donut chart showing Easy/Medium/Hard problem distribution.
 * No external charting library needed.
 */
const StatsDonutChart = ({ easy = 0, medium = 0, hard = 0 }) => {
  const [animated, setAnimated] = useState(false);
  const total = easy + medium + hard;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate stroke percentages for the ring chart
  const circumference = 2 * Math.PI * 54; // radius = 54
  const easyPct = total > 0 ? (easy / total) * 100 : 0;
  const mediumPct = total > 0 ? (medium / total) * 100 : 0;
  const hardPct = total > 0 ? (hard / total) * 100 : 0;

  const easyDash = (easyPct / 100) * circumference;
  const mediumDash = (mediumPct / 100) * circumference;
  const hardDash = (hardPct / 100) * circumference;

  const easyOffset = 0;
  const mediumOffset = -easyDash;
  const hardOffset = -(easyDash + mediumDash);

  return (
    <div className="flex items-center gap-8">
      {/* Donut Chart */}
      <div className="relative w-32 h-32 flex-shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background ring */}
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-white/5"
          />
          {total > 0 && (
            <>
              {/* Easy (green) */}
              <circle
                cx="60" cy="60" r="54"
                fill="none"
                stroke="#10b981"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${animated ? easyDash : 0} ${circumference}`}
                strokeDashoffset={easyOffset}
                className="transition-all duration-1000 ease-out"
              />
              {/* Medium (yellow) */}
              <circle
                cx="60" cy="60" r="54"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${animated ? mediumDash : 0} ${circumference}`}
                strokeDashoffset={animated ? mediumOffset : 0}
                className="transition-all duration-1000 ease-out delay-200"
              />
              {/* Hard (red) */}
              <circle
                cx="60" cy="60" r="54"
                fill="none"
                stroke="#ef4444"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${animated ? hardDash : 0} ${circumference}`}
                strokeDashoffset={animated ? hardOffset : 0}
                className="transition-all duration-1000 ease-out delay-500"
              />
            </>
          )}
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{total}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Solved</span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-muted-foreground">Easy</span>
          </div>
          <span className="text-sm font-semibold text-emerald-500">{easy}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-sm text-muted-foreground">Medium</span>
          </div>
          <span className="text-sm font-semibold text-amber-500">{medium}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-muted-foreground">Hard</span>
          </div>
          <span className="text-sm font-semibold text-red-500">{hard}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsDonutChart;
