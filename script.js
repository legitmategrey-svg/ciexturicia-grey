
/* =====================================
   CIEXTURICIA GREY
   MAIN JAVASCRIPT
   CLOCK + MUSIC PLAYER + GREY AI
===================================== */


/* =====================================
   1. MOBILE NAVIGATION
===================================== */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.textContent =
      nav.classList.contains("open") ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.textContent = "☰";
    });
  });
}


/* =====================================
   2. GREY LIVE DIGITAL CLOCK
===================================== */

function updateGreyClock() {
  const now = new Date();

  const time = now.toLocaleTimeString("en-UG", {
    timeZone: "Africa/Kampala",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const date = now.toLocaleDateString("en-UG", {
    timeZone: "Africa/Kampala",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const clock = document.getElementById("digitalClock");
  const clockDate = document.getElementById("digitalDate");

  if (clock) clock.textContent = time;
  if (clockDate) clockDate.textContent = date;
}

updateGreyClock();
setInterval(updateGreyClock, 1000);


/* =====================================
   3. GREY FUTURISTIC MUSIC PLAYER
===================================== */

const audio = document.getElementById("musicAudio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const songSelect = document.getElementById("songSelect");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const playlist = [
  {
    title: "You Got Me",
    artist: "Tatiana Manaois",
    src: "music/you-got-me.mp3"
  },
  {
    title: "Like I Did",
    artist: "Tatiana Manaois",
    src: "music/like-i-did.mp3"
  },
  {
    title: "Wanna Be Yours",
    artist: "Tatiana Manaois",
    src: "music/wanna-be-yours.mp3"
  }
];

let currentSong = 0;

function formatTime(seconds) {
  if (!isFinite(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return mins + ":" + String(secs).padStart(2, "0");
}


// LOAD SONG

function loadSong(index) {
  if (!playlist.length) return;

  currentSong =
    (index + playlist.length) % playlist.length;

  const song = playlist[currentSong];

  if (songSelect) {
    songSelect.value = String(currentSong);
  }

  if (audio) audio.src = song.src;
  if (songTitle) songTitle.textContent = song.title;
  if (artistName) artistName.textContent = song.artist;

  if (progress) progress.value = 0;
  if (currentTime) currentTime.textContent = "0:00";
  if (duration) duration.textContent = "0:00";
}


// PLAY SONG

function playSong() {
  if (!audio || !playBtn) return;

  audio.play()
    .then(() => {
      playBtn.textContent = "❚❚";
    })
    .catch(() => {
      playBtn.textContent = "▶";
      alert("Song unavailable. Check your music file.");
    });
}


// PAUSE SONG

function pauseSong() {
  if (!audio || !playBtn) return;

  audio.pause();
  playBtn.textContent = "▶";
}


// PLAY / PAUSE BUTTON

if (playBtn && audio) {
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      playSong();
    } else {
      pauseSong();
    }
  });
}


// NEXT SONG

function nextSong() {
  loadSong(currentSong + 1);
  playSong();
}


// PREVIOUS SONG

function previousSong() {
  loadSong(currentSong - 1);
  playSong();
}


// SONG SELECTOR

if (songSelect) {
  songSelect.addEventListener("change", () => {
    const selectedSong = Number(songSelect.value);

    if (
      Number.isInteger(selectedSong) &&
      selectedSong >= 0 &&
      selectedSong < playlist.length
    ) {
      loadSong(selectedSong);
      playSong();
    }
  });
}


// NEXT / PREVIOUS BUTTONS

if (prevBtn) {
  prevBtn.addEventListener("click", previousSong);
}

if (nextBtn) {
  nextBtn.addEventListener("click", nextSong);
}


// UPDATE PROGRESS

if (audio && progress) {
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration || !isFinite(audio.duration)) return;

    progress.value =
      (audio.currentTime / audio.duration) * 100;

    if (currentTime) {
      currentTime.textContent =
        formatTime(audio.currentTime);
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    if (duration) {
      duration.textContent =
        formatTime(audio.duration);
    }
  });

  progress.addEventListener("input", () => {
    if (!audio.duration || !isFinite(audio.duration)) return;

    audio.currentTime =
      (Number(progress.value) / 100) * audio.duration;
  });

  audio.addEventListener("ended", nextSong);
}


// VOLUME

if (audio && volume) {
  audio.volume = Number(volume.value);

  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
  });
}


// INITIALIZE MUSIC PLAYER

loadSong(0);


/* =====================================
   4. GREY AI ASSISTANT
===================================== */

// HTML ELEMENTS

const greyAI = document.getElementById("grey-ai");
const aiChat = document.getElementById("ai-chat");
const aiInput = document.getElementById("ai-input");


// OPEN / CLOSE AI

function toggleGreyAI() {
  if (!greyAI) {
    console.error("GREY AI: Missing #grey-ai");
    return;
  }

  const isOpen =
    window.getComputedStyle(greyAI).display !== "none";

  greyAI.style.display = isOpen ? "none" : "flex";

  if (!isOpen && aiInput) {
    aiInput.focus();
  }
}


// MAKE FUNCTION AVAILABLE TO HTML BUTTONS

window.toggleGreyAI = toggleGreyAI;


// ADD MESSAGE TO CHAT

function addGreyMessage(message, sender) {
  if (!aiChat) {
    console.error("GREY AI: Missing #ai-chat");
    return;
  }

  const bubble = document.createElement("div");

  bubble.classList.add("ai-message", sender);
  bubble.textContent = message;

  aiChat.appendChild(bubble);
  aiChat.scrollTop = aiChat.scrollHeight;
}


// GREY'S KNOWLEDGE DATABASE

const greyKnowledge = [
  {
    keywords: ["who are you", "your name"],
    answer:
      "I'm GREY AI, the digital assistant of Ciexturicia Grey! 🤖"
  },
  {
    keywords: [
      "who is grey",
      "who is ciexturicia",
      "about grey",
      "tell me about grey",
      "who is darglous"
    ],
    answer:
      "Ciexturicia Grey, also known as Legitmate Grey, is an ICT learner, web developer and programmer pursuing a National Certificate in ICT. Welcome to his digital world! 🚀"
  },
  {
    keywords: [
      "skills",
      "his skill",
      "programming",
      "what can he do",
      "what does he do"
    ],
    answer:
      "Grey is interested in programming, web design and exploring ICT. He's developing his skills through practical projects and his own portfolio."
  },
  {
    keywords: [
      "hobbies",
      "hobby",
      "interests",
      "free time",
      "what does he like"
    ],
    answer:
      "Grey enjoys programming, web designing, listening to music, gaming and exploring technology. 💻🎮"
  },
  {
    keywords: [
      "music",
      "artist",
      "favourite singer",
      "favorite singer",
      "tatiana"
    ],
    answer:
      "Grey's favourite major artist is Tatiana Manaois. He also enjoys exploring music through his portfolio's music player. 🎵"
  },
  {
    keywords: [
      "games",
      "gaming",
      "game",
      "favourite game",
      "favorite game"
    ],
    answer:
      "Grey enjoys gaming! Some games he likes include GTA, Blur, Call of Duty and Need for Speed. 🎮"
  },
  {
    keywords: [
      "friends",
      "friendship",
      "his friend",
      "who are his friends"
    ],
    answer:
      "Grey's friendship section features Namubiru Fatumah, Mirembe Shatrah, Nanyombi Michello and Ssebidde Jordan. 🤝"
  },
  {
    keywords: [
      "education",
      "certificate",
      "studies",
      "qualification",
      "school"
    ],
    answer:
      "Grey is pursuing a National Certificate in ICT. He's learning and developing his knowledge of technology, programming and web design. 🎓"
  },
  {
    keywords: [
      "contact",
      "email",
      "reach him",
      "social media",
      "instagram"
    ],
    answer:
      "You can reach Grey through the contact section of his portfolio. Check the available email and social media links there. 📩"
  },
  {
    keywords: [
      "website",
      "portfolio",
      "this site",
      "projects",
      "project"
    ],
    answer:
      "You're exploring Ciexturicia Grey's portfolio! It showcases his profile, interests, music player and ICT journey. Explore the sections to discover more. 🌐"
  },
  {
    keywords: [
      "hello",
      "hey",
      "hi",
      "good morning",
      "good evening",
      "good afternoon"
    ],
    answer:
      "Yoooo! 👋 Welcome to Ciexturicia Grey's digital world! I'm GREY AI. What would you like to know about Grey?"
  },
  {
    keywords: [
      "thank you",
      "thanks",
      "thx"
    ],
    answer:
      "You're welcome! 😎 Thanks for visiting Ciexturicia Grey's portfolio!"
  }
];


// FIND AN ANSWER

function getGreyAnswer(question) {
  const text = question
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  for (const item of greyKnowledge) {
    for (const keyword of item.keywords) {
      if (text.includes(keyword)) {
        return item.answer;
      }
    }
  }

  return (
    "That's an interesting question! 🤖 " +
    "I can tell you about Grey's ICT studies, " +
    "skills, hobbies, music, games, friends " +
    "and portfolio. Try asking about one of those!"
  );
}


// SEND MESSAGE

function sendGreyMessage() {
  if (!aiInput) {
    console.error("GREY AI: Missing #ai-input");
    return;
  }

  const question = aiInput.value.trim();

  if (question === "") return;

  // Show visitor's message
  addGreyMessage(question, "user");

  // Clear input
  aiInput.value = "";

  // Generate response
  const answer = getGreyAnswer(question);

  // Show GREY's reply
  setTimeout(() => {
    addGreyMessage(answer, "bot");
  }, 400);
}


// MAKE SEND FUNCTION AVAILABLE TO HTML

window.sendGreyMessage = sendGreyMessage;


// QUICK QUESTIONS

function askGrey(question) {
  if (!question) return;

  addGreyMessage(question, "user");

  const answer = getGreyAnswer(question);

  setTimeout(() => {
    addGreyMessage(answer, "bot");
  }, 400);
}


// MAKE QUICK QUESTIONS AVAILABLE TO HTML

window.askGrey = askGrey;


// ENTER KEY TO SEND

if (aiInput) {
  aiInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendGreyMessage();
    }
  });
}


// CONNECT SEND BUTTON IF PRESENT

const aiSend = document.getElementById("ai-send");

if (aiSend) {
  aiSend.addEventListener("click", sendGreyMessage);
}


// INITIAL GREY AI MESSAGE

if (aiChat && aiChat.children.length === 0) {
  addGreyMessage(
    "Yoooo! 👋 I'm GREY AI. Ask me about Ciexturicia Grey, his ICT journey, skills, music, games or friends!",
    "bot"
  );
}


// CHECK CONNECTIONS

console.log("GREY SYSTEM: JavaScript loaded.");

if (!greyAI) {
  console.warn("GREY AI: Missing #grey-ai");
}

if (!aiChat) {
  console.warn("GREY AI: Missing #ai-chat");
}

if (!aiInput) {
  console.warn("GREY AI: Missing #ai-input");
}

console.log("GREY AI: Assistant initialized.");
