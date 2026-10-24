// src/pages/Quiz.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getQuestions, submitQuiz } from "../../services/api";
import QuestionCard from "../../components/QuestionCard";
function Quiz() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

 // Find this block inside src/app/pages/Quiz.jsx

useEffect(() => {
 async function loadQuestions() {
  try {
    const response = await getQuestions();

    console.log("Frontend received questions payload:", response);

    if (response && response.success) {
      // 🌟 Drill down through all possible nested layers dynamically
      let potentialArray = response.data;
      
      // If it's still an object and has a nested .data property, drill deeper
      if (potentialArray && typeof potentialArray === 'object' && 'data' in potentialArray) {
        potentialArray = potentialArray.data;
      }
      
      // One more check in case it's wrapped three times
      if (potentialArray && typeof potentialArray === 'object' && 'data' in potentialArray) {
        potentialArray = potentialArray.data;
      }

      if (Array.isArray(potentialArray)) {
        console.log("Successfully extracted array rows:", potentialArray);
        setQuestions(potentialArray);
      } else {
        console.error("Could not find an array in payload. Found:", potentialArray);
        setQuestions([]);
      }
    }
  } catch (error) {
    console.error("Error loading questions:", error);
    setQuestions([]);
  } finally {
    setLoading(false);
  }
}
  loadQuestions();
}, []);


  const selectAnswer = (questionId, answer) => {
    setAnswers((prev) => {
      const filtered = prev.filter(
        (item) => item.questionId !== questionId
      );

      return [
        ...filtered,
        {
          questionId,
          selectedAnswer: answer,
        },
      ];
    });
  };

  const handleSubmit = async () => {
    try {
      const result = await submitQuiz(answers);

      navigate("/results", {
        state: result.data,
      });
    } catch (error) {
      console.error("Quiz submission failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading Questions...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>AZ-900 Practice Quiz</h1>

      <p>
        Total Questions: {questions.length}
      </p>

      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          selectedAnswer={
            answers.find(
              (item) =>
                item.questionId === question.id
            )?.selectedAnswer
          }
          onSelect={(answer) =>
            selectAnswer(question.id, answer)
          }
        />
      ))}

      <button
        onClick={handleSubmit}
        disabled={!questions.length}
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default Quiz;
