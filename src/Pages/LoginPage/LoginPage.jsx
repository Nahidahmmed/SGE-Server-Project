import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";

import { FaEye, FaEyeSlash } from "react-icons/fa6";

const LoginPage = () => {
  
  const { signIn, logOut,user } = useContext(AuthContext);

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
  const navigate = useNavigate();
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements._email.value;
    const password = event.target.elements._password.value;

    try {
      const result = await signIn(email, password); // Assuming signIn is a function that returns a promise
      const user = result.user;
      console.log(user);

      // Navigate to the main route after successful login
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }

    console.log("Login Form Data:", { email, password });

    // Reset form fields or perform further actions
    event.target.reset();
  };
 
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="flex">
      {user ? (
        <div>
          <p className="text-right">
            {user.email} <button onClick={handleLogout}>Logout</button>
          </p>
        </div>
      ) : (
        <div>
          <p>Please login</p>
        </div>
      )}
      <div className="w-[65%] bg-[#f8f7fa] h-screen hidden md:block lg:block">
        <p className="text-2xl font-bold text-gray-800 ml-[5%] mt-5">
          Shabuj global
        </p>
        <img
          className="w-[85%] mx-auto mt-[8%]"
          src="https://i.ibb.co/4VBjryY/login-image-Bqa-Ml-Rf-H.png"
          alt=""
        />
      </div>
      <div className="lg:mx-auto md:mx-auto mx-7 lg:w-[24%] md:w-[24%] w-full mt-[14%]">
      <form className="transition-all duration-300" onSubmit={handleLoginSubmit}>
      <div className="space-y-3">
        <p className="text-2xl font-semibold text-gray-700">
          Welcome to Shabuj Global! 👋🏻
        </p>
        <p className="text-gray-500">
          Please sign-in to your account and start the adventure
        </p>
      </div>
      <div className="mt-5">
        <label className="text-sm text-gray-700">Email</label>
        <input
          id="_email"
          type="email"
          placeholder="example@example.com"
          className="p-2 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-gray-300 focus:valid:border-[#7367f0] focus:valid:border-[3px]"
        />

        <label htmlFor="_password" className="text-sm text-gray-700 mt-5 block">
          Password
        </label>
        <div className="relative">
          <input
            id="_password"
            type={passwordVisible ? "text" : "password"}
            placeholder="........"
            minLength={6}
            className="p-2 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-gray-300 focus:valid:border-[#7367f0] focus:valid:border-[3px]"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-3 text-gray-600"
          >
            {passwordVisible ? <FaEyeSlash className="text-[#7367f0]"/> : <FaEye className="text-[#7367f0]"/>}
          </button>
        </div>
      </div>
      <label className="flex items-center cursor-pointer mt-5">
      <div
        className={`h-5 w-5 ml-2 border-2 border-gray-400 rounded-md flex items-center justify-center mr-2 cursor-pointer transition-colors duration-300 ${
          checked ? 'bg-[#7367f0] border-[#7367f0]' : ''
        }`}
        onClick={handleCheckboxChange}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
      <span className="text-gray-700">Remember me</span>
    </label>
      <button
        type="submit"
        className="py-2 px-5 mb-4 mx-auto w-full mt-8 shadow-lg bg rounded-md border-black block transition-all duration-300 bg-[#7367f0] text-white hover:bg-[#6256e6]"
      >
        Login
      </button>
      <p className="mb-3 text-center text-gray-500">
      New on our platform ?  
        <Link to="/register" className=" text-[#7367f0] ml-2">Create an account</Link>
      </p>
    </form>
      </div>
    </div>
  );
};

export default LoginPage;
