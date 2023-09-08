import { RemoteDashboardSource } from "../source/dashboard/Remote";

export class DashboardRepository {
  static async getOverview() {
    return await RemoteDashboardSource.getOverview();
  }
}
