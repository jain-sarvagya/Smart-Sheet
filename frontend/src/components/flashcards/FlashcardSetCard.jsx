
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import moment from 'moment';

const FlashcardSetCard = ({ flashcardSet }) => {
  const navigate = useNavigate();

  const handleStudyNow = () => {
    navigate(`/flashcards/${flashcardSet._id}`);
  };

  const reviewedCount = flashcardSet.cards.filter((card) => card.lastReviewed).length;
  const totalCards = flashcardSet.cards.length;
  const progressPercentage =
    totalCards > 0 ? Math.round((reviewedCount / totalCards) * 100) : 0;

  return (
    <div
      onClick={handleStudyNow}
      className="group bg-white text-gray-900 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      {/* Header */}
      <div className="space-y-4">

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
              {flashcardSet?.documentId?.title || 'Flashcard'}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Created {moment(flashcardSet.createdAt).fromNow()}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3">

          <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg">
            {totalCards} {totalCards === 1 ? 'Card' : 'Cards'}
          </span>

          {reviewedCount > 0 && (
            <span className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg">
              <TrendingUp size={14} />
              {progressPercentage}%
            </span>
          )}
        </div>

        {/* Progress */}
        {totalCards > 0 && (
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{reviewedCount}/{totalCards}</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="h-2 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleStudyNow();
        }}
        className="mt-6 w-full h-11 rounded-lg font-medium text-white 
        bg-gradient-to-r from-blue-600 to-teal-400 
        hover:opacity-90 transition"
      >
        <span className="flex items-center justify-center gap-2">
          <Sparkles size={16} />
          Study Now
        </span>
      </button>
    </div>
  );
};

export default FlashcardSetCard;