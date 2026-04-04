  const teachersByGrade = {
    1: ["노승표", "김택현", "고미진", "교장"],
    2: ["최지원", "봉영미", "고미진", "경상현", "교장"],
    3: ["오지현", "송현정", "고미진", "강경욱", "교장"]
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
    "강경욱": 2
  };
  
  let selectedGrade = null;
  let currentTeacherIndex = 0;
  let score = 0;
  
  let playCount1 = 0;
  let playCount2 = 0;
  let selectedAnswer = null;
  let isCheckingAnswer = false;
  
  const toStartScreenButton = document.getElementById("to-start-screen");
  const backToIntroButton = document.getElementById("back-to-intro");
  const startQuizButton = document.getElementById("start-quiz-button");
  
  const backToStartButton = document.getElementById("back-to-start");
  const backToGradeButton = document.getElementById("back-to-grade");
  const toQuestionScreenButton = document.getElementById("to-question-screen");
  const backToTeacherIntroButton = document.getElementById("back-to-teacher-intro");
  
  const restartButton = document.getElementById("restart-button");
  const checkAnswerButton = document.getElementById("check-answer-button");
  
  const playAudio1Button = document.getElementById("play-audio-1");
  const playAudio2Button = document.getElementById("play-audio-2");
  const playCount1Text = document.getElementById("play-count-1");
  const playCount2Text = document.getElementById("play-count-2");
  
  const answer1Button = document.getElementById("answer-1-button");
  const answer2Button = document.getElementById("answer-2-button");
  
  const gradeButtons = document.querySelectorAll(".grade-button");
  
  const teacherIntroTitle = document.getElementById("teacher-intro-title");
  const questionTeacherName = document.getElementById("question-teacher-name");
  
  function showScreen(screenId) {
    const allScreens = document.querySelectorAll(".screen");
    allScreens.forEach((screen) => {
      screen.classList.remove("active");
    });
    document.getElementById(screenId).classList.add("active");
  }
  
  function getCurrentTeacher() {
    return teachersByGrade[selectedGrade][currentTeacherIndex];
  }
  
  function updateTeacherIntroScreen() {
    const currentTeacher = getCurrentTeacher();
    teacherIntroTitle.textContent = `이번 히든 싱어의 주인공은 ${currentTeacher} 선생님입니다.`;
    questionTeacherName.textContent = `${currentTeacher} 선생님 문제`;
  }
  
  function resetQuestionState() {
    playCount1 = 0;
    playCount2 = 0;
    selectedAnswer = null;
    isCheckingAnswer = false;
  
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
  
    if (number === 1) {
      if (playCount1 >= 2) {
        alert("1번 음성은 재생 한도에 도달했습니다.");
        return;
      }
      playCount1 += 1;
      alert("1번 음성 재생 (임시 테스트)");
    }
  
    if (number === 2) {
      if (playCount2 >= 2) {
        alert("2번 음성은 재생 한도에 도달했습니다.");
        return;
      }
      playCount2 += 1;
      alert("2번 음성 재생 (임시 테스트)");
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
  
  function goToNextTeacher() {
    currentTeacherIndex++;
    const teacherList = teachersByGrade[selectedGrade];
  
  if (currentTeacherIndex >= teacherList.length) {
    showResult(); // ← 추가
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
  
    checkAnswerButton.disabled = true;
    checkAnswerButton.classList.add("disabled-button");
  
    if (selectedAnswer === correctAnswer) {
      score += 1;
      alert("정답입니다!");
    } else {
      alert("땡!");
    }
  
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
    resetQuestionState();
    showScreen("screen-intro");
  });
  function showResult() {
    const teacherList = teachersByGrade[selectedGrade];
    const total = teacherList.length;
  
    const scoreText = document.getElementById("score-text");
    const resultMessage = document.getElementById("result-message");
  
    scoreText.textContent = `점수: ${score} / ${total}`;
  
    if (score >= Math.ceil(total / 2)) {
      resultMessage.textContent = "🎉 성공! AI 판별 마스터!";
    } else {
      resultMessage.textContent = "😢 아쉽네요... 다음 기회에!";
    }
  }
