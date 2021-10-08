import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './';

// It's sidebar reducer, use it if you need sidebar component.
export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: false,
    reducers: {
        sidebarClick: state => !state,
        sidebarOpen: () => true,
        sidebarClose: () => false,
    }
})

export const { sidebarClick, sidebarOpen, sidebarClose } = sidebarSlice.actions;
export const selectSidebar = (state: RootState) => state.sidebar;
export default sidebarSlice.reducer;