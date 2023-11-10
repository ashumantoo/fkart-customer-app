import { configureStore, isRejected } from "@reduxjs/toolkit";
import categoryReducer from './slices/category-slice';
import productsReducer from './slices/product-slice';
import authReducer from './slices/auth-slice';
import cartReducer from './slices/cart-slice';

import { ICategoryState } from "./types/category-types";
import { IProductState } from "./types/product-types";
import { IUserState } from "./types/user-types";
import { ICartState } from "./types/cart-types";

export interface IAppStore {
  authReducer: IUserState,
  categoryReducer: ICategoryState;
  productsReducer: IProductState;
  cartReducer: ICartState
}

const reducers = {
  authReducer,
  categoryReducer,
  productsReducer,
  cartReducer
}
const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return [
      ({ getState, dispatch }) => {
        return (next) => (action) => {
          const result: unknown = next(action);
          if (isRejected(result) && !result.meta.rejectedWithValue) {
            const error = new Error(
              result.error.message || "Unknown message redux toolkit error"
            );
            if (result.error.name) {
              error.name = result.error.name;
            }
            if (result.error.stack) {
              error.stack = result.error.stack;
            }

            console.error(error);
          }
          return result;
        };
      },
      ...getDefaultMiddleware({
        thunk: {
          extraArgument: {}
        }
      })
    ];
  }
});
export default store;