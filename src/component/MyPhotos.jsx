import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { selectFavoritePhotos } from "../features/favoritePhotosSlice";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import "../component/MyPhotos.css"

export function MyPhotos () {

    const favoritePhotos = useSelector(selectFavoritePhotos);
    console.log(favoritePhotos);
    return ( 
    <>
        <Navbar />
        <div className="favorite_container">
            <div className="favoritePhotos_container">
                
                    {favoritePhotos.map(photo => (
                        <div className="image-container">
                            <img className="img" key={photo.id} src={photo.urls.regular} alt={photo.alt_description}></img>
                            <div className="icon-container" >
                                <DeleteIcon />
                            </div>
                        </div>

                    ))}
                   
            </div>
        
        </div>
        <Footer />        
        
    </>
)

}