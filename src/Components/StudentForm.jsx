import { useContext, useRef, useState } from "react";
import { IoCaretDown } from "react-icons/io5";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const StudentForm = ({ filteredData, studentCountry, uploadedFiles }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState("");

  const [formData, setFormData] = useState({
    passportNo: "",
    firstName: "",
    lastName: "",
    time: "",
    whatsappNumber: "",
    counsellorNumber: "",
    studentEmail: "",
    counsellorEmail: "",
    address: "",
    city: "",
    country: selectedOption,
    gender: "male",
    visaRefusal: "no",
    status: 'Application Received'
  });
  const recrutCoutryOptions = [
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
    setFormData({
      ...formData,
      country: option,
    });
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.passportNo) errors.passportNo = "This field is required";
    if (!formData.firstName) errors.firstName = "This field is required";
    if (!formData.lastName) errors.lastName = "This field is required";
    if (!formData.dob) errors.dob = "This field is required";
    if (!formData.whatsappNumber)
      errors.whatsappNumber = "This field is required";
    if (!formData.counsellorNumber)
      errors.counsellorNumber = "This field is required";
    if (!formData.studentEmail) errors.studentEmail = "This field is required";
    if (!formData.counsellorEmail)
      errors.counsellorEmail = "This field is required";
    if (!formData.address) errors.address = "This field is required";
    if (!formData.city) errors.city = "This field is required";
    if (!formData.country) errors.country = "This field is required";
    return errors;
  };

  const generateApplicationId = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to submit the application?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'No, cancel!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const currentDateTime = new Date();
          const submissionDetails = {
            submission_month: currentDateTime.toLocaleString("default", { month: "long" }),
            submission_time: currentDateTime.toLocaleTimeString(),
            submission_date: currentDateTime.toLocaleDateString(),
          };
          const applicationId = generateApplicationId();
          const student_data = {
            ...formData,
            Application_Id: applicationId,
            studentCountry,
            uploadedFiles,
            filteredData,
            submissionDetails,
            email: user?.email,
            Status: 'Pending'
          };
          console.log(student_data);
          const students = await axiosSecure.post('/students', student_data);
          console.log(students.data)
          if(students.data.insertedId){
            Swal.fire(
              'Success!',
              'Student has been successfully added.',
              'success'
            );
            navigate('/dashboard/applicationHistory')
          }
        }
      });
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white px-8 py-5 rounded-lg shadow-md w-full">
        <h2 className="text-base font-medium mb-6 text-gray-600">
          Please enter student details to process this application
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500">
                Student Passport No.
              </label>
              <input
                type="text"
                name="passportNo"
                value={formData.passportNo}
                placeholder="A099800"
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  validationErrors.passportNo
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {validationErrors.passportNo && (
                <span className="absolute text-red-500 text-xs">
                  {validationErrors.passportNo}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500">
                Date of birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                placeholder="Select date"
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  validationErrors.dob ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {validationErrors.dob && (
                <span className="absolute text-red-500 text-xs">
                  {validationErrors.dob}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500">
                Student First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="John"
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  validationErrors.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {validationErrors.firstName && (
                <span className="absolute text-red-500 text-xs">
                  {validationErrors.firstName}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500">
                Student Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Doe"
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  validationErrors.lastName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {validationErrors.lastName && (
                <span className="absolute text-red-500 text-xs">
                  {validationErrors.lastName}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500">
                Student WhatsApp Number
              </label>
              <input
                type="number"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                placeholder="+1234567890"
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  validationErrors.whatsappNumber
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {validationErrors.whatsappNumber && (
                <span className="absolute text-red-500 text-xs">
                  {validationErrors.whatsappNumber}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500">
                Counsellor Number
              </label>
              <input
                type="number"
                name="counsellorNumber"
                value={formData.counsellorNumber}
                placeholder="+1234567890"
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  validationErrors.counsellorNumber
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {validationErrors.counsellorNumber && (
                <span className="absolute text-red-500 text-xs">
                  {validationErrors.counsellorNumber}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500">
                Enter Student E-Mail ID
              </label>
              <input
                type="email"
                name="studentEmail"
                value={formData.studentEmail}
                placeholder="student@example.com"
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  validationErrors.studentEmail
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {validationErrors.studentEmail && (
                <span className="absolute text-red-500 text-xs">
                  {validationErrors.studentEmail}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500">
                Enter Counsellor E-Mail ID
              </label>
              <input
                type="email"
                name="counsellorEmail"
                value={formData.counsellorEmail}
                placeholder="counsellor@example.com"
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  validationErrors.counsellorEmail
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {validationErrors.counsellorEmail && (
                <span className="absolute text-red-500 text-xs">
                  {validationErrors.counsellorEmail}
                </span>
              )}
            </div>
            <div className="relative md:col-span-2">
              <label className="block text-sm font-medium text-gray-500">
              Student Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                placeholder="1234 Main St"
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  validationErrors.address
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {validationErrors.address && (
                <span className="absolute text-red-500 text-xs">
                  {validationErrors.address}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500">
              Student City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                placeholder="Anytown"
                onChange={handleChange}
                className={`mt-1 block w-full border ${
                  validationErrors.city ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {validationErrors.city && (
                <span className="absolute text-red-500 text-xs">
                  {validationErrors.city}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500">
              Student Country
              </label>
              <div className="relative">
                <div
                  className={`mt-1 block w-full border ${
                    validationErrors.country
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {selectedOption || "Select a country"}
                  <IoCaretDown className="ml-2 inline" />
                </div>
                {isOpen && (
                  <ul
                    ref={dropdownRef}
                    className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"
                  >
                    {recrutCoutryOptions.map((option) => (
                      <li
                        key={option}
                        className="cursor-pointer py-2 px-3 hover:bg-gray-100"
                        onClick={(e) => handleOptionClick(e, option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {validationErrors.country && (
                <span className="absolute text-red-500 text-xs">
                  {validationErrors.country}
                </span>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500">
                Gender
              </label>
              <div className="mt-1 flex">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Female
                </label>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500">
                Any Visa Refusal?
              </label>
              <div className="mt-1 flex">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="visaRefusal"
                    value="yes"
                    checked={formData.visaRefusal === "yes"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="visaRefusal"
                    value="no"
                    checked={formData.visaRefusal === "no"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
