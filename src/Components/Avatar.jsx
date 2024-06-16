import { useState, useEffect, useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import useAdmin from "../hooks/useAdmin";
import useCounselor from "../hooks/useCounselor";
import usePartner from "../hooks/usePartner";
import { AuthContext } from "../Providers/AuthProviders";

const Avatar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {  logOut } = useContext(AuthContext);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.closest("#menu-container") === null) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener("click", handleOutsideClick);
      // Prevent scrollbar when menu is open
      document.body.style.overflow = "hidden";
    } else {
      window.removeEventListener("click", handleOutsideClick);
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const [isAdmin] = useAdmin();
  const [isCounselor] = useCounselor();
  const [isPartner] = usePartner();
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className="relative" id="menu-container">
      <button
        onClick={toggleMenu}
        className="flex text-[#7367f0] items-center p-2 bg-[#7267f034] rounded-full"
      >
        <LuUser className="text-2xl" />
      </button>
      {isMenuOpen && (
        <div className="absolute right-1 mt-5 w-64 bg-white border rounded-lg shadow-lg z-10 animate-grow">
          <ul className="py-2">
            <li className="flex items-center gap-5 ml-3 p-4">
              <button className="flex text-[#7367f0] items-center p-2 bg-[#7267f034] rounded-full">
                <LuUser className="text-2xl" />
              </button>
              <span>
                {isAdmin && "Admin "}
                {isCounselor && "Counselor "}
                {isPartner && "Partner "}
              </span>
            </li>

            <li>
              <button  onClick={handleLogout} className="flex items-center mx-auto rounded-lg p-3 text-white bg-red-500 w-[80%]">
                <p className="flex items-center gap-3 mx-auto">
                  Logout
                  <FaSignOutAlt className="mr-3" />
                </p>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Avatar;
