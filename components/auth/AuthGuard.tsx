import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useAppSelector } from "../../store/hook";

const AuthGuard: FC<{
    pageProps: any,
}> = ({
    children,
    pageProps,
}) => {

    const router = useRouter()

    const { auth } = useAppSelector(state => ({
        auth: state.auth,
    }))

    useEffect(() => {
        if (auth.user) {
            if (pageProps.nonAuth) router.push('/')
        } else {
            if (pageProps.protected) router.push('/login')
        }
    }, [pageProps, auth.user])

    useEffect(() => {
        console.log('roles', auth.roles)
    }, [auth.roles])

    return <>{children}</>
}

export default AuthGuard