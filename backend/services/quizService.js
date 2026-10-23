const supabase = require("../config/supabase");

/**
 * Get all quiz questions
 */
async function getQuestions() {
  const { data, error } = await supabase
    .from("questions")
    .select("*");

  if (error) throw error;

  return data;
}

/**
 * Submit quiz and calculate score
 */
async function submitQuiz(answers) {
  const { data: questions, error } = await supabase
    .from("questions")
    .select("*");

  if (error) throw error;

  let score = 0;

  const review = [];

  for (const answer of answers) {
    const question = questions.find(
      (q) => q.id === answer.questionId
    );

    if (!question) continue;

    const isCorrect =
      question.correct_answer === answer.selectedAnswer;

    if (isCorrect) {
      score++;
    }

    review.push({
      questionId: question.id,
      question: question.question,
      selectedAnswer: answer.selectedAnswer,
      correctAnswer: question.correct_answer,
      isCorrect,
      explanation: question.explanation,
      topicId: question.topic_id,
    });
  }

  const percentage = Number(
    ((score / questions.length) * 100).toFixed(2)
  );

  const { data: attempt, error: attemptError } =
    await supabase
      .from("quiz_attempts")
      .insert({
        score,
        total_questions: questions.length,
        percentage,
      })
      .select()
      .single();

  if (attemptError) throw attemptError;

  for (const item of review) {
    await supabase
      .from("quiz_answers")
      .insert({
        attempt_id: attempt.id,
        question_id: item.questionId,
        selected_answer: item.selectedAnswer,
        is_correct: item.isCorrect,
      });
  }

  return {
    attemptId: attempt.id,
    score,
    totalQuestions: questions.length,
    percentage,
    review,
  };
}

/**
 * Dashboard data
 */
async function getDashboard() {
  const { data: attempts, error } =
    await supabase
      .from("quiz_attempts")
      .select("*");

  if (error) throw error;

  if (!attempts.length) {
    return {
      readiness: 0,
      quizzesTaken: 0,
      averageScore: 0,
    };
  }

  const averageScore =
    attempts.reduce(
      (sum, item) => sum + item.percentage,
      0
    ) / attempts.length;

  return {
    readiness: Number(
      averageScore.toFixed(2)
    ),
    quizzesTaken: attempts.length,
    averageScore: Number(
      averageScore.toFixed(2)
    ),
  };
}

module.exports = {
  getQuestions,
  submitQuiz,
  getDashboard,
};