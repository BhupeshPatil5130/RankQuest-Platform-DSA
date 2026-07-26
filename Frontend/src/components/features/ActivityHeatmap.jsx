import { useState, useEffect, useMemo } from 'react';

/**
 * GitHub-style activity heatmap component.
 * Shows 52 weeks × 7 days of coding activity with green color gradient.
 * 100% theme adaptive for Light & Dark mode.
 */
const ActivityHeatmap = ({ heatmapData = {}, loading = false }) => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Generate 52 weeks × 7 days grid going backwards from today
  const grid = useMemo(() => {
    const weeks = [];
    const today = new Date();
    
    // Find the most recent Sunday to align the grid
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (52 * 7) + 1);

    let currentDate = new Date(startDate);
    let currentWeek = [];

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const count = heatmapData[dateStr] || 0;
      const isFuture = currentDate > today;

      currentWeek.push({
        date: dateStr,
        count: isFuture ? -1 : count,
        dayOfWeek: currentDate.getDay(),
      });

      if (currentDate.getDay() === 6 || currentDate >= endDate) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weeks;
  }, [heatmapData]);

  const getColor = (count) => {
    if (count < 0) return 'bg-transparent';
    if (count === 0) return 'bg-zinc-200 dark:bg-zinc-800/80';
    if (count <= 1) return 'bg-emerald-200 dark:bg-emerald-900/60';
    if (count <= 3) return 'bg-emerald-400 dark:bg-emerald-700';
    if (count <= 5) return 'bg-emerald-500 dark:bg-emerald-500';
    return 'bg-emerald-600 dark:bg-emerald-400';
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', '', 'Tue', '', 'Thu', '', 'Sat'];

  // Calculate month labels positions
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    grid.forEach((week, weekIdx) => {
      const firstDay = week[0];
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
          labels.push({ month: months[month], weekIdx });
          lastMonth = month;
        }
      }
    });
    return labels;
  }, [grid]);

  const totalContributions = Object.values(heatmapData).reduce((sum, count) => sum + count, 0);

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-48"></div>
          <div className="h-24 bg-zinc-100 dark:bg-zinc-950 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 shadow-sm dark:shadow-none transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Activity Overview: <span className="text-zinc-900 dark:text-white font-extrabold">{totalContributions}</span> problems solved in the last year
        </h3>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-1 ml-8">
            {monthLabels.map((label, i) => (
              <div
                key={i}
                className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400"
                style={{
                  position: 'relative',
                  left: `${label.weekIdx * 14}px`,
                  marginRight: i < monthLabels.length - 1
                    ? `${(monthLabels[i + 1]?.weekIdx - label.weekIdx) * 14 - 30}px`
                    : 0
                }}
              >
                {label.month}
              </div>
            ))}
          </div>

          <div className="flex gap-[2px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[2px] mr-1 justify-start">
              {days.map((day, i) => (
                <div key={i} className="h-[12px] flex items-center">
                  <span className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 w-6 text-right">{day}</span>
                </div>
              ))}
            </div>

            {/* Grid */}
            {grid.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[2px]">
                {week.map((day, dayIdx) => (
                  <div
                    key={day.date}
                    className={`w-[12px] h-[12px] rounded-[2px] ${getColor(day.count)} transition-all duration-200 ${
                      mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    } ${day.count >= 0 ? 'hover:ring-1 hover:ring-indigo-500 cursor-pointer' : ''}`}
                    style={{
                      transitionDelay: mounted ? `${(weekIdx * 7 + dayIdx) * 1}ms` : '0ms',
                    }}
                    onMouseEnter={() => day.count >= 0 && setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    title={day.count >= 0 ? `${day.count} problem${day.count !== 1 ? 's' : ''} on ${day.date}` : ''}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">
            <span>Less</span>
            <div className="w-[10px] h-[10px] rounded-[2px] bg-zinc-200 dark:bg-zinc-800/80"></div>
            <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-200 dark:bg-emerald-900/60"></div>
            <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-400 dark:bg-emerald-700"></div>
            <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-500 dark:bg-emerald-500"></div>
            <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-600 dark:bg-emerald-400"></div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
