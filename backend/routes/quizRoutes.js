// backend/routes/quizRoutes.js

const express = require("express");
const router = express.Router();

const {
  getQuestions,
  submitQuiz,
  getDashboard,
} = require("../services/quizService");

/**
 * GET /api/questions
 * Fetch all quiz questions
 */
router.get("/questions", async (req, res) => {
  try {
    const questions = await getQuestions();

    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
    });
  }
});

/**
 * POST /api/submit
 * Submit quiz answers
 */
router.post("/submit", async (req, res) => {
  try {
    const { answers } = req.body;

    const result = await submitQuiz(answers);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to submit quiz",
    });
  }
});

/**
 * GET /api/dashboard
 * Dashboard statistics
 */
router.get("/dashboard", async (req, res) => {
  try {
    const dashboard = await getDashboard();

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
});

module.exports = router;