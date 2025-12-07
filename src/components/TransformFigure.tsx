"use client";

export const TransformFigure = () => {
  return (
    <div className="relative w-32 h-32">
      <div
        className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"
        style={{
          transform: "translate(-50%, -50%) rotate(0deg)"
        }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full"
        style={{
          transform: "translate(-50%, -50%) rotate(60deg) translateY(-40px)"
        }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-12 h-12 bg-gradient-to-br from-violet-400 to-pink-500 rounded-full"
        style={{
          transform: "translate(-50%, -50%) rotate(120deg) translateY(-40px)"
        }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-10 h-10 bg-gradient-to-br from-rose-400 to-red-500 rounded-full"
        style={{
          transform: "translate(-50%, -50%) rotate(180deg) translateY(-40px)"
        }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-6 h-6 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"
        style={{
          transform: "translate(-50%, -50%) scale(1.2)"
        }}
      ></div>
    </div>
  );
};
