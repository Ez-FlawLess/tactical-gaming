import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { User } from 'firebase/auth'
import { auth } from '../../firebase'
import { AuthState, IRoles } from './authTypes'
import authThunks from './autrhThunks'

const initialState: AuthState = {
    user: auth.currentUser,
    roles: {},
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
        },
        setUserRoles: (state, action: PayloadAction<IRoles>) => {
            state.roles = action.payload
        },
        unsubscribeGetUserRole: state => {
            if (state.getUserRolesSubscription) state.getUserRolesSubscription()
        },
    },
    extraReducers: builder => {

        builder.addCase(authThunks.createUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.roles = {
                    user: true,
                }
            }
        })

        builder.addCase(authThunks.subscribeToGetUserRoles.fulfilled, (state, action) => {
            state.getUserRolesSubscription = action.payload
        })

        builder.addCase(authThunks.signIn.rejected, (state, action) => {
            console.log('slice rejected', action)
            if (action.error.message === 'FirebaseError: Firebase: Error (auth/user-not-found).') {
                state.loginError = 'Email or Password is incorrect'
            }
        })

    }
})

export const authActions = authSlice.actions

export default authSlice.reducer