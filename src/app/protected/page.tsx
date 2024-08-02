"use client";

import React from "react";

const ProtectedPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <h1 className="text-4xl">This is a protected page</h1>
    </div>
  );
};

export default ProtectedPage;
