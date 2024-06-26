import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAdmin from "../hooks/useAdmin";
import useCounselor from "../hooks/useCounselor";

const Comments = ({ id, comments, refetch,status }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isAdmin] = useAdmin();
  const [isCounselor] = useCounselor();
  const [formData, setFormData] = useState({
    status: "",
    name: "",
  });

  const axiosSecure = useAxiosSecure();

  const statusOptions = [
    "Application Submitted",
    "Application Processed",
    "Documents Missing",
    "Conditional offer issued",
    "Unconditional offer issued",
    "Application Rejected",
    "CAS issued",
    "Tuition paid",
    "Visa Applied",
    "Visa issued",
    "Student Enrolled",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDateTime = new Date().toLocaleString();
    const commentData = {
      ...formData,
      submissionDateTime: currentDateTime,
    };

    try {
      const response = await axiosSecure.patch(`/students/${id}/comment`, {
        comment: commentData,
      });
      console.log(response.data);
      setOpenModal(false);
      refetch(); // Call refetch after successful comment submission
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      <div className="bg-gray-50 border-[1px] border-gray-300 rounded-md p-3">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 font-bold text-lg">
            2024-05-06, 19:27:34
          </p>
          <p className="text-lg text-gray-500">Received</p>
        </div>
        <p className="text-gray-600 mt-2">Application Received.</p>
        <p className="text-gray-600">Kamrul Zaman Nahid</p>
      </div>
      {comments?.map((comment, index) => (
        <div
          key={index}
          className="bg-gray-50 border-[1px] border-gray-300 rounded-md p-3 mt-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-500 font-bold text-lg">
              {comment?.submissionDateTime}
            </p>
            <p className="text-lg text-gray-500">Received</p>
          </div>
          <p className="text-gray-600 mt-2">{status}</p>
          <p className="text-gray-600">{comment?.name}</p>
        </div>
      ))}

      {(isAdmin || isCounselor) && (
        <>
          <button
            onClick={() => setOpenModal(true)}
            className="rounded-md bg-[#7367f0] px-5 py-[6px] text-white mt-4"
          >
            Add Comment
          </button>
          <div>
            <div
              className={`fixed z-[100] flex items-center justify-center ${
                openModal ? "opacity-1 visible" : "invisible opacity-0"
              } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
            >
              <div
                className={`relative max-w-md rounded-lg bg-white p-6 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white transition-transform duration-300 ${
                  openModal ? "scale-100 opacity-1" : "scale-95 opacity-0"
                }`}
              >
                <button
                  onClick={() => setOpenModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <RxCross2 className="w-6 h-6" />
                </button>
                <h1 className="mb-4 text-2xl font-semibold">Update Comments</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 text-left">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Massage
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-3 inline-flex justify-center rounded-md border border-transparent bg-[#7367f0] px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-[#7367f0] focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Comments;
