import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { User } from 'firebase/auth'
import { auth } from '../../firebase'
import { AuthState } from './authTypes'
import authThunks from './autrhThunks'

const initialState: AuthState = {
    user: auth.currentUser,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
        },
        deleteLoginError: (state) => {
            state.loginError = undefined
        }
    },
    extraReducers: builder => {

        // builder.addCase(authThunks.createUser.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         state.user = action.payload.user
        //     }
        // })

        // builder.addCase(authThunks.signIn.fulfilled, (state, action) => {
        //     if (action.payload) state.user = action.payload.user
        // })

        builder.addCase(authThunks.signIn.rejected, (state, action) => {
            console.log('slice rejected', action)
            if (action.error.message === 'FirebaseError: Firebase: Error (auth/user-not-found).') {
                state.loginError = 'Email or Password is incorrect'
            }
        })

        // builder.addCase(authThunks.signOut.fulfilled, state => {
        //     state.user = null
        // })

    }
})

export const {
    deleteLoginError,
    setUser,
} = authSlice.actions

export default authSlice.reducer