import { useState } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';

export default function UploadFile() {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState(null);

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

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
      setExcelData(data.slice(0, 10));
    }
  };

  return (
    <div>
      <p>Upload file</p>
      <form onSubmit={handleFileSubmit}>
        <input type="file" className="" name="" id="" required onChange={handleFile} />
        <button className="bg-green-800 p-5 text-white font-bold" type="submit">
          Upload
        </button>
        {typeError && (
          <div role="alert">{typeError}</div>
        )}
      </form>

      <div>
        {excelData ? (
          <div>
            <h3>Uploaded Data:</h3>
            <pre>{JSON.stringify(excelData, null, 2)}</pre>
          </div>
        ) : (
          <div>No file is uploaded yet!</div>
        )}
      </div>
    </div>
  );
}
