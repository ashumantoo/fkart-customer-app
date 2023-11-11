import { createSlice } from "@reduxjs/toolkit";
import { ICartState } from "../types/cart-types";

const cartInitialState: ICartState = {
  cartItems: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addToCart: (state, action) => {
      const foundItemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id);
      if (foundItemIndex > -1) {
        //update quantity
        state.cartItems[foundItemIndex].quantity += 1;
      } else {
        //push to the array
        state.cartItems.push(action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    setCartItems: (state) => {
      const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || "") : null;
      if (cart) {
        state.cartItems = cart;
      }
    },
    increaseCartItemQty: (state, action) => {
      const foundItemIndex = state.cartItems.findIndex((item) => item._id === action.payload);
      if (foundItemIndex > -1) {
        state.cartItems[foundItemIndex].quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    decreaseCartItemQty: (state, action) => {
      const foundItemIndex = state.cartItems.findIndex((item) => item._id === action.payload);
      if (foundItemIndex > -1) {
        state.cartItems[foundItemIndex].quantity -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    }
  },
  extraReducers: () => { }
});

export const { addToCart, setCartItems, increaseCartItemQty, decreaseCartItemQty } = cartSlice.actions;

export default cartSlice.reducer;