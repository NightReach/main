import api from "./api";

export type DailyStatsParams = {
  startDate?: string;
  endDate?: string;
  campaignId?: string;
  zoneId?: string;
  websiteId?: string;
};

export async function fetchDailyStats(params: DailyStatsParams = {}) {
  const res = await api.get("/api/stats/daily", {
    params,
  });

  return res.data;
}
