// Symbole
const SYMBOLS = [
  {emoji:'🍎', label:'Apfel'},
  {emoji:'🍒', label:'Kirsche'},
  {emoji:'🍋', label:'Zitrone'},
  {emoji:'🔔', label:'Glocke'},
  {emoji:'⭐', label:'Stern'},
  {emoji:'💎', label:'Diamant'},
  {emoji:'7️⃣', label:'Sieben'}
];

// Tipps bei Jackpot
const TIPS = [
  "Tipp: Glückspiel bringt dich weiter.",
  "Tipp: To Good to Go - Sparst viel Geld.",
  "Tipp: Drei mal Läuten in ein Gebäude, ruft bestimme Personen in den ersten Stock",
];

let credits = 50;
let bet = 5;
let spinning = false;

// Referenzen auf HTML-Elemente
const creditsEl = document.getElementById("credits");
const betEl = document.getElementById("bet");
const messageEl = document.getElementById("message");
const overlay = document.getElementById("overlay");
const tipText = document.getElementById("tipText");
const app = document.getElementById("app");
const spinBtn = document.getElementById("spinBtn");
const reloadBtn = document.getElementById("reloadBtn"); // NEU: Reload Button Referenz

const strips = [];
for (let i = 0; i < 3; i++) {
  const el = document.getElementById("strip-" + i);
  strips.push(el);
  populateStrip(el);
}

function populateStrip(stripEl) {
  stripEl.innerHTML = "";
  for (let r = 0; r < 8; r++) { 
    SYMBOLS.forEach(s => {
      const d = document.createElement("div");
      d.className = "symbol";
      d.innerHTML = `
      <div style="text-align:center">
      <div style="font-size:44px">${s.emoji}</div>
      <span class="label">${s.label}</span>
      </div>`;
      stripEl.appendChild(d);
    });
  }
}

function updateUI() {
  creditsEl.textContent = credits;
  betEl.textContent = bet;
  
  // Logik zum Ein-/Ausblenden des Spin/Reload Buttons
  if (credits <= 0) {
    spinBtn.style.display = 'none';
    reloadBtn.style.display = 'block';
    messageEl.textContent = "Credits leer! Bitte aufladen.";
    bet = 1; // Setze Betrag auf Minimum zurück
    betEl.textContent = bet;
  } else {
    spinBtn.style.display = 'block';
    reloadBtn.style.display = 'none';
    
    // Stelle sicher, dass der Betrag die Credits nicht übersteigt
    if (bet > credits) {
      bet = credits;
      betEl.textContent = bet;
    }
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function rand(n) { return Math.floor(Math.random() * n); }
// NEUE Funktion: Zufällige Zahl in einem bestimmten Bereich (20 bis 100)
function randRange(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

document.getElementById("betUp").onclick = () => {
  if (bet < credits) {
    bet++;
    updateUI();
  }
};
document.getElementById("betDown").onclick = () => {
  if (bet > 1) {
    bet--;
    updateUI();
  }
};

document.getElementById("spinBtn").onclick = () => startSpin();

// Event Listener für den NEUEN Reload Button
if (reloadBtn) {
    reloadBtn.onclick = () => reloadCredits();
}

function reloadCredits() {
    credits = 10;
    bet = 5; 
    messageEl.textContent = "Willkommen zurück! Viel Glück!";
    updateUI();
}

async function startSpin() {
  if (spinning || credits < bet) return;
  spinning = true;

  credits -= bet;
  updateUI();
  messageEl.textContent = "Spinning...";
  
  const baseH = window.innerWidth <= 640 ? 120 : 140;

  const results = [
    rand(SYMBOLS.length),
    rand(SYMBOLS.length),
    rand(SYMBOLS.length)
  ];

  const durations = [900, 1200, 1500];

  for (let r = 0; r < 3; r++) {
    const strip = strips[r];
    const cycles = 3 + rand(4);
    const index = cycles * SYMBOLS.length + results[r];
    const ty = -index * baseH;

    strip.style.transition = `transform ${durations[r]}ms cubic-bezier(.12,.8,.32,1)`;
    strip.style.transform = `translateY(${ty}px)`;
  }

  await sleep(Math.max(...durations) + 100);

  let win = results[0] === results[1] && results[1] === results[2];
  
  // LOGIK FÜR ZUFÄLLIGE GEWINNAUSSCHÜTTUNG (20 bis 100)
  let payout = 0;
  if (win) {
      payout = randRange(20, 100); 
  }

  if (payout > 0) {
    credits += payout;
    updateUI();
    messageEl.textContent = `JACKPOT! Gewinn: ${payout} Credits!`; 
    
    const tip = TIPS[rand(TIPS.length)];
    showTip(tip);
  } else {
    messageEl.textContent = "Kein Treffer – nochmal!";
  }

  spinning = false;
  // UI aktualisieren, um Credits-Status (Reload-Button) zu prüfen
  updateUI(); 
}

function showTip(t) {
  tipText.textContent = t;
  overlay.classList.add("show");
  app.classList.add("blurred");
}

document.getElementById("closeBtn").onclick = () => {
  overlay.classList.remove("show");
  app.classList.remove("blurred");
};

function setInitialSymbol(reelIndex, symbolIndex) {
  const strip = strips[reelIndex];
  const symbolHeight = window.innerWidth <= 640 ? 120 : 140; 
  
  const index = symbolIndex; 
  const ty = -index * symbolHeight;

  strip.style.transition = 'none'; 
  strip.style.transform = `translateY(${ty}px)`;
}

// Initialisiere die Walzen auf Basis des Fotos (Apfel, Glocke, ...):
setInitialSymbol(0, 0); 
setInitialSymbol(1, 3); 

messageEl.textContent = "Kein Treffer – nochmal!";

updateUI();