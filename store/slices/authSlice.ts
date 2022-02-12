import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { User } from 'firebase/auth'
import { auth } from '../../firebase'
import authThunks from '../thunks/autrhThunks'

interface AuthState {
    user: null | User,
    loginError?: string,
}

const initialState: AuthState = {
    user: auth.currentUser,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        deleteLoginError: (state) => {
            state.loginError = undefined
        }
    },
    extraReducers: builder => {

        builder.addCase(authThunks.createUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload.user
            }
        })

        builder.addCase(authThunks.signIn.rejected, (state, action) => {
            console.log('slice rejected', action)
            if (action.error.message === 'FirebaseError: Firebase: Error (auth/user-not-found).') {
                state.loginError = 'Email or Password is incorrect'
            }
        })

    }
})

export const {
    deleteLoginError,
} = authSlice.actions

export default authSlice.reducer