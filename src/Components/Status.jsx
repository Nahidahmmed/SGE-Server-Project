import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import useCounselor from "../hooks/useCounselor";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Status = ({ id, status, refetch }) => {
  const [isAdmin] = useAdmin();
  const [isCounselor] = useCounselor();
  const axiosSecure = useAxiosSecure();
  const [showSelect, setShowSelect] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

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

  const handleStatusChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosSecure.patch(`/students/${id}/status`, {
        status: newStatus,
      });
      console.log(response.data);
      setShowSelect(false);
      refetch(); // Refetch the data to update the UI
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-gray-500">
        <thead>
          <tr className="">
            <th className="py-2 px-4 text-left font-normal">DATE ADDED</th>
            <th className="py-2 px-4 text-left font-normal">COMMENT</th>
            <th className="py-2 px-4 text-left font-normal">STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-300">
            <td className="py-2 px-4">2024-05-06 19:27:34</td>
            <td className="py-2 px-4">{status}</td>
            <td className="py-2 px-4">
              {status} <br />
              Secondary Status: No Application Fees
            </td>
          </tr>
        </tbody>
      </table>

      {(isAdmin || isCounselor) && (
        <>
          <button
            onClick={() => setShowSelect(!showSelect)}
            className="rounded-md bg-[#7367f0] px-5 py-[6px] text-white mt-4"
          >
            Change Status
          </button>
          {showSelect && (
            <form onSubmit={handleStatusChange} className="mt-4">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="mt-2 block w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {statusOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="mt-3 inline-flex justify-center rounded-md border border-transparent bg-[#7367f0] px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-[#7367f0] focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Status;
