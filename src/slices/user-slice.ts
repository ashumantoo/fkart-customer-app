import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IUserAddress, USER_ADDRESS_ACTION_ENUM, UserAddressType, IUserState } from "../types/user-types";
import userApi from "../api/user-api";

export const initialUserState: IUserState = {
  shippingAddresses: [],
  shippingAddress: {
    _id: "",
    name: "",
    mobileNumber: "",
    pincode: "",
    locality: "",
    buildingAndStreet: "",
    cityTown: "",
    state: "",
    landmark: "",
    alternateMobile: "",
    addressType: UserAddressType.HOME
  }
};

export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}

export const _addUserAddress = createAsyncThunk(
  USER_ADDRESS_ACTION_ENUM.ADD_USER_ADDRESS,
  async (address: IUserAddress, { rejectWithValue }) => {
    try {
      const response = await userApi.addUserAddress(address);
      return response.data;
    } catch (error) {
      localStorage.clear();
      const err = error as AxiosError;
      throw rejectWithValue(err);
    }
  }
)

export const _getUserAddresses = createAsyncThunk(
  USER_ADDRESS_ACTION_ENUM.GET_USER_ADDRESSES,
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserAddresses();
      return response.data;
    } catch (error) {
      localStorage.clear();
      const err = error as AxiosError;
      throw rejectWithValue(err);
    }
  }
)

export const _getUserAddress = createAsyncThunk(
  USER_ADDRESS_ACTION_ENUM.GET_USER_ADDRESS,
  async (addressId: string, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserAddress(addressId);
      return response.data;
    } catch (error) {
      localStorage.clear();
      const err = error as AxiosError;
      throw rejectWithValue(err);
    }
  }
)

export const _updateUserAddress = createAsyncThunk(
  USER_ADDRESS_ACTION_ENUM.UPDATE_USER_ADDRESS,
  async ({ addressId, address }: { addressId: string, address: IUserAddress }, { rejectWithValue }) => {
    try {
      const response = await userApi.updateUserAddress(addressId, address);
      return response.data;
    } catch (error) {
      localStorage.clear();
      const err = error as AxiosError;
      throw rejectWithValue(err);
    }
  }
)


export const _deleteUserAddress = createAsyncThunk(
  USER_ADDRESS_ACTION_ENUM.DELETE_USER_ADDRESS,
  async (addressId: string, { rejectWithValue }) => {
    try {
      const response = await userApi.deleteUserAddress(addressId);
      return response.data;
    } catch (error) {
      localStorage.clear();
      const err = error as AxiosError;
      throw rejectWithValue(err);
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(_addUserAddress.fulfilled, (state, action) => {
      if (action.payload && action.payload.addresses) {
        state.shippingAddresses = action.payload.addresses
      }
    });
    builder.addCase(_getUserAddresses.fulfilled, (state, action) => {
      if (action.payload && action.payload.addresses) {
        state.shippingAddresses = action.payload.addresses
      }
    });
    builder.addCase(_getUserAddress.fulfilled, (state, action) => {
      if (action.payload && action.payload.address) {
        state.shippingAddress = action.payload.address
      }
    });
  }
});

export default userSlice.reducer;