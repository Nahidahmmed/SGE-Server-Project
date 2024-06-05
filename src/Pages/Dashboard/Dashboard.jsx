import { useState, useEffect } from "react";
import { FaHouseChimney } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useCounselor from "../../hooks/useCounselor";
import usePartner from "../../hooks/usePartner";

const Dashboard = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isLGMenuOpen, setIsLGMenuOpen] = useState(false);

  const toggleLGMenuOpen = () => {
    setIsLGMenuOpen(!isLGMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close the menu when the window is resized to a wider viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isAdmin] = useAdmin();
  const [isCounselor] = useCounselor();
  const [isPartner] = usePartner();
  console.log(isAdmin, isCounselor, isPartner);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <div className="lg:flex md:flex flex flex-row-reverse">
          <img
            className="w-[230px] lg:ml-3 md:ml-3 ml-24"
            src="https://i.ibb.co/whkCsCJ/shabujglobal-banner.png"
            alt=""
          />
          <button className="md:hidden text-3xl mr-4 lg:ml-0 md:ml-0 ml-4" onClick={toggleMenu}>
            <IoMenu />
          </button>
        </div>
        <button className="hidden md:block mr-auto ml-10 text-3xl" onClick={toggleLGMenuOpen}>
          <IoMenu />
        </button>
      </header>
      <div className="flex flex-1 relative">
        {/* Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-10 md:hidden" onClick={closeMenu}></div>
        )}
        <aside
          className={`fixed inset-y-0 right-0 w-64 transform transition-all duration-300 bg-[#2f3349] ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:relative md:translate-x-0 ${
            isLGMenuOpen ? "md:w-1/4 lg:w-[4%] translate-x-0" : "md:w-1/4 lg:w-[14%]"
          } z-20`}
        >
          <nav>
            <ul className={`text-center text-gray-500 ${isLGMenuOpen ? 'px-7 py-3 space-y-7 pt-6' : 'px-8 py-3 space-y-2'}`}>
              <li className="flex items-center gap-6">
                <Link
                  to="/"
                  className={`flex items-center gap-5 py-2 text-base ${
                    location.pathname === '/' ? 'text-blue-500' : 'text-gray-500'
                  }`}
                >
                  <FaHouseChimney />
                  <span className={`${isLGMenuOpen ? 'hidden' : 'block'}`}>Dashboard</span>
                </Link>
              </li>
              {isAdmin && (
                <>
                  <li className="flex items-center gap-6">
                    <Link
                      to="/dashboard/newApplication"
                      className={`flex items-center gap-5 py-2 text-base ${
                        location.pathname === '/dashboard/newApplication' ? 'text-blue-500' : 'text-gray-500'
                      }`}
                    >
                      <FaPlusCircle />
                      <span className={`${isLGMenuOpen ? 'hidden' : 'block'}`}>Add New Application</span>
                    </Link>
                  </li>
                  <li className="flex items-center gap-6">
                    <Link
                      to="/dashboard/applicationHistory"
                      className={`flex items-center gap-5 py-2 text-base ${
                        location.pathname === '/dashboard/applicationHistory' ? 'text-blue-500' : 'text-gray-500'
                      }`}
                    >
                      <FaPlusCircle />
                      <span className={`${isLGMenuOpen ? 'hidden' : 'block'}`}>Application History</span>
                    </Link>
                  </li>
                </>
              )}
              {isCounselor && (
                <>
                  <li className="flex items-center gap-6">
                    <Link
                      to="/dashboard/counselorPage1"
                      className={`flex items-center gap-5 py-2 text-base ${
                        location.pathname === '/dashboard/counselorPage1' ? 'text-blue-500' : 'text-gray-500'
                      }`}
                    >
                      <FaPlusCircle />
                      <span className={`${isLGMenuOpen ? 'hidden' : 'block'}`}>Counselor Page 1</span>
                    </Link>
                  </li>
                  <li className="flex items-center gap-6">
                    <Link
                      to="/dashboard/counselorPage2"
                      className={`flex items-center gap-5 py-2 text-base ${
                        location.pathname === '/dashboard/counselorPage2' ? 'text-blue-500' : 'text-gray-500'
                      }`}
                    >
                      <FaPlusCircle />
                      <span className={`${isLGMenuOpen ? 'hidden' : 'block'}`}>Counselor Page 2</span>
                    </Link>
                  </li>
                </>
              )}
              {isPartner && (
                <>
                  <li className="flex items-center gap-6">
                    <Link
                      to="/dashboard/partnerPage1"
                      className={`flex items-center gap-5 py-2 text-base ${
                        location.pathname === '/dashboard/partnerPage1' ? 'text-blue-500' : 'text-gray-500'
                      }`}
                    >
                      <FaPlusCircle />
                      <span className={`${isLGMenuOpen ? 'hidden' : 'block'}`}>Partner Page 1</span>
                    </Link>
                  </li>
                  <li className="flex items-center gap-6">
                    <Link
                      to="/dashboard/partnerPage2"
                      className={`flex items-center gap-5 py-2 text-base ${
                        location.pathname === '/dashboard/partnerPage2' ? 'text-blue-500' : 'text-gray-500'
                      }`}
                    >
                      <FaPlusCircle />
                      <span className={`${isLGMenuOpen ? 'hidden' : 'block'}`}>Partner Page 2</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4 bg-gray-100">
          <div className="">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
