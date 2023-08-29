import React, {useState} from "react";
import { selectPhotos, selectLoading, selectError} from "../features/photosSlice";
import { useSelector } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../component/DisplayPhotos.css';
import {Alert, Stack} from '@mui/material';


const getStorage = () =>{
    const favoritePhoto = JSON.parse(window.localStorage.getItem("favoritePhoto"));
    let liked;

    try {
        if (favoritePhoto){
            liked = favoritePhoto;
         } 
         else {
            liked = {};
         }
         return liked;
    }  
    catch (error){
     console.error(error)
    }}


export function DisplayPhotos (){

    const [showAlert, setShowAlert] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    
    const photos = useSelector(selectPhotos);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const handleFavorite = (photo) =>{
        const likedPhotos = getStorage();

        if (likedPhotos[photo.id]){
            likedPhotos[photo.id] = undefined;
            setDeleteAlert(true)

            setTimeout(()=>{
                setDeleteAlert(false)
            }, 2000)

        } else {
            likedPhotos[photo.id] = photo;
            setShowAlert(true);

            setTimeout(()=>{
                setShowAlert(false)
            }, 1500)
        }
        window.localStorage.setItem("favoritePhoto", JSON.stringify(likedPhotos))
    };

    const func = () =>{
        const liked = getStorage();
        //liked lo guardo en un state para consultar desde el handle y no tener que volver a ejecutar la funcion?
        return photos.map(photo => (
            <div key={photo.id} className="image-container">
                <img className="img" src={photo.urls.regular} alt={photo.alt_description}></img>
                <div className={liked[photo.id] ? "icon-container like" : "icon-container"} onClick={()=>{ handleFavorite(photo) }}>
                    <FavoriteIcon />
                </div>
            </div>                        
        ))
    }
  
    
        return(
            <div className="photos_container">
                
                    {loading ? 
                    (<h1>Loading...</h1>) 
                    : 
                    error ? 
                    (<h1>Ocurrió un error en tu solicitud</h1>) 
                    :
                    func()
                    }

                    {showAlert && 
                    <Stack className="alert_container">
                        <Alert sx={{ maxWidth: '100%', minWidth: "100%" }} severity="success">Added to favorite</Alert>
                    </Stack>
                    }
                    {deleteAlert && 
                    <Stack className="alert_container">
                        <Alert sx={{ maxWidth: '100%', minWidth: "100%" }} severity="success">Delete for favorite</Alert>
                    </Stack>
                    }
                   
            </div>
        )
    }