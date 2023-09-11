 import { createSlice } from "@reduxjs/toolkit";

 export const favoritePhotosSlice = createSlice({
     name: "favoritePhotos",
     initialState: JSON.parse(localStorage.getItem("favoritePhoto")) || [],
     reducers: {
         addFavoriteToggle: (state, action) => {
            const imageExist = state.find(image => image.id === action.payload.id);
            if(imageExist){
                const newState = state.filter((photo) => photo.id !== action.payload.id)
                localStorage.setItem("favoritePhoto", JSON.stringify(newState))
                return newState;
                
            }else{
                state.push(action.payload);
                localStorage.setItem("favoritePhoto", JSON.stringify(state))
            }
            
         },
         removeFavorite: (state, action) => {
            const update = state.filter((photo) => photo.id !== action.payload.id)
            localStorage.setItem("favoritePhoto", JSON.stringify(state))
            return update;
        },
        changeDescription: (state, action)=> {
            const {id, description} = action.payload;
            
            const objectToUpload = state.find((image) => image.id === id);
            console.log(objectToUpload);
            objectToUpload.description = description;
            console.log(objectToUpload);
            localStorage.setItem("favoritePhoto", JSON.stringify(state))
        }
    }
});

 export const selectFavoritePhotos = (state) => state.favoritePhotos;

 export const {addFavoriteToggle, removeFavorite, changeDescription } = favoritePhotosSlice.actions;

 export default favoritePhotosSlice.reducer;
