// src/app/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 🌟 FIXED: Added getDashboard to the API imports list
import { getDashboard } from "../../services/api";

// 🌟 FIXED: Changed QuestionCard to TopicCard to match the UI loop below
import TopicCard from "../../components/TopicCard";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    readiness: 0,
    quizzesTaken: 0,
    averageScore: 0,
  });

  const [loading, setLoading] = useState(true);

  const [topics] = useState([
    { topicName: "Cloud Concepts", masteryPercentage: 0 },
    { topicName: "Azure Architecture", masteryPercentage: 0 },
    { topicName: "Azure Compute", masteryPercentage: 0 },
    { topicName: "Azure Networking", masteryPercentage: 0 },
    { topicName: "Azure Storage", masteryPercentage: 0 },
    { topicName: "Identity and Access", masteryPercentage: 0 },
    { topicName: "Cost Management", masteryPercentage: 0 },
    { topicName: "Security and Governance", masteryPercentage: 0 },
  ]);

  // Moved loadDashboard inside useEffect to prevent cascading render cycles
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getDashboard();
  
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const getReadinessLevel = (score) => {
    if (score < 40) return "Not Ready";
    if (score < 70) return "Getting There";
    if (score < 85) return "Almost Ready";
    return "Exam Ready";
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>AZ-900 Readiness Tracker</h1>

      <div className="card">
        <h2>Readiness Score</h2>
        <h1>{stats.readiness}%</h1>
        <p>
          <strong>
            {getReadinessLevel(stats.readiness)}
          </strong>
        </p>
      </div>

      <div className="card">
        <h2>Quizzes Taken</h2>
        <h3>{stats.quizzesTaken}</h3>
      </div>

      <div className="card">
        <h2>Average Score</h2>
        <h3>{stats.averageScore}%</h3>
      </div>

      <h2>Topic Mastery</h2>

      {topics.map((topic, index) => (
        <TopicCard
          key={index}
          topicName={topic.topicName}
          masteryPercentage={topic.masteryPercentage}
        />
      ))}

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button onClick={() => navigate("/quiz")}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
