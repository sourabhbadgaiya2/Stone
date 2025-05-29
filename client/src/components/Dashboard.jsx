import React, { useState } from 'react';
import {
  FiHome, FiUsers, FiShoppingBag, FiLayers,
  FiPackage, FiPieChart, FiFileText, FiLogOut,
  FiChevronLeft, FiChevronRight, FiMenu, FiBell,
  FiSearch, FiUser
} from 'react-icons/fi';

import DashboardCards from './DashboardCards';
import ProductionEntryForm from './Sidebar/ProductionEntryForm';
import VendorMaster from './Sidebar/VendorMaster';
import Inventory from './Sidebar/Inventory';
// import PurchaseOrder from '../pages/PurchaseOrder';
// import BOM from '../pages/BOM';
// import Inventory from '../pages/Inventory';
// import Invoicing from '../pages/Invoicing';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('Dashboard');

  const mainMenu = [
    { name: 'Dashboard', icon: <FiHome size={20} /> },
    { name: 'Vendor Master', icon: <FiUsers size={20} /> },
    { name: 'Purchase Order', icon: <FiShoppingBag size={20} /> },
    { name: 'BOM', icon: <FiLayers size={20} /> },
    { name: 'Production Entry', icon: <FiPackage size={20} /> },
    { name: 'Inventory', icon: <FiPieChart size={20} /> },
    { name: 'Invoicing', icon: <FiFileText size={20} /> }
  ];

  const generalMenu = [
    { name: 'Logout', icon: <FiLogOut size={20} /> }
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case 'Dashboard':
        return (
          <div className="m-2  ">
            <DashboardCards />
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Activity</h3>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Quick Actions</h3>
              </div>
            </div>
          </div>
        );
      case 'Vendor Master':
        return <VendorMaster />;
      case 'Purchase Order':
        // return <PurchaseOrder />;
      case 'BOM':
        // return <BOM />;
      case 'Production Entry':
        return <ProductionEntryForm />;
      case 'Inventory':
        return <Inventory />; 
      case 'Invoicing':
        // return <Invoicing />;
      case 'Logout':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-w ">You have been logged out.</h2>
          </div>
        );
      default:
        return (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">{selectedSection}</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-4">
              Content for {selectedSection} will appear here
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-200 overflow-hidden">
      {/* Topbar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#20253C] text-white backdrop-blur-sm shadow-sm z-30 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center bg-[]">
          <button
            className="md:hidden mr-4 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            <FiMenu size={20} />
          </button>
          <h1 className="text-xl font-bold text-[] flex items-center">
            <span className="bg-blue-600 text-white p-1 rounded mr-2">
              <FiPackage size={18} />
            </span>
            StoneERP
          </h1>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900 relative">
            <FiBell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
              <FiUser size={16} />
            </div>
            <span className="ml-2 hidden md:inline text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          fixed md:relative inset-y-0 left-0 h-full bg-[#20253C] shadow-lg z-20
          transition-all duration-300 ease-in-out
          flex flex-col pt-16 border-r border-gray-100
        `}
      >
        {!sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="hidden md:flex absolute -right-3 top-20 bg-white rounded-full shadow-md p-1 border"
          >
            <FiChevronLeft size={16} />
          </button>
        )}
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="hidden md:flex absolute -right-3 top-20 bg-white rounded-full shadow-md p-1 border"
          >
            <FiChevronRight size={16} />
          </button>
        )}

        <div className="overflow-y-auto flex-1 py-4">
          <div className="px-4">
            {!sidebarCollapsed && (
              <h2 className="text-xs uppercase text-gray-500 font-medium tracking-wider mb-2 px-2">Main Menu</h2>
            )}
            <ul className="space-y-1">
              {mainMenu.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      setSelectedSection(item.name);
                      setMobileSidebarOpen(false);
                    }}
                    className={`
                      w-full flex  items-center p-3 rounded-lg
                      ${selectedSection === item.name
                        ? 'bg-white text-black font-medium'
                        : 'text-white hover:bg-gray-100'}
                      transition-all
                      ${sidebarCollapsed ? 'justify-center' : ''}
                    `}
                  >
                    <span className={`${selectedSection === item.name ? 'text-black' : 'text-white'}`}>
                      {item.icon}
                    </span>
                    {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 px-4">
            {!sidebarCollapsed && (
              <h2 className="text-xs uppercase text-gray-500 font-medium tracking-wider mb-2 px-2">General</h2>
            )}
            <ul className="space-y-1">
              {generalMenu.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setSelectedSection(item.name)}
                    className={`
                      w-full flex items-center p-3 rounded-lg 
                      ${selectedSection === item.name
                        ? 'bg-white text-black font-medium'
                        : 'text-white hover:bg-gray-100'}
                      transition-all
                      ${sidebarCollapsed ? 'justify-center' : ''}
                    `}
                  >
                    <span className={`${selectedSection === item.name ? 'text-black' : 'text-w'}`}>
                      {item.icon}
                    </span>
                    {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-500">
            StoneERP v1.0.0
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className={`
          flex-1 overflow-y-auto pt-20 px-6
          transition-all duration-300
          ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-5'}
        `}
      >
        {renderSection()}
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
