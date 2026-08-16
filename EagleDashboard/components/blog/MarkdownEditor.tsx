"use client";

import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import toast from "react-hot-toast";
import {
  FiTable,
  FiEye,
  FiEdit3,
  FiBold,
  FiItalic,
  FiCode,
  FiList,
  FiType,
} from "react-icons/fi";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder,
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [codeLang, setCodeLang] = useState<string>("");

  // Syntax highlighting theme
  const syntaxTheme: Record<string, Record<string, string | number>> = useMemo(
    () => ({
      hljs: {
        display: "block",
        overflowX: "auto",
        padding: "0.5em",
        background: "#282c34",
        color: "#abb2bf",
      },
      "hljs-attr": { color: "#e06c75" },
      "hljs-attr-value": { color: "#98c379" },
      "hljs-number": { color: "#d19a66" },
      "hljs-literal": { color: "#56b6f6" },
      "hljs-string": { color: "#98c379" },
      "hljs-comment": { color: "#5c6370" },
      "hljs-keyword": { color: "#c678dd" },
      "hljs-symbol": { color: "#61afef" },
      "hljs-function": { color: "#61afef" },
      "hljs-class": { color: "#61afef" },
      "hljs-title": { color: "#e06c75" },
      "hljs-variable": { color: "#e06c75" },
    }),
    [],
  );

  const insertMarkdown = (
    before: string,
    after: string,
    placeholder: string,
  ) => {
    const textarea = document.querySelector(
      'textarea[name="content"]',
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || placeholder;
    const newText =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newText);

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const ensureLeadingNewline = (pos: number) => {
    if (pos === 0) return "";
    const prev = value[pos - 1];
    return prev === "\n" ? "" : "\n";
  };

  const insertTable = () => {
    const tableTemplate = `\n| Header 1 | Header 2 | Header 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n\n`;
    const textarea = document.querySelector(
      'textarea[name="content"]',
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newText =
      value.substring(0, start) + tableTemplate + value.substring(start);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + tableTemplate.length,
        start + tableTemplate.length,
      );
    }, 0);
  };

  const insertHeading = (level = 2) => {
    const textarea = document.querySelector(
      'textarea[name="content"]',
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = value.substring(0, start);
    const after = value.substring(end);

    const lineStart = before.lastIndexOf("\n") + 1;
    const lineEndIdx = value.indexOf("\n", end);
    const lineEnd = lineEndIdx === -1 ? value.length : lineEndIdx;

    const lineText = value.substring(lineStart, lineEnd).trim();
    const headingPrefix = "#".repeat(level) + " ";

    const newLine = headingPrefix + (lineText || "Heading title");

    const newText =
      value.substring(0, lineStart) + newLine + value.substring(lineEnd);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const cursorPos = lineStart + newLine.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  // Topic: insert a list item with bold title. If selection exists, wrap selection in bold and prefix with list marker.
  const insertTopic = () => {
    const textarea = document.querySelector(
      'textarea[name="content"]',
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end).trim();

    if (selected) {
      const wrapped = `- **${selected}**`;
      const newText =
        value.substring(0, start) + wrapped + value.substring(end);
      onChange(newText);

      setTimeout(() => {
        textarea.focus();
        const pos = start + wrapped.length;
        textarea.setSelectionRange(pos, pos);
      }, 0);
      return;
    }

    // No selection: insert a topic template
    const template = `\n- **Topic title**\n`;
    const insertPos = start;
    const newText =
      value.substring(0, insertPos) + template + value.substring(insertPos);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const pos = insertPos + template.indexOf("Topic title");
      textarea.setSelectionRange(pos, pos + "Topic title".length);
    }, 0);
  };

  const handleInsertCode = () => {
    const textarea = document.querySelector(
      'textarea[name="content"]',
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    // Show a toast with input for language selection
    toast(
      (t) => (
        <div className="flex gap-2 w-full">
          <input
            autoFocus
            type="text"
            placeholder="e.g., javascript"
            defaultValue={codeLang}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const lang = (e.target as HTMLInputElement).value.trim();
                if (lang) {
                  setCodeLang(lang);
                  toast.dismiss(t.id);
                  insertCodeBlock(lang, textarea);
                }
              }
            }}
            className="flex-1 px-3 py-2 rounded bg-zinc-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={(event) => {
              const input = (
                event.target as HTMLElement
              ).parentElement?.querySelector("input") as HTMLInputElement;
              const lang = input?.value.trim();
              if (lang) {
                setCodeLang(lang);
                toast.dismiss(t.id);
                insertCodeBlock(lang, textarea);
              }
            }}
            className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
          >
            Insert
          </button>
        </div>
      ),
      {
        duration: 10000,
      },
    );
  };

  const insertCodeBlock = (lang: string, textarea: HTMLTextAreaElement) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start !== end) {
      const selected = value.substring(start, end);
      const nl = ensureLeadingNewline(start);
      const codeBlock = `${nl}\`\`\`${lang}\n${selected}\n\`\`\`\n`;
      const newText =
        value.substring(0, start) + codeBlock + value.substring(end);
      onChange(newText);
      toast.success(`Code block inserted with language: ${lang}`);

      setTimeout(() => {
        textarea.focus();
        const innerStart = start + nl.length + `\`\`\`${lang}\n`.length;
        textarea.setSelectionRange(innerStart, innerStart + selected.length);
      }, 0);
      return;
    }

    // no selection: insert empty fenced block and place cursor inside
    const nl = ensureLeadingNewline(start);
    const template = `${nl}\`\`\`${lang}\n\n\`\`\`\n`;
    const pos = start;
    const newText = value.substring(0, pos) + template + value.substring(pos);
    onChange(newText);
    toast.success(`Code block inserted with language: ${lang}`);

    setTimeout(() => {
      textarea.focus();
      const innerPos = pos + nl.length + `\`\`\`${lang}\n`.length;
      textarea.setSelectionRange(innerPos, innerPos);
    }, 0);
  };

  const insertNumberedList = () => {
    const textarea = document.querySelector(
      'textarea[name="content"]',
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);

    if (selected) {
      // wrap selected text in fenced code block when inserting code language
      const nl = ensureLeadingNewline(start);
      const codeBlock = `${nl}\`\`\`${selected}\`\`\``;
      const newText =
        value.substring(0, start) + codeBlock + value.substring(end);
      onChange(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + codeBlock.length);
      }, 0);
      return;
    }

    const nl = ensureLeadingNewline(start);
    const template = `${nl}1. List item\n`;
    const pos = start;
    const newText = value.substring(0, pos) + template + value.substring(pos);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const p = pos + template.indexOf("List item");
      textarea.setSelectionRange(p, p + "List item".length);
    }, 0);
  };

  const insertAsteriskList = () => {
    const textarea = document.querySelector(
      'textarea[name="content"]',
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);

    if (selected && selected.includes("\n")) {
      const lines = selected.split(/\r?\n/).filter(Boolean);
      const starred = lines.map((ln) => `* ${ln.trim()}`).join("\n");
      const newText =
        value.substring(0, start) + starred + value.substring(end);
      onChange(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + starred.length);
      }, 0);
      return;
    }

    const nl = ensureLeadingNewline(start);
    const template = `${nl}* List item\n`;
    const pos = start;
    const newText = value.substring(0, pos) + template + value.substring(pos);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const p = pos + template.indexOf("List item");
      textarea.setSelectionRange(p, p + "List item".length);
    }, 0);
  };

  const toolbarButtons = [
    {
      icon: FiBold,
      label: "Bold",
      action: () => insertMarkdown("**", "**", "bold text"),
    },
    {
      icon: FiItalic,
      label: "Italic",
      action: () => insertMarkdown("*", "*", "italic text"),
    },
    {
      icon: FiCode,
      label: "Code",
      action: () => handleInsertCode(),
    },
    {
      icon: FiList,
      label: "Numbered",
      action: insertNumberedList,
    },
    {
      icon: FiList,
      label: "Asterisk",
      action: insertAsteriskList,
    },
    { icon: FiType, label: "Heading", action: () => insertHeading(2) },
    { icon: FiTable, label: "Table", action: insertTable },
    { icon: FiType, label: "Topic", action: insertTopic },
  ];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-2">
          {toolbarButtons.map((btn, idx) => (
            <button
              key={idx}
              type="button"
              onClick={btn.action}
              className="p-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-700 text-zinc-400 hover:text-emerald-500 transition-all group relative"
              title={btn.label}
            >
              <btn.icon size={18} />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {btn.label}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
            showPreview
              ? "bg-emerald-600 text-white"
              : "bg-zinc-800/50 text-zinc-400 hover:text-emerald-500"
          }`}
        >
          {showPreview ? <FiEdit3 size={16} /> : <FiEye size={16} />}
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {/* Editor/Preview Area */}
      <div className="relative">
        {showPreview ? (
          <div className="min-h-[300px] rounded-3xl bg-zinc-900/50 border border-zinc-800 px-8 py-6 text-white">
            <div className="prose prose-invert prose-emerald max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code(props: any) {
                    const { inline, className, children } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <div className="relative my-4">
                        <div className="absolute right-2 top-2 text-[10px] uppercase text-zinc-400 tracking-wider">
                          {match[1]}
                        </div>
                        <SyntaxHighlighter
                          style={syntaxTheme}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {value || "*No content to preview*"}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <textarea
            name="content"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={12}
            required
            placeholder={
              placeholder ||
              "Write your story here... (Supports Markdown)\n\nTip: Use the toolbar above to insert tables and formatting"
            }
            className="w-full rounded-3xl bg-zinc-900/50 border border-zinc-800 px-8 py-6 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium leading-relaxed shadow-inner scrollbar-hide resize-none"
          />
        )}
      </div>

      {/* Markdown Help */}
      <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest ml-2 space-y-1">
        <p className="italic">
          ✨ Markdown Supported: **bold**, *italic*, `code`, - lists, tables,
          and more
        </p>
      </div>
    </div>
  );
}
