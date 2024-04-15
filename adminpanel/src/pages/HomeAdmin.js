import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { HiUserCircle, HiOutlineClipboardList, HiOutlineCube, HiOutlineChartSquareBar, HiLogout, HiMenuAlt3, HiX } from 'react-icons/hi';
import axios from 'axios';
import DrawerInventory from '../components/DrawerInventory';
import DrawerSalesreport from '../components/DrawerSalesreport';
import { RadioGroup } from '@headlessui/react';

const HomeAdmin = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('dashboard'); // State to track selected tab
  const [showSidebar, setShowSidebar] = useState(true); // State to track sidebar visibility
  const sidebarRef = useRef(null); // Reference to the sidebar element
  const [showBurgerMenu, setShowBurgerMenu] = useState(false); // State to track burger menu visibility

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/logout');
      router.push('/'); // Redirect to the login page after logout
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      if (window.innerWidth > 768) {
        setShowBurgerMenu(true);
      } else {
        setShowSidebar(false);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 768); // Show sidebar for screen width > 768px
      if (window.innerWidth > 768) {
        setShowBurgerMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize sidebar visibility based on screen width

    document.addEventListener('mousedown', handleClickOutside); // Listen for clicks outside the sidebar

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside); // Clean up the event listener
    };
  }, []);

  return (
    <section className="min-h-screen flex">
      {/* Burger Menu Icon */}
      {showBurgerMenu && (
        <HiMenuAlt3 className="md:hidden fixed top-4 left-4 z-10 text-gray-800 cursor-pointer" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      {showSidebar && (
        <aside ref={sidebarRef} className="w-64 bg-gray-800 text-white flex flex-col">
          {/* Close Button */}
          <button onClick={toggleSidebar} className="absolute top-2 right-2 text-white-300 hover:text-white">
            <HiX className="w-6 h-6" />
          </button>
          {/* Company Info */}
          <div className="flex items-center justify-between p-4">
            <HiUserCircle className="w-14 h-14 mr-6" />
            <p className="font-semibold text-2xl">Nar's School Supplies</p>
          </div>
          {/* Menu Items */}
          <nav className="flex flex-col py-4 mt-6">
            <RadioGroup value={selectedTab} onChange={setSelectedTab}>
              <RadioGroup.Option value="dashboard">
                {({ active, checked }) => (
                  <a
                    href="#"
                    className={`flex items-center px-4 py-2 ${
                      checked ? 'bg-gray-700' : ''
                    } ${active ? 'text-white' : 'text-gray-300'}`}
                  >
                    <HiOutlineChartSquareBar className="w-6 h-6 mr-2" />
                    Dashboard
                  </a>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="inventory">
                {({ active, checked }) => (
                  <a
                    href="#"
                    className={`flex items-center px-4 py-2 ${
                      checked ? 'bg-gray-700' : ''
                    } ${active ? 'text-white' : 'text-gray-300'}`}
                  >
                    <HiOutlineCube className="w-6 h-6 mr-2" />
                    Inventory
                  </a>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="sales">
                {({ active, checked }) => (
                  <a
                    href="#"
                    className={`flex items-center px-4 py-2 ${
                      checked ? 'bg-gray-700' : ''
                    } ${active ? 'text-white' : 'text-gray-300'}`}
                  >
                    <HiOutlineClipboardList className="w-6 h-6 mr-2" />
                    Sales report
                  </a>
                )}
              </RadioGroup.Option>
            </RadioGroup>
            <div className="h-px bg-gray-600 my-4"></div> {/* Separator Line */}
            <button onClick={handleLogout} className="flex items-center px-4 py-2 hover:bg-red-700">
              <HiLogout className="w-6 h-6 mr-2" />
              Logout
            </button>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        {/* Your main content here */}
        {selectedTab === 'dashboard' && (
          <>
            <h1 className="text-3xl font-bold mb-8">Point of Sale Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sales Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Sales Summary</h2>
                {/* Placeholder content */}
                <p className="text-gray-700">Total Sales: Php 1.00</p>
                <p className="text-gray-700">Total Orders: Hinda ka nya mahal.</p>
              </div>
              {/* Inventory Status */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Inventory Status</h2>
                {/* Placeholder content */}
                <p className="text-gray-700">Total Products: 1</p>
                <p className="text-gray-700">Low Stock: Ba't ka pa umaasa?</p>
              </div>
            </div>
          </>
        )}
        {selectedTab === 'inventory' && <DrawerInventory />}
        {selectedTab === 'sales' && <DrawerSalesreport />}
      </main>
    </section>
  );
};

export default HomeAdmin;
