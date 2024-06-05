import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const LoginPage = () => {
  const axiosPublic = useAxiosPublic();

  const { signIn, googleSignIn } = useContext(AuthContext);

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
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        // role: "channel partner"
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      });
    });
  };
  // const handleLogout = () => {
  //   logOut()
  //     .then(() => {})
  //     .catch((error) => console.log(error));
  // };
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="flex">
      {/* {user ? (
        <div>
          <p className="text-right">
            {user.email} <button onClick={handleLogout}>Logout</button>
          </p>
        </div>
      ) : (
        <div>
          <p>Please login</p>
        </div>
      )} */}
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
      <hr />
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="py-2 px-5 mb-4 mt-8 mx-auto block shadow-lg border rounded-md border-black transition-all duration-300 hover:bg-gray-200"
      >
        <svg
          viewBox="-0.5 0 48 48"
          version="1.1"
          className="w-6 inline-block mr-3"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#000000"
        >
          <g strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <title>Google-color</title> <desc>Created with Sketch.</desc>
            <defs></defs>
            <g
              id="Icons"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Color-"
                transform="translate(-401.000000, -860.000000)"
              >
                <g
                  id="Google"
                  transform="translate(401.000000, 860.000000)"
                >
                  <path
                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                    id="Fill-1"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                    id="Fill-2"
                    fill="#EB4335"
                  ></path>
                  <path
                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                    id="Fill-3"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                    id="Fill-4"
                    fill="#4285F4"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        Continue with Google
      </button>
    </form>
      </div>
    </div>
  );
};

export default LoginPage;
