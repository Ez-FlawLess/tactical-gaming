import { Unsubscribe, User } from "firebase/auth";

export interface AuthState {
    user: null | User,
    loginError?: string,
    roles: IRoles,
    getUserRolesSubscription?: Unsubscribe,
}

export interface IRoles {
    user?: boolean,
    admin?: boolean,
}

export interface ICreateUserThunk {
    email: string,
    password: string,
    username: string,
}