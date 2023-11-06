import React, { useEffect } from 'react';
import { Home } from './pages/home/home';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import Products from './pages/products';
import { useDispatch, useSelector } from 'react-redux';
import { IAppStore } from './store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setAuthState } from './slices/auth-slice';
import { ProductDetails } from './pages/products/product-details/product-details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
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

  useEffect(() => {
    if (!authenticated) {
      dispatch(setAuthState());
    }
  }, [authenticated]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
