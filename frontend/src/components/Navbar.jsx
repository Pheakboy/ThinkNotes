import { Plus } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
      <div className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight animate-pulse">
          ThinkBoard
        </h1>
        <button className="flex items-center gap-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white px-5 py-2 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300">
          <Plus size={20} />
          <span className="font-semibold tracking-wide">New Note</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
