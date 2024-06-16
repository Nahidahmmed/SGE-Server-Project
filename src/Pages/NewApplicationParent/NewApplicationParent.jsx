import { useState, useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import ApplicationDetails from "../../Components/ApplicationDetails";
import NewApplication from "../NewApplication/NewApplication";

const NewApplicationParent = () => {
  const { data, loading, error } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [studentCountry, setStudentCountry] = useState("");

  const handleNext = (filteredData, studentCountry) => {
    setFilteredData(filteredData);
    setStudentCountry(studentCountry);
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div>
      {step === 1 && (
        <NewApplication
          data={data}
          loading={loading}
          error={error}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <ApplicationDetails
          filteredData={filteredData}
          studentCountry={studentCountry}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
};

export default NewApplicationParent;
