
import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">

        {/* Overlay */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        ></div>

        {/* Modal */}
        <div className="relative w-full max-w-2xl bg-white border border-gray-300 rounded-2xl shadow-xl p-6 z-10">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Header */}
          <div className="mb-4 border-b pb-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
          </div>

          {/* Content */}
          <div className="text-gray-800 max-h-[70vh] overflow-y-auto pr-1">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;