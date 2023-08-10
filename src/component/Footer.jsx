import React from "react";
import { Link } from "react-router-dom";
import "../component/Footer.css"

export function Footer () {
    return(
        <div className="footer_container">
            <div className="link_container">
                <Link className="link">@MateoSió</Link>
            </div>
        </div>
    )
}