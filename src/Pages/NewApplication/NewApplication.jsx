import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';

export default function NewApplication() {
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedIntake, setSelectedIntake] = useState('');
  const [intakes, setIntakes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosPublic.get('/universities'); // Update with your endpoint
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [axiosPublic]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedIntake('');
    // Extract intakes for the selected country
    const countryData = data && data[country];
    const countryIntakes = countryData && Object.keys(countryData);
    setIntakes(countryIntakes || []);
  };

  const handleIntakeChange = (e) => {
    setSelectedIntake(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold ml-5">New Application</h2>

      <label htmlFor="countrySelect" className="block mb-2">Select a Country:</label>
      <select id="countrySelect" className="border p-2 mb-4" value={selectedCountry} onChange={handleCountryChange}>
        <option value="" disabled>Select a Country</option>
        {data && Object.keys(data).map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      {selectedCountry && (
        <div>
          <label htmlFor="intakeSelect" className="block mb-2">Select an Intake:</label>
          <select id="intakeSelect" className="border p-2 mb-4" value={selectedIntake} onChange={handleIntakeChange}>
            <option value="" disabled>Select an Intake</option>
            {intakes.map(intake => (
              <option key={intake} value={intake}>{intake}</option>
            ))}
          </select>
        </div>
      )}

      {selectedIntake && data[selectedCountry][selectedIntake] && (
        <div>
          {Object.keys(data[selectedCountry][selectedIntake]).map(university => (
            <div key={university}>
              <h3>{university}</h3>
              <ul>
                {Object.keys(data[selectedCountry][selectedIntake][university].CourseTypes).map(type => (
                  <li key={type}>
                    <strong>{type}</strong>: {data[selectedCountry][selectedIntake][university].CourseTypes[type].join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
