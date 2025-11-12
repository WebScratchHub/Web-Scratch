import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDeviceMode } from '../hooks/useDeviceMode';
import * as Icons from './ui/Icons'; // Assuming Icons.jsx is created

const NavItem = ({ to, icon, label }) => (
  <li>
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `relative flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
          isActive
            ? 'bg-white/5 text-secondary shadow-glow-violet-md'
            : 'text-text-secondary hover:bg-white/5 hover:text-text-main'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 top-1/4 h-1/2 w-1 bg-gradient-to-b from-primary to-secondary rounded-r-full"></div>
          )}
          {icon}
          <span className={`ml-4 font-medium ${isActive ? 'pl-1' : ''}`}>{label}</span>
        </>
      )}
    </NavLink>
  </li>
);

const Sidebar = () => {
  const { deviceMode } = useDeviceMode();

  const mainNavItems = [
    { to: '/dashboard', label: "Dashboard", icon: <Icons.HomeIcon className="w-6 h-6" /> },
    { to: '/dashboard/ai-tools', label: "AI Tools", icon: <Icons.ToolsIcon className="w-6 h-6" /> },
    { to: '/dashboard/image-studio', label: "Image Studio", icon: <Icons.ImagesIcon className="w-6 h-6" /> },
    // Add other links as pages are created...
  ];

  if (deviceMode !== 'pc') return null;

  return (
    <aside className="w-64 flex-shrink-0 bg-dark-bg border-r border-white/[.08] p-4 flex flex-col fixed left-0 top-[4.5rem] h-[calc(100vh-4.5rem)] z-40 shadow-2xl shadow-primary/5 overflow-y-auto hide-scrollbar">
      <nav className="flex-1">
        <ul className="space-y-2">
          {mainNavItems.map(item => (
            <NavItem key={item.to} {...item} />
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <ul className="space-y-2 pt-4 border-t border-white/10">
          <NavItem to="/dashboard/profile" icon={<Icons.CogIcon className="w-6 h-6" />} label="Profile" />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
