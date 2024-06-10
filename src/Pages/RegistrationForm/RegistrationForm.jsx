import { useContext, useEffect, useRef, useState } from "react";
import { IoCaretDown } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";
import Swal from "sweetalert2";

export default function RegistrationForm() {
  const axiosPublic = useAxiosPublic();
  const { createUser, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    whatsapp: "",
    company: "",
    website: "",
    address: "",
    city: "",
    postcode: "",
    country: "Bangladesh",
    products: [],
  });

  const [inputValidity, setInputValidity] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    confirmPassword: true,
    mobile: true,
    whatsapp: true,
    company: true,
    website: true,
    address: true,
    city: true,
    postcode: true,
    products: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // location
  const [country, setCountry] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const dropdownRef = useRef(null);

  const recrutCoutryOptions = [
    "Bangladesh",
    "Nigeria",
    "India",
    "Nepal",
    "Bhutan",
    "Ghana",
    "Sri Lanka",
  ];

  useEffect(() => {
    const fetchLocation = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            try {
              const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=feff5c9dda8840418f8728c5b955c927`
              );
              console.log("API Response:", response);

              if (response.data.results && response.data.results.length > 0) {
                const Country = response.data.results[0].components.country;
                setCountry(Country);
                setSelectedOption(Country);
                setIsLoaded(true);
              }
            } catch (error) {
              console.error("Failed to fetch country data:", error);
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      } else {
        console.error("Geolocation is not available");
      }
    };

    fetchLocation();
  }, []);

  const handleOptionClick = (event, option) => {
    event.stopPropagation();
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const isValid = value.trim() !== "";
    setInputValidity((prevValidity) => ({
      ...prevValidity,
      [name]: isValid,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const isValid = value.trim() !== "";
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setInputValidity((prevValidity) => ({
      ...prevValidity,
      [name]: isValid,
    }));

    if (name === "confirmPassword") {
      setInputValidity((prevValidity) => ({
        ...prevValidity,
        confirmPassword: value === formData.password,
      }));
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updatedProducts = checked
      ? [...formData.products, value]
      : formData.products.filter((product) => product !== value);

    setFormData((prevData) => ({
      ...prevData,
      products: updatedProducts,
    }));

    setInputValidity((prevValidity) => ({
      ...prevValidity,
      products: updatedProducts.length > 0,
    }));
  };

  const submitFormData = async (data) => {
    try {
      const result = await createUser(data.email, data.confirmPassword); // Assuming createUser is a function that returns a promise
      const loggedUser = result.user;
      console.log(loggedUser);
      const fullName = `${data.firstName} ${data.lastName}`;
      const userInfo = {
        name: fullName,
        email: data.email,
        password: data.confirmPassword,
        company_name: data.company,
        address: data.address,
        city: data.city,
        post_code: data.postcode,
        country: data.country,
        recruiting_country: data.products,
        role: "channel partner",
      };
      const response = await axiosPublic.post("/users", userInfo);

      if (response.data.insertedId) {
        console.log("User added to database");
        // Display SweetAlert
        Swal.fire({
          title: "Success",
          text: "You have successfully registered! Redirecting to login...",
          icon: "success",
          timer: 3000, // 3 seconds
          timerProgressBar: true,
          didClose: () => {
            // Navigate to login after the alert is closed
            navigate("/login");
          },
        });

        logOut()
          .then(() => {})
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        title: "Error",
        text: "Registration failed. Please try again.",
        icon: "error",
        didClose: () => {
          // Navigate to login after the alert is closed
          navigate("/register");
        },
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValid = Object.values(inputValidity).every((valid) => valid);
    if (!isFormValid) {
      console.log("Form has errors. Cannot submit.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setInputValidity((prevValidity) => ({
        ...prevValidity,
        confirmPassword: false,
      }));
      console.log("Passwords do not match. Cannot submit.");
      return;
    }
    console.log("Form Data:", formData);
    submitFormData(formData);
  };

  return (
    <div className="w-full h-screen">
      <div className="bg-[#f5f4f8]">
        <p className="text-2xl font-bold text-gray-800 ml-[5%] pt-7">
          Shabuj global
        </p>
      </div>

      <div className="bg-white w-[62%] mx-auto shadow-[0px_0px_10px_2px_rgba(50,70,70,0.1)] my-5 rounded-lg">
        <div>
          <form className="bg-white p-6 m-2 space-y-6" onSubmit={handleSubmit}>
            <p className="text-2xl my-5">Register User</p>
            <div className="grid grid-cols-2 gap-4 text-black">
              <div>
                <label htmlFor="firstName" className="block text-sm">
                  <p className="text-base font-bold text-black mb-1">
                    Personal Information
                  </p>
                  First Name
                  <span className="ml-[2px] text-red-500 text-xs">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`mt-1 px-2 py-[6px] block w-full outline-none border rounded-md ${
                    inputValidity.firstName
                      ? "border-gray-200 hover:border-gray-400 transition-all transform duration-300 focus:valid:border-[#7367f0] focus:valid:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] "
                      : "border-red-500 border-[3px] shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)]"
                  }`}
                  placeholder="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                />
                {!inputValidity.firstName && (
                  <p className="text-red-700 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm mt-7">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={`mt-1 px-2 py-[6px] block w-full outline-none border rounded-md ${
                    inputValidity.lastName
                      ? "border-gray-300 hover:border-gray-500 transition-all transform duration-300 focus:valid:border-[#7367f0] focus:valid:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] "
                      : "border-red-500 border-[3px] shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)]"
                  }`}
                  placeholder="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                />
                {!inputValidity.lastName && (
                  <p className="text-red-700 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm">
                  Email
                  <span className="ml-[2px] text-red-500 text-xs">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`mt-1 px-2 py-[6px] w-full rounded-md border ${
                    inputValidity.email
                      ? "border-gray-300 hover:border-gray-500 transition-all transform duration-300 focus:valid:border-[#7367f0] focus:valid:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] "
                      : "border-red-500 border-[3px] shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)]"
                  }`}
                  placeholder="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                />
                {!inputValidity.email && (
                  <p className="text-red-700 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm">
                  Mobile No
                </label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  className={`mt-1 w-full px-2 py-[6px] rounded-md border ${
                    inputValidity.mobile
                      ? "border-gray-300 hover:border-gray-500 transition-all transform duration-300 focus:valid:border-[#7367f0] focus:valid:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] "
                      : "border-red-500 border-[3px] shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)]"
                  } `}
                  placeholder=" Mobile No"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                />
                {!inputValidity.mobile && (
                  <p className="text-red-700 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-sm">
                  Whatsapp No
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  id="whatsapp"
                  className={`mt-1 w-full px-2 py-[6px] rounded-md border ${
                    inputValidity.whatsapp
                      ? "border-gray-300 hover:border-gray-500 transition-all transform duration-300 focus:valid:border-[#7367f0] focus:valid:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] "
                      : "border-red-500 border-[3px] shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)]"
                  } `}
                  placeholder=" Whatsapp No"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                />
                {!inputValidity.whatsapp && (
                  <p className="text-red-700 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label htmlFor="password" className="block text-sm">
                  Password
                  <span className="ml-[2px] text-red-500 text-xs">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className={`mt-1 w-full px-2 py-[6px] rounded-md border ${
                      inputValidity.password
                        ? "border-gray-300 hover:border-gray-500 transition-all transform duration-300 focus:valid:border-[#7367f0] focus:valid:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] "
                        : "border-red-500 border-[3px] shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)]"
                    } `}
                    placeholder="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </div>
                </div>
                {!inputValidity.password && (
                  <p className="text-red-700 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm">
                  Confirm Password
                  <span className="ml-[2px] text-red-500 text-xs">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    className={`mt-1 w-full px-2 py-[6px] rounded-md border ${
                      inputValidity.confirmPassword
                        ? "border-gray-300 hover:border-gray-500 transition-all transform duration-300 focus:valid:border-[#7367f0] focus:valid:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] "
                        : "border-red-500 border-[3px] shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)]"
                    } `}
                    placeholder="Confirm Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </div>
                </div>
                {!inputValidity.confirmPassword && (
                  <p className="text-red-700 text-xs mt-1">
                    {formData.confirmPassword === ""
                      ? "This field is required"
                      : "Passwords do not match"}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm">
                  Company Name
                  <span className="ml-[2px] text-red-500 text-xs">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  className={`mt-1 w-full px-2 py-[6px] rounded-md border ${
                    inputValidity.company
                      ? "border-gray-300 hover:border-gray-500 transition-all transform duration-300 focus:valid:border-[#7367f0] focus:valid:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] "
                      : "border-red-500 border-[3px] shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)]"
                  } `}
                  placeholder="Company Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!inputValidity.company && (
                  <p className="text-red-700 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="website" className="block text-sm">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  className={`mt-1 w-full px-2 py-[6px] rounded-md border ${
                    inputValidity.website
                      ? "border-gray-300 hover:border-gray-500 transition-all transform duration-300 focus:valid:border-[#7367f0] focus:valid:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] "
                      : "border-red-500 border-[3px] shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)]"
                  } `}
                  placeholder="Website"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!inputValidity.website && (
                  <p className="text-red-700 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="address" className="block text-sm">
                  Address
                  <span className="ml-[2px] text-red-500 text-xs">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className={`mt-1 w-full px-2 py-[6px] rounded-md border ${
                    inputValidity.address
                      ? "border-gray-300 hover:border-gray-500 transition-all transform duration-300 focus:valid:border-[#7367f0] focus:valid:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] "
                      : "border-red-500 border-[3px] shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)]"
                  } `}
                  placeholder="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!inputValidity.address && (
                  <p className="text-red-700 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm">
                  City
                  <span className="ml-[2px] text-red-500 text-xs">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className={`mt-1 w-full px-2 py-[6px] rounded-md border ${
                    inputValidity.city
                      ? "border-gray-300 hover:border-gray-500 transition-all transform duration-300 focus:valid:border-[#7367f0] focus:valid:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] "
                      : "border-red-500 border-[3px] shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)]"
                  } `}
                  placeholder="City"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!inputValidity.city && (
                  <p className="text-red-700 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="postcode" className="block text-sm">
                  Postcode
                  <span className="ml-[2px] text-red-500 text-xs">*</span>
                </label>
                <input
                  type="text"
                  name="postcode"
                  id="postcode"
                  className={`mt-1 w-full px-2 py-[6px] rounded-md border ${
                    inputValidity.postcode
                      ? "border-gray-300 hover:border-gray-500 transition-all transform duration-300 focus:valid:border-[#7367f0] focus:valid:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] "
                      : "border-red-500 border-[3px] shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)]"
                  } `}
                  placeholder="Postcode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!inputValidity.postcode && (
                  <p className="text-red-700 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="country" className="block text-sm">
                  Country
                  <span className="ml-[2px] text-red-500 text-xs">*</span>
                </label>
                <div ref={dropdownRef} className="relative mt-1">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-2 py-[6px] rounded-md hover:border-gray-500 transition-all transform duration-300 focus:border-[#7367f0] focus:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] border border-gray-300 text-left text-gray-500 focus:outline-none"
                  >
                    {selectedOption ? selectedOption : "please select a country"}
                    <IoCaretDown className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" />
                  </button>
                  {isOpen && (
                    <ul className="absolute z-10 w-full -top-[338px] bg-white border border-gray-300 rounded-md shadow-[0px_0px_10px_2px_rgba(50,70,70,0.1)]">
                      {recrutCoutryOptions.map((option) => (
                        <li
                          key={option}
                          onClick={(event) => handleOptionClick(event, option)}
                          className="cursor-pointer mx-3 my-3  px-3 py-[5px] hover:bg-gray-100 rounded-lg text-gray-500"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="block text-md font-bold">
                Country you recruit for *
              </p>
              <div className="flex gap-4 mt-2">
                {recrutCoutryOptions.map((country) => (
                  <label key={country} className="flex items-center space-x-2">
                    <div
                      className={`h-5 w-5 ml-2 border-2 rounded-[5px] flex items-center justify-center mr-2 cursor-pointer transition-colors duration-300 ${
                        formData.products.includes(country)
                          ? "bg-[#7367f0] border-[#7367f0]"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        handleCheckboxChange({
                          target: {
                            value: country,
                            checked: !formData.products.includes(country),
                          },
                        })
                      }
                    >
                      {formData.products.includes(country) && (
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
                    <span className="text-gray-700">{country}</span>
                  </label>
                ))}
              </div>
              {!inputValidity.products && (
                <p className="text-red-700 text-xs mt-1">
                  At least one product must be selected
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#7367f0] w-full text-white px-2 py-[6px] rounded-md hover:bg-[#5e53d1]"
            >
              Sign Up
            </button>
            <p className=" text-center text-gray-500">
              Already have an account?
              <Link to="/login" className=" text-[#7367f0] ml-2">
                Sign in instead
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
