import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "./usersTypes";

const initialState: UsersState = {

}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: builder => {

    },
})

export const usersActions = usersSlice.actions

export default usersSlice.reducer