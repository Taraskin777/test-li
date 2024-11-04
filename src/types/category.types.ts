export interface ICategorySmallResponseDto {
  id: number;
  name: string;
  description: string;
}

export interface ICategory {
  items: ICategorySmallResponseDto[];
  hasNext: boolean;
  totalPages: number;
}

export interface INewCategory {
  name: string;
  description: string;
  slug: string;
}
