import { ICategory } from "./category-types";
import { IUser } from "./user-types";

export interface IProductState {
  products: IProduct[];
  product: IProduct;
  // productsByPrice: IProductByPrice;
  productsByPrice: any;
}

export interface IProductInput {
  name: string;
  description: string;
  maxRetailPrice: number | string;
  sellingPrice: number | string;
  quantity: number;
  category: string | ICategory;
  status: ProductStatus;
  productImages: string[];
}

export interface IProduct extends IProductInput {
  _id: string;
  slug: string;
  reviews: IReview[];
}

export interface IReview {
  user: IUser;
  review: string;
}

export enum ProductStatus {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "IN_ACTIVE"
}

export interface IProductByPrice {
  under5k: IProduct[];
  under10k: IProduct[];
  under15k: IProduct[];
  under20k: IProduct[];
  under30k: IProduct[];
}

export type ProductListApiResponse = {
  success: boolean;
  products: IProduct[];
  productsByPrice: IProductByPrice;
}


export enum PRODUCT_SLICE_TYPE_ENUM {
  GET_PRODUCT_LIST = "GET_PRODUCT_LIST"
}