import React from 'react';

export function Contactus() {
    return (
        <div className="p-5 mt-5 border-b-2" id="contact">
            <div className="relative ">
                <iframe style={{translate: "-80% 0"}} className="relative bg-black " height={1100} width={1100} src="https://lottie.host/embed/1a8b0bd1-b5fd-4977-a2bb-8f83882055bc/4gyBLqMJF0.json"></iframe>
                <div className="absolute top-0 md:start-1/2 sm:start-1/2  lg:start-1/4 border-2 rounded-xl p-5 xs:w-100 w-50 lg:w-50  sm:w-100 md:w-100 shadow-2xl">
                    <h4 className="text-center mb-5 ">Send Us A Message</h4>
                    <form className="d-flex flex-column  gap-5 ">
                        <input className="border-2 p-3 rounded-5 shadow-md" placeholder="Name"/>
                        <input className="border-2 p-3 rounded-5 shadow-md" placeholder="Email"/>
                        <input className="border-2 p-3 rounded-5 shadow-md" placeholder="Phone"/>
                        <input className="border-2 p-3 rounded-5 shadow-md" placeholder="City"/>
                        <input className="border-2 p-3 rounded-5 shadow-md" placeholder="State"/>
                        <input className="border-2 p-3 rounded-5 shadow-md" placeholder="Country"/>
                        <input className="border-2 p-3 rounded-5 shadow-md" placeholder="Message"/>
                        <div className="d-flex justify-around gap-5">
                            <button className="btn btn-outline-success w-100 shadow-md">Send</button>
                            <button className="btn btn-outline-danger w-100 shadow-md">Clear</button>
                        </div>
                    </form>
                </div>
                <iframe style={{translate: "115% 0"}} className="sm:hidden md:hidden lg:block absolute top-0 bg-black" height={1100} width={1100} src="https://lottie.host/embed/1a8b0bd1-b5fd-4977-a2bb-8f83882055bc/4gyBLqMJF0.json"></iframe>
            </div>
        </div>
    );
}

