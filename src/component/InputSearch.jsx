import {React, useState} from "react";
import TextField  from "@mui/material/TextField";
import "../component/InputSearch.css";
import { Button } from "@mui/material";
// import { showPhotos } from "../features/photosSlice"; Accion vieja del reducer en el caso que no use asyncThunk; 
import { useDispatch } from "react-redux";
import { fetchPhotos } from "../features/photosSlice";

// const key = "client_id=QK6dPHST6CCL_367sJpNcUf4u3X7JhuZAJy4aF7uf2U";


export function InputSearch (){
    const [input, setInput] = useState("");
    
    const dispatch = useDispatch();

    const handleSearch = ()=>{
        dispatch(fetchPhotos(input))
    }
    
    // En el caso que se haga sin asyncThunk.
    // const handleSearch = () =>{
    //     fetch(`https://api.unsplash.com/search/photos?${key}&query=${input}`)
    //     .then((response)=>response.json())
    //     .then((data)=> {
                       
    //         console.log(data.results);
            
    //         dispatch(showPhotos(data.results))
            
    //     })
    // }

    return(
            <>
            <div className="search_container">
                
                <TextField                         
                value={input}
                onChange={(e)=>{setInput(e.target.value)}}
                className="search_input" 
                label="Search"
                sx={{ '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none'}}} 
                
                InputLabelProps={{
                    style: {
                    color: "#5bbd9c",  // Establece el color del texto
                    }}}/>

               <Button className="button_input" variant="contained" onClick={handleSearch}>Search</Button>
             
            </div>
            <div className="h2_container">
                <h2>Search without a parameter and you will get a series of random photos</h2>
            </div>
            </>
        
    )
}
