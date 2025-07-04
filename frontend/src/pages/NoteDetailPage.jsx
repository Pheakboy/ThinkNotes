import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useSearchParams } from "react-router";
import { Edit, Trash2, Eye } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if edit mode is requested via URL parameter
    const editMode = searchParams.get("edit") === "true";
    setIsEditing(editMode);
  }, [searchParams]);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        // toast.error("Failed to fetch note. Please try again later.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note. Please try again later.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      setNote(res.data);
      setIsEditing(false);
      toast.success("Note updated successfully!");
      // Remove edit parameter from URL
      navigate(`/note/${id}`, { replace: true });
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note. Please try again later.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Note not found
          </h2>
          <Link
            to="/"
            className="text-green-400 hover:text-green-300 transition"
          >
            ⬅️ Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-3xl bg-[#111] p-8 rounded-2xl shadow-xl border border-white/10">
        {/* Header with actions */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition"
          >
            ⬅️ Back to Notes
          </Link>

          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 hover:from-blue-500 hover:to-blue-500 text-white px-5 py-2 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <Edit size={20} />
                <span className="font-semibold tracking-wide">Edit</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(false);
                  navigate(`/note/${id}`, { replace: true });
                }}
                className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 hover:from-gray-500 hover:to-gray-500 text-white px-5 py-2 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <Eye size={20} />
                <span className="font-semibold tracking-wide">View</span>
              </button>
            )}

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-red-400 via-red-500 to-red-400 hover:from-red-500 hover:to-red-500 text-white px-5 py-2 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Trash2 size={20} />
              <span className="font-semibold tracking-wide">Delete</span>
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">
          {isEditing ? "Edit Note" : "View Note"}
        </h1>

        {isEditing ? (
          // Edit Mode
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Note title"
                value={note?.title || ""}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                rows="10"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                placeholder="Write your note here..."
                value={note?.content || ""}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  navigate(`/note/${id}`, { replace: true });
                  // Refresh note data
                  window.location.reload();
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-full transition-all duration-200 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          // View Mode
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-4">
                {note?.title}
              </h2>
            </div>

            <div>
              <div className="bg-black border border-white/10 rounded-xl p-6 min-h-[300px]">
                <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {note?.content}
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-400 flex justify-between border-t border-white/10 pt-4">
              <span>
                Created: {new Date(note?.createdAt).toLocaleDateString()}
              </span>
              <span>
                Updated: {new Date(note?.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetailPage;
