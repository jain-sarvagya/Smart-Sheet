
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Trash2, Clock, Dock, BrainCircuit } from 'lucide-react';
import moment from 'moment';

const formatFilesize = (bytes) => {
  if (bytes === undefined || bytes === null) return 'N/A';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

const DocumentCard = ({ document, onDelete }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/documents/${document._id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(document);
  };

  return (
    <div
      onClick={handleNavigate}
      className="group relative bg-white border border-gray-200 rounded-xl p-5 
      shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer 
      hover:-translate-y-1 flex flex-col justify-between"
    >
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-4">
          
          {/* Icon */}
          <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 p-2 rounded-md 
            hover:bg-red-50 transition"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>

        {/* Title */}
        <h3
          title={document.title}
          className="text-sm font-semibold text-gray-900 truncate mb-2"
        >
          {document.title}
        </h3>

        {/* File Size */}
        <p className="text-xs text-gray-500 mb-3">
          {formatFilesize(document.fileSize)}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-2">
          
          {document.flashcardCount !== undefined && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-medium">
              <Dock size={14} />
              {document.flashcardCount}
            </div>
          )}

          {document.quizCount !== undefined && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-50 text-green-600 text-xs font-medium">
              <BrainCircuit size={14} />
              {document.quizCount}
            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500 flex items-center gap-1">
        <Clock size={14} />
        Uploaded {moment(document.createdAt).fromNow()}
      </div>
    </div>
  );
};

export default DocumentCard;

