
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="text-gray-900 leading-relaxed">

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => <h1 className="text-2xl font-bold mt-4 mb-2 text-gray-900" {...props} />,
          h2: (props) => <h2 className="text-xl font-bold mt-4 mb-2 text-gray-900" {...props} />,
          h3: (props) => <h3 className="text-lg font-semibold mt-3 mb-2 text-gray-900" {...props} />,
          h4: (props) => <h4 className="text-base font-semibold mt-3 mb-1 text-gray-900" {...props} />,

          p: (props) => <p className="mb-3 text-gray-800" {...props} />,

          a: (props) => (
            <a className="text-blue-600 hover:underline" {...props} />
          ),

          ul: (props) => (
            <ul className="list-disc list-inside mb-3 ml-4 text-gray-800" {...props} />
          ),

          ol: (props) => (
            <ol className="list-decimal list-inside mb-3 ml-4 text-gray-800" {...props} />
          ),

          li: (props) => <li className="mb-1" {...props} />,

          strong: (props) => <strong className="font-semibold text-gray-900" {...props} />,

          em: (props) => <em className="italic text-gray-800" {...props} />,

          blockquote: (props) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4" {...props} />
          ),

          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');

            return !inline && match ? (
              <SyntaxHighlighter
                style={oneLight}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-200 text-red-600 px-1 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          },

          pre: (props) => (
            <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto my-4" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>

    </div>
  );
};

export default MarkdownRenderer;