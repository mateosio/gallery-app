import { createSlice } from "@reduxjs/toolkit";

export const photosSlice = createSlice({
    name: "photos",
    initialState: [],
    reducers: {
        showPhotos: (state, action) => {
            return [...action.payload]
        }
    }
})

export const selectPhotos = (state) => state.photos;

export const {showPhotos} = photosSlice.actions;

export default photosSlice.reducer;


