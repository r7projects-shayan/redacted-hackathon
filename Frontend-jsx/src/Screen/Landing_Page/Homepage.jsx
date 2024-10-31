import React from 'react';
import {Navbar} from "../../component/Landing_Page/navbar.jsx";
import {Home} from "../../component/Landing_Page/home.jsx";
import {Features} from "../../component/Landing_Page/features.jsx";
import {AboutTeam} from "../../component/Landing_Page/about_team.jsx";
import {WhyUs} from "../../component/Landing_Page/why_us.jsx";
import {Contactus} from "../../component/Landing_Page/contactus.jsx";
import {Footer} from "../../component/Landing_Page/footer.jsx";
import {Demo} from "../../component/Landing_Page/demo.jsx";
import {FaArrowUp} from "react-icons/fa";

export function Homepage() {
    return (
        <div className=" overflow-hidden">
            <div className="justify-content-center align-items-center d-flex bg-slate-600" id="top" title="Top">
                <a href="#" className="text-slate-400"><FaArrowUp size={25}/></a>
            </div>
            <Navbar/>
            <Home/>
            <Features/>
            <Demo/>
            <AboutTeam/>
            <WhyUs/>
            <Contactus/>
            <Footer/>
        </div>
    );
}

