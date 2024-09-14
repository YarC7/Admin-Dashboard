/* eslint-disable react/prop-types */
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSelector } from "react-redux";
import  { useEffect } from 'react';


const Layout = ({children}) => {
  const isSidebarCollapsed = useSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useSelector(
    (state) => state.global.isDarkMode
  );
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  })
  return (
    <div className={`${isDarkMode ? "dark" : "light"} flex bg-gray-50 text-gray-900 w-full h-full min-h-screen`}>
        <Sidebar/>
        <main 
          className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 
            ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"}`}>
            <Navbar/>
            {children} 
        </main>
    </div>
  )
}

const Wrapper = ({children}) => {
  return (
    <Layout>{children}</Layout>
  )
}
export default Wrapper;