import React from 'react';
import { Home } from './pages/home/home';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import Products from './pages/products';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/:slug',
    element: <Products />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
