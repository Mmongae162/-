const teachersByGrade = {
  1: ["노승표", "김택현", "고미진", "교장"],
  2: ["최지원", "봉영미", "고미진", "경상현", "교장"],
  3: ["오지현", "송현정", "고미진", "강경욱", "교장"]
};

let selectedGrade = null;
let currentTeacherIndex = 0;

const toStartScreenButton = document.getElementById("to-start-screen");
const backToIntroButton = document.getElementById("back-to-intro");
const restartButton = document.getElementById("restart-button");
const startQuizButton = document.getElementById("start-quiz-button");

const backToStartButton = document.getElementById("back-to-start");
const backToGradeButton = document.getElementById("back-to-grade");
const toQuestionScreenButton = document.getElementById("to-question-screen");
const backToTeacherIntroButton = document.getElementById("back-to-teacher-intro");

const gradeButtons = document.querySelectorAll(".grade-button");

const teacherIntroTitle = document.getElementById("teacher-intro-title");
const questionTeacherName = document.getElementById("question-teacher-name");
const questionScreen = document.getElementById("screen-question");
function showScreen(screenId) {
  const allScreens = document.querySelectorAll(".screen");
  allScreens.forEach((screen) => {
    screen.classList.remove("active");
  });
function goToNextTeacher() {
  currentTeacherIndex++;

  const teacherList = teachersByGrade[selectedGrade];

  if (currentTeacherIndex >= teacherList.length) {
    showScreen("screen-end");
    return;
  }

  updateTeacherIntroScreen();
  showScreen("screen-teacher-intro");
}
  document.getElementById(screenId).classList.add("active");
}

function updateTeacherIntroScreen() {
  const currentTeacher = teachersByGrade[selectedGrade][currentTeacherIndex];
  teacherIntroTitle.textContent = `이번 히든 싱어의 주인공은 ${currentTeacher} 선생님입니다.`;
  questionTeacherName.textContent = `${currentTeacher} 선생님 문제`;
}

toStartScreenButton.addEventListener("click", () => {
  showScreen("screen-start");
});

backToIntroButton.addEventListener("click", () => {
  showScreen("screen-intro");
});
questionScreen.addEventListener("click", () => {
  goToNextTeacher();
});
startQuizButton.addEventListener("click", () => {
  showScreen("screen-grade");
});

backToStartButton.addEventListener("click", () => {
  showScreen("screen-start");
});

gradeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedGrade = button.dataset.grade;
    currentTeacherIndex = 0;
    updateTeacherIntroScreen();
    showScreen("screen-teacher-intro");
  });
});

backToGradeButton.addEventListener("click", () => {
  showScreen("screen-grade");
});

toQuestionScreenButton.addEventListener("click", () => {
  showScreen("screen-question");
});

backToTeacherIntroButton.addEventListener("click", () => {
  showScreen("screen-teacher-intro");
});
restartButton.addEventListener("click", () => {
  selectedGrade = null;
  currentTeacherIndex = 0;
  showScreen("screen-intro");
});
