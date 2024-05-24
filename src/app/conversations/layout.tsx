import React from 'react';
import Sidebar from "../components/SideBar/Sidebar";
import ConversationList from './components/ConversationList';
import getConversations from '../actions/getConversations';

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const conversations=await getConversations();
  return (

    //@ts-ignore Server component
    <Sidebar>
      <div className="h-full">
        <ConversationList
            initialItems={conversations}
        />
        {children}
      </div>
      </Sidebar>
  );
}
