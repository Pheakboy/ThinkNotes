import React from "react";

const NoteNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-brrounded-lg shadow-lg p-8">
      <div className="flex items-center mb-4">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight animate-pulse">
          Note Not Found
        </h1>
      </div>
    </div>
  );
};

export default NoteNotFound;
