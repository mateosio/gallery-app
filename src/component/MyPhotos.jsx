import {React, useState} from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import DeleteIcon from '@mui/icons-material/Delete';
import "../component/MyPhotos.css";
import {Alert, Stack, InputLabel, MenuItem, FormControl, Select, Box} from '@mui/material';


export function MyPhotos () {
    const [showAlert, setShowAlert] = useState(false);
    const [sort, setSort] = useState([]);
    const [order, setOrder] = useState('');

    const favoritePhotos = JSON.parse(window.localStorage.getItem("favoritePhoto"));
    console.log(favoritePhotos);

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
    }

    const handleSort = (e) =>{
        setOrder(e.target.value);
        console.log(e.target.value);
        const arrayToSort = Object.values(favoritePhotos);

        if(e.target.value === "likes"){
            const orderByLikes = arrayToSort.sort((a, b)=>{return b.likes - a.likes})
            console.log(orderByLikes);
        } else if (e.target.value === "height"){
            const orderByHeight = arrayToSort.sort((a, b)=>{return a.height - b.height})
            console.log(orderByHeight);
        } else{
            const orderByWidth = arrayToSort.sort((a, b)=>{return a.width - b.width})
            console.log(orderByWidth);
        }       
    }

   
    if(favoritePhotos == null){
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
        const favorite = Object.values(favoritePhotos);
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
                            {favorite.map(photo => (
                                <div key={photo.id} className="image-container">
                                    <img className="img" src={photo.urls.regular} alt={photo.alt_description}></img>
                                    <div className="icon-container" onClick={()=>{ handleDelete(photo) }}>
                                        <DeleteIcon />
                                    </div>
                                </div>
        
                            ))}
                           
                    </div>
                    {showAlert && 
                    <Stack className="alert_container">
                        <Alert sx={{ maxWidth: '100%', minWidth: "100%" }} severity="success">Delete from favorite</Alert>
                    </Stack>
                    }
                
                </div>
                <Footer />        
                
            </>
        )

    }

}