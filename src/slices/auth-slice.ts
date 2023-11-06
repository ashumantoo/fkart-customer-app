import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/auth-api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IUser, IUserState, Roles } from "../types/user-types";

const initialAuthState: IUserState = {
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    address: {
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      country: "",
      postalCode: ""
    },
    role: Roles.USER
  },
  token: "",
  authenticated: false,
};

enum AuthActionEnum {
  SIGNIN = "SIGNIN",
  SIGNUP = "SIGNUP"
}

export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}

interface IAdminUserInput {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  password: string
}

export const _signUp = createAsyncThunk(
  AuthActionEnum.SIGNUP,
  async (adminUser: IAdminUserInput, { rejectWithValue }) => {
    try {
      const response = await authApi.signUp(adminUser);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw rejectWithValue(err);
    }
  }
)

export const _signIn = createAsyncThunk(
  AuthActionEnum.SIGNIN,
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await authApi.signin({ email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      localStorage.clear();
      const err = error as AxiosError;
      throw rejectWithValue(err);
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuthState: (state) => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token) {
        state.token = token;
      }
      if (user) {
        state.user = JSON.parse(user);
        state.authenticated = true;
      }
    },
    signout: (state) => {
      localStorage.clear();
      state.user = {
        ...initialAuthState.user,
      };
      state.token = "";
      state.authenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(_signIn.fulfilled, (state, action) => {
      state.user = { ...action.payload.user };
      state.token = action.payload.token;
      state.authenticated = true;
    });
    builder.addCase(_signUp.fulfilled, (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      }
    });
  }
});

export const { setAuthState, signout } = authSlice.actions;

export default authSlice.reducer;

