import { collection } from 'firebase/firestore'
import { db } from '.'

export const usersCollection = collection(db, 'users')