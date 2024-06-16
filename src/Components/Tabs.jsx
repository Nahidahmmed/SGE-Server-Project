import { useState } from 'react';

const TabComponent = ({ Academic, English }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
console.log(Academic,English)
  return (
    <div className="tab-container">
      <div className="border-b text-lg font-semibold text-[#7367f0] pt-3">
        <button className={activeTab === 0 ? 'border-b-2 border-[#7367f0] px-5' : 'px-5'} onClick={() => handleTabClick(0)}>
          Academic
        </button>
        <button className={activeTab === 1 ? 'border-b-2 border-[#7367f0] px-5' : 'px-5'} onClick={() => handleTabClick(1)}>
          English
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 0 && <div>{Academic}</div>}
        {activeTab === 1 && <div>{English}</div>}
      </div>
    </div>
  );
};

export default TabComponent;
