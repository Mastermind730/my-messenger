import React from 'react';
import Sidebar from "../components/SideBar/Sidebar";
import getUsers from '../actions/getUsers';
import UserList from './components/UserList';

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users=await getUsers();
  return (

    //@ts-ignore
    <Sidebar>
      <div className="h-[100vh]">
        <UserList items={users}/>
        {children}
      </div>
      </Sidebar>
  );
}
