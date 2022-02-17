import { createSlice } from "@reduxjs/toolkit"
import { NetworkState } from "./networkTypes"

const initialState: NetworkState = {
    loading: false,
    loadingCounter: 0,
}

const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        loadingStart: state => {
            state.loadingCounter++
            if (state.loadingCounter > 0 && state.loading === false) state.loading = true
        },
        loadingEnd: state => {
            state.loadingCounter--
            if (state.loadingCounter <= 0 && state.loading === true) state.loading = false
            else if (state.loadingCounter > 0 && state.loading === false) state.loading = true
        },
    },
})

export const networkActions = networkSlice.actions

export default networkSlice.reducer