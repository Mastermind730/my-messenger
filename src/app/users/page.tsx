import React from 'react';
import EmptyState from '../components/EmptyState';

const Page = () => {
  return (
    <div className='flex h-[100vh]'>
      {/* <div className='w-80 bg-gray-200'> */}
        {/* Sidebar */}
      {/* </div> */}
      <div className='flex-1'>
        <EmptyState />
      </div>
    </div>
  );
}

export default Page;
