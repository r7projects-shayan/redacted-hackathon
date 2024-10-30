import React from 'react';
import {Navbar} from "../../component/Landing_Page/navbar.jsx";
import {Home} from "../../component/Landing_Page/home.jsx";
import {Features} from "../../component/Landing_Page/features.jsx";
import {AboutTeam} from "../../component/Landing_Page/about_team.jsx";
import {WhyUs} from "../../component/Landing_Page/why_us.jsx";
import {Contactus} from "../../component/Landing_Page/contactus.jsx";
import {Footer} from "../../component/Landing_Page/footer.jsx";

export function Homepage() {
    return (
        <div className=" overflow-hidden">
            <Navbar/>
            <Home/>
            <Features/>
            <AboutTeam/>
            <WhyUs/>
            <Contactus/>
            <Footer/>
        </div>
    );
}

