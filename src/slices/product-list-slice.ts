import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CATEGORY_SLICE_TYPE_ENUM, ICategoryState } from "../types/category-types";
import { AxiosError } from "axios";
import { IProductState, PRODUCT_SLICE_TYPE_ENUM, ProductStatus } from "../types/product-types";
import productApi from "../api/product-api";
// import _ from 'lodash';

const initialProductListState: IProductState = {
  products: [],
  product: {
    _id: "",
    name: "",
    description: "",
    slug: "",
    category: "",
    status: ProductStatus.ACTIVE,
    maxRetailPrice: 0,
    sellingPrice: 0,
    quantity: 0,
    productImages: [],
    reviews: []
  },
  productsByPrice: {
    under5k: [],
    under10k: [],
    under15k: [],
    under20k: [],
    under30k: []
  }
}

export const _getProductsBySlug = createAsyncThunk(
  PRODUCT_SLICE_TYPE_ENUM.GET_PRODUCT_LIST,
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await productApi.getProuductsBySlug(slug);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: initialProductListState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(_getProductsBySlug.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.products = action.payload.products;
        state.productsByPrice = action.payload.productsByPrice
      }
    });
  }
});

export default productSlice.reducer;