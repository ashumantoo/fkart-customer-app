import { GetCartItemsApiResponse, ICartItem, ICartItemInput } from '../types/cart-types';
import axios from '../utils/axios';

export default {
  addToCart: (data: ICartItemInput) => axios.post('/consumer/cart/addtocart', data),
  getCartItems: () => axios.get<GetCartItemsApiResponse>('/consumer/cart/getcartitems')
}