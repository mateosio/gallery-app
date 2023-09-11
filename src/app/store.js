import {configureStore} from '@reduxjs/toolkit';
import photosReducer from '../features/photosSlice';
import favoritePhotosReducer from '../features/favoritePhotosSlice'

export const store = configureStore({
    reducer: {
        photos: photosReducer,
        favoritePhotos: favoritePhotosReducer
    },

});