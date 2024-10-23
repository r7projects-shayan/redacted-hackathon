import {Sidebar} from "../component/tokencomponents/sidebar.tsx";
import {TokenPage} from "../component/tokencomponents/tokenpage.tsx";
import {FaBars} from "react-icons/fa";
import {useState} from "react";

export function TokenHomeScreen({ isDarkMode, toggleDarkMode }) {

    const currentUser = {
        name: 'Admin Name',
        profilePicture: ' ../assets/images/pfp.jpg' // Replace with the actual path to the profile picture
    };

    const [isOpen, setIsOpen] = useState<boolean>(false)

    function toggleMenu(){
        setIsOpen(!isOpen)
    }

    return (
        <>
            <div className={`flex  justify-between`}>
                <Sidebar />
                <div className="flex-1 lg:px-3 sm:px-0 md:px-0 py-3 mx-5">
                    <nav className={ ` lg:inline` }>
                        <FaBars onClick={()=>toggleMenu()} type="button"  className="flex justify-end items-end align-items-end right-10 absolute lg:hidden text-2xl"/>
                        <div className="flex flex-1 items-center justify-end  pb-2 w-full lg:border-b-2  ">
                          <div className={ ` lg:block  ${isOpen? " flex flex-col" : "hidden"}` }>
                                <div className={ `flex items-center space-x-4 ${isOpen? "bg-blue-200 z-10 p-2 rounded-md flex flex-col gap-2 items-center absolute right-20" : ""}` }>
                                    {/*// <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->*/ }
                                    <a href="#"
                                       className="text-decoration-none rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-300 hover:text-white"
                                       aria-current="page">Home</a>
                                    <a href="#"
                                       className="text-decoration-none rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-300 hover:text-white">Docs</a>
                                    <a href="#"
                                       className="text-decoration-none rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-300 hover:text-white">API
                                        reference</a>
                                    <a href="#"
                                       className="text-decoration-none rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-300 hover:text-white">Tutorials</a>
                                    <a href="#"
                                       className="text-decoration-none rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-300 hover:text-white">Examples</a>
                                    <a href="#"
                                       className="text-decoration-none rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-300 hover:text-white">Playground</a>
                                    <button
                                        className="btn btn-primary rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-300 hover:text-white">New
                                        Note
                                    </button>
                                    <img
                                        src={ currentUser.profilePicture } // Use the profile picture from currentUser
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full px-3 py-2 border-2 border-gray-300 cursor-pointer transition duration-300 hover:shadow-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </nav>
                    <TokenPage/>
                </div>
            </div>
        </>
    );
}

