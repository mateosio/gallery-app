import React, {useEffect} from "react";
import { selectPhotos } from "../features/photosSlice";
import { useSelector } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../component/DisplayPhotos.css';

export function DisplayPhotos (){
    
    const photos = useSelector(selectPhotos);
    console.log(photos);
    
    
        return(
            <div className="photos_container">
                
                    {photos.map(photo => (
                        <div className="image-container">
                            <img className="img" key={photo.id} src={photo.urls.regular} alt={photo.alt_description}></img>
                            <div className="icon-container">
                                <FavoriteIcon />
                            </div>
                        </div>

                    ))}
                   
            </div>
        )       
    
    
         
    
    


}