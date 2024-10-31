import React, {useState} from 'react';
import "../../styles/contact.css"

export function Contactus() {

    const [data, setData] = useState({
        name : "",
        email : "",
        phone : "",
        city : "",
        state : "",
        country : "",
        message : "",
    })

    function handleSubmit(){

    }

    return (
        <div className="p-5 mt-5 border-b-2" id="contact">
            <div className="relative ">
                <iframe style={{translate: "-50% 0"}} className="relative bg-black " height={1100} width={1100} src="https://lottie.host/embed/1a8b0bd1-b5fd-4977-a2bb-8f83882055bc/4gyBLqMJF0.json"></iframe>
                <div className="absolute top-12  border-2 rounded-xl lg:p-5 md:p-1 sm:p-1 p-5 shadow-black shadow-2xl form">
                    <h4 className="text-center mb-5 ">Send Us A Message</h4>
                    <form onSubmit={handleSubmit} className="d-flex flex-column  gap-5 ">
                        <input value={data.name} onChange={(e)=>setData({...data, name : e.target.value})}  className="border-2 p-3 shadow-gray-600 rounded-5 shadow-md" placeholder="Name"/>
                        <input value={data.email} onChange={(e)=>setData({...data, email : e.target.value})}  className="border-2 p-3 shadow-gray-600 rounded-5 shadow-md" placeholder="Email"/>
                        <input value={data.phone} onChange={(e)=>setData({...data, phone : e.target.value})}  className="border-2 p-3 shadow-gray-600 rounded-5 shadow-md" placeholder="Phone"/>
                        <input value={data.city} onChange={(e)=>setData({...data, city : e.target.value})}  className="border-2 p-3 shadow-gray-600 rounded-5 shadow-md" placeholder="City"/>
                        <input value={data.state} onChange={(e)=>setData({...data, state : e.target.value})}  className="border-2 p-3 shadow-gray-600 rounded-5 shadow-md" placeholder="State"/>
                        <input value={data.country} onChange={(e)=>setData({...data, country : e.target.value})}  className="border-2 p-3 shadow-gray-600 rounded-5 shadow-md" placeholder="Country"/>
                        <input value={data.message} onChange={(e)=>setData({...data, message : e.target.value})}  className="border-2 p-3 shadow-gray-600 rounded-5 shadow-md" placeholder="Message"/>
                        <div className="d-flex justify-around gap-5">
                            <button className="btn btn-outline-success w-100 shadow-md shadow-gray-600">Send</button>
                            <button className="btn btn-outline-danger w-100 shadow-md shadow-gray-600">Clear</button>
                        </div>
                    </form>
                </div>
                <iframe style={{translate: "90% 0"}} className="sm:hidden md:hidden lg:block absolute top-0 bg-black" height={1100} width={1100} src="https://lottie.host/embed/1a8b0bd1-b5fd-4977-a2bb-8f83882055bc/4gyBLqMJF0.json"></iframe>
            </div>
        </div>
    );
}

