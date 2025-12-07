import { ReactNode } from "react";

interface AuthFormLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const AuthFormLayout = ({
  title,
  description,
  children
}: AuthFormLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-xl border border-white/60 backdrop-blur">
        <div className="mb-6 text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            {title}
          </h1>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
};
