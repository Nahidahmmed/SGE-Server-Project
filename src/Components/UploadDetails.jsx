// src/components/UploadDetails.jsx

import { useState, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";
import { saveAs } from 'file-saver';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UploadDetails = ({ id, uploadedFiles, refetch }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleUpload = async (file) => {
    setUploading(true);
    setUploadError("");

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
        const newFile = {
          url: response.data.secure_url,
          type: file.file.type,
        };
        await axiosSecure.patch(`/students/${id}/files`, {
          action: "add",
          file: newFile,
        });
        refetch(); // Call refetch after successful upload
      } else {
        console.error("Unexpected response format:", response.data);
        setUploadError("Error: Unexpected response format.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError(
        "Error uploading files. Please check the console for details."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileIndex) => {
    try {
      const fileToDelete = uploadedFiles[fileIndex];
      await axiosSecure.patch(`/students/${id}/files`, {
        action: "delete",
        file: fileToDelete,
      });
      refetch(); // Call refetch after successful delete
    } catch (error) {
      console.error("Error deleting file:", error);
      setUploadError("Error deleting file. Please check the console for details.");
    }
  };

  const handleDownload = (file) => {
    saveAs(file.url, file.name || "download");
  };

  useEffect(() => {
    if (files.length > 0) {
      handleUpload(files[0]);
    }
  }, [files]);

  return (
    <div className="mx-4 md:mx-10">
      <h1 className="mb-4 mt-2 font-medium text-gray-500">
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
      </div>
      {uploading && <p>Uploading...</p>}
      {uploadedFiles.length > 0 && (
        <div className="mb-4 w-full">
          <h2 className="text-lg font-bold mb-2">Uploaded Files:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
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
                  <div className="p-4 flex justify-between">
                    <button
                      onClick={() => handleDownload(file)}
                      className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
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
  );
};

export default UploadDetails;
