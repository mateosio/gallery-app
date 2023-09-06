import React from "react";
import { Navbar } from "./Navbar";
import { InputSearch } from "./InputSearch";
import { DisplayPhotos } from "./DisplayPhotos";
import { Footer } from "./Footer";
import "../component/Search.css"


export function Search () {

    return ( 
    <>
        <Navbar/>
        <div className="main_container"> 
        <InputSearch />
        <DisplayPhotos />
        </div>
        <Footer/>
    </>
)

}
