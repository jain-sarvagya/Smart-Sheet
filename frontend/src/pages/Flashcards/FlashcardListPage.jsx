
import React, { useRef, useState, useEffect } from 'react';
import flashcardService from '../../services/flashcards.service';
import Spinner from '../../components/common/Spinner';
import FlashcardSetCard from '../../components/flashcards/FlashcardSetCard';
import toast from 'react-hot-toast';

function FlashcardListPage() {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchFlashcardsSets = async () => {
      try {
        const response = await flashcardService.getAllFlashcards();
        setFlashcardSets(response.data);
      } catch (error) {
        toast.error('Failed to fetch flashcard sets.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcardsSets();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="max-w-[1200px] mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Flashcards
        </h1>
        <p className="text-gray-500 text-sm">
          Review and manage your flashcard sets
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto">

        {/* ✅ IF DATA EXISTS */}
        {flashcardSets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {flashcardSets.map((set) => (
              <FlashcardSetCard key={set._id} flashcardSet={set} />
            ))}
          </div>
        ) : (

          /* ✅ CORPORATE EMPTY STATE */
          <div className="flex flex-col items-center justify-center mt-20">

            <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 shadow-sm">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Flashcards yet
            </h2>

            <p className="text-gray-500 text-sm text-center max-w-sm mb-6">
              Generate flashcards from your documents to start learning and reinforce your knowledge.
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

export default FlashcardListPage;
