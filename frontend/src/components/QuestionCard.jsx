import { Link } from "react-router-dom";

function QuestionCard({
  _id,
  title,
  body,
  voteCount,
  answerCount,
  author,
}) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition border-l-4 border-primary">
      <div className="card-body flex-row gap-5">

        {/* Votes */}
        <div className="flex flex-col items-center justify-center text-center min-w-[70px]">
          <span className="text-2xl font-bold text-primary">
            {voteCount}
          </span>
          <span className="text-xs opacity-60">votes</span>

          <div className="divider my-1"></div>

          <span className="badge badge-secondary badge-sm">
            {answerCount} ans
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <Link to={`/questions/${_id}`}>
            <h2 className="text-lg font-semibold hover:underline text-primary">
              {title}
            </h2>
          </Link>

          <p className="mt-2 text-sm opacity-80 line-clamp-2">
            {body}
          </p>

          <div className="flex justify-end mt-4">
            <div className="badge badge-outline">
              asked by {author}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
