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