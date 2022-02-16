import { createAsyncThunk } from "@reduxjs/toolkit"
import { doc, onSnapshot } from "firebase/firestore"

const usersThunk = {
    subscribeToGetAllUsers: createAsyncThunk(
        'users/subscribeToGetAllUsers',
        async () => {
            
        }
    ),
}

export default usersThunk