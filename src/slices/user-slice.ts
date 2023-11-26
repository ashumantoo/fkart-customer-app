import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IUserAddress, USER_ADDRESS_ACTION_ENUM, UserAddressType, IUserState, IOrderInput } from "../types/user-types";
import userApi from "../api/user-api";

export const initialUserState: IUserState = {
  orders: [],
  order: {
    _id: "",
    items: [],
    orderStatus: [],
    paymentStatus: "",
    paymentType: "",
    totalAmount: 0,
    user: {
      _id: "",
      firstName: "",
      lastName: "",
    },
    address: {
      _id: "",
      name: "",
      mobileNumber: "",
      buildingAndStreet: "",
      cityTown: "",
      landmark: "",
      locality: "",
      pincode: "",
      state: "",
      addressType: UserAddressType.HOME
    }
  },
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
  },
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

export const _createOrder = createAsyncThunk(
  USER_ADDRESS_ACTION_ENUM.CREATE_ORDER,
  async (order: IOrderInput, { rejectWithValue }) => {
    try {
      const response = await userApi.createOrder(order);
      return response.data;
    } catch (error) {
      localStorage.clear();
      const err = error as AxiosError;
      throw rejectWithValue(err);
    }
  }
)

export const _getOrders = createAsyncThunk(
  USER_ADDRESS_ACTION_ENUM.GET_ORDERS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getOrders();
      return response.data;
    } catch (error) {
      localStorage.clear();
      const err = error as AxiosError;
      throw rejectWithValue(err);
    }
  }
)

export const _getOrder = createAsyncThunk(
  USER_ADDRESS_ACTION_ENUM.GET_ORDER,
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await userApi.getOrder(orderId);
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
    builder.addCase(_getOrders.fulfilled, (state, action) => {
      if (action.payload && action.payload.orders) {
        state.orders = action.payload.orders
      }
    });
    builder.addCase(_getOrder.fulfilled, (state, action) => {
      if (action.payload && action.payload.order) {
        state.order = action.payload.order
      }
    });
  }
});

export default userSlice.reducer;