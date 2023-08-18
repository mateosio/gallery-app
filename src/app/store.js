import {configureStore} from '@reduxjs/toolkit';
import photosReducer from '../features/photosSlice';

export const store = configureStore({
    reducer: {
        photos: photosReducer,
        // favoritePhotos: favoritePhotosReducer
    },

});