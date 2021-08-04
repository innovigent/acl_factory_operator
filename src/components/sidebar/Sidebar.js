import React,{useState,useContext } from 'react'

import { Link } from 'react-router-dom'
import UserContext from '../../userContext'
import './sidebar.css'
import logo from '../../assets/INNOVIGENT.png';

const sidebar_items2 = [
    {
        "display_name": "Dashboard",
        "route": "/Dashboard",
        "icon": "bx bx-category-alt"
    }
]

const sidebar_items1 = [
    {
        "display_name": "Dashboard",
        "route": "/Dashboard",
        "icon": "bx bx-category-alt"
    },
    {
        "display_name": "Production Orders",
        "route": "/ProductCard",
        "icon": "bx bx-info-square"
    },
    {
        "display_name": "Product Sort",
        "route": "/ProductionSort",
        "icon": "bx bx-sort-up"
    },
    {
        "display_name": "Product Calendar",
        "route": "/ProductCalendar",
        "icon": "bx bx-calendar-event"
    },
]

const sidebar_items = [
        {
            "display_name": "Dashboard",
            "route": "/Dashboard",
            "icon": "bx bx-category-alt"
        },
        {
            "display_name": "Admin",
            "route": "/Admin",
            "icon": "bx bx-user"
        },
        {
            "display_name": "Users",
            "route": "/Usercreate",
            "icon": "bx bx-user-pin"
        },
        {
            "display_name": "Shifts",
            "route": "/Shift",
            "icon": "bx bx-time-five"
        },
        {
            "display_name": "Departments",
            "route": "/Department",
            "icon": "bx bx-building"
        },
        {
            "display_name": "Factories",
            "route": "/Factory",
            "icon": "bx bxs-factory"
        },
        {
            "display_name": "Devices",
            "route": "/Device",
            "icon": "bx bx-devices"
        },
        {
            "display_name": "Fault Cases",
            "route": "/SpecialCase",
            "icon": "bx bx-import"
        },
        {
            "display_name": "Fault Cases Email",
            "route": "/SpecialCasesEmail",
            "icon": "bx bx-briefcase-alt"
        },
        {
            "display_name": "Product Line",
            "route": "/ProductLine",
            "icon": "bx bx-barcode"
        },
        {
            "display_name": "Product Info",
            "route": "/ProductInfo",
            "icon": "bx bx-info-square"
        },
        {
            "display_name": "Fault Manage",
            "route": "/Fault",
            "icon": "bx bx-error-alt"
        },
        {
            "display_name": "settings",
            "route": "/Settings",
            "icon": "bx bx-cog"
        }
    ]



const SidebarItem = props => {

    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = props => {
    const {userData} = useContext(UserContext);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const activeItem = sidebar_items.findIndex(item => item.route === window.location.pathname)
    const activeItem1 = sidebar_items1.findIndex(item => item.route === window.location.pathname)
    const activeItem2 = sidebar_items2.findIndex(item => item.route === window.location.pathname)

    function closeNav() {
        setIsCollapsed(true)
        document.getElementById("mySidebar").style.width = "80px";
        document.getElementById("main").style.paddingLeft = "80px";
    }

    function openNav() {
        setIsCollapsed(false)
        document.getElementById("mySidebar").style.width = "300px";
        // document.getElementById("main").style.paddingLeft = "300px";
        {window.matchMedia("(max-width: 800px)").matches?
            (document.getElementById("main").style.paddingLeft = "80px"):
            document.getElementById("main").style.paddingLeft = "300px";
        }
    }


    return (
        <>
        {userData.role === 1 || userData.role === 50? (
        <div id="mySidebar" className='sidebar'>
            {isCollapsed === true ? <div className="sidebar__itemmenu">
                <button className="sidebar__item-inner"  onClick={openNav}><i className='bx bx-menu'></i></button>
            </div>:
                <div className="sidebar__itemmenu">
                    <button className="sidebar__item-inner"  onClick={closeNav}><i className='bx bx-menu'></i></button>
                </div>
            }

            <div className="sidebar__logo">
                <img src={logo} alt="company logo" />
            </div>

            {
                sidebar_items.map((item, index) => (
                    <Link to={item.route} key={index}>
                        {isCollapsed === true ?
                            <SidebarItem
                                icon={item.icon}
                                active={index === activeItem}
                            />:
                            <SidebarItem
                                title={item.display_name}
                                icon={item.icon}
                                active={index === activeItem}
                            />
                        }
                    </Link>
                ))
            }
        </div>
    ):null}
            {userData.role === 70  ?(
                <div id="mySidebar" className='sidebar'>
                    {isCollapsed === true ? <div className="sidebar__itemmenu">
                            <button className="sidebar__item-inner"  onClick={openNav}><i className='bx bx-menu'></i></button>
                        </div>:
                        <div className="sidebar__itemmenu">
                            <button className="sidebar__item-inner"  onClick={closeNav}><i className='bx bx-menu'></i></button>
                        </div>
                    }

                    <div className="sidebar__logo">
                        <img src={logo} alt="company logo" />
                    </div>

                    {
                        sidebar_items1.map((item, index) => (
                            <Link to={item.route} key={index}>
                                {isCollapsed === true ?
                                    <SidebarItem
                                        icon={item.icon}
                                        active={index === activeItem1}
                                    />:
                                    <SidebarItem
                                        title={item.display_name}
                                        icon={item.icon}
                                        active={index === activeItem1}
                                    />
                                }
                            </Link>
                        ))
                    }
                </div>
            ):null}
            {userData.role === 71 || userData.role === 72 || userData.role === 30  ?(
                <div id="mySidebar" className='sidebar'>
                    {isCollapsed === true ? <div className="sidebar__itemmenu">
                            <button className="sidebar__item-inner"  onClick={openNav}><i className='bx bx-menu'></i></button>
                        </div>:
                        <div className="sidebar__itemmenu">
                            <button className="sidebar__item-inner"  onClick={closeNav}><i className='bx bx-menu'></i></button>
                        </div>
                    }

                    <div className="sidebar__logo">
                        <img src={logo} alt="company logo" />
                    </div>

                    {
                        sidebar_items2.map((item, index) => (
                            <Link to={item.route} key={index}>
                                {isCollapsed === true ?
                                    <SidebarItem
                                        icon={item.icon}
                                        active={index === activeItem2}
                                    />:
                                    <SidebarItem
                                        title={item.display_name}
                                        icon={item.icon}
                                        active={index === activeItem2}
                                    />
                                }
                            </Link>
                        ))
                    }
                </div>
            ):null}
        </>
    )
}

export default Sidebar