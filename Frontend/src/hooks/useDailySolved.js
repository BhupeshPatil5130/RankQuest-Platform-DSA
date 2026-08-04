// src/hooks/useDailySolved.js
// Provides real-time daily solved count and streak derived from heatmap + profile data.

import { useState, useEffect, useCallback } from 'react';
import { getActivityHeatmap, getSolvedProblems, getGlobalRankings } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

const formatLocalKey = (d = new Date()) => {
  const year  = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day   = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const todayKey = () => formatLocalKey(new Date());

/**
 * Computes the current streak from a heatmap object { "YYYY-MM-DD": count }
 */
const computeStreak = (heatmap) => {
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = formatLocalKey(d);
    if (heatmap[key] && heatmap[key] > 0) {
      streak++;
    } else if (i > 0) {
      // allow missing today (haven't solved yet today)
      break;
    }
  }
  return streak;
};

export const useDailySolved = () => {
  const { user, isAuthenticated } = useAuth();
  const [solvedToday, setSolvedToday] = useState(0);
  const [streak, setStreak]           = useState(0);
  const [totalSolved, setTotalSolved] = useState(0);
  const [globalRank, setGlobalRank]   = useState(null);
  const [loading, setLoading]         = useState(true);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    try {
      const [heatmapRaw, solvedIds, rankings] = await Promise.allSettled([
        getActivityHeatmap(),
        getSolvedProblems(),
        getGlobalRankings(),
      ]);

      // -- Daily solved --
      const hm = {};
      if (heatmapRaw.status === 'fulfilled' && Array.isArray(heatmapRaw.value)) {
        heatmapRaw.value.forEach(i => { if (i.date) hm[i.date] = i.count || 1; });
      } else if (heatmapRaw.status === 'fulfilled' && typeof heatmapRaw.value === 'object' && heatmapRaw.value) {
        Object.assign(hm, heatmapRaw.value);
      }
      setSolvedToday(hm[todayKey()] || 0);
      setStreak(user?.streakDays ?? computeStreak(hm));

      // -- Total solved --
      if (solvedIds.status === 'fulfilled' && Array.isArray(solvedIds.value)) {
        setTotalSolved(solvedIds.value.length);
      }

      // -- Global rank --
      if (rankings.status === 'fulfilled' && Array.isArray(rankings.value)) {
        const idx = rankings.value.findIndex(
          r => r.email === user?.email || r.username === user?.username
        );
        if (idx !== -1) setGlobalRank(idx + 1);
      }
    } catch (err) {
      console.warn('useDailySolved error:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { solvedToday, streak, totalSolved, globalRank, loading, refresh };
};
