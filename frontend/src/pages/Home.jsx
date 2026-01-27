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
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        {questions.map((q) => (
          <QuestionCard
            key={q._id}
            title={q.title}
            body={q.body}
            voteCount={q.voteCount || 0}
            answerCount={q.answerCount || 0}
            author={q.author?.username || "unknown"}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
