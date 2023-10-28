import React from 'react';
import { Home } from './pages/home/home';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import { ProductList } from './pages/product-list/product-list';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/:slug',
    element: <ProductList />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
