import ProgressBar from "./ProgressBar";

function TopicCard({
  topicName,
  masteryPercentage,
}) {
  return (
    <div className="card">
      <h3>{topicName}</h3>

      <p>
        Mastery:
        {" "}
        <strong>
          {masteryPercentage}%
        </strong>
      </p>

      <ProgressBar value={masteryPercentage} />

      <p>
        Status:
        {" "}
        {masteryPercentage >= 85
          ? "Exam Ready"
          : masteryPercentage >= 70
          ? "Almost Ready"
          : masteryPercentage >= 40
          ? "Getting There"
          : "Needs Improvement"}
      </p>
    </div>
  );
}

export default TopicCard;