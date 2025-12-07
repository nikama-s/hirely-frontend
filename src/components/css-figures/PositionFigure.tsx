"use client";

export const PositionFigure = () => {
  return (
    <div className="relative w-32 h-32 -z-1">
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-80"></div>
      <div className="absolute top-4 right-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-75"></div>
      <div className="absolute bottom-0 left-8 w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full opacity-70"></div>
      <div className="absolute top-12 left-12 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60"></div>
    </div>
  );
};
