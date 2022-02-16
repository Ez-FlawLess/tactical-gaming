import { IStrings } from "../../utils/strings";

export interface LanguageState {
    strings: IStrings,
    currentLanguage: TCurrentLanguage ,
}

export type TCurrentLanguage = 'en' | 'fr'