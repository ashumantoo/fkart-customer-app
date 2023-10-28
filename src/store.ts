import { configureStore, isRejected } from "@reduxjs/toolkit";
import categoryReducer from './slices/category-slice';
import productsReducer from './slices/product-list-slice';

import { ICategoryState } from "./types/category-types";
import { IProductState } from "./types/product-types";

export interface IAppStore {
  categoryReducer: ICategoryState;
  productsReducer: IProductState;
}

const reducers = {
  categoryReducer,
  productsReducer
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