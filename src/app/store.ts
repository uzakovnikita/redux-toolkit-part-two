import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice';
import userSlice from '../features/users/userSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: userSlice
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

