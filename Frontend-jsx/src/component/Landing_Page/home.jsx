import React from 'react';
import "../../styles/howe.css"

export function Home() {
    return (
        <>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 sm:grid-cols-1 grid-flow-row home justify-items-center align-items-center p-10 " id="home">
                <div className="mx-10 ">
                    <h2 className="text-8xl space-x-4 mb-4 ">Revolutionizing Information Accessibility .</h2>
                    <p className="text-justify  font-semibold">Discover how cutting-edge AI and blockchain technology come together to simplify complex data processing and ensure secure, decentralized solutions.</p>
                    <a className="text-decoration-none text-black" href="#feature"><div className="border-black w-fit px-4 py-2 border-2 rounded-5 mt-5 text-2xl cursor-pointer">lets Explore
                        <span data-v-826c53a2="" className="rocket">🚀</span>
                    </div></a>
                </div>
                <div className=" d-flex justify-content-center" style={{width : "700px",  padding :"10px"}}>
                    <iframe width="600" height="315"
                            src="https://www.youtube.com/embed/tgbNymZ7vqY">
                    </iframe>
                </div>
            </div>

        </>
    );
}
