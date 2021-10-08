import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { colorType } from '../lib/guideline/color';
import { RootState } from './';

export const colorSlice = createSlice({
    name: 'color',
    initialState: 'galaxy' as colorType,
    reducers: {
        setColorKey: (state, action: PayloadAction<colorType>) => {
            state = action.payload;
            return action.payload;
        }
    }
})

export const { setColorKey } = colorSlice.actions;
export const selectColorKey = (state: RootState) => state.color;
export default colorSlice.reducer;

