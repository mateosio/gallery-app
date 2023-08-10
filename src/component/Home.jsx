import React from "react";
import "../component/Home.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function Home () {
    const navigate = useNavigate();

    return ( 
    <div className="main_container">

        <div className="main_items">
            <h1>Welcome to the Gally App.</h1>
            <h2>A place where you can search for various photos and save them in the favorites section, as well as download them to your computer.</h2>
            <Button className="main_button" variant="contained" onClick={()=>{navigate("/search")}}>Let´s do it!</Button>
        </div>
     
    </div>
)

}
