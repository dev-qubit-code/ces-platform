export interface NewsArticle {
  id: string;
  title: string;
  thumbnailUrl: string;
  date: string;
  description: string;
}

export interface CreateNewsInput {
  title: string;
  date: string;
  description: string;
  thumbnailFile: File;
}

export interface UpdateNewsInput {
  title: string;
  date: string;
  description: string;
  thumbnailFile?: File;
}

export interface NewsFormValues {
  title: string;
  date: string;
  description: string;
  thumbnailFile?: File;
}
