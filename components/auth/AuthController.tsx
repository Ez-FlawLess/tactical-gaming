import { FC, useEffect } from "react";
import { auth, app } from "../../firebase";

import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../../store/hook";
import { setUser } from "../../store/slices/authSlice";

const AuthController: FC = () => {

    const dispatch = useAppDispatch()

    // console.log('app', auth)
    // console.log('app current user', auth.currentUser)
    // console.log('app app', app)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            dispatch(setUser(user))
        })
    }, [])

    return null
}

export default AuthController