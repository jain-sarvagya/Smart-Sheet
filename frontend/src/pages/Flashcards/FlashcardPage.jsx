
import React, { useEffect, useRef, useState } from 'react';
import flashcardService from '../../services/flashcards.service';
import Spinner from '../../components/common/Spinner';
import { useParams, Link } from 'react-router-dom';
import FlashcardViewer from '../../components/flashcards/FlashcardViewer';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

function FlashcardPage() {
  const { id } = useParams();
  const [flashcardSet, setFlashcardSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchFlashcardSet = async () => {
      try {
        const response = await flashcardService.getFlashcardById(id);
        setFlashcardSet(response.data);
      } catch (error) {
        toast.error('Failed to fetch flashcards set.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcardSet();
  }, [id]);

  const handleToggleStar = async (cardId) => {
    try {
      await flashcardService.starFlashcard(cardId);

      const updatedCards = flashcardSet.cards.map((card) =>
        card._id === cardId
          ? { ...card, isStarred: !card.isStarred }
          : card
      );

      setFlashcardSet((prev) => ({
        ...prev,
        cards: updatedCards,
      }));

      toast.success('Card updated');
    } catch {
      toast.error('Failed to update card');
    }
  };

  if (loading) return <Spinner />;

  if (!flashcardSet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Flashcards not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="max-w-[1100px] mx-auto mb-6">

        {/* Back */}
        <Link
          to="/flashcards"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition"
        >
          <ArrowLeft size={16} />
          Back to Flashcards
        </Link>

        {/* Title Section */}
        <div className="mt-4">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            {flashcardSet.title || 'Flashcard Set'}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {flashcardSet.cards?.length || 0} Cards
          </p>
        </div>
      </div>

      {/* Viewer Card */}
      <div className="max-w-[1100px] mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-6">

        <FlashcardViewer
          selectedSet={flashcardSet}
          handleToggleStar={handleToggleStar}
          currentCardIndex={currentCardIndex}
          setCurrentCardIndex={setCurrentCardIndex}
        />

      </div>
    </div>
  );
}

export default FlashcardPage;