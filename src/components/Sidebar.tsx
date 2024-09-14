import { setIsSidebarCollapsed } from '../lib/themeSlice';
import { useSelector, useDispatch } from "react-redux";
import {
  Archive,
  BookIcon,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";


import React from 'react'


interface SidebarLinkProps{
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
  onClick: () => void; // Add onClick prop

}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
  onClick
}: SidebarLinkProps) => {
  const pathname = window.location.pathname;
  // console.log(pathname)
  const isActive = pathname === href || (pathname === "/"  &&  href === "/dashboard")
  return (
    <Link to={href} onClick={onClick}>
      <div className={`cursor-pointer flex items-center 
        ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"}
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors 
        `}
        // ${isActive? "bg-blue-200 text-white" : ""}
      >
        <Icon className='w-6 h-6 text-gray-700'/>
        <span className={`text-gray-700 ${isCollapsed ? "hidden" : "block"} font-medium`}>
          {label}
        </span>
      </div>
    </Link>
  )
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector((state)=> state.global.isSidebarCollapsed);
  const toggle = () => {
    console.log("Hi")
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  }
  const sidebarClassName = `fixed flex flex-col 
      ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"}
      bg-white transition-all duration-300 overflow-hidden h-full  shadow-md z-40`;
  return (
    <div className={sidebarClassName}>
        <div className={`flex gap-3 justify-center md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-8"}`}>
            <div><BookOpen /></div>
            <h1 className={`${isSidebarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}>Book Dashboard</h1>
            <button 
              className='md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100' 
              onClick={toggle}>
                <Menu className='w-4 h-4'></Menu>
            </button>
        </div>

        <div className='flex-grow mt-8'>
          <SidebarLink href="/dashboard" icon={Layout} label="Dashboard" isCollapsed={isSidebarCollapsed} onClick={toggle}/>
          <SidebarLink
          href="/books"
          icon={BookIcon}
          label="Books"
          isCollapsed={isSidebarCollapsed}
          onClick={toggle}
          />
           <SidebarLink
            href="/inventory"
            icon={Clipboard}
            label="Inventory"
            isCollapsed={isSidebarCollapsed}
            onClick={toggle}
          />
            <SidebarLink
            href="/expenses"
            icon={CircleDollarSign}
            label="Expenses"
            isCollapsed={isSidebarCollapsed}
            onClick={toggle}
          /> 
          <SidebarLink
            href="/user"
            icon={User}
            label="Users"
            isCollapsed={isSidebarCollapsed}
            onClick={toggle}
          />
          <SidebarLink
            href="/setting"
            icon={SlidersHorizontal}
            label="Settings"
            isCollapsed={isSidebarCollapsed}
            onClick={toggle}
          />

         
        </div>

        <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
            <p className='text-center text-xs text-gray-500'>&copy; Cray177</p>
        </div>
    </div>
  )
}

export default Sidebar