export interface ICartState {
  cartItems: ICartItem[];
}

export interface ICartItem {
  _id: string;
  name: string;
  image: string;
  sellingPrice: number;
  maxRetailPrice: number;
  quantity: number;
}

export interface ICartItemInput {
  cartItems: IItemInput[];
}

export interface IItemInput {
  product: string;
  quantity: number;
}

export type GetCartItemsApiResponse = {
  cartItems: ICartItem[];
}

export enum CART_SLICE_TYPE_ENUM {
  ADD_TO_CART = "ADD_TO_CART",
  GET_CART_ITEMS = "GET_CART_ITEMS",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM"
}