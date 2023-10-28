import { ProductListApiResponse } from '../types/product-types';
import axios from '../utils/axios';

export default {
  getProuductsBySlug: (slug: string) => axios.get<ProductListApiResponse>(`/consumer/product/${slug}`)
}