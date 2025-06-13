type MutateChannelParams = FormData;

interface UpdateChannelParams {
  channel_id: string;
  name: string;
}

interface ChannelResponse {
  id: string;
  name: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  articles_count: number;
  is_favorited: boolean;
}

interface CreatePostParams {
  content: string;
  channel_id: string;
  title: string;
  image: string | null;
  caption: string;
  status: "draft" | "published";
}

interface ArticleResponse {
  id: string;
  channel_id: number;
  title: string;
  content: string;
  caption: string;
  image?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  channel: Channel;
  reactions: any[];
  reactions_count: any[];
  status: "draft" | "published";
  is_bookmarked?: boolean;
}
// Define the pagination data structure
interface PaginationData {
  current_page: number;
  data: ChannelResponse[];
  first_page_url: string | null;
  from: number | null;
  last_page: number;
  last_page_url: string | null;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

// Define the full API response structure
interface PaginatedResponse {
  message: string;
  status: number;
  data: PaginationData;
}

interface PagesType {
  pages: PaginatedResponse[];
  pageParams: number[];
}
