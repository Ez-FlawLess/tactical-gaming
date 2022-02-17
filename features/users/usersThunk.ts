import { createAsyncThunk } from "@reduxjs/toolkit"
import { getDocs, limit, orderBy, query, startAt } from "firebase/firestore"
import { usersCollection } from "../../firebase/collections"
import { networkActions } from "../network/networkSlice"
import { IUser } from "./usersTypes"

const usersThunk = {
    getUsers: createAsyncThunk(
        'users/getUsers',
        async (
            {},
            {dispatch}
        ) => {
            try {
                dispatch(networkActions.loadingStart())
                const usersQuery = query(
                    usersCollection, 
                    orderBy('timestamp'),
                    startAt(1),
                    limit(10)
                )
                const users = await getDocs(usersQuery)
                console.log('size', users.size)
                return users.docs.map(user => user.data()) as IUser[]
            } catch (error: any) {

            } finally {
                dispatch(networkActions.loadingEnd())
            }
        }
    )
}

export default usersThunk