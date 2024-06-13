import React from 'react';
import Sidebar from "../components/SideBar/Sidebar";
import ConversationList from './components/ConversationList';
import getConversations from '../actions/getConversations';
import getUsers from '../actions/getUsers';

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const conversations=await getConversations();
    const users=await getUsers();
  return (

    //@ts-ignore Server component
    <Sidebar>
      <div className="h-full">
        <ConversationList
        users={users}
            initialItems={conversations}
        />
        {children}
      </div>
      </Sidebar>
  );
}
