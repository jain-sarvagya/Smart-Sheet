
import React from 'react';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="w-full">

      {/* Tab Header */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`relative px-4 py-2 text-sm font-medium rounded-t-lg transition
                ${
                  activeTab === tab.name
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {tabs.map((tab) =>
          tab.name === activeTab ? (
            <div key={tab.name}>
              {tab.content}
            </div>
          ) : null
        )}
      </div>

    </div>
  );
};

export default Tabs;