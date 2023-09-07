import {React, useState, useEffect} from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import "../component/MyPhotos.css";
import {Alert, Stack, InputLabel, MenuItem, FormControl, Select, Box} from '@mui/material';
import BasicModal from '../component/Modal';
import {saveAs} from 'file-saver';


export function MyPhotos () {
    const [showAlert, setShowAlert] = useState(false);
    const [renderBy, setRenderBy] = useState(null);
    const [order, setOrder] = useState('');
    
    //useState del modal
    const [open, setOpen] = useState(false);
    const [photoInfo, setPhotoInfo] = useState('');
    

    useEffect(()=>{
        const favoritePhotos = JSON.parse(window.localStorage.getItem("favoritePhoto"));
        console.log(favoritePhotos);
        if (favoritePhotos) {
           setRenderBy(Object.values(favoritePhotos))
        }

    },[showAlert]);


    const handleDelete = (photo)=>{
        const likedPhotos = JSON.parse(window.localStorage.getItem("favoritePhoto"));
        if (likedPhotos[photo.id]){
            likedPhotos[photo.id] = undefined;
            window.localStorage.setItem("favoritePhoto", JSON.stringify(likedPhotos))
            setShowAlert(true);

            setTimeout(()=>{
                setShowAlert(false)
            }, 1500)
        }
    };

    const handleOpenModal = (photo) =>{
        const likedPhotos = JSON.parse(window.localStorage.getItem("favoritePhoto"));
        const photoId = likedPhotos[photo.id]
        console.log(photo);
        setPhotoInfo(photoId);
        setOpen(true);
    };
    
    const handleSort = (e) =>{
         setOrder(e.target.value);
         console.log(e.target.value);
        

         if(e.target.value === "likes"){
             const orderByLikes = renderBy.sort((a, b)=>{return b.likes - a.likes})
             console.log(orderByLikes);
             setRenderBy(orderByLikes);

         } else if (e.target.value === "height"){
             const orderByHeight = renderBy.sort((a, b)=>{return a.height - b.height})
             console.log(orderByHeight);
             setRenderBy(orderByHeight);

         } else{
             const orderByWidth = renderBy.sort((a, b)=>{return a.width - b.width})
             console.log(orderByWidth);
             setRenderBy(orderByWidth);
         }       
    }

    const handleDownload = (photo)=>{
        saveAs(photo.urls.regular, `${photo.id}.jpg`)

    }

   
    if(renderBy === null){
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
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={order}
                                    onChange={ handleSort }>
                                        <MenuItem value={"likes"}>Likes</MenuItem>
                                        <MenuItem value={"width"}>Width</MenuItem>
                                        <MenuItem value={"heigh"}>Heigh</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                    </div>
                    <div className="favoritePhotos_container">
                            {renderBy.map(photo => (
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

