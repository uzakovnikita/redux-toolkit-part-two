import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: '0', name: 'Elon'},
    {id: '1', name: 'Bill'},
    {id: '3', name: 'Steve'}
];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
});

export default usersSlice.reducer;