import { CategoryPageApiResponse, ProductApiResponse, ProductListApiResponse } from '../types/product-types';
import axios from '../utils/axios';

export default {
  getProuductsBySlug: (slug: string) => axios.get<ProductListApiResponse>(`/consumer/products/${slug}`),
  getProuductById: (productId: string) => axios.get<ProductApiResponse>(`/consumer/product/${productId}`),
  getCategoryPage: (category: string, type: string) => axios.get<CategoryPageApiResponse>(`/consumer/category-page/${category}/${type}`)
}