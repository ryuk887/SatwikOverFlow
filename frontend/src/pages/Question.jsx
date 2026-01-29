import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleQuestion } from "../services/api";

function Question() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await getSingleQuestion(questionId);
        setQuestion(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [questionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Question not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">

      {/* Navbar
      <div className="navbar bg-base-100 shadow-md px-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-primary">
            Stack<span className="text-secondary">Lite</span>
          </h1>
        </div>
      </div> */}

      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* Question Card */}
        <div className="card bg-base-100 shadow-lg border-l-4 border-primary">
          <div className="card-body">

            <h1 className="text-2xl font-bold mb-2">
              {question.title}
            </h1>

            <div className="flex items-center gap-4 text-sm opacity-70 mb-4">
              <span className="badge badge-outline">
                {question.voteCount} votes
              </span>
              <span>
                asked by {question.author?.username}
              </span>
            </div>

            <p className="text-base leading-relaxed">
              {question.body}
            </p>

            {/* Vote buttons (UI only) */}
            <div className="flex gap-2 mt-6">
              <button className="btn btn-sm btn-outline btn-success">
                ⬆ Upvote
              </button>
              <button className="btn btn-sm btn-outline btn-error">
                ⬇ Downvote
              </button>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {question.answers.length} Answers
          </h2>

          {question.answers.map((ans) => (
            <div
              key={ans._id}
              className="card bg-base-100 shadow-md border-l-4 border-secondary"
            >
              <div className="card-body">
                <p className="text-sm leading-relaxed">
                  {ans.body}
                </p>

                <div className="flex justify-between items-center mt-4 text-xs opacity-70">
                  <span className="badge badge-secondary badge-outline">
                    {ans.voteCount} votes
                  </span>
                  <span>
                    answered by {ans.user?.username}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Answer (UI only for now) */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="text-lg font-semibold mb-2">
              Your Answer
            </h3>

            <textarea
              className="textarea textarea-bordered w-full min-h-[120px]"
              placeholder="Write your answer here..."
            ></textarea>

            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary">
                Post Answer
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Question;
