import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { languageActions } from "../../features/language/languageSlice";
import { TCurrentLanguage } from "../../features/language/languageTypes";

const LanguageController: FC = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(languageActions.setCurrentLanguage(
            router.locale as TCurrentLanguage
        ))
    }, [router.locale])

    return null
}

export default LanguageController