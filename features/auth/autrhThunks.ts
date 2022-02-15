import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {  doc, onSnapshot, setDoc } from 'firebase/firestore'

import { auth, db } from '../../firebase'
import { authActions } from './authSlice'
import { ICreateUserThunk } from './authTypes'

const authThunks = {
    createUser: createAsyncThunk(
        'auth/createUser',
        async (
            user: ICreateUserThunk,
        ) => {
            try {
                const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)

                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    email: user.email,
                    username: user.password,
                    roles: {
                        user: true,
                    }
                })
                return userCredential as UserCredential
            } catch (error: any) {
                console.log('auth create user', error)
            }
        }
    ),
    signIn: createAsyncThunk(
        'auth/signIn',
        async (
            {email, password}: {email: string, password: string},
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
    ),
    getCurrentUser: createAsyncThunk(
        'auth/getCurrentUserr',
        async () => {
            try {
                return auth.currentUser
            } catch (error: any) {

            }
        }
    ),
    subscribeToGetUserRoles: createAsyncThunk(
        'auth/subscribeToGetUserRoles',
        async (
            uid: string,
            {dispatch}
        ) => {
            const unSub = onSnapshot(doc(db, 'users', uid), user => {
                console.log('users snapshot', user.get('roles'))
                const userRoles = user.get('roles')
                if (userRoles) {
                    dispatch(authActions.setUserRoles(userRoles))
                }
            })
            return unSub
        },
    )
}

export default authThunks