export interface ICartState {
  cartItems: ICartItem;
}

export interface ICartItem {
  [key: string]: IItem;
}

export interface IItem {
  _id: string;
  name: string;
  image: string;
  sellingPrice: number;
  maxRetailPrice: number;
  quantity: number;
}