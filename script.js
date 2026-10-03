
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


/* ==========================================
   GREY AI V2 — CIEXTURICIA GREY
   Personal Portfolio Assistant
   ========================================== */

/* ---------- PERSONAL KNOWLEDGE ---------- */

const greyKnowledge = {
  profile: {
    name: "Ciexturicia Grey",
    nickname: "Legitmate Grey",
    realName: "Lutwama Darglous",
    role: "Web Developer and Programmer in Training",
    education: "National Certificate in ICT",
    dream: "Become a software engineer",
    careerGoal: "Become a full-stack developer",
    qualities: ["Creative", "Loyal", "Hardworking"],
    motivation: "Passion",
    birthday: {
      month: 8,
      day: 8
    },
    colors: ["Cobalt blue", "Black", "White"],
    journey:
      "A learner working toward success through passion, creativity, and technology."
  },

  interests: [
    "Programming",
    "Web designing",
    "Artificial intelligence",
    "Computers",
    "Robotics",
    "Gaming",
    "Listening to music",
    "Watching movies",
    "Traveling",
    "Exploring new places"
  ],

  personality: [
    "Quiet",
    "Observant",
    "Creative",
    "Loyal",
    "Hardworking",
    "Passionate"
  ],

  dislikes: [
    "Being treated like a fool",
    "Whispering that feels directed at him"
  ],

  music: {
    artists: [
      "Central Cee",
      "Tatiana Manaois",
      "Kendrick Lamar",
      "Anne-Marie",
      "Jax",
      "Alan Walker",
      "Cardi B",
      "Doechii",
      "Jim nola mc"
    ],
    genres: [
      "Hip-hop",
      "Rap",
      "Pop",
      "R&B",
      "drill"
    ],
    favoriteArtist: "Tatiana Manaois"
  },

  games: [
    "GTA",
    "Blur",
    "Call of Duty",
    "Need for Speed"
  ],

  entertainment: {
    movies: true,
    platforms: ["YouTube", "MovieBox"]
  },

  technology: {
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Web Design",
      "ICT"
    ],
    interests: [
      "Artificial intelligence",
      "Computers",
      "Robotics"
    ]
  },

  school: {
    name: "Merryhill Christian High School",
    location: "Gayaza",
    years: "Form One to Form Four",
    description:
      "Grey's schoolmates and classmates from Form One through Form Four."
  },

  friends: [
    "Namubiru Fatumah",
    "Mirembe Shatrah",
    "Nanyombi Michello",
    "Ssebidde Jordan",
    "Ssempala Fred",
    "Matovu Fredrick",
    "Kade Martha Natasha",
    "Kajjumba Mary",
    "Felisha",
    "Nabunya Concepta",
    "Musenero Alice Monitor",
    "Kissa Isaac",
    "Melisha",
    "Monitor",
    "Mugisha Kevin",
    "Kagoya Sophie",
    "Migadde Herbert Corllos",
    "Birungi Tracy",
    "Nakayo Patricia",
    "Nabbosa Sierra",
    "Josephine",
    "Wambazu Denis",
  ],

  schoolConnections: [
    "Nsubuga Charles"
  ],

  family: {
    littleBrother: "Kimbugwe Fahim Dylan",
    mother: "Namukasa Victoria",
    lateFather: "Kibirige Darlington",
    fatherNote:
      "Grey's father passed away in 2017.",
    aunt: "Birungi Rose",
    olderBrother: "Ssenfuka Darious",
    olderBrotherNote:
      "One year older than Grey.",
    elderBrother: "Ssebunya Davis",
    elderBrotherLocation:
      "Kampala, Makindye",
    grandmother: "Naluyima Jennifer",
    cousinBrother: "Nsubuga Charles"
  },

  mask: {
    publicExplanation:
      "Grey sometimes wears a face mask for personal comfort and to reduce direct exposure to unfamiliar scents and environments. It is also something he is used to wearing. It is a personal choice, and visitors should not assume what it means about his health."
  },

  portfolio: {
    name: "Ciexturicia Grey Portfolio",
    url:
      "https://legitmategrey-svg.github.io/ciexturicia-grey/",
    host: "GitHub Pages"
  },

  projects: [
    {
      name: "Personal Portfolio",
      description:
        "A futuristic website showcasing Grey's profile, skills, and interests."
    },
    {
      name: "GREY AI",
      description:
        "A portfolio assistant that answers questions about Grey and technology."
    },
    {
      name: "GREY Audio System",
      description:
        "A music player interface for the portfolio."
    }
  ]
};


/* ---------- DATE AND BIRTHDAY ---------- */

function greyBirthdayMessage() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  if (
    month === greyKnowledge.profile.birthday.month &&
    day === greyKnowledge.profile.birthday.day
  ) {
    return "Today is Grey's birthday! 🎂💙 Send him your best wishes!";
  }

  return "Grey's birthday is on August 8. 🎂";
}


/* ---------- QUESTION NORMALIZATION ---------- */

function greyNormalize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function greyHasAny(text, words) {
  return words.some(word => {
    const normalized = greyNormalize(word);
    return text.includes(normalized);
  });
}


/* ---------- ANSWER DATABASE ---------- */

const greyTopics = [
  {
    words: [
      "who are you",
      "your name",
      "what are you",
      "introduce yourself"
    ],
    answer: () =>
      "I'm GREY AI, the digital assistant on Ciexturicia Grey's portfolio. I can answer questions about Grey, his interests, his journey, and introductory technology topics."
  },

  {
    words: [
      "who is grey",
      "who is ciexturicia",
      "about grey",
      "tell me about grey"
    ],
    answer: () => {
      const p = greyKnowledge.profile;
      return `${p.name}, also known as ${p.nickname}, is a creative, loyal, and hardworking ICT learner. He is developing his skills in web development and programming, with a dream of becoming a software engineer and a goal of becoming a full-stack developer.`;
    }
  },

  {
    words: [
      "real name",
      "grey's real name",
      "darglous"
    ],
    answer: () =>
      `Grey's real name is ${greyKnowledge.profile.realName}. His portfolio name is ${greyKnowledge.profile.name}, and he also uses ${greyKnowledge.profile.nickname}.`
  },

  {
    words: [
      "dream",
      "biggest dream",
      "ambition",
      "what does grey want to become"
    ],
    answer: () =>
      `Grey's biggest dream is to ${greyKnowledge.profile.dream.toLowerCase()}. He also wants to ${greyKnowledge.profile.careerGoal.toLowerCase()}.`
  },

  {
    words: [
      "career goal",
      "future career",
      "full stack",
      "full-stack",
      "kind of programmer"
    ],
    answer: () =>
      "Grey wants to become a full-stack developer, working with both the frontend and backend of websites and applications."
  },

  {
    words: [
      "qualities",
      "personality",
      "character",
      "what is grey like"
    ],
    answer: () =>
      `Grey describes himself as ${greyKnowledge.profile.qualities.join(", ").toLowerCase()}. He is also quiet and observant.`
  },

  {
    words: [
      "quiet",
      "silent",
      "observant",
      "why is grey quiet"
    ],
    answer: () =>
      "Grey describes himself as quiet but observant. He may not say much, but he notices a lot around him."
  },

  {
    words: [
      "motivation",
      "motivates grey",
      "what drives grey",
      "inspiration"
    ],
    answer: () =>
      "Passion is what motivates Grey. His interest in technology and creativity drives him to keep learning and building."
  },

  {
    words: [
      "successful",
      "journey",
      "success",
      "life journey"
    ],
    answer: () =>
      "Grey is working toward a successful future through learning, creativity, passion, and developing his ICT skills."
  },

  {
    words: [
      "birthday",
      "when was grey born",
      "when is grey's birthday"
    ],
    answer: () => greyBirthdayMessage()
  },

  {
    words: [
      "favorite color",
      "favourite colour",
      "colors",
      "colours"
    ],
    answer: () =>
      `Grey's favorite colors are ${greyKnowledge.profile.colors.join(", ")}.`
  },

  {
    words: [
      "skills",
      "what can grey do",
      "programming skills",
      "what is grey learning"
    ],
    answer: () =>
      `Grey is developing skills in ${greyKnowledge.technology.skills.join(", ")}. He is continuing to learn and improve through practical projects.`
  },

  {
    words: [
      "education",
      "certificate",
      "studying",
      "school qualification"
    ],
    answer: () =>
      `Grey is pursuing a ${greyKnowledge.profile.education}. His learning journey is focused on ICT and technology.`
  },

  {
    words: [
      "technology interests",
      "favorite technology",
      "favorite tech",
      "what technology does grey like"
    ],
    answer: () =>
      `Grey is especially interested in ${greyKnowledge.technology.interests.join(", ").toLowerCase()}.`
  },

  {
    words: [
      "hobbies",
      "interests",
      "what does grey like",
      "free time"
    ],
    answer: () =>
      `Grey enjoys ${greyKnowledge.interests.join(", ").toLowerCase()}.`
  },

  {
    words: [
      "music",
      "artists",
      "singers",
      "what music does grey listen to"
    ],
    answer: () =>
      `Grey listens to ${greyKnowledge.music.artists.join(", ")}. His favorite genres include ${greyKnowledge.music.genres.join(", ")}.`
  },

  {
    words: [
      "favorite artist",
      "favourite artist",
      "tatiana",
      "tatiana manaois"
    ],
    answer: () =>
      `Grey's favorite major artist is ${greyKnowledge.music.favoriteArtist}. He also listens to many other artists, including Central Cee, Kendrick Lamar, Anne-Marie, Jax, and Alan Walker.`
  },

  {
    words: [
      "favorite genre",
      "music genre",
      "what genre",
      "hip hop",
      "hip-hop",
      "r&b"
    ],
    answer: () =>
      `Grey enjoys ${greyKnowledge.music.genres.join(", ")}.`
  },

  {
    words: [
      "games",
      "gaming",
      "favorite games",
      "video games"
    ],
    answer: () =>
      `Some games Grey enjoys are ${greyKnowledge.games.join(", ")}.`
  },

  {
    words: [
      "movies",
      "films",
      "watching movies",
      "movie platforms"
    ],
    answer: () =>
      "Grey enjoys watching movies, including on YouTube and MovieBox."
  },

  {
    words: [
      "travel",
      "traveling",
      "travelling",
      "places",
      "exploring"
    ],
    answer: () =>
      "Grey enjoys traveling and discovering distant places he has never visited before."
  },

  {
    words: [
      "annoys grey",
      "what annoys",
      "dislikes",
      "what makes grey angry"
    ],
    answer: () =>
      `Grey dislikes ${greyKnowledge.dislikes.join(" and ").toLowerCase()}.`
  },

  {
    words: [
      "mask",
      "face mask",
      "why does grey wear a mask",
      "why the mask"
    ],
    answer: () =>
      greyKnowledge.mask.publicExplanation
  },

  {
    words: [
      "school",
      "high school",
      "merryhill",
      "merryhill christian"
    ],
    answer: () =>
      `Grey attended ${greyKnowledge.school.name} in ${greyKnowledge.school.location}. His schoolmates and classmates were part of his school journey from ${greyKnowledge.school.years}.`
  },

  {
    words: [
      "classmates",
      "schoolmates",
      "form one",
      "form two",
      "form three",
      "form four"
    ],
    answer: () =>
      `Grey's schoolmates and classmates were from ${greyKnowledge.school.name}, where he shared school years from Form One to Form Four.`
  },

  {
    words: [
      "friends",
      "friendship",
      "grey's friends",
      "school friends"
    ],
    answer: () =>
      `Grey's friends include ${greyKnowledge.friends.join(", ")}. Many of these names are connected to his school years.`
  },

  {
    words: [
      "who is felisha",
      "felisha"
    ],
    answer: () =>
      "Felisha is one of the friends Grey mentioned among his schoolmates."
  },

  {
    words: [
      "nabunya concepta",
      "concepta"
    ],
    answer: () =>
      "Nabunya Concepta is one of the friends Grey mentioned from his school years."
  },

  {
    words: [
      "nsubuga charles",
      "charles"
    ],
    answer: () =>
      "Nsubuga Charles is Grey's cousin brother and was also among his schoolmates."
  },

  {
    words: [
      "family",
      "grey's family",
      "family members"
    ],
    answer: () =>
      "Grey has mentioned his mother Namukasa Victoria, his late father Kibirige Darlington, his brothers, his little brother, his aunt, and his grandmother as important family members."
  },

  {
    words: [
      "mother",
      "mom",
      "mum",
      "grey's mom"
    ],
    answer: () =>
      `Grey's mother is ${greyKnowledge.family.mother}.`
  },

  {
    words: [
      "father",
      "dad",
      "grey's dad"
    ],
    answer: () =>
      `Grey's late father was ${greyKnowledge.family.lateFather}. Grey shared that his father passed away in 2017.`
  },

  {
    words: [
      "little brother",
      "younger brother",
      "fahim"
    ],
    answer: () =>
      `Grey's little brother is ${greyKnowledge.family.littleBrother}.`
  },

  {
    words: [
      "older brother",
      "big brother",
      "ssenfuka"
    ],
    answer: () =>
      `Grey's older brother is ${greyKnowledge.family.olderBrother}. Grey says he is one year older than him.`
  },

  {
    words: [
      "elder brother",
      "sebunya",
      "davis"
    ],
    answer: () =>
      `Grey's elder brother is ${greyKnowledge.family.elderBrother}.`
  },

  {
    words: [
      "aunt",
      "birungi rose",
      "rose"
    ],
    answer: () =>
      `Grey's aunt is ${greyKnowledge.family.aunt}, his late father's sister.`
  },

  {
    words: [
      "grandmother",
      "grandma",
      "grand mom",
      "naluyima"
    ],
    answer: () =>
      `Grey's grandmother is ${greyKnowledge.family.grandmother}.`
  },

  {
    words: [
      "projects",
      "what has grey built",
      "what projects"
    ],
    answer: () =>
      `Grey's portfolio projects include ${greyKnowledge.projects.map(p => p.name).join(", ")}.`
  },

  {
    words: [
      "portfolio",
      "website",
      "site link",
      "grey's website"
    ],
    answer: () =>
      `You can visit Ciexturicia Grey's portfolio here: ${greyKnowledge.portfolio.url}`
  },

  {
    words: [
      "html",
      "what is html"
    ],
    answer: () =>
      "HTML stands for HyperText Markup Language. It structures web pages using headings, paragraphs, links, images, and other elements."
  },

  {
    words: [
      "css",
      "what is css"
    ],
    answer: () =>
      "CSS stands for Cascading Style Sheets. It controls a website's appearance, including colors, layouts, spacing, and responsive design."
  },

  {
    words: [
      "javascript",
      "what is javascript",
      "what is js"
    ],
    answer: () =>
      "JavaScript is a programming language that makes websites interactive. It can respond to clicks, update content, and handle user input."
  },

  {
    words: [
      "ict",
      "what is ict",
      "define ict"
    ],
    answer: () =>
      "ICT means Information and Communication Technology. It includes digital tools and systems used to create, process, store, and communicate information."
  },

  {
    words: [
      "programming",
      "coding",
      "what is programming"
    ],
    answer: () =>
      "Programming is writing instructions that tell computers how to perform tasks. Examples of programming languages include JavaScript, Python, Java, and C."
  },

  {
    words: [
      "web development",
      "what is web development"
    ],
    answer: () =>
      "Web development is the process of building and maintaining websites and web applications. It commonly involves HTML, CSS, JavaScript, and sometimes backend technologies."
  },

  {
    words: [
      "artificial intelligence",
      "what is ai",
      "ai"
    ],
    answer: () =>
      "Artificial intelligence, or AI, is technology that enables computer systems to perform tasks such as recognizing patterns, understanding language, and generating responses."
  },

  {
    words: [
      "full stack developer",
      "full-stack developer"
    ],
    answer: () =>
      "A full-stack developer works on both frontend and backend parts of an application. The frontend is what users interact with, while the backend handles application logic and data."
  },

  {
    words: [
      "robotics",
      "what is robotics"
    ],
    answer: () =>
      "Robotics combines engineering, electronics, programming, and control systems to design and operate robots."
  },

  {
    words: [
      "computer",
      "what is a computer",
      "computers"
    ],
    answer: () =>
      "A computer is an electronic device that processes data according to instructions. It can run programs, store information, and communicate with other devices."
  },

  {
    words: [
      "liverpool",
      "football team",
      "favorite team",
      "favourite team"
    ],
    answer: () =>
      "Grey is a Liverpool fan."
  }
];


/* ---------- CHAT ELEMENTS ---------- */

const aiInput =
  document.getElementById("ai-input") ||
  document.getElementById("user-input");

const aiMessages =
  document.getElementById("ai-messages") ||
  document.getElementById("chat-messages");

const aiSend =
  document.getElementById("ai-send") ||
  document.getElementById("send-btn");


/* ---------- DISPLAY MESSAGES ---------- */

function greyAddMessage(message, sender = "bot") {
  if (!aiMessages) {
    console.error("GREY AI: Message container not found.");
    return;
  }

  const element = document.createElement("div");

  element.className =
    sender === "user"
      ? "user-message"
      : "bot-message";

  element.textContent = message;
  aiMessages.appendChild(element);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}


/* ---------- QUESTION MATCHING ---------- */

function greyFindAnswer(question) {
  const q = greyNormalize(question);

  if (!q) {
    return "Ask me something about Ciexturicia Grey or technology!";
  }

  // Greetings
  if (
    /^(hi|hello|hey|yo|hiya|good morning|good afternoon|good evening)$/.test(q)
  ) {
    return "Hey there! 👋🖤 I'm GREY AI. Ask me about Grey, his ambitions, friends, family, interests, or technology.";
  }

  if (
    greyHasAny(q, [
      "thank you",
      "thanks",
      "thx"
    ])
  ) {
    return "You're welcome! 💙 Feel free to ask me another question.";
  }

  if (
    greyHasAny(q, [
      "goodbye",
      "bye",
      "see you"
    ])
  ) {
    return "Goodbye! 👋 Thanks for visiting Ciexturicia Grey's portfolio.";
  }

  if (
    greyHasAny(q, [
      "who made you",
      "who created you",
      "your creator"
    ])
  ) {
    return "I'm GREY AI, a portfolio assistant created for Ciexturicia Grey's website.";
  }

  // Exact topic phrases first, then keyword matching.
  for (const topic of greyTopics) {
    const matched = topic.words.some(word => {
      const w = greyNormalize(word);

      // Longer phrases are checked as phrases.
      if (w.includes(" ")) {
        return q.includes(w);
      }

      // Single words must appear as separate words.
      return (" " + q + " ").includes(" " + w + " ");
    });

    if (matched) {
      return topic.answer();
    }
  }

  // General fallback
  if (q.includes("grey") || q.includes("ciexturicia")) {
    return "I can tell you about Grey's identity, education, ambitions, personality, friends, family, music, projects, and interests. Try asking one of those!";
  }

  return "Hmm, I don't have a prepared answer for that yet. 🤖 Try asking me about Grey, his school life, ICT, programming, music, AI, computers, or robotics.";
}


/* ---------- SEND MESSAGE ---------- */

function sendGreyMessage() {
  const input = document.getElementById("ai-input");

  const chat =
    document.getElementById("ai-chat") ||
    document.getElementById("ai-messages") ||
    document.getElementById("chat-messages");

  if (!input || !chat) {
    console.error("GREY AI: Chat elements not found.");
    return;
  }

  const message = input.value.trim();

  if (!message) return;

  // Show user's message
  const userMessage = document.createElement("div");

  userMessage.className = "ai-message user";
  userMessage.textContent = message;

  chat.appendChild(userMessage);

  // Clear input
  input.value = "";

  chat.scrollTop = chat.scrollHeight;

  // Get answer from GREY AI's built-in knowledge
  const reply = greyFindAnswer(message);

  // Thinking delay
  setTimeout(() => {

    const botMessage = document.createElement("div");

    botMessage.className = "ai-message bot";

    botMessage.textContent = reply;

    chat.appendChild(botMessage);

    chat.scrollTop = chat.scrollHeight;

  }, 350);
}

// Make function available to HTML buttons
window.sendGreyMessage = sendGreyMessage;


// Allow Enter key to send
const greyInput = document.getElementById("ai-input");

if (greyInput) {

  greyInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {

      event.preventDefault();

      sendGreyMessage();

    }

  });

}

// Make the function available to your HTML buttons
window.sendGreyMessage = sendGreyMessage;

window.askGrey = function(question) {
  const input = document.getElementById("ai-input");
  if (!input) return;

  input.value = question;
  sendGreyMessage();
};


/* ---------- INITIAL GREETING ---------- */

if (aiMessages && aiMessages.children.length === 0) {
  greyAddMessage(
    "WELCOME TO GREY AI 🤖💙\n\n" +
    "I'm the digital assistant for Ciexturicia Grey. " +
    "Ask me about his profile, ambitions, school friends, " +
    "family, music, interests, or technology."
  );
}

// GREY AI OPEN / CLOSE
window.toggleGreyAI = function () {
  const ai = document.getElementById("grey-ai");

  if (!ai) {
    console.error("GREY AI section not found!");
    return;
  }

  ai.classList.toggle("active");
};