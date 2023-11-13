import React, { useEffect } from 'react';
import { Home } from './pages/home/home';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import Products from './pages/products';
import { useDispatch, useSelector } from 'react-redux';
import { IAppStore } from './store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setAuthState } from './slices/auth-slice';
import { ProductDetails } from './pages/products/product-details/product-details';
import { Cart } from './pages/cart/cart';
import { _addToCart, setCartItems } from './slices/cart-slice';
import { ICartItem } from './types/cart-types';
import { message } from 'antd';
import { formatAxiosError } from './utils/helper';
import { AxiosError } from 'axios';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/:productSlug/:productId/p',
    element: <ProductDetails />
  },
  {
    path: '/:slug',
    element: <Products />
  },
])

function App() {
  const { authenticated } = useSelector((state: IAppStore) => state.authReducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();

  const saveCartItems = async (data: ICartItem[]) => {
    try {
      await dispatch(_addToCart(data)).unwrap();
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  useEffect(() => {
    if (!authenticated) {
      dispatch(setAuthState());
    }
    if (authenticated) {
      const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || "") : null;
      if (cartItems && cartItems.length) {
        saveCartItems(cartItems);
      }
    }
  }, [authenticated]);

  useEffect(() => {
    dispatch(setCartItems())
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
