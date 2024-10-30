import React from 'react';

export function Home() {
    return (
        <>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 sm:grid-cols-1 grid-flow-row  justify-items-center align-items-center p-10">
                <div className="mx-10">
                    <p className="text-justify">What is Lorem Ipsum . Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more</p>
                </div>
                <div style={{width : "700px", margin : "10px", padding :"10px"}}>
                    <iframe width="700" height="315"
                            src="https://www.youtube.com/embed/tgbNymZ7vqY">
                    </iframe>
                </div>
            </div>
        </>
    );
}
