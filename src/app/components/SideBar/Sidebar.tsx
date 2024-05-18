import React from 'react';
import DesktopSideBar from "./DesktopSideBar";
import MobileFooter from './MobileFooter';
async function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <DesktopSideBar />
      <MobileFooter />
      
      <main className="lg:pl-20 h-[100vh]">
        {children}
      </main>
    </div>
  );
}

export default Sidebar;
