import React from "react";

const FriendSkeleton = () => {
  return (
    <div className="animate-pulse flex items-center space-x-4 px-3 mt-1">
      <div className="h-full w-10">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
      </div>
      <div className="w-full py-1">
        <div className="h-2 w-2/4 bg-slate-700 rounded"></div>
        <div className="h-2 w-1/4 mt-3 bg-slate-700 rounded"></div>
      </div>
    </div>
  );
};

export default FriendSkeleton;
