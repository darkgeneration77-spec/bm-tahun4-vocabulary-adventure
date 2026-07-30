const data = window.BM_GAME_DATA;
const state = {
  player: "Murid",
  stars: 0,
  xp: 0,
  unit: null,
  mode: null,
  questions: [],
  index: 0,
  score: 0,
  locked: false
};

const $ = (id) => document.getElementById(id);
const unitGrid = $("unitGrid");
const modeGrid = $("modeGrid");
const modeSection = $("modeSection");
const gameSection = $("gameSection");
const gameArea = $("gameArea");

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function updateProfile() {
  $("playerName").textContent = state.player;
  $("stars").textContent = state.stars;
  $("xp").textContent = state.xp;
}

function renderUnits() {
  unitGrid.innerHTML = "";
  data.units.forEach((unit) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `unit-card${unit.unlocked ? "" : " locked"}`;
    button.disabled = !unit.unlocked;
    button.innerHTML = `
      <span class="card-number">${unit.id}</span>
      <h3>${unit.title}</h3>
      <p>${unit.subtitle}</p>
      <span class="mode-tag">${unit.unlocked ? `${unit.words.length} perkataan` : "Terkunci"}</span>
    `;
    button.addEventListener("click", () => selectUnit(unit));
    unitGrid.appendChild(button);
  });
}

function selectUnit(unit) {
  state.unit = unit;
  $("selectedUnitLabel").textContent = unit.title;
  unitGrid.parentElement.classList.add("hidden");
  modeSection.classList.remove("hidden");
  renderModes();
}

function renderModes() {
  modeGrid.innerHTML = "";
  data.modes.forEach((mode) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mode-card";
    button.innerHTML = `<h3>${mode.title}</h3><p>${mode.description}</p><span class="mode-tag">${mode.skill}</span>`;
    button.addEventListener("click", () => startGame(mode));
    modeGrid.appendChild(button);
  });
}

function startGame(mode) {
  state.mode = mode;
  state.questions = shuffle(state.unit.words).slice(0, 5);
  state.index = 0;
  state.score = 0;
  state.locked = false;
  modeSection.classList.add("hidden");
  gameSection.classList.remove("hidden");
  $("gameTitle").textContent = mode.title;
  renderQuestion();
}

function buildOptions(correct, getter = (item) => item.chinese) {
  const others = shuffle(state.unit.words.filter((item) => item.word !== correct.word)).slice(0, 3);
  return shuffle([correct, ...others]).map((item) => ({ label: getter(item), item }));
}

function progress() {
  const current = Math.min(state.index + 1, state.questions.length);
  $("progressText").textContent = `${current}/${state.questions.length}`;
  $("progressBar").style.width = `${(state.index / state.questions.length) * 100}%`;
}

function renderQuestion() {
  if (state.index >= state.questions.length) return finishGame();
  progress();
  state.locked = false;
  const word = state.questions[state.index];
  const mode = state.mode.id;

  if (mode === "flash") return renderFlash(word);
  if (mode === "typing") return renderTyping(word);
  if (mode === "sentence") return renderSentence(word);
  if (mode === "detective") return renderDetective(word);
  if (mode === "factory") return renderFactory(word);
  if (mode === "listening") return renderListening(word);
  if (mode === "boss") return renderChoice(word, `Boss HP: ${state.questions.length - state.index}`, "Pilih maksud yang betul.");
  if (mode === "treasure") return renderChoice(word, "Peti Harta", "Jawab betul untuk membuka peti.");
  if (mode === "catch") return renderChoice(word, "Word Catch", `Tangkap maksud bagi “${word.word}”.`);
  return renderChoice(word, word.word, "Pilih maksud yang betul.");
}

function renderChoice(word, heading, hint) {
  const options = buildOptions(word);
  gameArea.innerHTML = `
    <p class="question-hint">${hint}</p>
    <h3 class="question-word">${heading}</h3>
    <div class="options" id="options"></div>
    <div id="feedback"></div>
  `;
  const box = $("options");
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = option.label;
    button.addEventListener("click", () => answer(option.item.word === word.word, word));
    box.appendChild(button);
  });
}

function renderFlash(word) {
  gameArea.innerHTML = `
    <p class="question-hint">Kad ${state.index + 1}</p>
    <h3 class="question-word">${word.word}</h3>
    <div class="sentence-box">${word.chinese}<br><small>${word.sentence}</small></div>
    <div class="center-actions" style="margin-top:24px"><button class="primary-button" id="knowBtn" type="button">Saya sudah faham</button></div>
  `;
  $("knowBtn").addEventListener("click", () => answer(true, word));
}

function renderTyping(word) {
  gameArea.innerHTML = `
    <p class="question-hint">Taip perkataan Bahasa Melayu</p>
    <h3 class="question-word">${word.chinese}</h3>
    <input class="answer-input" id="answerInput" autocomplete="off" placeholder="Taip jawapan" />
    <div class="center-actions"><button class="primary-button" id="submitBtn" type="button">Semak</button></div>
    <div id="feedback"></div>
  `;
  const submit = () => answer($("answerInput").value.trim().toLowerCase() === word.word.toLowerCase(), word);
  $("submitBtn").addEventListener("click", submit);
  $("answerInput").addEventListener("keydown", (event) => { if (event.key === "Enter") submit(); });
  $("answerInput").focus();
}

function renderSentence(word) {
  const sentence = word.sentence.replace(new RegExp(word.word, "i"), "________");
  const options = buildOptions(word, (item) => item.word);
  gameArea.innerHTML = `<p class="question-hint">Lengkapkan ayat</p><div class="sentence-box">${sentence}</div><div class="options" id="options"></div><div id="feedback"></div>`;
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = option.label;
    button.addEventListener("click", () => answer(option.item.word === word.word, word));
    $("options").appendChild(button);
  });
}

function renderDetective(word) {
  const options = buildOptions(word, (item) => item.word);
  gameArea.innerHTML = `<p class="question-hint">Apakah perkataan ini?</p><div class="sentence-box">${word.clue}</div><div class="options" id="options"></div><div id="feedback"></div>`;
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = option.label;
    button.addEventListener("click", () => answer(option.item.word === word.word, word));
    $("options").appendChild(button);
  });
}

function renderFactory(word) {
  const correct = word.parts.join("");
  const shown = shuffle(word.parts).join(" + ");
  gameArea.innerHTML = `
    <p class="question-hint">Cantumkan bahagian perkataan</p>
    <h3 class="question-word">${shown}</h3>
    <input class="answer-input" id="answerInput" autocomplete="off" placeholder="Taip perkataan penuh" />
    <div class="center-actions"><button class="primary-button" id="submitBtn" type="button">Bina Perkataan</button></div>
    <div id="feedback"></div>
  `;
  const submit = () => answer($("answerInput").value.trim().toLowerCase().replaceAll(" ", "") === correct.toLowerCase().replaceAll(" ", ""), word);
  $("submitBtn").addEventListener("click", submit);
  $("answerInput").addEventListener("keydown", (event) => { if (event.key === "Enter") submit(); });
}

function renderListening(word) {
  const options = buildOptions(word, (item) => item.word);
  gameArea.innerHTML = `
    <p class="question-hint">Tekan butang, kemudian pilih perkataan</p>
    <div class="center-actions" style="margin-top:40px"><button class="primary-button" id="listenBtn" type="button">Dengar Sebutan</button></div>
    <div class="options" id="options"></div><div id="feedback"></div>
  `;
  $("listenBtn").addEventListener("click", () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = "ms-MY";
      speechSynthesis.speak(utterance);
    }
  });
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = option.label;
    button.addEventListener("click", () => answer(option.item.word === word.word, word));
    $("options").appendChild(button);
  });
}

function answer(isCorrect, word) {
  if (state.locked) return;
  state.locked = true;
  if (isCorrect) {
    state.score += 1;
    state.xp += 10;
    state.stars += 1;
  }
  updateProfile();
  const feedback = $("feedback") || document.createElement("div");
  feedback.className = `feedback ${isCorrect ? "correct" : "wrong"}`;
  feedback.textContent = isCorrect ? "Betul! +10 XP" : `Belum tepat. Jawapan: ${word.word} — ${word.chinese}`;
  if (!feedback.parentElement) gameArea.appendChild(feedback);
  setTimeout(() => {
    state.index += 1;
    renderQuestion();
  }, 900);
}

function finishGame() {
  $("progressBar").style.width = "100%";
  const percent = Math.round((state.score / state.questions.length) * 100);
  gameArea.innerHTML = `
    <div class="result-card">
      <p class="eyebrow">Misi Selesai</p>
      <div class="result-score">${state.score}/${state.questions.length}</div>
      <h2>${percent >= 80 ? "Hebat!" : "Cuba sekali lagi"}</h2>
      <p class="subtitle">Skor ${percent}%. Kamu memperoleh ${state.score * 10} XP dan ${state.score} bintang.</p>
      <div class="center-actions" style="margin-top:24px">
        <button class="primary-button" id="replayBtn" type="button">Main Semula</button>
        <button class="secondary-button" id="modesBtn" type="button">Pilih Mode</button>
      </div>
    </div>
  `;
  $("replayBtn").addEventListener("click", () => startGame(state.mode));
  $("modesBtn").addEventListener("click", showModes);
}

function showModes() {
  gameSection.classList.add("hidden");
  modeSection.classList.remove("hidden");
}

$("changeNameBtn").addEventListener("click", () => {
  const name = prompt("Masukkan nama murid:", state.player);
  if (name && name.trim()) {
    state.player = name.trim().slice(0, 24);
    updateProfile();
  }
});

$("backToUnitsBtn").addEventListener("click", () => {
  modeSection.classList.add("hidden");
  unitGrid.parentElement.classList.remove("hidden");
});

$("exitGameBtn").addEventListener("click", showModes);

renderUnits();
updateProfile();
