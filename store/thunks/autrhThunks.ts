import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { auth } from '../../firebase'

const authThunks = {
    createUser: createAsyncThunk(
        'auth/createUser',
        async (
            {email, password}: {email: string, password: string}
        ) => {
            try {
                const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password)

                return userCredential as UserCredential
            } catch (error: any) {
                console.log('auth create user', error)
            }
        }
    ),
    signIn: createAsyncThunk(
        'auth/signIn',
        async (
            {email, password}: {email: string, password: string}
        ) => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password)

                return userCredential as UserCredential
            } catch (error: any) {
                console.log('auth login', error)
                for (const [key, value] of Object.entries(error)) {
                    console.log(key, value);
                }
                throw new Error(error)
            }
        }
    ),
    signOut: createAsyncThunk(
        'auth/signOut',
        async () => {
            try {
                await signOut(auth)
                return true
            } catch (error: any) {

            }
        }
    )
}

export default authThunks