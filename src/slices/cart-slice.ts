import { createSlice } from "@reduxjs/toolkit";
import { ICartState } from "../types/cart-types";

const cartInitialState: ICartState = {
  cartItems: {}
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addToCart: (state, action) => {
      const qty = state.cartItems[action.payload._id] ? state.cartItems[action.payload._id].quantity + 1 : 1;
      state.cartItems[action.payload._id] = {
        ...action.payload,
        quantity: qty
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    setCartItems: (state) => {
      const cart = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart') || ""):null;
      if (cart) {
        state.cartItems = cart;
      }
    }
  },
  extraReducers: () => { }
});

export const { addToCart, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;