const screenIntro = document.getElementById("screen-intro");
const screenStart = document.getElementById("screen-start");

const toStartScreenButton = document.getElementById("to-start-screen");
const backToIntroButton = document.getElementById("back-to-intro");
const startQuizButton = document.getElementById("start-quiz-button");

function showScreen(screenId) {
  const allScreens = document.querySelectorAll(".screen");
  allScreens.forEach((screen) => {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");
}

toStartScreenButton.addEventListener("click", () => {
  showScreen("screen-start");
});

backToIntroButton.addEventListener("click", () => {
  showScreen("screen-intro");
});

startQuizButton.addEventListener("click", () => {
  alert("다음 단계에서 학년 선택 화면으로 연결할 예정입니다.");
});
