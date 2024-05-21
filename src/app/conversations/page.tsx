"use client";
import clsx from "clsx";
import useConversation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";

const Home=()=>{
    const {isOpen}=useConversation();
    return(
        <div className='flex h-[100vh]'>
        <div className='w-80 bg-gray-200'> {/* Placeholder for sidebar */}
        </div>
        <div className='flex-1'>
          <EmptyState />
        </div>
      </div>
    )
};

export default Home;