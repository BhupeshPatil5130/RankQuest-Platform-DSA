import { useState, useEffect, useMemo } from 'react';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['Sun','','Tue','','Thu','','Sat'];

const getColor = (count) => {
  if (count < 0)  return 'bg-transparent';
  if (count === 0) return 'bg-slate-200 dark:bg-slate-700/80';
  if (count <= 1)  return 'bg-emerald-200 dark:bg-emerald-800';
  if (count <= 3)  return 'bg-emerald-400 dark:bg-emerald-600';
  if (count <= 5)  return 'bg-emerald-500 dark:bg-emerald-500';
  return 'bg-emerald-600 dark:bg-emerald-400';
};

export default function ActivityHeatmap({ heatmapData = {}, loading = false }) {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [mounted,    setMounted]    = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  const grid = useMemo(() => {
    const weeks = [];
    const today = new Date();
    const endDate   = new Date(today);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 52 * 7 + 1);

    let cur  = new Date(startDate);
    let week = [];
    while (cur <= endDate) {
      const year  = cur.getFullYear();
      const month = String(cur.getMonth() + 1).padStart(2, '0');
      const day   = String(cur.getDate()).padStart(2, '0');
      const ds    = `${year}-${month}-${day}`;
      const count = heatmapData[ds] || 0;
      week.push({ date: ds, count: cur > today ? -1 : count, day: cur.getDay() });
      if (cur.getDay() === 6 || cur >= endDate) { weeks.push([...week]); week = []; }
      cur.setDate(cur.getDate() + 1);
    }
    return weeks;
  }, [heatmapData]);

  const monthLabels = useMemo(() => {
    const labels = []; let last = -1;
    grid.forEach((week, wi) => {
      const fd = week[0];
      if (!fd) return;
      const m = new Date(fd.date).getMonth();
      if (m !== last) { labels.push({ month: MONTHS[m], wi }); last = m; }
    });
    return labels;
  }, [grid]);

  const total = Object.values(heatmapData).reduce((a, b) => a + b, 0);

  if (loading) return (
    <div className="space-y-3">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-48 animate-pulse" />
      <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span className="text-slate-900 dark:text-white font-extrabold text-sm">{total}</span> problems solved in the last year
        </p>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-1 ml-7">
            {monthLabels.map((l, i) => (
              <div key={i}
                className="text-[10px] font-semibold text-slate-500 dark:text-slate-400"
                style={{
                  position: 'relative',
                  left: `${l.wi * 14}px`,
                  marginRight: i < monthLabels.length - 1
                    ? `${(monthLabels[i+1]?.wi - l.wi) * 14 - 28}px` : 0,
                }}>
                {l.month}
              </div>
            ))}
          </div>

          <div className="flex gap-[2px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[2px] mr-1">
              {DAYS.map((d, i) => (
                <div key={i} className="h-[12px] flex items-center">
                  <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 w-5 text-right">{d}</span>
                </div>
              ))}
            </div>

            {/* Grid cells */}
            {grid.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[2px]">
                {week.map((day, di) => (
                  <div key={day.date}
                    className={`w-[12px] h-[12px] rounded-[2px] ${getColor(day.count)} transition-all duration-150
                      ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                      ${day.count >= 0 ? 'hover:ring-2 hover:ring-indigo-500 hover:ring-offset-1 hover:ring-offset-white dark:hover:ring-offset-slate-950 cursor-pointer' : ''}`}
                    style={{ transitionDelay: mounted ? `${(wi * 7 + di) * 1}ms` : '0ms' }}
                    onMouseEnter={() => day.count >= 0 && setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    title={day.count >= 0 ? `${day.count} problem${day.count !== 1 ? 's' : ''} on ${day.date}` : ''}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-2 text-[10px] font-semibold text-slate-500">
            <span>Less</span>
            {['bg-slate-200 dark:bg-slate-700/80','bg-emerald-200 dark:bg-emerald-800','bg-emerald-400 dark:bg-emerald-600','bg-emerald-500','bg-emerald-600 dark:bg-emerald-400'].map((cls, i) => (
              <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${cls}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
          {hoveredDay.count} problem{hoveredDay.count !== 1 ? 's' : ''} on {hoveredDay.date}
        </div>
      )}
    </div>
  );
}
