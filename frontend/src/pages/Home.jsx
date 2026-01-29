import { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { getAllQuestions } from "../services/api";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await getAllQuestions();
        setQuestions(res.data.data.questions);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
        <span className="loading loading-spinner loading-lg text-primary"></span>
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
        <div className="flex-none">
          <button className="btn btn-primary btn-sm">
            Ask Question
          </button>
        </div>
      </div> */}

      {/* Content */}
      <div className="max-w-5xl mx-auto p-6 space-y-5">
        <h2 className="text-2xl font-semibold mb-2">
          Latest Questions
        </h2>

        {questions.map((q) => (
          <QuestionCard
            key={q._id}
            _id={q._id}
            title={q.title}
            body={q.body}
            voteCount={q.voteCount || 0}
            answerCount={q.answerCount || 0}
            author={q.author?.username || "unknown"}
          />
        ))}

        <button className="btn btn-outline btn-primary w-full mt-4">
          Load More Questions
        </button>
      </div>
    </div>
  );
}

export default Home;
