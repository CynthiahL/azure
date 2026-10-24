// src/components/QuestionCard.jsx

function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
}) {
  return (
    <div className="card">
      <h3>{question.question}</h3>

      <div style={{ marginTop: "15px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "10px",
          }}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value="A"
            checked={selectedAnswer === "A"}
            onChange={() => onSelect("A")}
          />
          {" "}
          {question.option_a}
        </label>

        <label
          style={{
            display: "block",
            marginBottom: "10px",
          }}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value="B"
            checked={selectedAnswer === "B"}
            onChange={() => onSelect("B")}
          />
          {" "}
          {question.option_b}
        </label>

        <label
          style={{
            display: "block",
            marginBottom: "10px",
          }}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value="C"
            checked={selectedAnswer === "C"}
            onChange={() => onSelect("C")}
          />
          {" "}
          {question.option_c}
        </label>

        <label
          style={{
            display: "block",
            marginBottom: "10px",
          }}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value="D"
            checked={selectedAnswer === "D"}
            onChange={() => onSelect("D")}
          />
          {" "}
          {question.option_d}
        </label>
      </div>
    </div>
  );
}

export default QuestionCard;