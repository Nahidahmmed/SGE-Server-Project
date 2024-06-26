import { useState, useEffect } from "react";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { LiaDotCircle } from "react-icons/lia";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, Outlet, useLocation } from "react-router-dom";
import Avatar from "../../Components/Avatar";

const Dashboard = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLGMenuOpen, setIsLGMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLGMenuOpen = () => setIsLGMenuOpen(!isLGMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 
  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 relative">
        {isMenuOpen && (
          <div
            id="overlay"
            className="fixed inset-0 bg-black bg-opacity-15 z-10"
            onClick={handleOutsideClick}
          ></div>
        )}
        <aside
          className={`fixed inset-y-0 left-0 w-64 transform transition-transform duration-300 ease-in-out bg-[#2f3349] ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 ${
            isLGMenuOpen
              ? "md:w-1/4 lg:w-[4%] translate-x-0"
              : "md:w-1/4 lg:w-[14%]"
          } z-20`}
        >
          <div className="flex justify-between items-center text-white p-4">
            <p
              className={`font-bold text-3xl ${
                isLGMenuOpen ? "hidden" : "block"
              }`}
            >
              Shabuj Global
            </p>
            <div className="flex items-center gap-2">
              <button
                className={`hidden lg:block md:block  ${isMenuOpen ? 'text-3xl' : 'text-3xl ml-2'}`}
                onClick={toggleLGMenuOpen}
              >
                <LiaDotCircle />
              </button>
            </div>
          </div>
          <nav>
            <ul
              className={`text-center text-gray-500 space-y-4 py-4 ${
                isLGMenuOpen ? "px-2 mt-1" : "px-2"
              }`}
            >
              <NavItem
                to="/"
                icon={<FaRegEnvelopeOpen />}
                label="Dashboard"
                active={location.pathname === "/"}
                isLGMenuOpen={isLGMenuOpen}
              />
             
              
                  <NavItem
                    to="/dashboard/newApplication"
                    icon={
                      <HiOutlineSquaresPlus className="transform scale-x-[-1] text-[22px]" />
                    }
                    label="Add New Application"
                    active={location.pathname === "/dashboard/newApplication"}
                    isLGMenuOpen={isLGMenuOpen}
                  />
                  <NavItem
                    to="/dashboard/applicationHistory"
                    icon={
                      <HiOutlineSquaresPlus className={`transform scale-x-[-1]  ${isMenuOpen ? 'text-[22px]' : 'text-xl'}`} />
                    }
                    label="Application History"
                    active={
                      location.pathname === "/dashboard/applicationHistory"
                    }
                    isLGMenuOpen={isLGMenuOpen}
                  />
                  <NavItem
                    to="/dashboard/FileUpload"
                    icon={
                      <HiOutlineSquaresPlus className={`transform scale-x-[-1]  ${isMenuOpen ? 'text-[22px]' : 'text-xl'}`} />
                    }
                    label="Upload University Data"
                    active={
                      location.pathname === "/dashboard/FileUpload"
                    }
                    isLGMenuOpen={isLGMenuOpen}
                  />
                
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4 bg-[#b267f00a] w-full">
          <div className="w-[85%] mx-auto">
            <header className="bg-white mb-4 flex justify-between items-center shadow-[0px_0px_10px_5px_rgba(50,70,70,0.1)] rounded-md p-3">
              <button
                className="text-black text-3xl lg:hidden md:hidden"
                onClick={toggleMenu}
              >
                <RxHamburgerMenu />
              </button>
              <div className="ml-auto">
                <Avatar />
              </div>
            </header>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, active, isLGMenuOpen }) => (
  <li className="flex items-center gap-4">
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 text-base rounded-md font-medium ${isLGMenuOpen ? 'mx-auto' : 'w-full'} transform transition-all duration-300 ease-in-out ${
        active
          ? "text-white bg-[#7367f0]"
          : "text-gray-300 hover:bg-gray-500 hover:bg-opacity-15"
      }`}
    >
      {icon}
      <span
        className={` ${
          isLGMenuOpen ? "hidden" : "opacity-100"
        }`}
      >
        {label}
      </span>
    </Link>
  </li>
);

export default Dashboard;