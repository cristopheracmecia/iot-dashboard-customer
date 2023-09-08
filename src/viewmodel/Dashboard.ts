import { useState } from "react";
import { AppState, TaskState } from "../data/domain/State";
import { DashboardOverviewData } from "../types/Dashboard";
import { DashboardRepository } from "../data/repository/Dashboard";

export function useDashboardViewModel() {
  const [fetchOverviewState, setFetchOverviewState] =
    useState<AppState<boolean> | null>(null);
  const [overviewData, setOverviewData] =
    useState<DashboardOverviewData | null>(null);

  async function fetchOverview() {
    if (fetchOverviewState?.loading) return;
    setFetchOverviewState(TaskState.loading());
    try {
      const data = await DashboardRepository.getOverview();
      if (data.ok) {
        setOverviewData(data.data!!);
        setFetchOverviewState(TaskState.success(true));
      } else setFetchOverviewState(TaskState.error(new Error(data.message!!)));
    } catch (error: any) {
      setFetchOverviewState(TaskState.error(error));
    }
  }

  function onFetchOverviewStateReceived() {
    setFetchOverviewState(null);
  }

  return {
    fetchOverviewState,
    fetchOverview,
    overviewData,
    onFetchOverviewStateReceived,
  };
}
