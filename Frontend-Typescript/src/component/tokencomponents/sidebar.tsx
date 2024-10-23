
import {
    FaBookOpen ,
    FaChevronLeft ,
    FaChevronRight ,
    FaClipboardList ,
    FaPeopleCarry ,
    FaShoppingBag ,
    FaUsers ,
} from 'react-icons/fa';
import {HiMiniVideoCamera} from "react-icons/hi2";
import {BsFillHeartPulseFill} from "react-icons/bs";
import {RiTaskLine} from "react-icons/ri";
import {LuLayoutDashboard , LuLayoutGrid} from "react-icons/lu"; // Import additional icons
import {useState} from 'react';



export function Sidebar() {
    const [isCollapsed , setIsCollapsed] = useState<boolean>( false );

    const toggleSidebar = () => {
        setIsCollapsed ( !isCollapsed );
    };


    return (
        <div className={ ` z-20 text-black w-16 lg:w-64 md:w-16 sm:w-16  ${ isCollapsed ? 'lg:w-16 ' : 'lg:w-64 ' } transition-all min-h-screen border-e` }>
            <div className="flex items-center justify-between p-4">
                {/* Admin Dashboard Label with Arrow Icon */ }
                <span className="text-xl font-bold flex items-center cursor-pointer" onClick={ toggleSidebar }>
                  { isCollapsed ? (
                      <FaChevronRight/>
                  ) : (
                      <>
                          <span className="md:hidden hidden lg:inline">ColabCube</span>
                          <FaChevronLeft className="ml-2"/>
                      </>
                  ) }
                </span>
            </div>
            <ul className="mt-1 ps-3 ">
                {/* Dashboard Link */ }
                <li title="Dashboard" className="flex items-center lg:px-4 md:px-2 sm:px-2 py-3 md:gap-3  hover:bg-blue-100">

                        <LuLayoutDashboard  className={ `md:block  ${ isCollapsed ? 'block mx-auto' : 'mr-2' }` }/>
                        { !isCollapsed && <span className={ `md:hidden hidden lg:inline  ` }>Dashboard</span> }

                </li>

                {/* Community Link */ }
                <li title="Community" className="flex items-center lg:px-4 md:px-2 sm:px-2 py-3 md:gap-3  hover:bg-blue-100">
                        <FaUsers className={ `md:block  ${ isCollapsed ? 'block mx-auto' : 'mr-2' }` }/>
                        { !isCollapsed && <span className="md:hidden hidden lg:inline">Community</span> }
                </li>

                {/* Evnets Link */ }
                <li title="Events" className="flex items-center lg:px-4 md:px-2 sm:px-2 py-3 md:gap-3  hover:bg-blue-100">
                        <FaClipboardList className={ `md:block  ${ isCollapsed ? 'block mx-auto' : 'mr-2' }`}/>
                        { !isCollapsed && <span className="md:hidden hidden lg:inline">Events</span> }
                </li>


                {/* Task & Projects Link */ }
                <li title="Task & Projects" className="flex items-center lg:px-4 md:px-2 sm:px-2 py-3 md:gap-3  hover:bg-blue-100">
                        <RiTaskLine  className={ `md:block  ${ isCollapsed ? 'block mx-auto' : 'mr-2' }`}/>
                        { !isCollapsed && <span className="md:hidden hidden lg:inline">Task & Projects</span> }
                </li>

                {/* App Integration Link */ }
                <li title="App Integration" className="flex items-center lg:px-4 md:px-2 sm:px-2 py-3 md:gap-3  hover:bg-blue-100">
                        <LuLayoutGrid  className={ `md:block  ${ isCollapsed ? 'block mx-auto' : 'mr-2' }`}/>
                        { !isCollapsed && <span className="md:hidden hidden lg:inline">App Integration</span> }
                </li>

                {/* Marketplace Link */ }
                <li title="Marketplace" className="flex items-center lg:px-4 md:px-2 sm:px-2 py-3 md:gap-3  hover:bg-blue-100">
                        <FaShoppingBag className={ `md:block  ${ isCollapsed ? 'block mx-auto' : 'mr-2' }`}/>
                        { !isCollapsed && <span className="md:hidden hidden lg:inline">Marketplace</span> }
                </li>

                <hr className=" m-2 "/>

                {!isCollapsed && <span className="lg:flex md:hidden hidden  items-center p-4 text-xl font-bold cursor-pointer" onClick={ toggleSidebar }>
                    <span >Worksplace</span>
                </span> }



                {/* Fitness Zone Link */ }
                <li title="Fitness Zone" className="flex items-center   py-3 md:gap-3 hover:bg-blue-100">
                    <span className={ ` rounded-circle flex justify-center items-center p-2 bg-blue-300 ${ isCollapsed ? 'mx-auto ' : 'me-2' } ` }><BsFillHeartPulseFill  /></span>
                        { !isCollapsed && <span className="md:hidden hidden lg:inline">Fitness Zone</span> }
                </li>

                {/* Study Link */ }
                <li title="Study Space" className="flex items-center   py-3 md:gap-3 hover:bg-blue-100">
                    <span className={ ` rounded-circle flex justify-center items-center p-2 bg-blue-300 ${ isCollapsed ? 'mx-auto ' : 'me-2' } ` }><FaBookOpen /></span>
                    { !isCollapsed && <span className="md:hidden hidden lg:inline">Study Space</span> }
                </li>

                {/* Meeting Room Link */ }
                <li title="Meeting Room" className="flex items-center   py-3 md:gap-3 hover:bg-blue-100">
                    <span className={ ` rounded-circle flex justify-center items-center p-2 bg-blue-300 ${ isCollapsed ? 'mx-auto ' : 'me-2' } ` }><HiMiniVideoCamera  /></span>
                    { !isCollapsed && <span className="md:hidden hidden lg:inline">Meeting Room</span> }
                </li>

                {/* Hangout Link */ }
                <li title="Hangout Hub" className="flex items-center   py-3 md:gap-3 hover:bg-blue-100">
                    <span className={ ` rounded-circle flex justify-center items-center p-2 bg-blue-300 ${ isCollapsed ? 'mx-auto ' : 'me-2' } ` }><FaPeopleCarry  /></span>
                    { !isCollapsed && <span className="md:hidden hidden lg:inline">Hangout Hub</span> }
                </li>

            </ul>
        </div>

    )
        ;
}

