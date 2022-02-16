import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import allStrings from "../../utils/strings";
import { LanguageState, TCurrentLanguage } from "./languageTypes";

const initialState: LanguageState = {
    strings: allStrings.en,
    currentLanguage: 'en',
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setCurrentLanguage: (state, action: PayloadAction<TCurrentLanguage>) => {
            state.currentLanguage = action.payload
            state.strings = allStrings[action.payload]
        },
    },
})

export const languageActions = languageSlice.actions

export const selectStrings = (state: RootState) => state.language.strings

export default languageSlice.reducer