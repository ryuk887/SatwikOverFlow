function QuestionCard({
  title,
  body,
  voteCount,
  answerCount,
  author
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex gap-4 bg-white shadow-sm hover:shadow-md transition">

      {/* Votes */}
      <div className="flex flex-col items-center text-gray-600">
        <span className="font-bold text-lg">{voteCount}</span>
        <span className="text-xs">votes</span>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
          {title}
        </h2>

        <p className="text-gray-700 mt-2 text-sm line-clamp-2">
          {body}
        </p>

        <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
          <span>{answerCount} answers</span>
          <span>asked by {author}</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
