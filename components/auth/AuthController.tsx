import { FC, useEffect } from "react";
import { auth, app } from "../../firebase";

import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../../store/hook";
import { authActions } from "../../features/auth/authSlice";
import authThunks from "../../features/auth/autrhThunks";

const AuthController: FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user === null) {
                dispatch(authActions.unsubscribeGetUserRole())
            } else {
                dispatch(authThunks.subscribeToGetUserRoles(user.uid))
            }
            dispatch(authActions.setUser(user))
        })
    }, [])

    return null
}

export default AuthController