const supabase = require("../config/supabase");

/**
 * Get all quiz questions
 */
async function getQuestions() {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("*");

    if (error) throw error;

    // 🌟 FIXED: Added response wrapper for frontend compatibility
    return { success: true, data: data };
  } catch (err) {
    console.error("Error in getQuestions service:", err.message);
    return { success: false, data: [], error: err.message };
  }
}

/**
 * Submit quiz and calculate score
 */
async function submitQuiz(answers) {
  try {
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

    // Edge case safety handler if the questions table drops out
    const totalQuestions = questions.length || 1;
    const percentage = Number(
      ((score / totalQuestions) * 100).toFixed(2)
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

    // 🌟 FIXED: Wrapped calculation payload inside a unified success signature
    return {
      success: true,
      data: {
        attemptId: attempt.id,
        score,
        totalQuestions: questions.length,
        percentage,
        review,
      }
    };
  } catch (err) {
    console.error("Error in submitQuiz service:", err.message);
    return { success: false, data: null, error: err.message };
  }
}

/**
 * Dashboard data
 */
async function getDashboard() {
  try {
    const { data: attempts, error } =
      await supabase
        .from("quiz_attempts")
        .select("*");

    if (error) throw error;

    if (!attempts || !attempts.length) {
      return {
        success: true,
        data: {
          readiness: 0,
          quizzesTaken: 0,
          averageScore: 0,
        }
      };
    }

    const averageScore =
      attempts.reduce(
        (sum, item) => sum + item.percentage,
        0
      ) / attempts.length;

    // 🌟 FIXED: Wrapped statistical response formatting
    return {
      success: true,
      data: {
        readiness: Number(averageScore.toFixed(2)),
        quizzesTaken: attempts.length,
        averageScore: Number(averageScore.toFixed(2)),
      }
    };
  } catch (err) {
    console.error("Error in getDashboard service:", err.message);
    return { success: false, data: null, error: err.message };
  }
}

module.exports = {
  getQuestions,
  submitQuiz,
  getDashboard,
};
