import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDeviceMode } from '@/hooks/useDeviceMode';
import * as Icons from '@/components/ui/Icons';

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <li>
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `relative flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
          isActive
            ? 'bg-primary/10 text-secondary shadow-inner shadow-primary/20'
            : 'text-text-secondary hover:bg-white/5 hover:text-text-main'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 top-1/4 h-1/2 w-1 bg-gradient-to-b from-primary to-secondary rounded-r-full animate-pulse"></div>
          )}
          <div className={`ml-2 ${isActive ? 'pl-2' : ''}`}>{icon}</div>
          <span className="ml-4 font-semibold">{label}</span>
        </>
      )}
    </NavLink>
  </li>
);

const Sidebar: React.FC = () => {
  const { deviceMode } = useDeviceMode();

  const mainNavItems = [
    { to: '/dashboard', label: "Dashboard", icon: <Icons.HomeIcon className="w-6 h-6" /> },
    { to: '/dashboard/ai-tools', label: "AI Tools", icon: <Icons.ToolsIcon className="w-6 h-6" /> },
    { to: '/dashboard/image-studio', label: "Image Studio", icon: <Icons.ImagesIcon className="w-6 h-6" /> },
    { to: '/dashboard/content-writer', label: "Content Writer", icon: <Icons.DocumentTextIcon className="w-6 h-6" /> },
    { to: '/dashboard/text-to-voice', label: "Text to Voice", icon: <Icons.SpeakerWaveIcon className="w-6 h-6" /> },
    { to: '/dashboard/website-builder', label: "Web Builder", icon: <Icons.GlobeAltIcon className="w-6 h-6" /> },
    { to: '/dashboard/learning-hub', label: "Learning Hub", icon: <Icons.BookOpenIcon className="w-6 h-6" /> },
  ];
  
  const content = (
    <>
      <nav className="flex-1">
        <ul className="space-y-1">
          {mainNavItems.map(item => (
            <NavItem key={item.to} {...item} />
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <ul className="space-y-1 pt-4 border-t border-white/10">
          <NavItem to="/dashboard/profile" icon={<Icons.CogIcon className="w-6 h-6" />} label="Settings" />
        </ul>
      </div>
    </>
  );

  if (deviceMode === 'pc') {
    return (
      <aside className="w-64 flex-shrink-0 bg-dark-bg/60 border-r border-white/[.08] p-4 flex flex-col fixed left-0 top-[4.5rem] h-[calc(100vh-4.5rem)] z-40 shadow-2xl shadow-primary/5 overflow-y-auto disclaimer-scroll">
        {content}
      </aside>
    );
  }

  // Example of a mobile sidebar (could be expanded into a hamburger menu)
  // For now, we render nothing on mobile to keep it simple.
  return null;
};

export default Sidebar;
