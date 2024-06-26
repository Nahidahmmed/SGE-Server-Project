import React from "react";

const CourseDetails = ({
  Application_id,
  id,
  firstName,
  lastName,
  studentEmail,
  counsellorEmail,
  date,
  passportNo,
  studentNumber,
  communicationNo,
  dateOfBirth,
}) => {

    const shortId = id.substring(0, 10);
  return (
    <div>
      <div className="flex  border-b-[1px] border-gray-300">
        <div className="flex justify-between mx-20 items-center w-1/2 py-4">
          <p className="text-gray-500 font-medium">Application Id</p>
          <p className="text-gray-600">{Application_id}</p>
        </div>
        <div className="flex justify-between mx-20 items-center w-1/2 py-4">
          <p className="text-gray-500 font-medium">Date Added</p>
          <p className="text-gray-600">{date.submission_date} {date.submission_time}</p>
        </div>
      </div>
      <div className="flex  border-b-[1px] border-gray-300">
        <div className="flex justify-between mx-20 items-center w-1/2 py-4">
          <p className="text-gray-500 font-medium">Student ID</p>
          <p className="text-gray-600">{shortId}</p>
        </div>
        <div className="flex justify-between mx-20 items-center w-1/2 py-4">
          <p className="text-gray-500 font-medium">Student Passport No.</p>
          <p className="text-gray-600">{passportNo} </p>
        </div>
      </div>
      <div className="flex  border-b-[1px] border-gray-300">
        <div className="flex justify-between mx-20 items-center w-1/2 py-4">
          <p className="text-gray-500 font-medium">Student Name</p>
          <p className="text-gray-600">{firstName} {lastName}</p>
        </div>
        <div className="flex justify-between mx-20 items-center w-1/2 py-4">
          <p className="text-gray-500 font-medium">Student Date of Birth</p>
          <p className="text-gray-600">{dateOfBirth}</p>
        </div>
      </div>
      <div className="flex  border-b-[1px] border-gray-300">
        <div className="flex justify-between mx-20 items-center w-1/2 py-4">
          <p className="text-gray-500 font-medium">Student E-Mail</p>
          <p className="text-gray-600">{studentEmail}</p>
        </div>
        <div className="flex justify-between mx-20 items-center w-1/2 py-4">
          <p className="text-gray-500 font-medium">Student Phone No.</p>
          <p className="text-gray-600">{studentNumber}</p>
        </div>
      </div>
      <div className="flex border-gray-300">
        <div className="flex justify-between mx-20 items-center w-1/2 py-4">
          <p className="text-gray-500 font-medium">Communication E-Mail ID</p>
          <p className="text-gray-600">{counsellorEmail}</p>
        </div>
        <div className="flex justify-between mx-20 items-center w-1/2 py-4">
          <p className="text-gray-500 font-medium">Communication Phone No.</p>
          <p className="text-gray-600">{communicationNo}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
