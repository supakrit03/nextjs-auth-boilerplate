import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

const makeStore = () => {
  const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
  });

  return { store };
};

export const { store } = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
