import type {TPaginationResponse} from '../type';
import type {CreateNewsInput, NewsArticle, UpdateNewsInput} from '@/feature/news/type';
import type {ArticleApiResponse, ArticlesApiPageResponse, CreateArticleApiRequest, UpdateArticleApiRequest} from './type';

export function articleApiToClient(article: ArticleApiResponse): NewsArticle {
  return {
    id: article.id,
    title: article.title,
    thumbnailUrl: article.thumbnailUrl,
    date: article.date,
    description: article.description
  };
}

export function articlesPageApiToClient(page: ArticlesApiPageResponse): TPaginationResponse<NewsArticle> {
  return {
    ...page,
    items: page.items.map(articleApiToClient)
  };
}

export function createNewsInputToApi(input: CreateNewsInput): CreateArticleApiRequest {
  return {title: input.title, date: input.date, description: input.description, thumbnail: input.thumbnailFile};
}

export function updateNewsInputToApi(input: UpdateNewsInput): UpdateArticleApiRequest {
  return {
    title: input.title,
    date: input.date,
    description: input.description,
    ...(input.thumbnailFile ? {thumbnail: input.thumbnailFile} : {})
  };
}

// export function articleRequestToFormData(request: CreateArticleApiRequest | UpdateArticleApiRequest): FormData {
//   const formData = new FormData();
//   formData.append('title', request.title);
//   formData.append('description', request.description);
//   formData.append('date', request.date);
//   if (request.thumbnail) formData.append('thumbnail', request.thumbnail);
//   return formData;
// }