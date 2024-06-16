import Tabs from "./Tabs";

const ApplicationDetails = ({ filteredData, studentCountry, onPrevious }) => {
  return (
    <div className=" mt-10 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Application Details</h1>
      <div className="flex gap-5">
        <div className="w-[30%] shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)] rounded-md">
          <img
            className="w-full h-40"
            src={filteredData["University Logo"]}
            alt=""
          />
          {filteredData.map((item, index) => (
            <div key={index} className="mb-4 p-5 space-y-5">
              <p>
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
        <div className="w-[70%]">
          {filteredData.map((item, index) => (
            <div
            key={index}
              className={`${
                item["Academic Requirement"] == "" ? "h-32" : "h-auto"
              } shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)] rounded-md`}
            >
              <Tabs
                
                Academic={item["Academic Requirement"]}
                English={item["English Requirement"]}
              />
            </div>
          ))}
          <div className="">
            <button
              type="button"
              className="bg-gray-500 mt-10 text-white py-2 px-4 rounded"
              onClick={onPrevious}
            >
              Previous
            </button>
            <button
              type="button"
              className="bg-[#7367f0] mt-10 text-white py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;

{
  /*  */
}
