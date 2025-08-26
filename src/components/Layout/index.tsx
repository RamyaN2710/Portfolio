import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import ChatArea from '../ChatArea';
import portfolioData from '../../data/portfolio.json';

type SectionKey = keyof typeof portfolioData.sections;

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<SectionKey>(
    (location.pathname.slice(1) || 'home') as SectionKey
  );

  const handleNavigation = (section: string) => {
    setActiveSection(section as SectionKey);
    navigate(`/${section}`);
  };

  const currentMessages = portfolioData.sections[activeSection]?.messages || [];

  return (
    <div className="flex h-screen bg-white">
      <div className="flex h-full">
        <Sidebar 
          navigation={portfolioData.navigation}
          activeSection={activeSection}
          onNavigate={handleNavigation}
        />
      </div>
      <div className="flex-1 flex flex-col h-full">
        <ChatArea 
          messages={currentMessages}
          personalInfo={portfolioData.personalInfo}
        />
      </div>
    </div>
  );
};

export default Layout;