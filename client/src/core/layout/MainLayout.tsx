import React from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  activeMenu: string;
  onMenuChange: (menuId: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activeMenu, onMenuChange }) => {
  return (
    <div className="flex h-screen bg-[#F7F8FA]">
      <Sidebar activeMenu={activeMenu} onMenuChange={onMenuChange} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
