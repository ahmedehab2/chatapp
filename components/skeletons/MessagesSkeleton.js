import React from "react";

const MessagesSkeleton = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 flex flex-col p-2 flex-grow chatUI">
      <div className="grid-cols-12">
        <div className="col-start-6 col-end-13 p-3 rounded-lg animate-pulse">
          <div className="flex items-center justify-start flex-row-reverse">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300 flex-shrink-0"></div>
            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
              <p></p>
            </div>
          </div>
        </div>

        <div className="col-start-1 col-end-8 p-3 rounded-lg animate-pulse">
          <div className="flex flex-row items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300 flex-shrink-0"></div>
            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesSkeleton;
