import { Link } from "react-router";
import { Edit, Eye, Trash2 } from "lucide-react";
// import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note. Please try again later.");
    }
  };

  return (
    <Link to={`/note/${note._id}`} className="block group scroll-smooth">
      <div className="relative bg-gradient-to-br from-gray-900 h-48 via-gray-800 to-gray-900 border-2 border-green-400 rounded-2xl p-6 shadow-xl hover:shadow-green-400/30 transition-all duration-300 cursor-pointer overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-green-400 opacity-20 rounded-full blur-2xl pointer-events-none group-hover:opacity-40 transition-opacity duration-300"></div>

        {/* Main content - clickable area for viewing */}
        <div className="block mb-6">
          <h3 className="text-white text-2xl font-bold mb-2 tracking-tight group-hover:text-green-400 transition-colors duration-300 line-clamp-1">
            {note.title}
          </h3>
          <p className="text-gray-300 text-base leading-relaxed line-clamp-2">
            {note.content}
          </p>
        </div>

        {/* Bottom section with date and actions */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-xs font-mono">
            {/* {formatDate(new Date(note.createdAt))} */}
            =========||=========
          </span>
          <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
            <Link
              to={`/note/${note._id}`}
              className="p-2 rounded-full bg-gray-800 hover:bg-blue-400/20 text-gray-400 hover:text-blue-400 transition-colors duration-200"
              aria-label="View note"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye size={18} />
            </Link>
            <Link
              to={`/note/${note._id}?edit=true`}
              className="p-2 rounded-full bg-gray-800 hover:bg-green-400/20 text-gray-400 hover:text-green-400 transition-colors duration-200"
              aria-label="Edit note"
              onClick={(e) => e.stopPropagation()}
            >
              <Edit size={18} />
            </Link>
            <button
              className="p-2 rounded-full bg-gray-800 hover:bg-red-400/20 text-gray-400 hover:text-red-400 transition-colors duration-200"
              aria-label="Delete note"
              type="button"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
