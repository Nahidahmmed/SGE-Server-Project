import { useState } from "react";
import { IoCaretDown } from "react-icons/io5";

const DropdownInput = ({ label, options, value, onChange, maxHeight,hasError }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div>
      <label htmlFor={label} className="block text-sm">
        {label}
      </label>
      <div className="relative mt-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-10 px-2 py-[6px] rounded-md hover:border-gray-500 transition-all transform duration-300 focus:border-[#7367f0] focus:border-[3px] focus:shadow-[0px_0px_5px_2px_rgba(50,100,70,0.1)] border ${
            hasError
              ? "border-red-500"
              : "border-gray-300"
          } text-left text-gray-500 focus:outline-none`}
        >
          {value}
          <IoCaretDown className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" />
        </button>
        {isOpen && (
          <ul
            className="absolute z-10 w-full max-h-[200px] overflow-y-auto mt-1 bg-white border border-gray-300 rounded-md shadow-[0px_0px_10px_2px_rgba(50,70,70,0.1)]"
            style={{ maxHeight: `${maxHeight}px` }}
          >
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer px-3 py-[5px] hover:bg-gray-100 rounded-lg text-gray-500"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownInput;
