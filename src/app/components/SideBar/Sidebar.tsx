import React from 'react';
import DesktopSideBar from "./DesktopSideBar";

async function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <DesktopSideBar />
      <main className="lg:pl-20 h-[100vh]">
        {children}
      </main>
    </div>
  );
}

export default Sidebar;
