// src/app/pages/Results.jsx

import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Handle case where user navigates directly to /results without taking a quiz
  if (!state) {
    return (
      <div className="container">
        <h2>No results found</h2>
        <button onClick={() => navigate("/")}>Go to Dashboard</button>
      </div>
    );
  }

  // 🌟 FIXED: Safely extract from either nested state.data or direct state
  const quizData = state.data || state;
  const review = quizData.review || [];

  return (
    <div className="container">
      <h1>Results</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>
          Score: {quizData.score ?? 0} / {quizData.totalQuestions ?? 0}
        </h2>
        <h2>
          Percentage: {quizData.percentage ?? 0}%
        </h2>
      </div>

      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>
        Back to Dashboard
      </button>

      <hr />
      <h2>Question Review</h2>

      {review && review.length > 0 ? (
        review.map((item, index) => (
          <div
            key={item.questionId || index}
            className="card"
            style={{
              borderLeft: item.isCorrect ? "5px solid #22c55e" : "5px solid #ef4444",
              paddingLeft: "15px",
              margin: "15px 0"
            }}
          >
            <h3>{item.question}</h3>

            <p>
              <strong>Your Answer:</strong>{" "}
              <span style={{ color: item.isCorrect ? "#22c55e" : "#ef4444" }}>
                {item.selectedAnswer || "No Answer Selected"}
              </span>
            </p>

            <p>
              <strong>Correct Answer:</strong> {item.correctAnswer}
            </p>

            {item.explanation && (
              <p style={{ fontStyle: "italic", color: "#666" }}>
                <strong>Explanation:</strong> {item.explanation}
              </p>
            )}
          </div>
        ))
      ) : (
        <p>No test breakdown review metrics available for this session.</p>
      )}
    </div>
  );
}

export default Results;
