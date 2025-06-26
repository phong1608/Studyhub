import { RootComment } from "@/interfaces/models/comment.interface";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const Comment: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  const [newComment, setNewComment] = useState<string | null>();
  const [comments, setComments] = useState<RootComment[] | null>();
  const [loading, setLoading] = useState(false);

  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");

  const fetchComments = async () => {
    setLoading(true);
    const res = await axios.get<RootComment[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/comment/lesson=${lessonId}/comment`
    );
    setComments(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [lessonId]);

  const handleComment = async () => {
    setLoading(true);
    await axios.post(
      `http://localhost:3333/comment/create/`,
      { lessonId, content: newComment },
      { withCredentials: true }
    );
    setNewComment("");
    fetchComments();
    setLoading(false);
  };

  const handleReply = async (parentId: string) => {
    if (!replyContent.trim()) return;
    setLoading(true);
    await axios.post(
      `http://localhost:3333/comment/create/`,
      { lessonId, content: replyContent, parentId },
      { withCredentials: true }
    );
    setReplyContent("");
    setReplyingToId(null);
    fetchComments();
    setLoading(false);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({comments?.length || 0})
          </h2>
        </div>

        <div className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <textarea
              rows={6}
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment || ""}
              className="w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            />
          </div>
          <button
            onClick={handleComment}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600"
          >
            Post comment
          </button>
        </div>

        {comments?.map((comment) => (
          <div key={comment.id}>
            <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900 dark:text-white">
                    <Image
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="User Avatar"
                      width={200}
                      height={200}
                    />
                    {comment.user.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time>{new Date(comment.createdAt).toLocaleDateString("vi-VN")}</time>
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{comment.message}</p>

              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  onClick={() =>
                    setReplyingToId(replyingToId === comment.id ? null : comment.id)
                  }
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                >
                  <svg
                    className="mr-1.5 w-3.5 h-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                  </svg>
                  Reply
                </button>
              </div>

              {replyingToId === comment.id && (
                <div className="mt-4 ml-4">
                  <textarea
                    rows={3}
                    className="w-full mb-2 p-2 rounded border dark:bg-gray-800 dark:text-white"
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                  <button
                    onClick={() => handleReply(comment.id)}
                    className="px-4 py-1 text-sm bg-teal-500 text-white rounded hover:bg-teal-600"
                  >
                    Submit reply
                  </button>
                </div>
              )}
            </article>

            {/* Child comments */}
            {comment.children?.map((child) => (
              <article
                key={child.id}
                className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900"
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900 dark:text-white">
                      <Image
                        className="mr-2 w-6 h-6 rounded-full"
                        width={200}
                        height={200}
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="User Avatar"
                      />
                      {child.user.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time>{new Date(child.createdAt).toLocaleDateString("vi-VN")}</time>
                    </p>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">{child.message}</p>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comment;
