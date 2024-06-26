import { useState } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function UploadFile() {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const axiosPublic = useAxiosPublic();

  const handleFile = (e) => {
    const fileTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError('Please select only Excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select your file');
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
      setExcelData(data.slice(0, 10));
      try {
        const response = await axiosPublic.post('/university', data);
        if (response.status === 200) {
          setUploadSuccess('Data uploaded successfully!');
        }
      } catch (error) {
        if (error.response && error.response.status === 413) {
          setUploadSuccess('Failed to upload data: Payload too large.');
        } else {
          setUploadSuccess('Failed to upload data.');
        }
        console.error(error);
      }
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Excel File</h2>
        <form onSubmit={handleFileSubmit} className="space-y-4">
          <input 
            type="file" 
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" 
            onChange={handleFile} 
            required 
          />
          <button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload
          </button>
          {typeError && (
            <div role="alert" className="text-red-500 text-sm text-center">
              {typeError}
            </div>
          )}
          {uploadSuccess && (
            <div role="alert" className={`text-sm text-center ${uploadSuccess.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
              {uploadSuccess}
            </div>
          )}
        </form>
        <div className="mt-6">
          {excelData ? (
            <div>
              <h3 className="text-xl font-semibold mb-2">Uploaded Data:</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">{JSON.stringify(excelData, null, 2)}</pre>
            </div>
          ) : (
            <div className="text-gray-500 text-center">No file is uploaded yet!</div>
          )}
        </div>
      </div>
    </div>
  );
}
