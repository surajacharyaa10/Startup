import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export interface Blog {
  _id: string | { $oid: string };
  title: string;
  content: string;
  image: string;
  slug: string;
  tags?: string[];
  category?: string;
  readTime?: string;
  views?: number;
  createdAt?: string;
  author?: string;
  type?: "standard" | "link";
  externalUrl?: string;
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col h-full">
      <div className="h-52 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          {blog.category && (
            <span className="text-xs font-medium px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">
              {blog.category}
            </span>
          )}
          {blog.readTime && (
            <span className="text-xs text-zinc-500">• {blog.readTime}</span>
          )}
        </div>

        <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
          {blog.title}
        </h2>

        <p className="text-zinc-400 line-clamp-3 mb-4 flex-grow">
          {blog.content}
        </p>

        <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>{blog.author || "Admin"}</span>
            {blog.createdAt && (
              <>
                <span>•</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </>
            )}
          </div>

          <Link
            href={
              blog.type === "link" && blog.externalUrl
                ? blog.externalUrl
                : `/blogs/${blog.slug}`
            }
            target={blog.type === "link" ? "_blank" : undefined}
            className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
          >
            Read More <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
