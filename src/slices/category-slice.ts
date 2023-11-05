import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { CATEGORY_SLICE_TYPE_ENUM, ICategoryState } from "../types/category-types";
import categoryApi from '../api/category-api';
import { AxiosError } from "axios";
// import _ from 'lodash';

const initialCategoryState: ICategoryState = {
  allCategories: [],
  categories: [],
  category: {
    _id: "",
    name: "",
    slug: "",
    parentId: "",
    imageUrl: "",
    type: "",
    subCategories: []
  }
}

export const _getCategories = createAsyncThunk(
  CATEGORY_SLICE_TYPE_ENUM.GET_CATEGORIES,
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getCategories();
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      rejectWithValue(err)
    }
  }
)

const categorySlice = createSlice({
  name: "category",
  initialState: initialCategoryState,
  reducers: {
    setAllCategories: (state, currentState) => {
      // const filteredArray = _.uniqBy(currentState.payload, "_id").map((item: any) => {
      //   return {
      //     _id: item._id,
      //     name: item.name,
      //     parentId: item.parentId,
      //     slug: item.slug
      //   }
      // });
      // state.allCategories = filteredArray;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(_getCategories.fulfilled, (state, action) => {
      if (action.payload?.categories) {
        state.categories = [...action.payload.categories];
      }
    });
  }
});

export const { setAllCategories } = categorySlice.actions;

export default categorySlice.reducer;