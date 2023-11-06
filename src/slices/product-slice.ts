import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IProductState, PRODUCT_SLICE_TYPE_ENUM, ProductStatus } from "../types/product-types";
import productApi from "../api/product-api";
import { Roles } from "../types/user-types";

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
  },
  categoryPage: {
    _id: "",
    title: "",
    description: "",
    banners: [],
    products: [],
    category: {
      _id: "",
      imageUrl: "",
      name: "",
      parentId: "",
      slug: "",
      type: "",
      subCategories: []
    },
    createdBy: {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      role: Roles.USER,
      address: {
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
      }
    }
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
);

export const _getProductById = createAsyncThunk(
  PRODUCT_SLICE_TYPE_ENUM.GET_PRODUCT_BY_ID,
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await productApi.getProuductById(productId);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
);

export const _getCategoryPage = createAsyncThunk(
  PRODUCT_SLICE_TYPE_ENUM.GET_CATEGORY_PAGE,
  async ({ category, type }: { category: string, type: string }, { rejectWithValue }) => {
    try {
      const response = await productApi.getCategoryPage(category, type);
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
    builder.addCase(_getProductById.fulfilled, (state, action) => {
      if (action.payload && action.payload.success) {
        state.product = action.payload.product;
      }
    });
    builder.addCase(_getCategoryPage.fulfilled, (state, action) => {
      if (action.payload && action.payload.categoryPage) {
        state.categoryPage = { ...action.payload.categoryPage };
      }
    })
  }
});

export default productSlice.reducer;