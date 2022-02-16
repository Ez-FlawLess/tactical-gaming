import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import usersReducer from '../features/users/usersSlice'
import languageReducer from '../features/language/languageSlice'
import networkReducer from '../features/network/networkSlice'

export const store = configureStore({
  reducer: {
      auth: authReducer,
      users: usersReducer,
      language: languageReducer,
      network: networkReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch