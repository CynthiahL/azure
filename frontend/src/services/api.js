const API_URL = "https://azure-rsb3.onrender.com/api";

export async function getQuestions() {
  const response = await fetch(
    `${API_URL}/questions`
  );

  return response.json();
}

export async function submitQuiz(answers) {
  const response = await fetch(
    `${API_URL}/submit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answers,
      }),
    }
  );

  return response.json();
}

export async function getDashboard() {
  const response = await fetch(
    `${API_URL}/dashboard`
  );

  return response.json();
}