import { useState } from "react";
import { Menu } from "lucide-react";

import MenuItems from "./MenuItems";

// import { Drawer } from "antd";

const SideBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      {/* <Header/> */}
      {/* Desktop Sidebar */}
      <div className='hidden lg:flex   h-screen w-64 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.05)] rounded-r-2xl border-r border-gray-200 p-4'>
        <MenuItems />
      </div>

      {/* Mobile Menu Toggle */}
      <div className='bg-[#C40C0C] absolute p-4 flex items-center justify-between lg:hidden shadow-md'>
        <button
          className='text-white focus:outline-none'
          onClick={() => setShowMobileMenu(true)}
        >
          <Menu size={24} />
        </button>
        <h1 className='text-white font-semibold text-lg'>Menu</h1>
      </div>

      {showMobileMenu && (
        <div className='fixed inset-0 z-50 flex'>
          {/* Overlay */}
          <div
            className='fixed inset-0 bg-black bg-opacity-50'
            onClick={() => setShowMobileMenu(false)}
          ></div>

          {/* Drawer */}
          <div className='relative w-[280px] h-full bg-white shadow-lg p-5 rounded-tr-2xl rounded-br-2xl z-50'>
            {/* Close Button */}
            <div className='flex justify-end mb-4'>
              <button
                className='text-gray-600 hover:text-red-600 transition'
                onClick={() => setShowMobileMenu(false)}
              >
                ✕
              </button>
            </div>

            {/* Your Menu Items */}
            <MenuItems />
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
