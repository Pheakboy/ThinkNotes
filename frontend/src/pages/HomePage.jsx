import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import NoteCard from "../components/NoteCard";

const ThinkBoard = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        setNotes(res.data);
        setIsRateLimited(false);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response && error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      {isRateLimited && (
        <div className="p-8">
          <RateLimitedUi />
        </div>
      )}
      <div className="flex-1 flex flex-col">
        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto p-6 mt-6 w-full">
            {notes.length > 0 && !isRateLimited && (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThinkBoard;
