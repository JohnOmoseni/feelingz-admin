interface DasboardUserCountType {
  total: number;
  Active: number;
  Pending: number;
  Suspended: number;
}

interface DashboardOverviewResponse {
  user: DasboardUserCountType;
  "total chats": number;
  "total reactions": number;
  "total posts": number;
  "total bookmarks": number;
}
