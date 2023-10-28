import {
  IGetCategoriesApiResponse
} from '../types/category-types';
import axios from '../utils/axios';

export default {
  getCategories: () => axios.get<IGetCategoriesApiResponse>('/consumer/category')
}