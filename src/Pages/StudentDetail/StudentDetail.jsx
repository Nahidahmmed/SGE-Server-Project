// src/pages/StudentDetail/StudentDetail.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseDetails from '../../Components/CourseDetails';
import UploadDetails from '../../Components/UploadDetails';
import Status from '../../Components/Status';
import Comments from '../../Components/Comments';
import Communication from '../../Components/Communication';
import useStudentData from '../../hooks/fetchStudentData';

const StudentDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useStudentData(id);
  const [activeTab, setActiveTab] = useState(0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const Tab1 = () => (
    <CourseDetails
      Application_id={data.Application_Id}
      id={data._id}
      firstName={data.firstName}
      lastName={data.lastName}
      studentEmail={data.studentEmail}
      counsellorEmail={data.counsellorEmail}
      date={data.submissionDetails}
      passportNo={data.passportNo}
      studentNumber={data.whatsappNumber}
      communicationNo={data.counsellorNumber}
      dateOfBirth={data.dob}
    />
  );
  const Tab2 = () => <UploadDetails id={data._id} uploadedFiles={data.uploadedFiles} refetch={refetch} />;
  const Tab3 = () => <Status id={data._id} status={data?.status} refetch={refetch} />;
  const Tab4 = () => <Comments id={data._id} status={data?.status} comments={data?.comments} refetch={refetch} />;
  const Tab5 = () => <Communication id={data._id} refetch={refetch} emails={data?.emails} />;
  const tabs = [
    { name: 'Student/Course Details', component: Tab1 },
    { name: 'Upload/Download', component: Tab2 },
    { name: 'Status', component: Tab3 },
    { name: 'Comments', component: Tab4 },
    { name: 'University Communication', component: Tab5 },
  ];

  return (
    <div className="w-full mx-auto mt-8 bg-white shadow-[0px_0px_10px_5px_rgba(0,0,0,0.1)] rounded-md">
      <div className="flex flex-wrap border-b gap-2 sm:gap-10">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-2 sm:px-5 text-center font-medium ${
              activeTab === index
                ? 'border-b-2 border-[#7367f0] text-[#7367f0]'
                : 'border-b-2 border-transparent text-gray-500 hover:text-[#7367f0]'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="p-4">
        {React.createElement(tabs[activeTab].component)}
      </div>
    </div>
  );
};

export default StudentDetail;
