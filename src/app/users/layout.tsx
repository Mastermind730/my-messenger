import React from 'react';
import Sidebar from "../components/SideBar/Sidebar";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //@ts-ignore
    <Sidebar>
      <div className="h-[100vh]">
        {children}
      </div>
      </Sidebar>
  );
}
