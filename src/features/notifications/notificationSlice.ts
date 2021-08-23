import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";

import { client } from "../../api/client";
import { RootState } from "../../app/store";

export const fetchNotifications = createAsyncThunk<
  { [key: string]: any }[],
  void,
  { state: RootState }
>("notifications/fetchNotifications", async (_, { getState }) => {
  const allNotifications = selectAllNotifications(getState());
  const [latestNotification] = allNotifications;
  const latestTimestamp = latestNotification ? latestNotification.date : "";
  const response = await client.get(
    `/fakeApi/notifications?since=${latestTimestamp}`
  );
  return response.notifications;
});

const notificationSlice = createSlice({
  name: "notifications",
  initialState: [] as { [key: string]: any }[],
  reducers: {
    allNotificationsRead(state) {
      state.forEach((notification) => (notification.read = true));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, action: PayloadAction<{ [key: string]: any }[]>) => {
		state.forEach(notify => notify.isNew = !notify.read);
        state.push(...action.payload);
        state.sort((a, b) => b.date.localeCompare(a.date));
      }
    );
  },
});

export const { allNotificationsRead } = notificationSlice.actions

export default notificationSlice.reducer;

export const selectAllNotifications = (state: RootState) => state.notifications;
