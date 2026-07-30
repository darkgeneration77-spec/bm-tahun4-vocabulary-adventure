const data = window.BM_GAME_DATA;
const state = { player:"Murid", stars:0, xp:0, theme:null, words:[], mode:null, questions:[], index:0, score:0, locked:false, bossHp:0, bossMaxHp:0 };
const $ = (id) => document.getElementById(id);
const themeGrid = $("themeGrid");
const modeGrid = $("modeGrid");
const themeSection = $("themeSection");
const modeSection = $("modeSection");
const gameSection = $("gameSection");
const gameArea = $("gameArea");
let audioContext = null;

function shuffle(items){ return [...items].sort(() => Math.random() - 0.5); }
function updateProfile(){ $("playerName").textContent=state.player; $("stars").textContent=state.stars; $("xp").textContent=state.xp; }
function themeWords(themeId){ return data.units.filter(unit=>unit.themeId===themeId).flatMap(unit=>unit.words); }

function getAudioContext(){
  if(!audioContext){
    const AudioCtx=window.AudioContext||window.webkitAudioContext;
    if(AudioCtx)audioContext=new AudioCtx();
  }
  if(audioContext&&audioContext.state==="suspended")audioContext.resume();
  return audioContext;
}
function tone(frequency,duration=0.12,type="sine",volume=0.08,delay=0){
  const ctx=getAudioContext();
  if(!ctx)return;
  const oscillator=ctx.createOscillator();
  const gain=ctx.createGain();
  const start=ctx.currentTime+delay;
  oscillator.type=type;
  oscillator.frequency.setValueAtTime(frequency,start);
  gain.gain.setValueAtTime(volume,start);
  gain.gain.exponentialRampToValueAtTime(0.001,start+duration);
  oscillator.connect(gain);gain.connect(ctx.destination);
  oscillator.start(start);oscillator.stop(start+duration);
}
function playSound(name){
  if(name==="click")tone(420,0.06,"square",0.035);
  if(name==="correct"){tone(523,0.10,"sine",0.07);tone(659,0.12,"sine",0.07,0.08);tone(784,0.16,"sine",0.07,0.16);}
  if(name==="wrong"){tone(180,0.18,"sawtooth",0.05);tone(130,0.22,"sawtooth",0.04,0.12);}
  if(name==="attack"){tone(110,0.08,"square",0.08);tone(70,0.18,"sawtooth",0.06,0.05);}
  if(name==="victory"){[523,659,784,1047].forEach((f,i)=>tone(f,0.22,"triangle",0.07,i*0.12));}
}

function renderThemes(){
  themeGrid.innerHTML="";
  data.themes.forEach(theme=>{
    const words=themeWords(theme.id);
    const button=document.createElement("button");
    button.type="button";
    button.className=`unit-card${theme.unlocked?"":" locked"}`;
    button.disabled=!theme.unlocked;
    button.innerHTML=`<span class="card-number">${theme.id}</span><h3>${theme.title}</h3><p>${theme.subtitle}</p><span class="mode-tag">${words.length} kosa kata</span>`;
    button.addEventListener("click",()=>{playSound("click");selectTheme(theme);});
    themeGrid.appendChild(button);
  });
}

function selectTheme(theme){
  state.theme=theme;
  state.words=themeWords(theme.id);
  $("selectedThemeLabel").textContent=`${theme.title}: ${theme.subtitle} · ${state.words.length} kosa kata`;
  themeSection.classList.add("hidden");
  modeSection.classList.remove("hidden");
  renderModes();
}

function renderModes(){
  modeGrid.innerHTML="";
  data.modes.forEach(mode=>{
    const button=document.createElement("button");
    button.type="button";
    button.className="mode-card";
    button.innerHTML=`<h3>${mode.title}</h3><p>${mode.description}</p><span class="mode-tag">Semua ${state.words.length} kosa kata · ${mode.skill}</span>`;
    button.addEventListener("click",()=>{playSound("click");startGame(mode);});
    modeGrid.appendChild(button);
  });
}

function startGame(mode){
  state.mode=mode;
  state.questions=shuffle(state.words);
  state.index=0; state.score=0; state.locked=false;
  state.bossMaxHp=state.questions.length;
  state.bossHp=state.bossMaxHp;
  modeSection.classList.add("hidden"); gameSection.classList.remove("hidden");
  $("gameTitle").textContent=`${state.theme.title} · ${mode.title} · ${state.questions.length} kosa kata`;
  renderQuestion();
}

function buildOptions(correct,getter=(item)=>item.chinese){
  const others=shuffle(state.words.filter(item=>item.word!==correct.word)).slice(0,3);
  return shuffle([correct,...others]).map(item=>({label:getter(item),item}));
}
function progress(){
  const current=Math.min(state.index+1,state.questions.length);
  $("progressText").textContent=`${current}/${state.questions.length}`;
  $("progressBar").style.width=`${(state.index/state.questions.length)*100}%`;
}
function renderQuestion(){
  if(state.index>=state.questions.length)return finishGame();
  progress(); state.locked=false;
  const word=state.questions[state.index], mode=state.mode.id;
  if(mode==="flash")return renderFlash(word);
  if(mode==="typing")return renderTyping(word);
  if(mode==="sentence")return renderSentence(word);
  if(mode==="detective")return renderDetective(word);
  if(mode==="factory")return renderFactory(word);
  if(mode==="listening")return renderListening(word);
  if(mode==="boss")return renderBoss(word);
  if(mode==="treasure")return renderChoice(word,"Peti Harta","Jawab betul untuk membuka peti.");
  if(mode==="catch")return renderChoice(word,"Word Catch",`Tangkap maksud bagi “${word.word}”.`);
  return renderChoice(word,word.word,"Pilih maksud yang betul.");
}
function renderBoss(word){
  const hpPercent=Math.max(0,(state.bossHp/state.bossMaxHp)*100);
  const options=buildOptions(word);
  gameArea.innerHTML=`
    <div id="bossArena" style="text-align:center;padding:8px 0 18px">
      <div id="bossMonster" style="font-size:76px;line-height:1;transition:transform .2s,filter .2s">👹</div>
      <h3 style="margin:8px 0">Raja Kosa Kata</h3>
      <div style="max-width:520px;margin:10px auto;background:#2b2b2b;border-radius:999px;height:20px;overflow:hidden;border:2px solid rgba(255,255,255,.25)">
        <div id="bossHpBar" style="width:${hpPercent}%;height:100%;background:linear-gradient(90deg,#ef4444,#f97316);transition:width .35s"></div>
      </div>
      <strong id="bossHpText">Boss HP: ${state.bossHp}/${state.bossMaxHp}</strong>
    </div>
    <p class="question-hint">Jawab betul untuk menyerang boss</p>
    <h3 class="question-word">${word.word}</h3>
    <div class="options" id="options"></div><div id="feedback"></div>`;
  options.forEach(option=>{const b=document.createElement("button");b.type="button";b.className="option-button";b.textContent=option.label;b.addEventListener("click",()=>answer(option.item.word===word.word,word));$("options").appendChild(b);});
}
function renderChoice(word,heading,hint){
  const options=buildOptions(word);
  gameArea.innerHTML=`<p class="question-hint">${hint}</p><h3 class="question-word">${heading}</h3><div class="options" id="options"></div><div id="feedback"></div>`;
  options.forEach(option=>{ const b=document.createElement("button"); b.type="button"; b.className="option-button"; b.textContent=option.label; b.addEventListener("click",()=>answer(option.item.word===word.word,word)); $("options").appendChild(b); });
}
function renderFlash(word){
  gameArea.innerHTML=`<p class="question-hint">Kad ${state.index+1} daripada ${state.questions.length}</p><h3 class="question-word">${word.word}</h3><div class="sentence-box">${word.chinese}<br><small>${word.sentence}</small></div><div class="center-actions" style="margin-top:24px"><button class="primary-button" id="knowBtn" type="button">Saya sudah faham</button></div>`;
  $("knowBtn").addEventListener("click",()=>answer(true,word));
}
function renderTyping(word){
  gameArea.innerHTML=`<p class="question-hint">Taip perkataan Bahasa Melayu</p><h3 class="question-word">${word.chinese}</h3><input class="answer-input" id="answerInput" autocomplete="off" placeholder="Taip jawapan"/><div class="center-actions"><button class="primary-button" id="submitBtn" type="button">Semak</button></div><div id="feedback"></div>`;
  const submit=()=>answer($("answerInput").value.trim().toLowerCase()===word.word.toLowerCase(),word);
  $("submitBtn").addEventListener("click",submit); $("answerInput").addEventListener("keydown",e=>{if(e.key==="Enter")submit();}); $("answerInput").focus();
}
function renderSentence(word){
  const escaped=word.word.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  const sentence=word.sentence.replace(new RegExp(escaped,"i"),"________"), options=buildOptions(word,item=>item.word);
  gameArea.innerHTML=`<p class="question-hint">Lengkapkan ayat</p><div class="sentence-box">${sentence}</div><div class="options" id="options"></div><div id="feedback"></div>`;
  options.forEach(option=>{const b=document.createElement("button");b.type="button";b.className="option-button";b.textContent=option.label;b.addEventListener("click",()=>answer(option.item.word===word.word,word));$("options").appendChild(b);});
}
function renderDetective(word){
  const options=buildOptions(word,item=>item.word);
  gameArea.innerHTML=`<p class="question-hint">Apakah perkataan ini?</p><div class="sentence-box">${word.clue}</div><div class="options" id="options"></div><div id="feedback"></div>`;
  options.forEach(option=>{const b=document.createElement("button");b.type="button";b.className="option-button";b.textContent=option.label;b.addEventListener("click",()=>answer(option.item.word===word.word,word));$("options").appendChild(b);});
}
function renderFactory(word){
  const correct=word.parts.join(""), shown=shuffle(word.parts).join(" + ");
  gameArea.innerHTML=`<p class="question-hint">Cantumkan bahagian perkataan</p><h3 class="question-word">${shown}</h3><input class="answer-input" id="answerInput" autocomplete="off" placeholder="Taip perkataan penuh"/><div class="center-actions"><button class="primary-button" id="submitBtn" type="button">Bina Perkataan</button></div><div id="feedback"></div>`;
  const submit=()=>answer($("answerInput").value.trim().toLowerCase().replaceAll(" ","")===correct.toLowerCase().replaceAll(" ",""),word);
  $("submitBtn").addEventListener("click",submit); $("answerInput").addEventListener("keydown",e=>{if(e.key==="Enter")submit();});
}
function renderListening(word){
  const options=buildOptions(word,item=>item.word);
  gameArea.innerHTML=`<p class="question-hint">Tekan butang, kemudian pilih perkataan</p><div class="center-actions" style="margin-top:40px"><button class="primary-button" id="listenBtn" type="button">Dengar Sebutan</button></div><div class="options" id="options"></div><div id="feedback"></div>`;
  $("listenBtn").addEventListener("click",()=>{playSound("click");if("speechSynthesis" in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(word.word);u.lang="ms-MY";speechSynthesis.speak(u);}});
  options.forEach(option=>{const b=document.createElement("button");b.type="button";b.className="option-button";b.textContent=option.label;b.addEventListener("click",()=>answer(option.item.word===word.word,word));$("options").appendChild(b);});
}
function answer(isCorrect,word){
  if(state.locked)return; state.locked=true;
  if(isCorrect){
    state.score+=1;state.xp+=10;state.stars+=1;playSound(state.mode.id==="boss"?"attack":"correct");
    if(state.mode.id==="boss"){
      state.bossHp=Math.max(0,state.bossHp-1);
      const bar=$("bossHpBar"),text=$("bossHpText"),monster=$("bossMonster");
      if(bar)bar.style.width=`${(state.bossHp/state.bossMaxHp)*100}%`;
      if(text)text.textContent=`Boss HP: ${state.bossHp}/${state.bossMaxHp}`;
      if(monster){monster.style.transform="scale(.82) rotate(-8deg)";monster.style.filter="brightness(2)";setTimeout(()=>{monster.style.transform="";monster.style.filter="";},260);}
    }
  }else playSound("wrong");
  updateProfile();
  const feedback=$("feedback")||document.createElement("div"); feedback.className=`feedback ${isCorrect?"correct":"wrong"}`; feedback.textContent=isCorrect?(state.mode.id==="boss"?"Serangan berjaya! Boss kehilangan 1 HP.":"Betul! +10 XP"):`Belum tepat. Jawapan: ${word.word} — ${word.chinese}`; if(!feedback.parentElement)gameArea.appendChild(feedback);
  setTimeout(()=>{state.index+=1;renderQuestion();},1000);
}
function finishGame(){
  $("progressBar").style.width="100%"; const percent=Math.round((state.score/state.questions.length)*100);
  const bossWon=state.mode.id==="boss"&&state.bossHp===0;
  if(bossWon)playSound("victory");
  gameArea.innerHTML=`<div class="result-card"><p class="eyebrow">${bossWon?"Boss Telah Dikalahkan!":"Semua Kosa Kata Selesai"}</p>${bossWon?'<div style="font-size:82px;line-height:1;margin:8px 0">🏆</div>':''}<div class="result-score">${state.score}/${state.questions.length}</div><h2>${bossWon?"Kemenangan Hebat!":percent>=80?"Hebat!":"Cuba sekali lagi"}</h2><p class="subtitle">Kamu telah melalui kesemua ${state.questions.length} kosa kata. Skor ${percent}%. Kamu memperoleh ${state.score*10} XP dan ${state.score} bintang.</p><div class="center-actions" style="margin-top:24px"><button class="primary-button" id="replayBtn" type="button">Main Semula</button><button class="secondary-button" id="modesBtn" type="button">Pilih Mode</button></div></div>`;
  $("replayBtn").addEventListener("click",()=>startGame(state.mode)); $("modesBtn").addEventListener("click",showModes);
}
function showModes(){gameSection.classList.add("hidden");modeSection.classList.remove("hidden");}

$("changeNameBtn").addEventListener("click",()=>{playSound("click");const name=prompt("Masukkan nama murid:",state.player);if(name&&name.trim()){state.player=name.trim().slice(0,24);updateProfile();}});
$("backToThemesBtn").addEventListener("click",()=>{playSound("click");modeSection.classList.add("hidden");themeSection.classList.remove("hidden");});
$("exitGameBtn").addEventListener("click",()=>{playSound("click");showModes();});
renderThemes(); updateProfile();