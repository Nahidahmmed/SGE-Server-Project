import { useState, useEffect } from "react";
import { FaHouseChimney } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
const Dashboard = () => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <img className="w-[250px]" src="https://i.ibb.co/whkCsCJ/shabujglobal-banner.png" alt="" />
        <button className="md:hidden" onClick={toggleMenu}>
          ☰
        </button>
        <button className="hidden md:block" onClick={toggleLGMenuOpen}>
          ☰
        </button>
      </header>
      <div className="flex flex-1 relative">
        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={closeMenu}
          ></div>
        )}
        <aside
          className={`fixed inset-y-0 right-0 w-64 transform transition-all duration-500 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:relative md:translate-x-0 ${
            isLGMenuOpen
              ? "md:w-1/4 lg:w-[5%] translate-x-0"
              : "md:w-1/4 lg:w-1/6"
          } p-4 z-20`}
        >
          <nav>
            <ul className="text-center text-gray-600">
              <li className="flex items-center gap-4">
                <FaHouseChimney />{" "}
                <a href="#" className="block py-2">
                  Home
                </a>
              </li>
              <li className="flex items-center gap-4">
                <FaPlusCircle />{" "}
                <a href="#" className="block py-2">
                  Profile
                </a>
              </li>
              <li className="flex items-center gap-4">
                <FaPlusCircle />
                <a href="#" className="block py-2">
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4 bg-gray-100">
          <div className="bg-white">
          <h2 className="text-2xl">Main Content</h2>
          {/* Add your main content here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
