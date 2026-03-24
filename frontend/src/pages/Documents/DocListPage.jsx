
// import React, { useEffect, useState, useRef } from 'react';
// import { Plus, Upload, X } from 'lucide-react';
// import toast from 'react-hot-toast';
// import Spinner from '../../components/common/Spinner.jsx';
// import documentServices from '../../services/document.service.js';
// import DocumentCard from '../../components/documents/DocumentCard.jsx';

// const DocListPage = () => {
//   const [documents, setDocuments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [uploadFile, setUploadFile] = useState(null);
//   const [uploadTitle, setUploadTitle] = useState('');
//   const [uploading, setUploading] = useState(false);

//   const hasFetched = useRef(false);

//   const fetchDocuments = async () => {
//     try {
//       const res = await documentServices.getDocuments();
//       setDocuments(res.data);
//     } catch {
//       toast.error('Failed to fetch documents');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;
//     fetchDocuments();
//   }, []);

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!uploadFile || !uploadTitle) {
//       toast.error('Please fill all fields');
//       return;
//     }

//     setUploading(true);

//     const formData = new FormData();
//     formData.append('file', uploadFile);
//     formData.append('title', uploadTitle);

//     try {
//       await documentServices.upload(formData);
//       toast.success('Uploaded successfully');
//       setUploadFile(null);
//       setUploadTitle('');
//       setIsUploadModalOpen(false);
//       fetchDocuments();
//     } catch {
//       toast.error('Upload failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDelete = async (doc) => {
//     if (!window.confirm('Delete this document?')) return;

//     try {
//       await documentServices.deleteDoc(doc._id);
//       toast.success('Deleted');
//       setDocuments(documents.filter((d) => d._id !== doc._id));
//     } catch {
//       toast.error('Delete failed');
//     }
//   };

//   if (isLoading) return <Spinner />;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* Header (NO Upload button here) */}
//       <div className="max-w-[1200px] mx-auto mb-6">
//         <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
//         <p className="text-gray-500 text-sm">
//           Manage and organize your learning materials
//         </p>
//       </div>

//       {/* Content */}
//       <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

//         {documents.length > 0 ? (
//           documents.map((doc) => (
//             <DocumentCard key={doc._id} document={doc} onDelete={handleDelete} />
//           ))
//         ) : (

//           /* ✅ CENTER EMPTY STATE */
//           <div className="col-span-full flex flex-col items-center justify-center mt-16">

//             <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 shadow-sm">
//               <svg
//                 className="w-10 h-10 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M7 7h10M7 11h10M7 15h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
//               </svg>
//             </div>

//             <h2 className="text-xl font-semibold text-gray-900 mb-2">
//               No documents yet
//             </h2>

//             <p className="text-gray-500 text-sm mb-6 text-center max-w-sm">
//               Upload your first document to start learning, generate flashcards, and take quizzes.
//             </p>

//             <button
//               onClick={() => setIsUploadModalOpen(true)}
//               className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
//             >
//               <Plus size={16} />
//               Upload Document
//             </button>

//           </div>
//         )}
//       </div>

//       {/* Upload Modal */}
//       {isUploadModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

//           <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

//             {/* Header */}
//             <div className="flex items-center justify-between mb-5">
//               <h2 className="text-lg font-semibold text-gray-900">
//                 Upload Document
//               </h2>

//               <button
//                 onClick={() => setIsUploadModalOpen(false)}
//                 className="p-2 rounded-lg hover:bg-gray-100 transition"
//               >
//                 <X size={18} className="text-gray-500" />
//               </button>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleUpload} className="space-y-5">

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Document Title
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter document title"
//                   value={uploadTitle}
//                   onChange={(e) => setUploadTitle(e.target.value)}
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Upload PDF
//                 </label>

//                 <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">

//                   <Upload className="w-6 h-6 text-blue-500 mb-2" />

//                   <p className="text-sm text-gray-600 text-center">
//                     {uploadFile ? uploadFile.name : 'Click to upload or drag & drop'}
//                   </p>

//                   <span className="text-xs text-gray-400 mt-1">
//                     PDF (Max 10MB)
//                   </span>

//                   <input
//                     type="file"
//                     accept=".pdf"
//                     onChange={(e) => setUploadFile(e.target.files[0])}
//                     className="hidden"
//                   />
//                 </label>
//               </div>

//               <div className="flex gap-3 pt-2">

//                 <button
//                   type="button"
//                   onClick={() => setIsUploadModalOpen(false)}
//                   className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={uploading}
//                   className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
//                 >
//                   {uploading ? 'Uploading...' : 'Upload'}
//                 </button>

//               </div>

//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocListPage;


// import React, { useEffect, useState, useRef } from 'react';
// import { Plus, Upload, X } from 'lucide-react';
// import toast from 'react-hot-toast';
// import Spinner from '../../components/common/Spinner.jsx';
// import documentServices from '../../services/document.service.js';
// import DocumentCard from '../../components/documents/DocumentCard.jsx';

// const DocListPage = () => {
//   const [documents, setDocuments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [uploadFile, setUploadFile] = useState(null);
//   const [uploadTitle, setUploadTitle] = useState('');
//   const [uploading, setUploading] = useState(false);

//   const hasFetched = useRef(false);

//   // ✅ Fetch documents
//   const fetchDocuments = async () => {
//     try {
//       const res = await documentServices.getDocuments();
//       setDocuments(res.data);
//     } catch {
//       toast.error('Failed to fetch documents');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;
//     fetchDocuments();
//   }, []);

//   // ✅ Upload handler (instant UI update)
//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!uploadFile || !uploadTitle) {
//       toast.error('Please fill all fields');
//       return;
//     }

//     setUploading(true);

//     const formData = new FormData();
//     formData.append('file', uploadFile);
//     formData.append('title', uploadTitle);

//     try {
//       const res = await documentServices.upload(formData);

//       toast.success('Uploaded successfully');

//       // 🔥 Add new doc instantly (optional: fallback to fetch)
//       if (res?.data) {
//         setDocuments((prev) => [res.data, ...prev]);
//       } else {
//         fetchDocuments(); // fallback
//       }

//       setUploadFile(null);
//       setUploadTitle('');
//       setIsUploadModalOpen(false);
//     } catch {
//       toast.error('Upload failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ✅ Delete handler
//   const handleDelete = async (doc) => {
//     if (!window.confirm('Delete this document?')) return;

//     try {
//       await documentServices.deleteDoc(doc._id);
//       toast.success('Deleted');

//       setDocuments((prev) =>
//         prev.filter((d) => d._id !== doc._id)
//       );
//     } catch {
//       toast.error('Delete failed');
//     }
//   };

//   if (isLoading) return <Spinner />;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* ✅ HEADER WITH ALWAYS VISIBLE BUTTON */}
//       <div className="max-w-[1200px] mx-auto mb-6 flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
//           <p className="text-gray-500 text-sm">
//             Manage and organize your learning materials
//           </p>
//         </div>

//         <button
//           onClick={() => setIsUploadModalOpen(true)}
//           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
//         >
//           <Plus size={16} />
//           Upload
//         </button>
//       </div>

//       {/* ✅ DOCUMENT GRID */}
//       <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

//         {documents.length > 0 ? (
//           documents.map((doc) => (
//             <DocumentCard
//               key={doc._id}
//               document={doc}
//               onDelete={handleDelete}
//             />
//           ))
//         ) : (
//           <div className="col-span-full flex flex-col items-center justify-center mt-16">
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">
//               No documents yet
//             </h2>
//             <p className="text-gray-500 text-sm mb-6 text-center max-w-sm">
//               Upload your first document to start learning.
//             </p>
//           </div>
//         )}

//       </div>

//       {/* ✅ UPLOAD MODAL */}
//       {isUploadModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

//           <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

//             {/* Header */}
//             <div className="flex items-center justify-between mb-5">
//               <h2 className="text-lg font-semibold text-gray-900">
//                 Upload Document
//               </h2>

//               <button
//                 onClick={() => setIsUploadModalOpen(false)}
//                 className="p-2 rounded-lg hover:bg-gray-100"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleUpload} className="space-y-5">

//               <input
//                 type="text"
//                 placeholder="Document Title"
//                 value={uploadTitle}
//                 onChange={(e) => setUploadTitle(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg"
//               />

//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) => setUploadFile(e.target.files[0])}
//                 className="w-full"
//               />

//               <div className="flex gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setIsUploadModalOpen(false)}
//                   className="flex-1 border py-2 rounded-lg"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={uploading}
//                   className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
//                 >
//                   {uploading ? 'Uploading...' : 'Upload'}
//                 </button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocListPage;



import React, { useEffect, useState, useRef } from 'react';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Spinner from '../../components/common/Spinner.jsx';
import documentServices from '../../services/document.service.js';
import DocumentCard from '../../components/documents/DocumentCard.jsx';

const DocListPage = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  const hasFetched = useRef(false);

  // ✅ Fetch documents
  const fetchDocuments = async () => {
    try {
      const res = await documentServices.getDocuments();
      setDocuments(res.data);
    } catch {
      toast.error('Failed to fetch documents');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchDocuments();
  }, []);

  // ✅ Upload handler
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!uploadFile || !uploadTitle) {
      toast.error('Please fill all fields');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('title', uploadTitle);

    try {
      await documentServices.upload(formData);

      toast.success('Uploaded successfully');

      // refresh documents
      fetchDocuments();

      setUploadFile(null);
      setUploadTitle('');
      setIsUploadModalOpen(false);
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete handler
  const handleDelete = async (doc) => {
    if (!window.confirm('Delete this document?')) return;

    try {
      await documentServices.deleteDoc(doc._id);
      toast.success('Deleted');

      setDocuments((prev) =>
        prev.filter((d) => d._id !== doc._id)
      );
    } catch {
      toast.error('Delete failed');
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* ✅ HEADER */}
      <div className="max-w-[1200px] mx-auto mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
          <p className="text-gray-500 text-sm">
            Manage and organize your learning materials
          </p>
        </div>

        {/* ✅ ALWAYS VISIBLE BUTTON */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
        >
          <Plus size={16} />
          Upload
        </button>
      </div>

      {/* ✅ DOCUMENT GRID */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {documents.length > 0 ? (
          documents.map((doc) => (
            <DocumentCard
              key={doc._id}
              document={doc}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center mt-16">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No documents yet
            </h2>
            <p className="text-gray-500 text-sm mb-6 text-center max-w-sm">
              Upload your first document to start learning.
            </p>
          </div>
        )}

      </div>

      {/* ✅ FIXED MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Upload Document
              </h2>

              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUpload} className="space-y-5">

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Title
                </label>

                <input
                  type="text"
                  placeholder="Enter document title"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  outline-none transition text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* File */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload PDF
                </label>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                  className="w-full text-gray-700"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocListPage;