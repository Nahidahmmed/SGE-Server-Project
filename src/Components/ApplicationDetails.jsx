import React, { useState } from "react";
import Tabs from "./Tabs";
import FileUpload from "./FileUpload";

const ApplicationDetails = ({ filteredData, studentCountry, onPrevious }) => {
  const [showNext, setShowNext] = useState(false);

  const handleNext = () => {
    setShowNext(true);
  };

  const handlePrevious = () => {
    setShowNext(false);
    if (onPrevious) onPrevious();
  };

  return (
    <div className="mt-8 mx-auto">
      <div className="flex gap-5">
        <div className="w-[30%] p-5 bg-white rounded-lg shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)] h-[450px]">
          {
           filteredData["University Logo"] ? <div><img
           className="w-full h-40 rounded-t-xl border-none"
           src={filteredData["University Logo"]}
           alt=""
         /></div>  : <div className="h-32"></div>
          }
          
          {filteredData.map((item, index) => (
            <div key={index} className="space-y-5 w-full ">
              <p >
                <strong>Course Name:</strong> {item["Course Name"]}
              </p>
              <p>
                <strong>Intake:</strong> {item["Intake List"]}
              </p>
              <p>
                <strong>Tuition Fee:</strong> {item["Tuition Fee"]}
              </p>
              <p>
                <strong>Course Duration:</strong> {item["Course Duration"]}
              </p>
              <p>
                <strong>Course Label:</strong> {item["Course Label"]}
              </p>
              <p>
                <strong>Location:</strong> {item["Location"]}
              </p>
            </div>
          ))}
        </div>
        {!showNext ? (
          <div className="w-[70%]">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className={`${
                  item["Academic Requirement"] === "" ? "h-32" : "h-auto"
                } shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)] rounded-md`}
              >
                <Tabs
                  Academic={item["Academic Requirement"]}
                  English={item["English Requirement"]}
                />
              </div>
            ))}
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 mt-10 text-white py-2 px-4 rounded"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                type="button"
                className="bg-[#7367f0] mt-10 text-white py-2 px-4 rounded"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <FileUpload onPrevious={handlePrevious} filteredData={filteredData}
          studentCountry={studentCountry} />
        )}
      </div>
    </div>
  );
};

export default ApplicationDetails;
