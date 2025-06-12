interface MutateChannelParams {
  name: string;
  image: any;
}

// Define the pagination data structure
interface PaginationData {
  current_page: number;
  data: ArticleType[];
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

interface Channel {
  id: number;
  name: string;
  image?: string;
  is_favorited?: boolean;
  created_at?: string;
  updated_at?: string;
}
