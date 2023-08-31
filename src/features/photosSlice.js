import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


const key = "client_id=QK6dPHST6CCL_367sJpNcUf4u3X7JhuZAJy4aF7uf2U";

//Creo una acción con asyncThunk donde realizó la petición a la apí y la exporto para ser usada al hacer click en el input (inputSearch.jsx). 
export const fetchPhotos = createAsyncThunk("photos/fetchPhotos", 
    async (input)=>{
     
      let query = `https://api.unsplash.com/photos/random?${key}&count=20`;
      if(input){
        query = `https://api.unsplash.com/search/photos?${key}&query=${input}`;
      }

      const response = await fetch(query);
      const data = await response.json();

      let res = data;
      if(input){
        res = data.results;
      };

        return res;
      
    })

export const photosSlice = createSlice({
    name: "photos",
    initialState: {
        photos: [],
        loading: false,
        error: false
    },
    reducers: {
        //(La acción showPhotos se usa en el caso que no cree la acción con asyncThunk, ya que ahora es reemplazada por la acción fetchPhotos.fulfilled del ExtraReducer.)
        
        // showPhotos: (state, action) => {
        //     return [...action.payload]
        // }
    },
    extraReducers: {
        [fetchPhotos.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
          },
          [fetchPhotos.fulfilled]: (state, action) => {
            state.photos = [...action.payload];
            state.loading = false;
            state.error = false;
          },
          [fetchPhotos.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
          }
        }
    
})

export const selectPhotos = (state) => state.photos.photos;
export const selectLoading = (state) => state.photos.loading;
export const selectError = (state) => state.photos.error;
export default photosSlice.reducer;

//En el caso que no cree la acción fetchPhotos con "asyncThunk tengo que crear la acción showPhotos que cumple la misma función y exportarla".
// export const {showPhotos} = photosSlice.actions;
// export const selectPhotos = (state) => state.photos;

