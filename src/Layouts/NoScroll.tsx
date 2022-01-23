import React, { ReactNode } from "react";

const NoScroll = ({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div className="h-screen w-full bg-yellow-200 p-5 flex items-center justify-center">
      <div className="max-h-full w-full md:h-auto md:w-auto">
        <div className="flex justify-center items-center space-x-3 pb-3">
          <div className="text-2xl">😄</div>
          <div>
            <div className="text-xl font-semibold">
              {title}
            </div>
            <div className="text-lg">{subtitle}</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-8 border-4 border-gray-800 flex flex-col relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NoScroll;
