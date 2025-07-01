import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { Plus, Edit, Trash2 } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch note. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

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
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully!");
      navigate("/");  
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
        {/* Back link */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="cursor-pointer items-center gap-2  text-white px-5 py-2 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 "
          >
            ⬅️ Back to Notes
          </Link>

          <button
            onClick={handleDelete}
            className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-red-400 via-red-500 to-red-400 hover:from-red-500 hover:to-red-500 text-white px-5 py-2 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <Trash2 size={20} />
            <span className="font-semibold tracking-wide">Delete</span>
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6">Edit Note</h1>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Note title"
              value={note?.title || ""}
              onChange={(e) => setNote({ ...note, title: e.target.value })} // Update title state
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              rows="6"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              placeholder="Write your note here..."
              value={note?.content || ""}
              onChange={(e) => setNote({ ...note, content: e.target.value })} // Update content state
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              disabled={saving}
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-full transition-all duration-200"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteDetailPage;
