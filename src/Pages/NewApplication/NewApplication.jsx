import { useEffect, useRef, useState } from "react";
import DropdownInput from "../../Components/DropdownInput";
import { IoCaretDown } from "react-icons/io5";

const NewApplication = ({ data, loading, error, onNext }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    country: "",
    intake: "",
    courseType: "",
    university: "",
    courseName: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [universityOptions, setUniversityOptions] = useState([]);
  const [courseNames, setCourseNames] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const dropdownRef = useRef(null);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = data;

      // Apply filters based on selected options
      if (selectedFilters.country) {
        filtered = filtered.filter(
          (item) => item.UK === selectedFilters.country
        );
      }
      if (selectedFilters.intake) {
        filtered = filtered.filter(
          (item) => item["Intake List"] === selectedFilters.intake
        );
      }
      if (selectedFilters.courseType) {
        filtered = filtered.filter(
          (item) => item["Course Type"] === selectedFilters.courseType
        );
      }
      if (selectedFilters.university) {
        filtered = filtered.filter(
          (item) => item["University Name"] === selectedFilters.university
        );
      }
      if (selectedFilters.courseName) {
        filtered = filtered.filter(
          (item) => item["Course Name"] === selectedFilters.courseName
        );
      }
      filtered = filtered.filter((item) => item["University Name"] !== "");
      setFilteredData(filtered);
    };

    applyFilters();
  }, [selectedFilters, data]);

  useEffect(() => {
    const filteredUniversities = data
      .filter((item) => {
        let match = true;
        if (selectedFilters.country && item.UK !== selectedFilters.country) {
          match = false;
        }
        if (
          selectedFilters.intake &&
          item["Intake List"] !== selectedFilters.intake
        ) {
          match = false;
        }
        if (
          selectedFilters.courseType &&
          item["Course Type"] !== selectedFilters.courseType
        ) {
          match = false;
        }
        return match;
      })
      .map((item) => item["University Name"]);

    const uniqueUniversities = [...new Set(filteredUniversities)];
    setUniversityOptions(uniqueUniversities);
  }, [selectedFilters, data]);

  useEffect(() => {
    if (selectedFilters.university) {
      const universityData = data.filter(
        (item) => item["University Name"] === selectedFilters.university
      );
      if (universityData.length > 0) {
        const courses = [
          ...new Set(universityData.map((item) => item["Course Name"])),
        ];
        setCourseNames(courses);
      } else {
        setCourseNames([]);
      }
    } else {
      setCourseNames([]);
    }
  }, [selectedFilters.university, data]);

  const handleOptionClick = (event, option) => {
    event.stopPropagation();
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleFilterData = () => {
    // Reset validation errors
    setValidationErrors({});

    // Check for empty fields
    const errors = {};
    if (!selectedFilters.country) errors.country = true;
    if (!selectedFilters.intake) errors.intake = true;
    if (!selectedFilters.courseType) errors.courseType = true;
    if (!selectedFilters.university) errors.university = true;
    if (!selectedFilters.courseName) errors.courseName = true;
    if (!selectedOption) errors.studentPassportCountry = true;

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      onNext(filteredData, selectedOption);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-10 mx-auto p-10 bg-white shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)] rounded-md">
      <h1 className="text-2xl font-bold mb-4">New Application</h1>
      <div className="grid grid-cols-2 gap-10">
        <DropdownInput
          label="Country to Apply"
          options={getCountries(data)}
          value={selectedFilters.country}
          onChange={(value) =>
            setSelectedFilters({ ...selectedFilters, country: value })
          }
          hasError={validationErrors.country}
        />
        <div>
          <label htmlFor="country" className="block text-sm">
            Country of Student Passport
          </label>
          <div ref={dropdownRef} className="relative mt-1">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full h-10 px-2 py-[6px] rounded-md hover:border-gray-500 transition-all transform duration-300 focus:border-[#7367f0] focus:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] border ${
                validationErrors.studentPassportCountry
                  ? "border-red-500"
                  : "border-gray-300"
              } text-left text-gray-500 focus:outline-none`}
            >
              {selectedOption}
              <IoCaretDown className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" />
            </button>
            {isOpen && (
              <ul className="absolute z-10 w-full top-[40px] bg-white border border-gray-300 rounded-md shadow-[0px_0px_10px_2px_rgba(50,70,70,0.1)]">
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
        <DropdownInput
          label="Intake"
          options={getIntakes(data)}
          value={selectedFilters.intake}
          onChange={(value) =>
            setSelectedFilters({ ...selectedFilters, intake: value })
          }
          hasError={validationErrors.intake}
        />
        <DropdownInput
          label="Course Type"
          options={[getCourseTypes(data)[1], getCourseTypes(data)[2]]}
          value={selectedFilters.courseType}
          onChange={(value) =>
            setSelectedFilters({ ...selectedFilters, courseType: value })
          }
          hasError={validationErrors.courseType}
        />
        <DropdownInput
          label="Universities"
          options={universityOptions}
          value={selectedFilters.university}
          onChange={(value) =>
            setSelectedFilters({ ...selectedFilters, university: value })
          }
          maxHeight={200} // Set the maximum height here
          hasError={validationErrors.university}
        />
        <DropdownInput
          label="Course Name"
          options={courseNames}
          value={selectedFilters.courseName}
          onChange={(value) =>
            setSelectedFilters({ ...selectedFilters, courseName: value })
          }
          hasError={validationErrors.courseName}
        />
      </div>
      <button
        type="button"
        className="bg-[#7367f0] mt-10 ml-[95%] text-white py-2 px-4 rounded"
        onClick={handleFilterData}
      >
        Next
      </button>
    </div>
  );
};

// Utility functions to extract unique values
const getCountries = (data) => [...new Set(data.map((item) => item.UK))];
const getIntakes = (data) => [
  ...new Set(data.map((item) => item["Intake List"])),
];
const getCourseTypes = (data) => [
  ...new Set(data.map((item) => item["Course Type"])),
];

export default NewApplication;

const recrutCoutryOptions = [
  "Bangladesh",
  "Nigeria",
  "India",
  "Nepal",
  "Bhutan",
  "Ghana",
  "Sri Lanka",
];
