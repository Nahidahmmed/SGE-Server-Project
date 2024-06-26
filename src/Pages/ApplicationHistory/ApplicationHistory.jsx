import React, { useState } from "react";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router-dom";
import useAllStudentsData from "../../hooks/useAllStudentsData";
import useAdmin from "../../hooks/useAdmin";
import useCounselor from "../../hooks/useCounselor";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ApplicationHistory = () => {
  const [isAdmin] = useAdmin();
  const [isCounselor] = useCounselor();
  const axiosSecure = useAxiosSecure();

  const [students, refetch, isLoading] = useFetchData();
  const { allStudents, allStudentRefetch } = useAllStudentsData();

  const dataToDisplay = isAdmin || isCounselor ? allStudents : students;

  const handleDelete = (id) => {
    if (!isAdmin) {
      Swal.fire({
        title: "Access Denied",
        text: "You do not have permission to delete this application.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/students/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            allStudentRefetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return <p>Loading...</p>; // Show loading indicator while data is loading
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                Application ID
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                Student Name
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                University/Course Details
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                Date Added
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 text-gray-600 border-b border-gray-300">
                  {app.Application_Id}
                </td>
                <td className="px-6 py-4 text-gray-600 border-b border-gray-300">
                  <h1 className="flex items-center gap-2">
                    <p>{app.firstName}</p>
                    <p>{app.lastName}</p>
                  </h1>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <p>
                    {app.filteredData &&
                      app.filteredData.map((data, index) => (
                        <p key={index}>{data["University Name"]}</p>
                      ))}
                  </p>
                  <p className="text-gray-600">
                    {app.filteredData &&
                      app.filteredData.map((data, index) => (
                        <p key={index}>{data["Course Name"]}</p>
                      ))}
                  </p>
                  <p className="text-gray-600">
                    {app.filteredData &&
                      app.filteredData.map((data, index) => (
                        <p key={index}>{data["Intake List"]}</p>
                      ))}
                  </p>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <p className="bg-[#7267f048] text-[#7367f0] p-1 text-center rounded-md font-medium">
                    {app.Status}
                  </p>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <h1 className="flex items-center gap-2">
                    <p>{app.submissionDetails.submission_date}</p>
                    <p>{app.submissionDetails.submission_time}</p>
                  </h1>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <Link to={`/dashboard/applicationHistory/${app._id}`}>
                    <button className=" mr-2 block text-xl mb-4">
                      <IoEyeOutline />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="block text-xl"
                  >
                    <IoTrashOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationHistory;
