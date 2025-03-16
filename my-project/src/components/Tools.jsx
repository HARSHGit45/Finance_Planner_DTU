import React, { useState } from 'react';
import SipCal from "../components/tools/SipCal"
import RetirementCal from "../components/tools/RetirementCal"
import HomeAffordCal from "../components/tools/HomeAffordCal"
import CompoundIntCal from "../components/tools/CompoundIntCal"
import LoanCal from "../components/tools/LoanCal"

const Tools = () => {
  const [selectedTool, setSelectedTool] = useState('retirement');

  const tools = [
    { id: 'retirement', name: 'Retirement' },
    { id: 'loan', name: 'Loan' },
    { id: 'home', name: 'Home Affordability' },
    { id: 'compound', name: 'Compound Interest' },
    { id: 'sip', name: 'SIP Calculator' },
  ];

  const renderCalculator = () => {
    switch (selectedTool) {
      case 'retirement':
        return <RetirementCal />;
      case 'loan':
        return <LoanCal />;
      case 'home':
        return <HomeAffordCal />;
      case 'compound':
        return <CompoundIntCal />;
      case 'sip':
        return <SipCal />;
      default:
        return <RetirementCal />;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Financial Tools</h1>

      {/* Tools Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 bg-gray-100 p-2 rounded-lg">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all
              ${selectedTool === tool.id
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            {tool.name}
          </button>
        ))}
      </div>

      {/* Calculator Display Area */}
      <div className="transition-all duration-300 ease-in-out">
        {renderCalculator()}
      </div>
    </div>
  );
};

export default Tools;