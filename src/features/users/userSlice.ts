import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";

const initialState: {
    id: string,
    name: string,
}[] = [];

export const fetchUser = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users');
    return response.users;
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(fetchUser.fulfilled, (state, action: PayloadAction<(typeof initialState)>) => {
            state.push(...action.payload);            
        })
});

export const selectAllUsers = ((state: RootState) => state.users);
export const selectUserById = (state: RootState, user: string) => state.users.find(({id}) => id === user);
export default usersSlice.reducer;