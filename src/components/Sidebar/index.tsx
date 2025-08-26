import React from 'react';

interface NavItem {
  id: string;
  icon: string;
  label: string;
}

interface SidebarProps {
  navigation: NavItem[];
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navigation, activeSection, onNavigate }) => {
  return (
    <div className="w-[68px] bg-[#f3f2f1] flex flex-col items-center py-4 border-r border-teams-border">
      {navigation.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`teams-button ${
            activeSection === item.id 
              ? 'teams-button-active' 
              : 'teams-button-inactive'
          }`}
          title={item.label}
        >
          <span 
            role="img" 
            aria-label={item.label}
            className="text-base"
          >
            {item.icon}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;