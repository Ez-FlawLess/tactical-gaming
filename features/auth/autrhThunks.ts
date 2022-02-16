import { createAsyncThunk } from '@reduxjs/toolkit'
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {  doc, Timestamp, onSnapshot, setDoc } from 'firebase/firestore'

import { auth, db } from '../../firebase'
import { networkActions } from '../network/networkSlice'
import { authActions } from './authSlice'
import { ICreateUserThunk } from './authTypes'

const authThunks = {
    createUser: createAsyncThunk(
        'auth/createUser',
        async (
            user: ICreateUserThunk,
            {dispatch}
        ) => {
            try {
                dispatch(networkActions.loadingStart())

                const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)

                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    email: user.email,
                    username: user.password,
                    timestamp: Timestamp.now(),
                    roles: {
                        user: true,
                    }
                })
                
                return userCredential as UserCredential
            } catch (error: any) {
                console.log('auth create user', error)
            } finally {
                dispatch(networkActions.loadingEnd())
            }
        }
    ),
    signIn: createAsyncThunk(
        'auth/signIn',
        async (
            {email, password}: {email: string, password: string},
            {dispatch}
        ) => {
            try {
                dispatch(networkActions.loadingStart())

                const userCredential = await signInWithEmailAndPassword(auth, email, password)

                return userCredential as UserCredential
            } catch (error: any) {
                console.log('auth login', error)
                for (const [key, value] of Object.entries(error)) {
                    console.log(key, value);
                }
                throw new Error(error)
            } finally {
                dispatch(networkActions.loadingEnd())
            }
        }
    ),
    signOut: createAsyncThunk(
        'auth/signOut',
        async (
            undefined,
            {dispatch}
        ) => {
            try {
                dispatch(networkActions.loadingStart())
                await signOut(auth)
                return true
            } catch (error: any) {
            } finally {
                dispatch(networkActions.loadingEnd())
            }
        }
    ),
    getCurrentUser: createAsyncThunk(
        'auth/getCurrentUserr',
        async () => {
            try {
                return  auth.currentUser
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