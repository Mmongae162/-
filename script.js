const teachersByGrade = {
  1: ["노승표", "김택현", "고미진", "교장"],
  2: ["최지원", "봉영미", "고미진", "경상현", "교장"],
  3: ["오지현", "송현정", "고미진", "강경옥", "교장"]
};

const answerKey = {
  "노승표": 1,
  "김택현": 2,
  "고미진": 1,
  "교장": 2,
  "최지원": 1,
  "봉영미": 2,
  "경상현": 1,
  "오지현": 2,
  "송현정": 1,
  "강경옥": 2
};

const silhouetteImageMap = {
  "노승표": "/-/images/noseungpyo.png",
  "김택현": "/-/images/kimtaekhyeon.png",
  "고미진": "/-/images/gomijin.png",
  "교장": "/-/images/principal.png",
  "최지원": "/-/images/choijiwon.png",
  "봉영미": "/-/images/bongyoungmi.png",
  "경상현": "/-/images/gyeongsanghyeon.png",
  "오지현": "/-/images/ohjihyeon.png",
  "송현정": "/-/images/songhyeonjeong.png",
  "강경옥": "/-/images/kanggyeonguk.png"
};

const audioFileMap = {
  "노승표": ["noseungpyoa1.mp3", "noseungpyoa2.mp3"],
  "김택현": ["kimtaekhyeona2.mp3", "kimtaekhyeona1.mp3"],
  "고미진": ["gomijina1.mp3", "gomijina2.mp3"],
  "교장": ["principala2.mp3", "principala1.mp3"],
  "최지원": ["choijiwona1.mp3", "choijiwona2.mp3"],
  "봉영미": ["bongyoungmia2.mp3", "bongyoungmia1.mp3"],
  "경상현": ["gyeongsanghyeona1.mp3", "gyeongsanghyeona2.mp3"],
  "오지현": ["ohjihyeona2.mp3", "ohjihyeona1.mp3"],
  "송현정": ["songhyeonjeonga1.mp3", "songhyeonjeonga2.mp3"],
  "강경옥": ["kanggyeonguka2.mp3", "kanggyeonguka1.mp3"]
};

let selectedGrade = null;
let currentTeacherIndex = 0;
let score = 0;

let playCount1 = 0;
let playCount2 = 0;
let selectedAnswer = null;
let isCheckingAnswer = false;
let currentAudio1 = null;
let currentAudio2 = null;
let bonusCorrect = false;

const toStartScreenButton = document.getElementById("to-start-screen");
const backToIntroButton = document.getElementById("back-to-intro");
const startQuizButton = document.getElementById("start-quiz-button");

const finalRestartButton = document.getElementById("final-restart-button");
const finalScoreText = document.getElementById("final-score-text");
const finalBonusText = document.getElementById("final-bonus-text");
const finalFailScore = document.getElementById("final-fail-score");
const finalSuccessArea = document.getElementById("final-success-area");
const finalFailArea = document.getElementById("final-fail-area");

const backToStartButton = document.getElementById("back-to-start");
const backToGradeButton = document.getElementById("back-to-grade");
const toQuestionScreenButton = document.getElementById("to-question-screen");
const backToTeacherIntroButton = document.getElementById("back-to-teacher-intro");

const restartButton = document.getElementById("restart-button");
const toEthicsScreenButton = document.getElementById("to-ethics-screen");
const toBonusScreenButton = document.getElementById("to-bonus-screen");
const checkBonusButton = document.getElementById("check-bonus-button");
const checkAnswerButton = document.getElementById("check-answer-button");

const failScoreText = document.getElementById("fail-score-text");
const failRestartButton = document.getElementById("fail-restart-button");

const playAudio1Button = document.getElementById("play-audio-1");
const playAudio2Button = document.getElementById("play-audio-2");
const playCount1Text = document.getElementById("play-count-1");
const playCount2Text = document.getElementById("play-count-2");

const answer1Button = document.getElementById("answer-1-button");
const answer2Button = document.getElementById("answer-2-button");

const gradeButtons = document.querySelectorAll(".grade-button");
const bonusOptions = document.querySelectorAll(".bonus-option");

const teacherIntroTitle = document.getElementById("teacher-intro-title");
const teacherSilhouette = document.getElementById("teacher-silhouette");
const questionTeacherName = document.getElementById("question-teacher-name");
const scoreText = document.getElementById("score-text");
const resultMessage = document.getElementById("result-message");

const feedbackCard = document.getElementById("feedback-card");
const feedbackText = document.getElementById("feedback-text");
const confettiContainer = document.getElementById("confetti-container");
const rainContainer = document.getElementById("rain-container");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

function showScreen(screenId) {
  const allScreens = document.querySelectorAll(".screen");
  allScreens.forEach((screen) => {
    screen.classList.remove("active");
  });

  const nextScreen = document.getElementById(screenId);
  if (nextScreen) {
    nextScreen.classList.add("active");
  }
}

function getCurrentTeacher() {
  return teachersByGrade[selectedGrade][currentTeacherIndex];
}

function updateTeacherIntroScreen() {
  const currentTeacher = getCurrentTeacher();
  teacherIntroTitle.textContent = `이번 히든 싱어의 주인공은 ${currentTeacher} 선생님입니다.`;
  questionTeacherName.textContent = `${currentTeacher} 선생님 문제`;

  if (teacherSilhouette && silhouetteImageMap[currentTeacher]) {
    teacherSilhouette.src = silhouetteImageMap[currentTeacher];
  }
}

function loadCurrentTeacherAudio() {
  const currentTeacher = getCurrentTeacher();
  const fileNames = audioFileMap[currentTeacher];

  currentAudio1 = null;
  currentAudio2 = null;

  if (!fileNames) return;

  if (fileNames[0]) {
    currentAudio1 = new Audio(`sounds/${fileNames[0]}`);
  }

  if (fileNames[1]) {
    currentAudio2 = new Audio(`sounds/${fileNames[1]}`);
  }
}

function stopCurrentAudio() {
  if (currentAudio1) {
    currentAudio1.pause();
    currentAudio1.currentTime = 0;
  }

  if (currentAudio2) {
    currentAudio2.pause();
    currentAudio2.currentTime = 0;
  }
}

function resetQuestionState() {
  playCount1 = 0;
  playCount2 = 0;
  selectedAnswer = null;
  isCheckingAnswer = false;

  stopCurrentAudio();
  loadCurrentTeacherAudio();

  playAudio1Button.disabled = false;
  playAudio2Button.disabled = false;
  checkAnswerButton.disabled = false;

  playAudio1Button.classList.remove("disabled-button");
  playAudio2Button.classList.remove("disabled-button");
  checkAnswerButton.classList.remove("disabled-button");

  answer1Button.classList.remove("selected-answer");
  answer2Button.classList.remove("selected-answer");

  playCount1Text.textContent = "남은 재생: 2회";
  playCount2Text.textContent = "남은 재생: 2회";
}

function updatePlayButtons() {
  const remaining1 = 2 - playCount1;
  const remaining2 = 2 - playCount2;

  playCount1Text.textContent = `남은 재생: ${remaining1}회`;
  playCount2Text.textContent = `남은 재생: ${remaining2}회`;

  if (playCount1 >= 2) {
    playAudio1Button.disabled = true;
    playAudio1Button.classList.add("disabled-button");
  }

  if (playCount2 >= 2) {
    playAudio2Button.disabled = true;
    playAudio2Button.classList.add("disabled-button");
  }
}

function playAudio(number) {
  if (isCheckingAnswer) return;

  const currentTeacher = getCurrentTeacher();

  if (number === 1) {
    if (!currentAudio1) {
      alert(`${currentTeacher} 선생님의 1번 음성 파일이 아직 없습니다.`);
      return;
    }

    if (playCount1 >= 2) {
      alert("1번 음성은 재생 한도에 도달했습니다.");
      return;
    }

    if (currentAudio2) {
      currentAudio2.pause();
      currentAudio2.currentTime = 0;
    }

    playCount1 += 1;
    currentAudio1.currentTime = 0;
    currentAudio1.play().catch(() => {
      alert("1번 음성 재생에 실패했습니다.");
    });
  }

  if (number === 2) {
    if (!currentAudio2) {
      alert(`${currentTeacher} 선생님의 2번 음성 파일이 아직 없습니다.`);
      return;
    }

    if (playCount2 >= 2) {
      alert("2번 음성은 재생 한도에 도달했습니다.");
      return;
    }

    if (currentAudio1) {
      currentAudio1.pause();
      currentAudio1.currentTime = 0;
    }

    playCount2 += 1;
    currentAudio2.currentTime = 0;
    currentAudio2.play().catch(() => {
      alert("2번 음성 재생에 실패했습니다.");
    });
  }

  updatePlayButtons();
}

function selectAnswer(answerNumber) {
  if (isCheckingAnswer) return;

  selectedAnswer = answerNumber;

  answer1Button.classList.remove("selected-answer");
  answer2Button.classList.remove("selected-answer");

  if (answerNumber === 1) {
    answer1Button.classList.add("selected-answer");
  }

  if (answerNumber === 2) {
    answer2Button.classList.add("selected-answer");
  }
}

function launchConfetti() {
  confettiContainer.innerHTML = "";

  for (let i = 0; i < 24; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti");

    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = `hsl(${Math.random() * 360}, 90%, 60%)`;
    piece.style.animationDelay = `${Math.random() * 0.4}s`;

    confettiContainer.appendChild(piece);
  }
}

function launchRain() {
  rainContainer.innerHTML = "";

  for (let i = 0; i < 40; i++) {
    const drop = document.createElement("div");
    drop.classList.add("raindrop");

    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDelay = `${Math.random() * 0.5}s`;

    rainContainer.appendChild(drop);
  }
}

function playFeedbackSound(isCorrect) {
  if (correctSound) {
    correctSound.pause();
    correctSound.currentTime = 0;
  }

  if (wrongSound) {
    wrongSound.pause();
    wrongSound.currentTime = 0;
  }

  if (isCorrect && correctSound) {
    correctSound.play().catch(() => {});
  }

  if (!isCorrect && wrongSound) {
    wrongSound.play().catch(() => {});
  }
}

function showFeedback(isCorrect) {
  feedbackCard.classList.remove("feedback-correct", "feedback-wrong");
  confettiContainer.innerHTML = "";
  rainContainer.innerHTML = "";

  if (isCorrect) {
    feedbackCard.classList.add("feedback-correct");
    feedbackText.textContent = "정답입니다!";
    launchConfetti();
  } else {
    feedbackCard.classList.add("feedback-wrong");
    feedbackText.textContent = "땡!";
    launchRain();
  }

  playFeedbackSound(isCorrect);
  showScreen("screen-feedback");
}

function showFinalCertificate() {
  const teacherList = teachersByGrade[selectedGrade];
  const total = teacherList.length;
  const passed = score >= Math.ceil(total / 2);

  if (passed) {
    finalScoreText.textContent = `기본 퀴즈 점수: ${score} / ${total}`;

    if (bonusCorrect) {
      finalBonusText.textContent = "보너스 문제까지 정답! 윤리 책임감 우수";
    } else {
      finalBonusText.textContent = "보너스 문제는 다음에 다시 도전!";
    }

    showScreen("screen-final");
  } else {
    failScoreText.textContent = `기본 퀴즈 점수: ${score} / ${total}`;
    showScreen("screen-fail");
  }
}

function showResult() {
  const teacherList = teachersByGrade[selectedGrade];
  const total = teacherList.length;

  scoreText.textContent = `점수: ${score} / ${total}`;

  if (score === total) {
    resultMessage.textContent = "👑 완벽! 인간 vs AI 구분 끝판왕!";
  } else if (score >= Math.ceil(total / 2)) {
    resultMessage.textContent = "🔥 성공! 꽤 날카로운 귀를 가졌네요!";
  } else {
    resultMessage.textContent = "😢 아직은 어렵다… 다시 도전!";
  }
}

function goToNextTeacher() {
  currentTeacherIndex++;
  const teacherList = teachersByGrade[selectedGrade];

  if (currentTeacherIndex >= teacherList.length) {
    showResult();
    showScreen("screen-end");
    return;
  }

  updateTeacherIntroScreen();
  resetQuestionState();
  showScreen("screen-teacher-intro");
}

function checkAnswer() {
  if (isCheckingAnswer) return;

  if (selectedAnswer === null) {
    alert("먼저 답을 선택해 주세요.");
    return;
  }

  isCheckingAnswer = true;

  const currentTeacher = getCurrentTeacher();
  const correctAnswer = answerKey[currentTeacher];
  const isCorrect = selectedAnswer === correctAnswer;

  checkAnswerButton.disabled = true;
  checkAnswerButton.classList.add("disabled-button");

  if (isCorrect) {
    score += 1;
  }

  showFeedback(isCorrect);

  setTimeout(() => {
    goToNextTeacher();
  }, 3000);
}

toStartScreenButton.addEventListener("click", () => {
  showScreen("screen-start");
});

backToIntroButton.addEventListener("click", () => {
  showScreen("screen-intro");
});

startQuizButton.addEventListener("click", () => {
  score = 0;
  scoreText.textContent = "점수: 0 / 0";
  resultMessage.textContent = "";
  bonusCorrect = false;
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
    resetQuestionState();
    showScreen("screen-teacher-intro");
  });
});

backToGradeButton.addEventListener("click", () => {
  showScreen("screen-grade");
});

toQuestionScreenButton.addEventListener("click", () => {
  resetQuestionState();
  showScreen("screen-question");
});

backToTeacherIntroButton.addEventListener("click", () => {
  showScreen("screen-teacher-intro");
});

playAudio1Button.addEventListener("click", () => {
  playAudio(1);
});

playAudio2Button.addEventListener("click", () => {
  playAudio(2);
});

answer1Button.addEventListener("click", () => {
  selectAnswer(1);
});

answer2Button.addEventListener("click", () => {
  selectAnswer(2);
});

checkAnswerButton.addEventListener("click", () => {
  checkAnswer();
});

restartButton.addEventListener("click", () => {
  selectedGrade = null;
  currentTeacherIndex = 0;
  score = 0;
  bonusCorrect = false;
  scoreText.textContent = "점수: 0 / 0";
  resultMessage.textContent = "";
  resetQuestionState();
  showScreen("screen-intro");
});

if (toEthicsScreenButton) {
  toEthicsScreenButton.addEventListener("click", () => {
    showScreen("screen-ethics");
  });
}

if (toBonusScreenButton) {
  toBonusScreenButton.addEventListener("click", () => {
    showScreen("screen-bonus");
  });
}

bonusOptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    bonusOptions.forEach((b) => b.classList.remove("selected-answer"));
    btn.classList.add("selected-answer");
  });
});

if (checkBonusButton) {
  checkBonusButton.addEventListener("click", () => {
    const selected = document.querySelector(".bonus-option.selected-answer");

    if (!selected) {
      alert("선택하세요!");
      return;
    }

    if (selected.dataset.bonus === "3") {
      bonusCorrect = true;
      alert("정답!");
    } else {
      bonusCorrect = false;
      alert("정답은 3번!");
    }

    showFinalCertificate();
  });
}

if (finalRestartButton) {
  finalRestartButton.onclick = () => {
    selectedGrade = null;
    currentTeacherIndex = 0;
    score = 0;
    bonusCorrect = false;
    selectedAnswer = null;
    isCheckingAnswer = false;

    scoreText.textContent = "점수: 0 / 0";
    resultMessage.textContent = "";
    resetQuestionState();
    showScreen("screen-intro");
  };
}

if (failRestartButton) {
  failRestartButton.addEventListener("click", () => {
    selectedGrade = null;
    currentTeacherIndex = 0;
    score = 0;
    bonusCorrect = false;
    scoreText.textContent = "점수: 0 / 0";
    resultMessage.textContent = "";
    resetQuestionState();
    showScreen("screen-intro");
  });
}
