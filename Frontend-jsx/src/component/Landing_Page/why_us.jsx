import React from 'react';

const data = [
    {
        url : "https://www.youtube.com/embed/tgbNymZ7vqY",
        text : "What is Lorem Ipsum . Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more"
    },
    {
        url : "https://www.youtube.com/embed/tgbNymZ7vqY",
        text : "What is Lorem Ipsum . Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more"
    },
    {
        url : "https://www.youtube.com/embed/tgbNymZ7vqY",
        text : "What is Lorem Ipsum . Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more"
    },
    {
        url : "https://www.youtube.com/embed/tgbNymZ7vqY",
        text : "What is Lorem Ipsum . Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more"
    },
]

export function WhyUs() {
    return (
        <div className="p-10 border-b-2">
            <h2 className="text-center">Why Choose Us</h2>
            {data.map((item,index)=>(
                index%2 === 0 ?
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 sm:grid-cols-1 grid-flow-row p-5 justify-items-center align-items-center">
                    <iframe width="315" height="315" src={item.url}/>
                    <div className="text-sm text-justify lg:mt-0 md:mt-0 sm:mt-4 mt-4">
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

