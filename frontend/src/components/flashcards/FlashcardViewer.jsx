

import React from 'react';
import Flashcard from './Flashcard.jsx';
import flashcardServices from '../../services/flashcards.service.js';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const FlashcardViewer = ({
  selectedSet,
  currentCardIndex,
  setCurrentCardIndex,
  handleToggleStar,
}) => {
  const handleNextCard = () => {
    if (selectedSet) {
      handleReview();
      setCurrentCardIndex((prev) => (prev + 1) % selectedSet.cards.length);
    }
  };

  const handlePrevCard = () => {
    if (selectedSet) {
      handleReview();
      setCurrentCardIndex(
        (prev) => (prev - 1 + selectedSet.cards.length) % selectedSet.cards.length
      );
    }
  };

  const handleReview = async () => {
    const currCard = selectedSet?.cards[currentCardIndex];
    if (!currCard) return;

    try {
      await flashcardServices.reviewFlashcard(currCard._id);
    } catch {
      toast.error('Failed to review flashcard');
    }
  };

  const currentCard = selectedSet.cards[currentCardIndex];

  return (
    <div className="flex flex-col items-center space-y-8 text-gray-900">

      {/* Flashcard */}
      <div className="w-full max-w-2xl">
        <Flashcard flashcard={currentCard} onToggleStar={handleToggleStar} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">

        {/* Previous */}
        <button
          onClick={handlePrevCard}
          disabled={selectedSet.cards.length <= 1}
          className="flex items-center gap-2 px-4 h-11 rounded-lg 
          bg-white border border-gray-400 text-black font-medium
          hover:bg-gray-200 transition disabled:opacity-50"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {/* Counter */}
        <div className="px-5 py-2 rounded-lg bg-gray-200 border border-gray-400 text-black font-semibold">
          {currentCardIndex + 1} / {selectedSet.cards.length}
        </div>

        {/* Next */}
        <button
          onClick={handleNextCard}
          disabled={selectedSet.cards.length <= 1}
          className="flex items-center gap-2 px-5 h-11 rounded-lg 
          bg-gradient-to-r from-blue-700 to-teal-500 text-white font-semibold
          hover:opacity-90 transition disabled:opacity-50"
        >
          Next
          <ChevronRight size={16} />
        </button>

      </div>
    </div>
  );
};

export default FlashcardViewer;