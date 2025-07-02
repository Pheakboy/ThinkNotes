import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUi from "../components/RateLimitedUi";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NoteNotFound from "../components/NoteNotFound";
import Footer from "../components/Footer";

const ThinkBoard = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
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
    <div className="min-h-screen text-white flex flex-col relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <Navbar />
      {isRateLimited && (
        <div className="p-8">
          <RateLimitedUi />
        </div>
      )}

      <div className="flex-1 flex flex-col px-5 py-18">
        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto p-2 w-full">
            {notes.length > 0 && !isRateLimited && (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-smooth">
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {notes.length === 0 && !isRateLimited && <NoteNotFound />}

      <Footer />
    </div>
  );
};

export default ThinkBoard;
