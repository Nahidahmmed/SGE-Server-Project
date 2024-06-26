import { useState, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";
import StudentForm from "./StudentForm";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FileUpload = ({ filteredData, studentCountry }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showNext, setShowNext] = useState(true);
  const [nextError, setNextError] = useState("");

  const handleNext = () => {
    if (uploadedFiles.length === 0) {
      setNextError("Please upload at least one file before proceeding.");
    } else {
      setShowNext(false);
      setNextError("");
    }
  };

  const handleUpload = async (file) => {
    setUploading(true);
    setUploadError("");
    setNextError(""); // Clear the error message when a new upload starts

    const formData = new FormData();
    formData.append("file", file.file);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dr75v4jup/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            upload_preset: "fksqlqhl",
          },
        }
      );

      if (response.data && response.data.secure_url) {
        const newUploadedFiles = [
          ...uploadedFiles,
          { url: response.data.secure_url, type: file.file.type },
        ];
        setUploadedFiles(newUploadedFiles);
        setFiles([]); // Clear selected files after successful upload
      } else {
        console.error("Unexpected response format:", response.data);
        setUploadError("Error: Unexpected response format.");
      }
    } catch (error) {
      // Handle upload errors
      console.error("Error uploading file:", error);
      setUploadError(
        "Error uploading files. Please check the console for details."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  useEffect(() => {
    if (files.length > 0) {
      handleUpload(files[0]);
    }
  }, [files]);

  return (
    <div className="w-full bg-white relative shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)] rounded-md">
      {showNext ? (
        <div className="mx-10">
          <h1 className=" mb-4 mt-2 font-medium text-gray-500">
            Please upload only color scan copy files
          </h1>
          {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}
          <div>
            <div className="mb-4">
              <FilePond
                files={files}
                allowMultiple={true}
                maxFiles={3}
                onupdatefiles={setFiles}
                allowReorder={true}
                itemInsertLocation="after"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action w-full">Browse</span>'
              />
            </div>
            {nextError && <p className="text-red-500 mb-4">{nextError}</p>}
            <button
              type="button"
              className="bg-[rgb(115,103,240)] text-white font-bold absolute right-0 bottom-3 py-2 px-5 shadow-[0px_0px_10px_10px_rgba(115,103,240,0.1)] mr-10 rounded"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
          {uploading && <p>Uploading...</p>}
          {uploadedFiles.length > 0 && (
            <div className="mb-4 w-full">
              <h2 className="text-lg font-bold mb-2">Uploaded Files:</h2>
              <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-4 mt-10">
                {uploadedFiles.map((file, index) => {
                  const isImage = file.type.startsWith("image/");
                  const isVideo = file.type.startsWith("video/");
                  const isPdf = file.type === "application/pdf";

                  return (
                    <div
                      key={index}
                      className="border rounded-lg overflow-hidden shadow-md"
                    >
                      <div className="relative">
                        {isImage && (
                          <img
                            src={file.url}
                            alt={`Uploaded file ${index + 1}`}
                            className="object-cover w-full h-60"
                          />
                        )}
                        {isVideo && (
                          <video
                            src={file.url}
                            controls
                            className="object-cover w-full h-60"
                          >
                            Your browser does not support the video tag.
                          </video>
                        )}
                        {isPdf && (
                          <iframe
                            src={file.url}
                            className="object-cover w-full h-60"
                            title={`Uploaded file ${index + 1}`}
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <button
                          onClick={() => handleDelete(index)}
                          className="block mx-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <StudentForm
          filteredData={filteredData}
          studentCountry={studentCountry}
          uploadedFiles={uploadedFiles}
        />
      )}
    </div>
  );
};

export default FileUpload;
