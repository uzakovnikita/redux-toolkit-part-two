import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../features/notifications/notificationSlice';

import postsReducer from '../features/posts/postsSlice';
import userReducer from '../features/users/userSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: userReducer,
    notifications: notificationReducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

