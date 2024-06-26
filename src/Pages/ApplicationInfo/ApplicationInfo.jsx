import { useEffect, useState } from 'react';
import Charts from '../../Components/Charts';

const ApplicationInfo = () => {
  const [isMid, setIsMid] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMid(window.innerWidth < 1280);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Card = ({ title }) => (
    <div className="p-5 shadow-lg rounded-lg bg-white">
      <h2 className="text-xl lg:text-2xl">{title}</h2>
      <p className="text-lg lg:text-xl font-thin text-gray-400">Last Week</p>
      <div className="font-bold flex justify-between items-center mt-5">
        <p className="text-2xl lg:text-3xl">12</p>
        <p className="text-green-400">+12.6%</p>
      </div>
    </div>
  );

  return (
    <div className="p-5">
      <div className={`${isMid ? 'grid-cols-2' : 'grid-cols-4'} grid gap-5 mt-5`}>
        <Card title="New Application" />
        <Card title="Application Review" />
        <Card title="Application Submitted" />
        <Card title="Application Declined" />
      </div>
      <div className="mt-5">
        <Charts />
      </div>
    </div>
  );
};

export default ApplicationInfo;
