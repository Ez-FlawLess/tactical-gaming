import { Timestamp } from 'firebase/firestore';
import { IRoles } from '../auth/authTypes'

export interface UsersState {
    usersList: IUser[],
}

export interface IUser {
    email: string,
    roles: IRoles,
    timestamp: Timestamp,
    username: string,
}