export type DashboardOverviewData = Array<{
  title: string;
  data: Array<{
    title: string;
    count: number;
    difference?: number;
  }>;
}>;
