import ReactMarkdown from "react-markdown";

export const markdownComponents = {
  h1: ({ node, ...props }) => (
    <h1
      className="text-blueprint-amber font-bold text-lg md:text-xl my-3 border-b border-blueprint-line pb-1.5 tracking-wide"
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h2
      className="text-blueprint-azure font-bold text-base md:text-lg my-2.5 tracking-wide"
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h3
      className="text-blueprint-text font-semibold text-sm md:text-base my-2"
      {...props}
    />
  ),
  p: ({ node, ...props }) => (
    <p className="my-2 leading-relaxed text-blueprint-text/90" {...props} />
  ),
  strong: ({ node, ...props }) => (
    <strong className="text-blueprint-amber font-bold" {...props} />
  ),
  em: ({ node, ...props }) => (
    <em className="text-blueprint-azure italic" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul
      className="list-disc list-inside space-y-1.5 my-2.5 text-blueprint-text pl-2"
      {...props}
    />
  ),
  ol: ({ node, ...props }) => (
    <ol
      className="list-decimal list-inside space-y-1.5 my-2.5 text-blueprint-text pl-2"
      {...props}
    />
  ),
  li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="border-l-2 border-blueprint-amber bg-blueprint-surface/40 px-4 py-2 my-3 text-blueprint-muted italic rounded-r"
      {...props}
    />
  ),
  hr: ({ node, ...props }) => (
    <hr className="border-blueprint-line my-4" {...props} />
  ),
  code: ({ node, inline, ...props }) =>
    inline ? (
      <code
        className="bg-blueprint-surface border border-blueprint-line px-1.5 py-0.5 rounded text-blueprint-amber text-xs font-mono"
        {...props}
      />
    ) : (
      <code
        className="block bg-blueprint-surface/90 border border-blueprint-line p-3.5 rounded my-3 text-blueprint-text text-xs md:text-sm font-mono overflow-x-auto shadow-inner custom-scrollbar"
        {...props}
      />
    ),
};

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
  );
}
