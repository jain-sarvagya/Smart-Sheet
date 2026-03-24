

import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../../components/common/Spinner.jsx';
import toast from 'react-hot-toast';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import documentServices from '../../services/document.service.js';
import PageHeader from '../../components/common/PageHeader.jsx';
import Tabs from '../../components/documents/Tabs.jsx';
import ChatInterface from '../../components/tabs/ChatInterface.jsx';
import AIActions from '../../components/tabs/AIActions.jsx';
import FlashcardManager from '../../components/flashcards/FlashcardManager.jsx';
import QuizManager from '../../components/quizzes/QuizManager.jsx';

function DocDetailPage() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Content');
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchDocument = async () => {
      try {
        const result = await documentServices.getDocumentById(id);
        setDocument(result.data);
      } catch (error) {
        toast.error(error?.error || 'Failed to fetch document');
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  const getPDFUrl = () => {
    if (!document?.filePath) return null;

    if (document.filePath.startsWith('http')) {
      return document.filePath;
    }

    const baseURL = process.env.REACT_APP_API_URL;
    return `${baseURL}/${document.filePath}`;
  };

  const renderContent = () => {
    if (!document?.filePath) {
      return (
        <div className="text-center p-8 text-gray-500">
          PDF not available
        </div>
      );
    }

    const pdfUrl = getPDFUrl();

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-800">
            Document Viewer
          </span>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            <ExternalLink size={14} />
            Open
          </a>
        </div>

        {/* PDF */}
        <div className="p-2">
          <iframe
            src={pdfUrl}
            className="w-full h-[70vh] rounded"
            title="PDF Viewer"
          />
        </div>
      </div>
    );
  };

  const tabs = [
    { name: 'Content', label: 'Content', content: renderContent() },
    { name: 'Chat', label: 'Chat', content: <ChatInterface /> },
    { name: 'AI Actions', label: 'AI Actions', content: <AIActions /> },
    { name: 'Flashcards', label: 'Flashcards', content: <FlashcardManager documentId={id} /> },
    { name: 'Quizzes', label: 'Quizzes', content: <QuizManager documentId={id} /> },
  ];

  if (loading) return <Spinner />;

  if (!document) {
    return (
      <div className="text-center p-8 text-gray-500">
        Document not found
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Back */}
      <div className="mb-4">
        <Link
          to="/documents"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Documents
        </Link>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {document.title}
        </h1>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

    </div>
  );
}

export default DocDetailPage;