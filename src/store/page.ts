import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './';

export type pageType = 'home' | 'about' | 'works' | 'contact';
export const pageSlice = createSlice({
    name: 'page',
    initialState: 'home' as pageType,
    reducers: {
        setPage: (state, action: PayloadAction<pageType>) => {
            state = action.payload;
            return action.payload;
        },
    }
})

export const { setPage } = pageSlice.actions;
export const selectPage = (state: RootState) => state.page;
export default pageSlice.reducer;