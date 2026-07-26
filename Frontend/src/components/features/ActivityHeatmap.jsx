import { useState, useEffect, useMemo } from 'react';

/**
 * GitHub-style activity heatmap component.
 * Shows 52 weeks × 7 days of coding activity with green color gradient.
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
    if (count === 0) return 'bg-[#161b22]';
    if (count <= 1) return 'bg-[#0e4429]';
    if (count <= 3) return 'bg-[#006d32]';
    if (count <= 5) return 'bg-[#26a641]';
    return 'bg-[#39d353]';
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
      <div className="p-6 rounded-2xl bg-card/50 border border-white/5">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-white/10 rounded w-48"></div>
          <div className="h-24 bg-white/5 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-card/50 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          <span className="text-foreground font-semibold">{totalContributions}</span> problems solved in the last year
        </h3>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-1 ml-8">
            {monthLabels.map((label, i) => (
              <div
                key={i}
                className="text-[10px] text-muted-foreground"
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
                  <span className="text-[10px] text-muted-foreground w-6 text-right">{day}</span>
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
                    } ${day.count >= 0 ? 'hover:ring-1 hover:ring-white/30 cursor-pointer' : ''}`}
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
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1 mt-3">
        <span className="text-[10px] text-muted-foreground mr-1">Less</span>
        <div className="w-[12px] h-[12px] rounded-[2px] bg-[#161b22]"></div>
        <div className="w-[12px] h-[12px] rounded-[2px] bg-[#0e4429]"></div>
        <div className="w-[12px] h-[12px] rounded-[2px] bg-[#006d32]"></div>
        <div className="w-[12px] h-[12px] rounded-[2px] bg-[#26a641]"></div>
        <div className="w-[12px] h-[12px] rounded-[2px] bg-[#39d353]"></div>
        <span className="text-[10px] text-muted-foreground ml-1">More</span>
      </div>

      {/* Hover tooltip */}
      {hoveredDay && (
        <div className="mt-2 text-xs text-muted-foreground text-center">
          <span className="text-foreground font-medium">{hoveredDay.count}</span> problem{hoveredDay.count !== 1 ? 's' : ''} solved on{' '}
          <span className="text-foreground">{new Date(hoveredDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      )}
    </div>
  );
};

export default ActivityHeatmap;
