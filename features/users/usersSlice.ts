import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import usersThunk from "./usersThunk";
import { IUser, UsersState } from "./usersTypes";

const initialState: UsersState = {
    usersList: [],
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserList: (state, action: PayloadAction<IUser[]>) => {
            state.usersList = action.payload
        },
    },
    extraReducers: builder => {

        builder.addCase(usersThunk.getUsers.fulfilled, (state, action) => {
            if (action.payload) state.usersList = [...state.usersList, ...action.payload]
        })

    },
})

export const usersActions = usersSlice.actions

export default usersSlice.reducer