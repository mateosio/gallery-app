import React, {useEffect} from "react";
import { selectPhotos } from "../features/photosSlice";
import { useSelector } from "react-redux";
import '../component/DisplayPhotos.css';

export function DisplayPhotos (){
    
    const photos = useSelector(selectPhotos);
    console.log(photos);
    
    
        return(
            <div className="photos_container">
                
                    {photos.map(photo => (
                        <img className="img" key={photo.id} src={photo.urls.small}></img>        
                    ))}
                   
            </div>
        )       
    
    
         
    
    


}