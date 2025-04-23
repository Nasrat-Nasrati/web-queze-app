let selectedAnswers = [];
let questions = [];

fetch("real_question.json")
  .then(res => res.json())
  .then(data => {
    questions = data.sort(() => 0.5 - Math.random()).slice(0, 30);
    renderQuiz();
  });

function renderQuiz() {
  const container = document.getElementById("quiz-container");
  questions.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.classList.add("mb-4");
    qDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>` +
      q.options.filter(opt => opt.trim() !== "").map(opt => `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="q${index}" value="${opt}">
          <label class="form-check-label">${opt}</label>
        </div>
      `).join("");
    container.appendChild(qDiv);
  });
}

function submitQuiz() {
  selectedAnswers = questions.map((_, i) => {
    const selected = document.querySelector(`input[name=q${i}]:checked`);
    return selected ? selected.value : "";
  });

  const { score, maxScore } = calculateScore(questions, selectedAnswers);
  alert(`Final Score: ${score} / ${maxScore}`);
}



function calculateScore(questions, answers) {
  let score = 0;
  let maxScore = questions.length;
  questions.forEach((q, i) => {
    if (answers[i] === q.correct) {
      score += 1;
    }
  });
  return { score, maxScore };
}

