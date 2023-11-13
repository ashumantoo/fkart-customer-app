import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CART_SLICE_TYPE_ENUM, ICartItem, ICartItemInput, ICartState, IItemInput } from "../types/cart-types";
import cartApi from "../api/cart-api";
import { AxiosError } from "axios";

const cartInitialState: ICartState = {
  cartItems: []
}

export const _addToCart = createAsyncThunk(
  CART_SLICE_TYPE_ENUM.ADD_TO_CART,
  async (items: ICartItem[], { rejectWithValue }) => {
    try {
      console.log("333333333------", items);
      const _cartData: IItemInput[] = items.map((item) => ({
        product: item._id,
        quantity: item.quantity
      }));
      console.log("44444444--------", _cartData);
      const response = await cartApi.addToCart({ cartItems: _cartData });
      if (response) {
        const _response = await cartApi.getCartItems();
        localStorage.removeItem('cart');
        return _response.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

export const _getCartItems = createAsyncThunk(
  CART_SLICE_TYPE_ENUM.GET_CART_ITEMS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.getCartItems();
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

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
    resetCartItems: (state) => {
      state.cartItems = [];
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
  extraReducers: (builder) => {
    builder.addCase(_getCartItems.fulfilled, (state, action) => {
      if (action.payload && action.payload.cartItems) {
        state.cartItems = action.payload?.cartItems;
      }
    })
    builder.addCase(_addToCart.fulfilled, (state, action) => {
      if (action.payload && action.payload.cartItems) {
        state.cartItems = action.payload?.cartItems;
      }
    })
  }
});

export const {
  addToCart,
  setCartItems,
  increaseCartItemQty,
  decreaseCartItemQty,
  resetCartItems
} = cartSlice.actions;

export default cartSlice.reducer;