import { RemoteSourceResponse } from "../../../types/Source";
import { apiService } from "../../../services/RemoteClient";
import { BaseRemoteSource } from "../base/Remote";
import { DashboardOverviewData } from "../../../types/Dashboard";

export class RemoteDashboardSource extends BaseRemoteSource {
  static async getOverview(): Promise<
    RemoteSourceResponse<DashboardOverviewData>
  > {
    try {
      const dashboardOverview = await apiService.getWithAuth(
        "/dashboard/overview",
      );
      this.checkResponseCredentials(dashboardOverview);
      return dashboardOverview.data as RemoteSourceResponse<DashboardOverviewData>;
    } catch (e) {
      throw this.parseError(e);
    }
  }
}
