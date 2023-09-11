import {React, useState} from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import "../component/MyPhotos.css";
import {Alert, Stack, InputLabel, MenuItem, FormControl, Select, Box} from '@mui/material';
import BasicModal from '../component/Modal';
import {saveAs} from 'file-saver';
import { useSelector, useDispatch } from "react-redux";
import { selectFavoritePhotos } from "../features/favoritePhotosSlice";
import { removeFavorite } from "../features/favoritePhotosSlice";

export function MyPhotos () {
    const [showAlert, setShowAlert] = useState(false);
    const [sortSelected, setSortSelected] = useState('');
    
    //useState del modal
    const [open, setOpen] = useState(false);
    const [photoInfo, setPhotoInfo] = useState('');

    const dispatch = useDispatch();
    const favorite = useSelector(selectFavoritePhotos);

    const favoritePhoto = [...favorite].sort((a, b)=>{
        if( sortSelected === "likes"){
            return b.likes - a.likes;

        } else if (sortSelected === "height"){
            return a.height - b.height;
            
        } else if (sortSelected === "width"){
            return a.width - b.width;           
        } else{
            return 0;
        }
    });
    
  
    const handleDelete = (photo)=>{
        
        dispatch(removeFavorite(photo))

        setShowAlert(true);

        setTimeout(()=>{
           setShowAlert(false)
        }, 1500)
    };

    const handleOpenModal = (photo) =>{
         const photoId = favorite.find((image)=> image.id === photo.id)
        // console.log(photoId);
        setPhotoInfo(photoId);
        setOpen(true);
    };
    
    const handleSort = (e) =>{
         setSortSelected(e.target.value);
    }

    const handleDownload = (photo)=>{
        saveAs(photo.urls.regular, `${photo.id}.jpg`)
    }

   
    if(favoritePhoto.lenght === 0){
        return(
        <>
        <Navbar />
        <div className="favorite_container">
            <div className="favoriteMessage_container">   
            <h1 className="favoritePhotos_message">You don´t have any favorite photo yet!</h1>                
            </div>
        
        </div>
        <Footer />        
        </>
        )
    }else {
        
        return ( 
            <>
                <Navbar />
                <div className="favorite_container">
                    <div className="boxOrder_container">
                            <Box sx={{ width: 110, backgroundColor: "#5bbd9c", borderStyle: 'none', borderRadius: "35px"}}>
                                <FormControl sx={{'.MuiOutlinedInput-notchedOutline': { borderStyle: 'none'}}} fullWidth>
                                    <InputLabel id="demo-simple-select-label">Order by</InputLabel>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={sortSelected}
                                    onChange={ handleSort }>
                                        <MenuItem value={"likes"}>Likes</MenuItem>
                                        <MenuItem value={"width"}>Width</MenuItem>
                                        <MenuItem value={"heigh"}>Heigh</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                    </div>
                    <div className="favoritePhotos_container">
                            {favoritePhoto.map(photo => (
                                <div key={photo.id} className="image-container">
                                    <img className="img" src={photo.urls.regular} alt={photo.alt_description}></img>
                                    <div className="icon-container" >
                                        <EditIcon onClick={()=>{ handleOpenModal(photo) }} />
                                        <DeleteIcon onClick={()=>{ handleDelete(photo) }}/>
                                    </div>
                                    <div className="icon-download-container">
                                        <DownloadIcon onClick={ ()=>{ handleDownload(photo) }} />
                                    </div>
                                </div>
        
                            ))}
                           
                    </div>
                    {showAlert && 
                    <Stack className="alert_container">
                        <Alert sx={{ maxWidth: '100%', minWidth: "100%" }} severity="success">Delete from favorite</Alert>
                    </Stack>
                    }
                    {
                        <BasicModal open={open} setOpen={setOpen} photo={photoInfo}/>
                    }
                
                </div>
                <Footer />        
                
            </>
        )

    }

}

