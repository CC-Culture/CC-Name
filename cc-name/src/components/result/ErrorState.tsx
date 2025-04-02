"use client";

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-[#F5F5DC] bg-opacity-90 flex items-center justify-center">
      <div className="text-red-600 text-xl">{message}</div>
    </div>
  );
}
