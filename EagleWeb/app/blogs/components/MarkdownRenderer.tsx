"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { FiCopy, FiCheck } from "react-icons/fi";

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock = ({ inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || "");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = Array.isArray(children) ? children.join("") : String(children);
    navigator.clipboard.writeText(text.replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const code = Array.isArray(children) ? children.join("") : String(children);

  return !inline ? (
    <div className="relative group my-6 rounded-lg overflow-hidden border border-zinc-700">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
        <span className="text-xs text-zinc-400 font-mono">
          {match ? match[1].toUpperCase() : "TEXT"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <FiCheck className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match ? match[1] : "text"}
        PreTag="div"
        showLineNumbers
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: "#18181b",
          padding: "1.5rem",
        }}
        {...props}
      >
        {code.replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code
      className={`${
        className || ""
      } bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-pink-400`}
      {...props}
    >
      {children}
    </code>
  );
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-blue-400 prose-strong:text-white prose-code:text-pink-400">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeBlock,
          h1: ({ node, ...props }) => (
            <h1
              className="text-3xl font-bold mt-8 mb-4 text-white"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-2xl font-bold mt-8 mb-4 text-white border-b border-zinc-800 pb-2"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold mt-6 mb-3 text-white" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-zinc-300 leading-relaxed mb-4" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-inside mb-4 text-zinc-300 space-y-1"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-inside mb-4 text-zinc-300 space-y-1"
              {...props}
            />
          ),
          li: ({ node, ...props }) => <li className="ml-4" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-blue-500 pl-4 italic text-zinc-400 my-4"
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className="min-w-full table-auto border-collapse border border-zinc-700"
                {...props}
              />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-4 py-2 bg-zinc-800 text-zinc-200 border border-zinc-700 text-left"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-4 py-2 text-zinc-300 border border-zinc-700 align-top"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
