import { Flame, Trophy, TrendingUp } from 'lucide-react';

/**
 * Streak display component showing current and max streak
 * with fire animation effects.
 */
const StreakDisplay = ({ currentStreak = 0, maxStreak = 0, totalActiveDays = 0 }) => {
  const isOnFire = currentStreak >= 3;

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Current Streak */}
      <div className="relative p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 overflow-hidden group">
        <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full blur-xl -mr-6 -mt-6 group-hover:bg-orange-500/10 transition-colors"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-lg bg-orange-500/20 ${isOnFire ? 'animate-pulse' : ''}`}>
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-xs font-medium text-orange-400/70 uppercase tracking-wider">Current Streak</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-orange-400">{currentStreak}</span>
            <span className="text-sm text-orange-400/60">days</span>
          </div>
          {isOnFire && (
            <div className="mt-2 text-[10px] text-orange-400/80 flex items-center gap-1">
              🔥 You're on fire! Keep going!
            </div>
          )}
        </div>
      </div>

      {/* Max Streak */}
      <div className="relative p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 overflow-hidden group">
        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full blur-xl -mr-6 -mt-6 group-hover:bg-purple-500/10 transition-colors"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20">
              <Trophy className="w-4 h-4 text-purple-500" />
            </div>
            <span className="text-xs font-medium text-purple-400/70 uppercase tracking-wider">Max Streak</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-purple-400">{maxStreak}</span>
            <span className="text-sm text-purple-400/60">days</span>
          </div>
          {currentStreak >= maxStreak && maxStreak > 0 && (
            <div className="mt-2 text-[10px] text-purple-400/80 flex items-center gap-1">
              ⭐ Personal best!
            </div>
          )}
        </div>
      </div>

      {/* Total Active Days */}
      <div className="relative p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 overflow-hidden group">
        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl -mr-6 -mt-6 group-hover:bg-emerald-500/10 transition-colors"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-xs font-medium text-emerald-400/70 uppercase tracking-wider">Active Days</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-emerald-400">{totalActiveDays}</span>
            <span className="text-sm text-emerald-400/60">total</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakDisplay;
