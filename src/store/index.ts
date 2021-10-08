import { configureStore } from '@reduxjs/toolkit';

import colorReducer from './color';
import pageReducer from './page';
import sidebarReducer from './sidebar';

export const store = configureStore({
    reducer: {
        // Add your reducers
        sidebar: sidebarReducer,
        color: colorReducer,
        page: pageReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export const dispatch = store.dispatch;
  
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch