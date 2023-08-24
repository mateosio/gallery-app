import React, {useState} from "react";
import { selectPhotos, selectLoading, selectError} from "../features/photosSlice";
import { useSelector } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../component/DisplayPhotos.css';
import { useDispatch } from "react-redux";
import { addFavorite } from "../features/favoritePhotosSlice";

import {Alert, Stack} from '@mui/material';

const setLocalStorage = (photo) =>{
    try{
        window.localStorage.setItem("favoritePhoto", JSON.stringify(photo))
    }
    catch (error){
        console.error(error)
    }
    
}


export function DisplayPhotos (){

    const [showAlert, setShowAlert] = useState(false);
    
    const photos = useSelector(selectPhotos);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const dispatch = useDispatch();
    
    const handleFavorite = (photo) =>{
        // dispatch(addFavorite(photo))
        setLocalStorage(photo)
        setShowAlert(true)

        setTimeout(()=>{
            setShowAlert(false)
        }, 2000)
    };
  
    
        return(
            <div className="photos_container">
                
                    {loading ? 
                    (<h1>Loading...</h1>) 
                    : 
                    error ? 
                    (<h1>Ocurrió un error en tu solicitud</h1>) 
                    :
                     photos.map(photo => (
                        <div className="image-container">
                            <img className="img" key={photo.id} src={photo.urls.regular} alt={photo.alt_description}></img>
                            <div className="icon-container" onClick={()=>{ handleFavorite(photo) }}>
                                <FavoriteIcon />
                            </div>
                        </div>

                    ))}

                    {showAlert && 
                    <Stack className="alert_container">
                        <Alert sx={{ maxWidth: '100%', minWidth: "100%" }} severity="success">Added to favorite</Alert>
                    </Stack>
                    }
                   
            </div>
        )       
    
    
         
    
    


}