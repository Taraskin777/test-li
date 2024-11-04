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
