import {React, useState} from "react";
import TextField  from "@mui/material/TextField";
import "../component/InputSearch.css";
import { Button } from "@mui/material";
import { showPhotos } from "../features/photosSlice";
import { useDispatch } from "react-redux";


const key = "client_id=QK6dPHST6CCL_367sJpNcUf4u3X7JhuZAJy4aF7uf2U";

export function InputSearch (){
    const [input, setInput] = useState("");
    // const [res, setResponse] = useState([]);
    
    const dispatch = useDispatch();

    
    const handleClick = () =>{
        fetch(`https://api.unsplash.com/search/photos?${key}&query=${input}`)
        .then((response)=>response.json())
        .then((data)=> {
            // setResponse(data);
            console.log(data);
            console.log(data.results);
            // console.log(res);
            dispatch(showPhotos(data.results))
            
        })  
    }

    return(
        // <div className="main_container">
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

               <Button className="button_input" variant="contained" onClick={handleClick}>Search</Button>
             
            </div>            
        // </div>
    )
}
