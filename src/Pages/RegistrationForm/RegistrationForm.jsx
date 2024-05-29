import { useEffect, useRef, useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { IoCaretDown } from "react-icons/io5";


export default function RegistrationForm() {
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "Nigeria", checked: false },
    { id: 2, label: "India", checked: false },
    { id: 3, label: "Bangladesh", checked: false },
    { id: 4, label: "Nepal", checked: false },
    { id: 5, label: "Bhutan", checked: false },
    { id: 6, label: "Ghana", checked: false },
    { id: 7, label: "Sri Lanka", checked: false },
  ]);

  const handleCheckboxChange = (id) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
      )
    );
  };

  const [selectedOption, setSelectedOption] = useState("Bangladesh");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    "Bangladesh",
    "Nigeria",
    "India",
    "Nepal",
    "Bhutan",
    "Ghana",
    "Sri Lanka",
  ];

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.checkboxes = checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.label);
    data.country = selectedOption;
    console.log("Form Data:", data);
    // You can also display the data in the UI or handle it as needed
  };

  return (
    <div className="w-full bg-gray-100 h-screen pt-10">
      <div className="bg-white w-[85%] mx-auto border-[1px] rounded-lg">
        <div>
          <img
            className="w-[40%] mx-auto mt-5"
            src="https://i.ibb.co/whkCsCJ/shabujglobal-banner.png"
            alt=""
          />
          <p className="text-center text-3xl my-5">Registration Form</p>
        </div>
        <div>
          <form className="bg-white p-6 m-2 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 text-black">
              <div>
                <label htmlFor="firstName" className="block text-sm ">
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
                  className="mt-1 w-full rounded-sm border border-gray-300 p-3 text-sm font-normal placeholder-gray-500 focus:border-blue-300 focus:outline-none"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm mt-7">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="mt-1 w-full rounded-sm border border-gray-300 p-3 text-sm font-normal placeholder-gray-500 focus:border-blue-300 focus:outline-none"
                  placeholder="Last Name"
                  required
                />
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
                  className="mt-1 w-full rounded-sm border border-gray-300 p-3 text-sm font-normal placeholder-gray-500 focus:border-blue-300 focus:outline-none"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm">
                  Mobile No
                </label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  className="mt-1 w-full rounded-sm border border-gray-300 p-3 text-sm font-normal placeholder-gray-500 focus:border-blue-300 focus:outline-none"
                  placeholder=" Mobile No"
                  required
                />
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-sm">
                  Whatsapp No
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  id="whatsapp"
                  className="mt-1 w-full rounded-sm border border-gray-300 p-3 text-sm font-normal placeholder-gray-500 focus:border-blue-300 focus:outline-none"
                  placeholder="Whatsapp No"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm">
                  <p className="text-base font-bold text-black mb-1">
                    Company Details
                  </p>
                  Company Name
                  <span className="ml-[2px] text-red-500 text-xs">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  className="mt-1 w-full rounded-sm border border-gray-300 p-3 text-sm font-normal placeholder-gray-500 focus:border-blue-300 focus:outline-none"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm mt-7">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  id="website"
                  className="mt-1 w-full rounded-sm border border-gray-300 p-3 text-sm font-normal placeholder-gray-500 focus:border-blue-300 focus:outline-none"
                  placeholder="Website"
                />
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
                  className="mt-1 w-full rounded-sm border border-gray-300 p-3 text-sm font-normal placeholder-gray-500 focus:border-blue-300 focus:outline-none"
                  placeholder=" Address"
                />
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
                  className="mt-1 w-full rounded-sm border border-gray-300 p-3 text-sm font-normal placeholder-gray-500 focus:border-blue-300 focus:outline-none"
                  placeholder="City"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="postcode" className="block text-sm">
                  Post Code
                  <span className="ml-[2px] text-red-500 text-xs">*</span>
                </label>
                <input
                  type="text"
                  name="postcode"
                  id="postcode"
                  className="mt-1 w-full rounded-sm border border-gray-300 p-3 text-sm font-normal placeholder-gray-500 focus:border-blue-300 focus:outline-none"
                  placeholder="Post Code"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                  <span className="ml-[2px] text-red-500 text-xs">*</span>
                </label>
                <div className="relative mt-1" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsOpen(!isOpen);
                    }}
                    className="w-full appearance-none rounded-sm border border-gray-300 bg-white py-3 px-4 pr-10 text-sm focus:border-blue-500 focus:outline-none cursor-pointer flex justify-between items-center"
                  >
                    {selectedOption}
                    <IoCaretDown className="text-gray-500 text-xs" />
                  </button>

                  {isOpen && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-sm mt-1 max-h-60 overflow-auto">
                      {options.map((option) => (
                        <li
                          key={option}
                          onClick={(event) => handleOptionClick(event, option)}
                          className="cursor-pointer py-2 px-4 hover:bg-[#392c70] hover:text-white"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div>
              <p className="text-base font-bold text-black mb-2">
                Company Details
              </p>
              <div className="grid grid-cols-7 gap-1 w-[50%]">
                {checkboxes.map((checkbox) => (
                  <label
                    key={checkbox.id}
                    className="flex items-center relative mx-auto"
                  >
                    <input
                      type="checkbox"
                      className="opacity-0 absolute h-5 w-5"
                      checked={checkbox.checked}
                      onChange={() => handleCheckboxChange(checkbox.id)}
                    />
                    <div
                      className={`w-5 h-5 border-2 rounded-sm border-gray-200 flex justify-center items-center`}
                    >
                      {checkbox.checked && <IoIosCheckmark className="" />}
                    </div>
                    <span className="ml-2 text-sm text-gray-700">
                      {checkbox.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="w-full items-center">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#392c70] hover:bg-[#2c2257] w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
