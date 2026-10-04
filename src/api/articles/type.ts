import type {TPaginationResponse} from '../type';

export type TArticlesParams = {
  search?: string;
  page: number;
  pageSize: number;
};

export interface ArticleApiResponse {
  id: string;
  title: string;
  thumbnailUrl: string;
  date: string;
  description: string;
}

export interface CreateArticleApiRequest {
  title: string;
  date: string;
  description: string;
  thumbnail: File;
}

export interface UpdateArticleApiRequest {
  title: string;
  date: string;
  description: string;
  thumbnail?: File;
}

export type ArticlesApiPageResponse = TPaginationResponse<ArticleApiResponse>;
