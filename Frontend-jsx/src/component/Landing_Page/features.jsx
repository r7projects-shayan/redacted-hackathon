import React, {useState} from 'react';
// import "../../styles/feature.css"

const features = [
    {
        title : 'using token as blockchain',
        text : "What is Lorem Ipsum . Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
    },
    {
        title : 'using token as blockchain',
        text : "What is Lorem Ipsum . Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
    },
    {
        title : 'using token as blockchain',
        text : "What is Lorem Ipsum . Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
    },
    {
        title : 'using token as blockchain',
        text : "What is Lorem Ipsum . Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
    },
    {
        title : 'using token as blockchain',
        text : "What is Lorem Ipsum . Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
    },
    {
        title : 'using token as blockchain',
        text : "What is Lorem Ipsum . Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
    }
]

export function Features() {

    const [torchPosition, setTorchPosition] = useState({ x: 0, y: 0 });
    const [isTorchVisible, setIsTorchVisible] = useState(false);

    const handleMouseMove = (e) => {
        // Calculate the torch position relative to the card
        const { offsetX, offsetY } = e.nativeEvent;
        setTorchPosition({ x: offsetX, y: offsetY });
    };

    const handleMouseEnter = () => {
        setIsTorchVisible(true);
    };

    const handleMouseLeave = () => {
        setIsTorchVisible(false);
    };

    return (
        <div className="p-5 border-b-2">
            <h4 className="d-flex justify-content-center mb-5">Features</h4>
            <div className="grid lg:grid-cols-3 grid-flow-row gap-10 md:grid-cols-2 grid-cols-1 sm:grid-cols-1">
                {features.map((item)=> {

                    const [torchPosition, setTorchPosition] = useState({ x: 0, y: 0 });
                    const [isTorchVisible, setIsTorchVisible] = useState(false);

                    const handleMouseMove = (e) => {
                        const { offsetX, offsetY } = e.nativeEvent;
                        setTorchPosition({ x: offsetX, y: offsetY });
                    };

                    const handleMouseEnter = () => setIsTorchVisible(true);
                    const handleMouseLeave = () => setIsTorchVisible(false);

                    return (
                        <div onMouseMove={handleMouseMove}
                             onMouseEnter={handleMouseEnter}
                             onMouseLeave={handleMouseLeave}
                             className="card cursor-pointer relative p-5 gap-3 bg-indigo-900 text-white rounded-lg shadow-lg overflow-hidden"
                             style={{
                                 background: isTorchVisible
                                     ? `radial-gradient(circle at ${torchPosition.x}px ${torchPosition.y}px, rgba(255, 255, 255, 0.3) 30px, rgba(0, 0, 0, 0.9) 150px)`
                                     : 'rgba(0, 0, 0, 0.9)',
                                 transition: 'background 0.1s ease',
                             }}
                        >
                            <div className="card-title text-center font-bold text-xl text-cyan-900">{item.title}</div>
                            <div className="card-text text-center text-sm">{item.text}</div>
                        </div>
                    )
                })}
            </div>
        </div>


    );
}

