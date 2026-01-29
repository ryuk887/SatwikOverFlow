import { useState } from "react";
import { createQuestion } from "../services/api";
import { useNavigate } from "react-router-dom";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await createQuestion({ title, body });
      navigate(`/questions/${res.data.data._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center pt-10">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Ask a Question</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="What is your question?"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Body</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-40"
                placeholder="Explain your question in detail..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className="card-actions justify-end">
              <button
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                type="submit"
              >
                Ask Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
