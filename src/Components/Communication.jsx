import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import useCounselor from "../hooks/useCounselor";
import { RxCross2 } from "react-icons/rx";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Communication = ({ id, refetch, emails }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isAdmin] = useAdmin();
  const [isCounselor] = useCounselor();
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    from: "",
    date: "",
    subject: "",
  });
  console.log(emails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailData = {
      ...formData,
    };

    try {
      const response = await axiosSecure.patch(`/students/${id}/email`, {
        email: emailData,
      });
      console.log(response.data);
      setOpenModal(false);
      refetch(); // Call refetch after successful comment submission
    } catch (error) {
      console.error("Error adding email:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-gray-500">
        <thead>
          <tr className="">
            <th className="py-2 px-4 text-left font-normal uppercase">From</th>
            <th className="py-2 px-4 text-left font-normal uppercase">Subject</th>
            <th className="py-2 px-4 text-left font-normal uppercase">Date</th>
          </tr>
        </thead>
        <tbody>
          {emails ? (
            emails.map((email) => (
              <tr key={email.id} className="border-t border-gray-300">
                <td className="py-2 px-4">{email.from}</td>
                <td className="py-2 px-4">{email.subject}</td>
                <td className="py-2 px-4">{email.date}</td>
              </tr>
            ))
          ) : (
            <tr className="border-t border-gray-300">
              <td className="py-2 px-4"> </td>
              <td className="py-2 px-4">No Data Found</td>
              <td className="py-2 px-4"></td>
            </tr>
          )}
        </tbody>
      </table>
      {(isAdmin || isCounselor) && (
        <>
          <button
            onClick={() => setOpenModal(true)}
            className="rounded-md bg-[#7367f0] px-5 py-[6px] text-white mt-4"
          >
            Add Email
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
                <h1 className="mb-4 text-2xl font-semibold">Update Status</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 text-left">
                    <label
                      htmlFor="from"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      From
                    </label>
                    <input
                      type="text"
                      id="from"
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="mb-4 text-left">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="mb-4 text-left">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
    </div>
  );
};

export default Communication;
