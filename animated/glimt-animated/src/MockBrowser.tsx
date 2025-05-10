import React, { ReactNode, useState } from 'react';

interface Tab {
  title: string;
  content: ReactNode;
}

interface MockBrowserProps {
  tabs: Tab[];
  initialTab?: number;
  style?: React.CSSProperties;
}

export default function MockBrowser({ tabs, initialTab = 0, style }: MockBrowserProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div
      className="rounded-2xl shadow-2xl bg-white border border-gray-200 w-[1000px] max-w-full mx-auto"
      style={style}
    >
      {/* Browser Header */}
      <div className="flex items-center px-4 py-2 bg-[#F5F6FA] rounded-t-2xl border-b border-gray-200">
        {/* Window Controls */}
        <div className="flex space-x-2 mr-4">
          <span className="w-3 h-3 bg-red-400 rounded-full inline-block border border-red-300" />
          <span className="w-3 h-3 bg-yellow-300 rounded-full inline-block border border-yellow-200" />
          <span className="w-3 h-3 bg-green-400 rounded-full inline-block border border-green-300" />
        </div>
        {/* Tabs */}
        <div className="flex flex-1 items-end">
          {tabs.map((tab, idx) => (
            <button
              key={tab.title + idx}
              className={`relative px-6 py-2 text-sm font-medium focus:outline-none transition-colors duration-150
                ${idx === activeTab
                  ? 'bg-white text-gray-900 z-10 rounded-t-[12px] shadow-[0_2px_8px_0_rgba(0,0,0,0.06)]'
                  : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-t-[12px]'}
                ${idx === 0 ? 'ml-2' : ''}
              `}
              onClick={() => setActiveTab(idx)}
              style={{ minWidth: 80 }}
            >
              {tab.title}
            </button>
          ))}
          {/* New Tab Button */}
          <button
            className="ml-1 px-4 py-2 rounded-t-[12px] bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-900 text-lg flex items-center justify-center focus:outline-none"
            style={{ minWidth: 40 }}
            aria-label="New Tab"
            tabIndex={0}
          >
            <span className="text-xl leading-none">+</span>
          </button>
        </div>
      </div>
      {/* Content Area */}
      <div className="bg-white rounded-b-2xl p-8 min-h-[300px] flex items-center justify-center">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
} 