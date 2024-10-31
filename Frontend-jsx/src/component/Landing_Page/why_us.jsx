import React from 'react';
import "../../styles/why_us.css"


const data = [
    {
        url : "https://www.youtube.com/embed/tgbNymZ7vqY",
        title : "Reliability and Security",
        text : "Our platform is designed with top-notch security protocols, ensuring that every transaction and data interaction is safeguarded. With consistent updates and security audits, we provide a reliable environment for all users, protecting their digital assets from potential threats."
    },
    {
        url : "https://www.youtube.com/embed/tgbNymZ7vqY",
        title : "User-Friendly Experience",
        text : "We prioritize ease of use, ensuring a seamless and intuitive interface. With a simple onboarding process, clear navigation, and responsive support, our platform is accessible to everyone, regardless of technical background."
    },
    {
        url : "https://www.youtube.com/embed/tgbNymZ7vqY",
        title : "Innovative Technology",
        text : "Leveraging the latest advancements in AI and blockchain, our platform offers a unique combination of speed, scalability, and efficiency. This technology backbone allows us to provide unmatched performance, enabling users to experience the future of digital transactions today."
    },
    {
        url : "https://www.youtube.com/embed/tgbNymZ7vqY",
        title : "Community-Driven Approach",
        text : "We believe in building a community that contributes to and shapes our platform’s development. Regular feedback sessions, open communication, and inclusive participation make our community an integral part of our growth journey."
    },
]

export function WhyUs() {
    return (
        <div className="p-10 border-b-2 bg-stone-300" id="us">
            <h2 className="text-center">Why Choose Us</h2>
            {data.map((item,index)=>(
                index%2 === 0 ?
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 sm:grid-cols-1 grid-flow-row p-5 justify-items-center align-items-center ">
                    <iframe width="315" height="315" src={item.url}/>
                    <div className="text-sm d-flex flex-column text-justify lg:mt-0 md:mt-0 sm:mt-4 mt-4 bg-zinc-700 rounded-start-pill text-slate-200 p-20 ps-16 end-0 ">
                        <h4 className="heading ">{item.title}</h4>
                        <div className="text-midium">{item.text}</div>
                    </div>
                </div> :
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 sm:grid-cols-1 grid-flow-row p-5 justify-items-center align-items-center ">
                        <div className="text-sm text-justify lg:mb-0 md:mb-0 sm:mb-4 mb-4 bg-zinc-700 rounded-end-pill text-slate-200 p-20 ps-16 ">
                            <h4 className="heading">{item.title}</h4>
                            <div className="text-2xl">{item.text}</div>
                        </div>
                        <iframe width="315" height="315" src={item.url}/>
                    </div>
            ))}
        </div>
    );
}

