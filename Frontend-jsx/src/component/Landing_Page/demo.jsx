import React from 'react';
import Spline from '@splinetool/react-spline';
// import  r  from "@splinetool/runtime"


const demo = [
    {
        model : "https://prod.spline.design/cVgcWjaXWXbq3djk/scene.splinecode",
        text : "What is Lorem Ipsum . Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more"
    },
    {
        model : "https://prod.spline.design/cVgcWjaXWXbq3djk/scene.splinecode",
        text : "What is Lorem Ipsum . Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more"
    }
]

export function Demo() {
    return (
        <div className="p-5" id="demo">
            <h4 className="d-flex justify-content-center  text-6xl feature_heading relative">
                <span className="z-10">Demo</span>
                <span className="w-25 z-4 bg-orange-400  absolute bottom-0 h-50"></span>
            </h4>

            {demo.map((item,index)=>(
                index%2 === 0 ?
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 sm:grid-cols-1 grid-flow-row p-5 justify-items-center align-items-center">
                        <Spline type="model" height="auto"
                            scene={item.model}
                        />
                        <div className="text-sm text-justify lg:mt-0 md:mt-0 sm:mt-4 sm:ms-0 md:ms-0 ms-5 lg:ms-5 mt-4">
                            {item.text}
                        </div>
                    </div> :
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 sm:grid-cols-1 grid-flow-row p-5 justify-items-center align-items-center">
                        <div className="text-sm text-justify lg:mb-0 md:mb-0 sm:mb-4 mb-4">
                            {item.text}
                        </div>
                        <iframe width="315" height="315" src={item.url}/>
                    </div>
            ))}
        </div>
    );
}





