import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import TextField  from "@mui/material/TextField";
import "../component/Search.css"

export function Search () {

    return ( 
    <>
        <Navbar/>
        <div className="main_container">
            
            <div className="search_container">
            <TextField 
            sx={{ '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none'}}} 
            
            InputLabelProps={{
                style: {
                  color: "#5bbd9c",  // Establece el color del texto
                }
              }}

             

             className="input_search" 
             label="Search"/>
            <span>1</span>
            </div>          
                       
           
        </div>
        <Footer/>
    </>
)

}
