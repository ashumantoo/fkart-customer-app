export interface ICategoryState {
  allCategories: ISimpleCategory[];
  categories: ICategory[];
  category: ICategory;
}

export interface ISimpleCategory {
  _id: string;
  name: string;
  slug: string;
  parentId: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  parentId: string;
  imageUrl: string;
  subCategories: ICategory[];
}

export interface ICategoryData {
  _id: string;
  imageUrl: string;
  name: string;
  slug: string;
  parent: string;
  parentId: string;
}

export interface IGetCategoriesApiResponse {
  success: boolean;
  categories: ICategory[]
}

export enum CATEGORY_SLICE_TYPE_ENUM {
  CREATE_CATEGORY = "CREATE_CATEGORY",
  GET_CATEGORIES = "GET_CATEGORIES",
  GET_CATEGORY = "GET_CATEGORY",
  UPDATE_CATEGORY = "UPDATE_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY"
}

export enum MEDIA_FOLDER_NAME {
  CATEGORIES = 'categories',
  PRODUCTS = 'products'
}