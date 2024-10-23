import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS ,
    CategoryScale ,
    LinearScale ,
    PointElement ,
    LineElement ,
    Title ,
    Tooltip ,
    Legend , ChartOptions ,
} from 'chart.js';
import {useState} from "react";
import DigitalCreationsGallery from "../DigitalCreationsGallery.tsx";

type datasetTypes = {
    borderColor: string,
    backgroundColor: string,
    tension: number,
    data: number[],
    label: string,
    fill: boolean,
}

interface tokensDataTypes  {
    labels : string[],
    datasets : datasetTypes[]
}

interface optionType {
    stacked: boolean,
    plugins: {title: {display: boolean, text: string, color : string, position: string}, legend: {
            display: boolean,
            position: string, // This places the legend on the left
        }},
    responsive: boolean,
    scales: {y1: {grid: {drawOnChartArea: boolean}, display: boolean, position: string, type: string}, y: {display: boolean, position: string, type: string}},
    interaction: {mode: string, intersect: boolean},

}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export const options : ChartOptions<optionType> = {
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Last 30 days +12%',
            color : "green",
            position : 'left'
        },
        // legend: {
        //     display: true,
        //     position: 'left', // This places the legend on the left
        // },
    },
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
        },
        y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
                drawOnChartArea: false,
            },
        },
    },
};

export const tokensData : tokensDataTypes = {
    labels: ["1D", "1W", "1M", "3M", "5M", "1Y" ],
    datasets: [
        {
            label: 'Tokens',
            data: [200, 700, 450, 800, 300, 1200],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension : 0.1
        },
    ],
};

export function TokenPage() {

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [ tab, setTab] = useState("")

    function toggleActivityVisibility(switchTab){
        setIsOpen(!isOpen)
        setTab(switchTab)
    }



    return (
        <div className="flex-1 lg:px-4 md:px-0 sm:px-0 py-4 relative overflow-x-hidden ">
            <div className="grid grid-cols-1  grid-flow-row gap-5  h-fit">
                <div>
                    <h3>Manage Token</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5  h-fit">
                    <div className=" flex flex-col ">
                        <h5 className="pb-2">Your Token Balance</h5>
                        <div className="border border-1 flex flex-column items-center border-gray-400 p-5 h-56">
                            <h4>1000</h4>
                            <p className="flex flex-column items-center ">
                                Total Token
                                <span>Earned</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-column  justify-center ">
                        <h5 className="pb-2">Token History</h5>
                        <div className="border border-1 border-gray-400 p-5 h-56">
                        <div className="flex justify-between">
                            <p>Token Earned</p>
                            <span>1,000</span>
                        </div>
                        <div className="flex justify-between">
                            <p>Token Spent</p>
                            <span>0</span>
                        </div>
                        <div className="flex justify-between">
                            <p>Token Burnt</p>
                            <span>0</span>
                        </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Line options={options}  data={tokensData}/>
                </div>
                <div>
                    <div className="flex flex-row gap-3">
                        <button className="btn btn-primary btn-sm" onClick={()=>toggleActivityVisibility("token")}>Earn More Tokens</button>
                        <button className="btn btn-outline-secondary btn-sm " onClick={()=>toggleActivityVisibility("nft")}>View NFT Marketplace</button>
                    </div>
                </div>
                <div >
                    {/* Show/Hide recent activities based on isActivityOpen */}
                    {isOpen && tab === "token" ?  (
                        <div className={` shadow-sm mt-2 overflow-x-auto transition-all duration-300 ease-in-out transform `}>
                            <h4 className="mb-4">Recent WithDrawls</h4>
                            {/*<table className="table-auto">*/}
                            {/*    <thead >*/}
                            {/*        <tr className="flex justify-around">*/}
                            {/*            <th>Date</th>*/}
                            {/*            <th>Transaction Image</th>*/}
                            {/*            <th>Transaction Name</th>*/}
                            {/*            <th>Amount of Tokens Spent</th>*/}
                            {/*            <th>Actions</th>*/}
                            {/*        </tr>*/}
                            {/*    </thead>*/}
                            {/*    <tbody>*/}
                            {/*        <tr>*/}
                            {/*            <td>2023-10-01</td>*/}
                            {/*            <td><img src="src/assets/react.svg" alt=""/></td>*/}
                            {/*            <td>NFT purchase</td>*/}
                            {/*            <td>50 Tokens</td>*/}
                            {/*            <td><button className="btn btn-primary">View</button></td>*/}
                            {/*        </tr>*/}
                            {/*    </tbody>*/}
                            {/*</table>*/}
                            <table className="md:overflow-x-auto table-auto w-full border-separate border-spacing-y-10 shadow rounded mt-2 p-4  ">
                                <thead>
                                <tr align="center">
                                    <th>Date</th>
                                    <th className="hidden sm:table-cell">Transaction Image</th>
                                    <th>Transaction Name</th>
                                    <th className="hidden sm:table-cell">Amount of Tokens Spent</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr align="center">
                                    <td>2023-10-01</td>
                                    <td className="hidden sm:table-cell"><img src="src/assets/react.svg" alt=""/></td>
                                    <td>NFT purchase</td>
                                    <td className="hidden sm:table-cell">50 Tokens</td>
                                    <td><button className="btn btn-primary">View</button></td>
                                </tr>
                                <tr align="center">
                                    <td>2023-10-01</td>
                                    <td className="hidden sm:table-cell"><img src="src/assets/react.svg" alt=""/></td>
                                    <td>NFT purchase</td>
                                    <td className="hidden sm:table-cell">50 Tokens</td>
                                    <td><button className="btn btn-primary">View</button></td>
                                </tr>
                                <tr align="center">
                                    <td>2023-10-01</td>
                                    <td className="hidden sm:table-cell"><img src="src/assets/react.svg" alt=""/></td>
                                    <td>NFT purchase</td>
                                    <td className="hidden sm:table-cell">50 Tokens</td>
                                    <td><button className="btn btn-primary">View</button></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : tab === "nft" && <DigitalCreationsGallery/>}
                </div>
            </div>
        </div>
    );
}