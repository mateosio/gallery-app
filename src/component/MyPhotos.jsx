import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import DeleteIcon from '@mui/icons-material/Delete';
import "../component/MyPhotos.css";

export function MyPhotos () {
    
    const favoritePhotos = JSON.parse(window.localStorage.getItem("favoritePhoto"));

    if(favoritePhotos == null){
        return(
        <>
        <Navbar />
        <div className="favorite_container">
            <div className="favoriteMessage_container">   
            <h1 className="favoritePhotos_message">You don´t have any favorite photo!</h1>                
            </div>
        
        </div>
        <Footer />        
        </>
        )
    }else {
        const favorite = Object.values(favoritePhotos);
        return ( 
            <>
                <Navbar />
                <div className="favorite_container">
                    <div className="favoritePhotos_container">
                        
                            {favorite.map(photo => (
                                <div key={photo.id} className="image-container">
                                    <img className="img" src={photo.urls.regular} alt={photo.alt_description}></img>
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

}