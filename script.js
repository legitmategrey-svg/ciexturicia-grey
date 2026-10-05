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

  const clock =
    document.getElementById("digitalClock");

  const clockDate =
    document.getElementById("digitalDate");

  if (clock) {
    clock.textContent = time;
  }

  if (clockDate) {
    clockDate.textContent = date;
  }

}

updateGreyClock();

setInterval(updateGreyClock, 1000);


/* =====================================
   3. GREY FUTURISTIC MUSIC PLAYER
===================================== */

const audio =
  document.getElementById("musicAudio");

const playBtn =
  document.getElementById("playBtn");

const progress =
  document.getElementById("progress");

const currentTime =
  document.getElementById("currentTime");

const duration =
  document.getElementById("duration");

const volume =
  document.getElementById("volume");

const songTitle =
  document.getElementById("songTitle");

const artistName =
  document.getElementById("artistName");

const songSelect =
  document.getElementById("songSelect");

const prevBtn =
  document.getElementById("prevBtn");

const nextBtn =
  document.getElementById("nextBtn");


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

  if (!isFinite(seconds)) {
    return "0:00";
  }

  const mins =
    Math.floor(seconds / 60);

  const secs =
    Math.floor(seconds % 60);

  return mins + ":" +
    String(secs).padStart(2, "0");

}


/* ---------- LOAD SONG ---------- */

function loadSong(index) {

  if (!playlist.length) {
    return;
  }

  currentSong =
    (index + playlist.length) %
    playlist.length;

  const song =
    playlist[currentSong];

  if (songSelect) {
    songSelect.value =
      String(currentSong);
  }

  if (audio) {
    audio.src = song.src;
  }

  if (songTitle) {
    songTitle.textContent =
      song.title;
  }

  if (artistName) {
    artistName.textContent =
      song.artist;
  }

  if (progress) {
    progress.value = 0;
  }

  if (currentTime) {
    currentTime.textContent =
      "0:00";
  }

  if (duration) {
    duration.textContent =
      "0:00";
  }

}


/* ---------- PLAY ---------- */

function playSong() {

  if (!audio) {
    return;
  }

  audio.play()
    .then(() => {

      if (playBtn) {
        playBtn.textContent = "❚❚";
      }

    })
    .catch(error => {

      console.error(
        "Music error:",
        error
      );

      if (playBtn) {
        playBtn.textContent = "▶";
      }

    });

}


/* ---------- PAUSE ---------- */

function pauseSong() {

  if (!audio) {
    return;
  }

  audio.pause();

  if (playBtn) {
    playBtn.textContent = "▶";
  }

}


/* ---------- PLAY / PAUSE ---------- */

if (playBtn && audio) {

  playBtn.addEventListener(
    "click",
    () => {

      if (audio.paused) {
        playSong();
      } else {
        pauseSong();
      }

    }
  );

}


/* ---------- NEXT SONG ---------- */

function nextSong() {

  loadSong(currentSong + 1);

  playSong();

}


/* ---------- PREVIOUS SONG ---------- */

function previousSong() {

  loadSong(currentSong - 1);

  playSong();

}


/* ---------- SONG SELECTOR ---------- */

if (songSelect) {

  songSelect.addEventListener(
    "change",
    () => {

      const selectedSong =
        Number(songSelect.value);

      if (
        Number.isInteger(selectedSong) &&
        selectedSong >= 0 &&
        selectedSong < playlist.length
      ) {

        loadSong(selectedSong);

        playSong();

      }

    }
  );

}


/* ---------- PREVIOUS BUTTON ---------- */

if (prevBtn) {

  prevBtn.addEventListener(
    "click",
    previousSong
  );

}


/* ---------- NEXT BUTTON ---------- */

if (nextBtn) {

  nextBtn.addEventListener(
    "click",
    nextSong
  );

}


/* ---------- MUSIC PROGRESS ---------- */

if (audio && progress) {

  audio.addEventListener(
    "timeupdate",
    () => {

      if (
        !audio.duration ||
        !isFinite(audio.duration)
      ) {
        return;
      }

      progress.value =
        (audio.currentTime /
          audio.duration) * 100;

      if (currentTime) {

        currentTime.textContent =
          formatTime(
            audio.currentTime
          );

      }

    }
  );


  audio.addEventListener(
    "loadedmetadata",
    () => {

      if (duration) {

        duration.textContent =
          formatTime(
            audio.duration
          );

      }

    }
  );


  progress.addEventListener(
    "input",
    () => {

      if (
        !audio.duration ||
        !isFinite(audio.duration)
      ) {
        return;
      }

      audio.currentTime =
        (Number(progress.value) / 100) *
        audio.duration;

    }
  );


  audio.addEventListener(
    "ended",
    nextSong
  );

}


/* ---------- VOLUME ---------- */

if (audio && volume) {

  audio.volume =
    Number(volume.value);

  volume.addEventListener(
    "input",
    () => {

      audio.volume =
        Number(volume.value);

    }
  );

}


/* ---------- INITIAL MUSIC ---------- */

loadSong(0);


/* ==========================================
   4. GREY AI KNOWLEDGE BASE
========================================== */

const greyKnowledge = {

  profile: {

    name: "Ciexturicia Grey",

    nickname: "Legitmate Grey",

    realName: "Lutwama Darglous",

    role:
      "Web Developer and Programmer in Training",

    education:
      "National Certificate in ICT",

    dream:
      "Become a software engineer",

    careerGoal:
      "Become a full-stack developer",

    qualities: [
      "Creative",
      "Loyal",
      "Hardworking"
    ],

    motivation:
      "Passion",

    birthday: {
      month: 8,
      day: 8
    },

    colors: [
      "Cobalt blue",
      "Black",
      "White"
    ]

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
      "Drill"
    ],

    favoriteArtist:
      "Tatiana Manaois"

  },


  games: [
    "GTA",
    "Blur",
    "Call of Duty",
    "Need for Speed"
  ],


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

    name:
      "Merryhill Christian High School",

    location:
      "Gayaza",

    years:
      "Form One to Form Four"

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
    "Wambazu Denis"

  ],


  family: {

    littleBrother:
      "Kimbugwe Fahim Dylan",

    mother:
      "Namukasa Victoria",

    lateFather:
      "Kibirige Darlington",

    aunt:
      "Birungi Rose",

    olderBrother:
      "Ssenfuka Darious",

    elderBrother:
      "Ssebunya Davis",

    grandmother:
      "Naluyima Jennifer",

    cousinBrother:
      "Nsubuga Charles"

  },


  portfolio: {

    url:
      "https://legitmategrey-svg.github.io/ciexturicia-grey/"

  }

};


/* ==========================================
   5. GREY AI HELPERS
========================================== */

function greyNormalize(text) {

  return String(text)

    .toLowerCase()

    .replace(
      /[^a-z0-9\s'-]/g,
      " "
    )

    .replace(
      /\s+/g,
      " "
    )

    .trim();

}


function greyHasAny(text, words) {

  return words.some(word => {

    const normalized =
      greyNormalize(word);

    return text.includes(normalized);

  });

}


function greyBirthdayMessage() {

  const now = new Date();

  const month =
    now.getMonth() + 1;

  const day =
    now.getDate();

  if (
    month ===
      greyKnowledge.profile.birthday.month &&
    day ===
      greyKnowledge.profile.birthday.day
  ) {

    return "Today is Grey's birthday! 🎂💙 Send him your best wishes!";

  }

  return "Grey's birthday is on August 8. 🎂";

}


/* ==========================================
   6. GREY AI LOCAL ANSWERS
========================================== */

function greyFindAnswer(question) {

  const q =
    greyNormalize(question);


  if (!q) {

    return "Ask me something about Ciexturicia Grey or technology!";

  }


  /* GREETINGS */

  if (
    /^(hi|hello|hey|yo|hiya|sup)$/.test(q) ||
    q.includes("good morning") ||
    q.includes("good afternoon") ||
    q.includes("good evening")
  ) {

    return "Hey! 👋 I'm GREY AI. Ask me anything about Grey, his skills, goals, projects, interests or technology.";

  }


  /* WHO ARE YOU */

  if (
    q.includes("who are you") ||
    q.includes("what are you") ||
    q.includes("your name") ||
    q.includes("are you grey")
  ) {

    return "I am GREY AI 🤖, the personal portfolio assistant for Ciexturicia Grey.";

  }


  /* WHO IS GREY */

  if (
    q.includes("who is grey") ||
    q.includes("who is ciexturicia") ||
    q.includes("who is ciexturicia grey") ||
    q.includes("who is darglous") ||
    q.includes("who is lutwama") ||
    q.includes("tell me about grey") ||
    q.includes("tell me about ciexturicia") ||
    q.includes("tell me about darglous") ||
    q.includes("about grey") ||
    q.includes("about darglous") ||
    q.includes("who exactly is grey")
  ) {

    return "Ciexturicia Grey, also known as Legitmate Grey, is the portfolio identity of Lutwama Darglous. He is a Web Developer and Programmer in Training who is building his skills in ICT, programming and web design.";

  }


  /* REAL NAME */

  if (
    q.includes("real name") ||
    q.includes("actual name") ||
    q.includes("darglous real name") ||
    q.includes("grey real name")
  ) {

    return "Ciexturicia Grey's real name is Lutwama Darglous.";

  }


  /* NICKNAME */

  if (
    q.includes("nickname") ||
    q.includes("nicknames") ||
    q.includes("other name") ||
    q.includes("other names")
  ) {

    return "He goes by Ciexturicia Grey and Legitmate Grey.";

  }


  /* DREAM / CAREER */

  if (
    q.includes("dream") ||
    q.includes("career goal") ||
    q.includes("ambition") ||
    q.includes("future") ||
    q.includes("what does he want to become") ||
    q.includes("what does he want to be") ||
    q.includes("what will he become") ||
    q.includes("what career") ||
    q.includes("career")
  ) {

    return "Darglous's dream is to become a software engineer, with a specific career goal of becoming a full-stack developer. 🚀";

  }


  /* EDUCATION */

  if (
    q.includes("education") ||
    q.includes("certificate") ||
    q.includes("studying") ||
    q.includes("qualification") ||
    q.includes("what is he studying") ||
    q.includes("what did he study")
  ) {

    return "Darglous is pursuing a National Certificate in ICT.";

  }


  /* SKILLS */

  if (
    q.includes("skills") ||
    q.includes("skill") ||
    q.includes("what can he do") ||
    q.includes("what does he know") ||
    q.includes("what is he good at") ||
    q.includes("what can grey do") ||
    q.includes("what can darglous do")
  ) {

    return "Grey is developing skills in HTML, CSS, JavaScript, Web Design and ICT.";

  }


  /* PROGRAMMING */

  if (
    q.includes("programming") ||
    q.includes("coding") ||
    q.includes("programmer") ||
    q.includes("code")
  ) {

    return "Programming is one of Grey's main interests. He enjoys learning how to solve problems with code and build useful software.";

  }


  /* WEB DESIGN */

  if (
    q.includes("web design") ||
    q.includes("web development") ||
    q.includes("website") ||
    q.includes("web developer") ||
    q.includes("websites")
  ) {

    return "Grey is interested in web design and development. He works with HTML, CSS and JavaScript to create modern and interactive websites.";

  }


  /* TECHNOLOGY */

  if (
    q.includes("technology") ||
    q.includes("tech") ||
    q.includes("ict") ||
    q.includes("computers") ||
    q.includes("computer")
  ) {

    return "Technology and ICT are major interests of Grey. He enjoys exploring digital tools, programming, AI, computers and robotics.";

  }


  /* HOBBIES / INTERESTS */

  if (
    q.includes("hobbies") ||
    q.includes("hobby") ||
    q.includes("interests") ||
    q.includes("interest") ||
    q.includes("what does grey like") ||
    q.includes("what does he enjoy") ||
    q.includes("what does darglous enjoy") ||
    q.includes("what does he do for fun")
  ) {

    return "Grey enjoys programming, web designing, gaming, listening to music, watching movies, traveling and exploring new places. He is also interested in AI, computers and robotics.";

  }


  /* MUSIC */

  if (
    q.includes("music") ||
    q.includes("artist") ||
    q.includes("favorite artist") ||
    q.includes("favourite artist") ||
    q.includes("favorite singer") ||
    q.includes("favourite singer") ||
    q.includes("what music does grey like")
  ) {

    return "Grey's favorite major artist is Tatiana Manaois. He also listens to artists such as Central Cee, Kendrick Lamar, Anne-Marie, Jax and Alan Walker. 🎵";

  }


  /* GAMING */

  if (
    q.includes("gaming") ||
    q.includes("games") ||
    q.includes("game") ||
    q.includes("what games") ||
    q.includes("does he play games")
  ) {

    return "Grey enjoys gaming. Some of his games include GTA, Blur, Call of Duty and Need for Speed. 🎮";

  }


  /* MOVIES */

  if (
    q.includes("movies") ||
    q.includes("films") ||
    q.includes("movie")
  ) {

    return "Grey enjoys watching movies.";

  }


  /* TRAVEL */

  if (
    q.includes("travel") ||
    q.includes("travelling") ||
    q.includes("traveling") ||
    q.includes("exploring") ||
    q.includes("places")
  ) {

    return "Grey enjoys traveling and exploring new places. 🌍";

  }


  /* FRIENDS */

  if (
    q.includes("friends") ||
    q.includes("friendship") ||
    q.includes("his friends") ||
    q.includes("who are his friends")
  ) {

    return "Grey's friends include Namubiru Fatumah, Mirembe Shatrah, Nanyombi Michello and Ssebidde Jordan, along with other friends from his school years.";

  }


  /* SPECIFIC FRIENDS */

  if (
    q.includes("namubiru") ||
    q.includes("fatumah")
  ) {

    return "Namubiru Fatumah is one of the friends featured in Grey's portfolio.";

  }


  if (
    q.includes("mirembe") ||
    q.includes("shatrah")
  ) {

    return "Mirembe Shatrah is one of the friends featured in Grey's portfolio.";

  }


  if (
    q.includes("nanyombi") ||
    q.includes("michello")
  ) {

    return "Nanyombi Michello is one of the friends featured in Grey's portfolio.";

  }


  if (
    q.includes("ssebidde") ||
    q.includes("jordan")
  ) {

    return "Ssebidde Jordan is one of the friends featured in Grey's portfolio.";

  }


  /* FAMILY */

  if (
    q.includes("family") ||
    q.includes("family members")
  ) {

    return "Grey has mentioned his mother, father, brothers, aunt and grandmother as important family members.";

  }


  /* MOTHER */

  if (
    q.includes("mother") ||
    q.includes("mom") ||
    q.includes("mum")
  ) {

    return "Grey's mother is Namukasa Victoria.";

  }


  /* FATHER */

  if (
    q.includes("father") ||
    q.includes("dad")
  ) {

    return "Grey's father was Kibirige Darlington.";

  }


  /* LITTLE BROTHER */

  if (
    q.includes("little brother") ||
    q.includes("younger brother") ||
    q.includes("fahim")
  ) {

    return "Grey's little brother is Kimbugwe Fahim Dylan.";

  }


  /* OLDER BROTHER */

  if (
    q.includes("older brother") ||
    q.includes("ssenfuka")
  ) {

    return "Grey's older brother is Ssenfuka Darious.";

  }


  /* ELDER BROTHER */

  if (
    q.includes("elder brother") ||
    q.includes("sebunya") ||
    q.includes("davis")
  ) {

    return "Grey's elder brother is Ssebunya Davis.";

  }


  /* AUNT */

  if (
    q.includes("aunt") ||
    q.includes("birungi rose")
  ) {

    return "Grey's aunt is Birungi Rose.";

  }


  /* GRANDMOTHER */

  if (
    q.includes("grandmother") ||
    q.includes("grandma") ||
    q.includes("naluyima")
  ) {

    return "Grey's grandmother is Naluyima Jennifer.";

  }


  /* SCHOOL */

  if (
    q.includes("school") ||
    q.includes("merryhill") ||
    q.includes("where did he study")
  ) {

    return "Grey attended Merryhill Christian High School in Gayaza from Form One to Form Four.";

  }


  /* BIRTHDAY */

  if (
    q.includes("birthday") ||
    q.includes("when is grey birthday") ||
    q.includes("when is his birthday") ||
    q.includes("when was grey born")
  ) {

    return greyBirthdayMessage();

  }


  /* FAVORITE COLORS */

  if (
    q.includes("favorite color") ||
    q.includes("favourite colour") ||
    q.includes("colors") ||
    q.includes("colours")
  ) {

    return "Grey's favorite colors are Cobalt blue, Black and White.";

  }


  /* PROJECTS */

  if (
    q.includes("projects") ||
    q.includes("project") ||
    q.includes("his work") ||
    q.includes("what has he built")
  ) {

    return "Grey's portfolio includes his Personal Portfolio, GREY AI and the GREY Audio System. 🚀";

  }


  /* PORTFOLIO */

  if (
    q.includes("portfolio") ||
    q.includes("this website") ||
    q.includes("grey website")
  ) {

    return "This is Ciexturicia Grey's personal portfolio, showcasing his journey, interests, skills, projects and ambitions.";

  }


  /* GREY AI */

  if (
    q.includes("grey ai") ||
    q.includes("ai assistant") ||
    q.includes("what is grey ai")
  ) {

    return "GREY AI is the personal portfolio assistant created for Ciexturicia Grey. It helps visitors learn about Grey and can also provide basic technology information. 🤖";

  }


  /* HTML */

  if (
    q === "html" ||
    q.includes("what is html")
  ) {

    return "HTML stands for HyperText Markup Language. It provides the structure of web pages.";

  }


  /* CSS */

  if (
    q === "css" ||
    q.includes("what is css")
  ) {

    return "CSS stands for Cascading Style Sheets. It controls the appearance, layout and styling of websites.";

  }


  /* JAVASCRIPT */

  if (
    q === "javascript" ||
    q === "js" ||
    q.includes("what is javascript") ||
    q.includes("what is js")
  ) {

    return "JavaScript is a programming language used to make websites interactive and dynamic.";

  }


  /* AI */

  if (
    q === "ai" ||
    q.includes("what is ai") ||
    q.includes("artificial intelligence")
  ) {

    return "Artificial intelligence, or AI, is technology that allows computer systems to perform tasks that normally require human-like intelligence, such as understanding language and recognizing patterns.";

  }


  /* FULL STACK */

  if (
    q.includes("full stack") ||
    q.includes("full-stack") ||
    q.includes("fullstack")
  ) {

    return "A full-stack developer works on both the frontend and backend of websites or applications.";

  }


  /* ROBOTICS */

  if (
    q.includes("robotics") ||
    q.includes("robots") ||
    q.includes("robot")
  ) {

    return "Robotics combines programming, electronics and engineering to design and control robots.";

  }


  /* HELP */

  if (
    q === "help" ||
    q.includes("what can i ask") ||
    q.includes("what can i ask you") ||
    q.includes("what do you know")
  ) {

    return "You can ask me about Darglous's identity, education, goals, programming, web design, technology, music, gaming, hobbies, projects, friends, family, school or GREY AI.";

  }


  /* THANK YOU */

  if (
    q === "thanks" ||
    q === "thank you" ||
    q.includes("thanks grey")
  ) {

    return "You're welcome! 😎 Ask me anything else about Grey.";

  }


  /* OKAY / REACTIONS */

  if (
    q === "oh" ||
    q === "ohh" ||
    q === "okay" ||
    q === "ok" ||
    q === "nice" ||
    q === "cool" ||
    q === "wow"
  ) {

    return "Yeah 😎 There's plenty more to discover. Ask me something else about Darglous!";

  }


  /* GOODBYE */

  if (
    q === "bye" ||
    q === "goodbye" ||
    q.includes("see you")
  ) {

    return "See you later! 👋 Keep creating and keep learning. 🚀";

  }


  /* DEFAULT */

  return "I'm not sure about that yet. 🤖 Try asking me about Grey's skills, projects, education, goals, hobbies, music, gaming, friends or technology.";

}


/* ==========================================
   7. GREY AI CHAT
========================================== */

const greyConversation = [];


function getGreyChatContainer() {

  return (
    document.getElementById("ai-chat") ||
    document.getElementById("ai-messages") ||
    document.getElementById("chat-messages")
  );

}


/* ---------- ADD MESSAGE ---------- */

function greyAddMessage(
  message,
  sender = "bot"
) {

  const chat =
    getGreyChatContainer();

  if (!chat) {

    console.error(
      "GREY AI: Chat container not found."
    );

    return;

  }

  const element =
    document.createElement("div");


  if (sender === "user") {

    element.className =
      "ai-message user";

  } else {

    element.className =
      "ai-message bot";

  }


  element.textContent =
    message;

  chat.appendChild(element);

  chat.scrollTop =
    chat.scrollHeight;

}


/* ==========================================
   8. SEND GREY AI MESSAGE
========================================== */

async function sendGreyMessage() {

  const input =
    document.getElementById("ai-input");

  const chat =
    getGreyChatContainer();


  if (!input || !chat) {

    console.error(
      "GREY AI: Input or chat container not found."
    );

    return;

  }


  const message =
    input.value.trim();


  if (!message) {
    return;
  }


  /* SHOW USER MESSAGE */

  const userMessage =
    document.createElement("div");

  userMessage.className =
    "ai-message user";

  userMessage.textContent =
    message;

  chat.appendChild(
    userMessage
  );


  input.value = "";

  chat.scrollTop =
    chat.scrollHeight;


  /* SAVE CONVERSATION */

  greyConversation.push({

    role: "user",

    content: message

  });


  /* LOCAL ANSWER */

  const localAnswer =
    greyFindAnswer(message);


  /* PORTFOLIO QUESTION */

  const portfolioQuestion =
    greyHasAny(
      greyNormalize(message),
      [
        "darglous",
        "ciexturicia",
        "grey",
        "portfolio",
        "friends",
        "family",
        "school",
        "music",
        "games",
        "gaming",
        "birthday",
        "skills",
        "hobbies"
      ]
    );


  if (portfolioQuestion) {

    setTimeout(() => {

      greyConversation.push({

        role: "assistant",

        content: localAnswer

      });


      greyAddMessage(
        localAnswer,
        "bot"
      );

    }, 350);


    return;

  }


  /* THINKING MESSAGE */

  const thinkingMessage =
    document.createElement("div");

  thinkingMessage.className =
    "ai-message bot";

  thinkingMessage.textContent =
    "GREY AI is thinking...";

  chat.appendChild(
    thinkingMessage
  );

  chat.scrollTop =
    chat.scrollHeight;


  try {

    const response =
      await fetch(
        "https://grey-ai-backend.legitmategrey.workers.dev/",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            message: message,

            history:
              greyConversation.slice(-10)

          })

        }
      );


    const data =
      await response.json();


    thinkingMessage.remove();


    if (
      !response.ok ||
      !data.success
    ) {

      throw new Error(
        data.error ||
        "GREY AI backend error"
      );

    }


    const answer =
      data.answer;


    greyConversation.push({

      role: "assistant",

      content: answer

    });


    greyAddMessage(
      answer,
      "bot"
    );


  } catch (error) {

    console.error(
      "GREY AI backend:",
      error
    );


    /* LOCAL FALLBACK */

    thinkingMessage.textContent =
      localAnswer;


    greyConversation.push({

      role: "assistant",

      content: localAnswer

    });

  }

}


/* ==========================================
   9. ENTER KEY
========================================== */

const greyInput =
  document.getElementById("ai-input");


if (greyInput) {

  greyInput.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        sendGreyMessage();

      }

    }
  );

}


/* ==========================================
   10. GLOBAL FUNCTIONS
========================================== */

window.sendGreyMessage =
  sendGreyMessage;


window.greyFindAnswer =
  greyFindAnswer;


window.greyNormalize =
  greyNormalize;


window.askGrey =
  function(question) {

    const input =
      document.getElementById(
        "ai-input"
      );

    if (!input) {
      return;
    }

    input.value =
      question;

    sendGreyMessage();

  };


/* ==========================================
   11. GREY AI OPEN / CLOSE
========================================== */

window.toggleGreyAI =
  function() {

    const ai =
      document.getElementById(
        "grey-ai"
      );


    if (!ai) {

      console.error(
        "GREY AI section not found!"
      );

      return;

    }


    ai.classList.toggle(
      "active"
    );

  };


/* ==========================================
   12. INITIAL GREETING
========================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const chat =
      getGreyChatContainer();


    if (
      chat &&
      chat.children.length === 0
    ) {

      greyAddMessage(

        "Yo! 👋 Welcome to Ciexturicia Grey's digital world. I'm Grey AI. Ask me anything about Grey!",

        "bot"

      );

    }

  }
);


/* ==========================================
   GREY AI ONLINE
========================================== */

console.log(
  "GREY AI + CLOCK + MUSIC PLAYER ONLINE ✓"
);

// =========================================
// GREY COMMAND CENTER - LIVE SYSTEM
// =========================================

function updateGreyCommandCenter() {

  const clock = document.getElementById("grey-clock");
  const date = document.getElementById("grey-date");

  // Stop if the Command Center isn't on the page
  if (!clock || !date) return;

  const now = new Date();

  // Live time
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  clock.textContent = `${hours}:${minutes}:${seconds}`;

  // Live date
  const dateText = now.toLocaleDateString("en-UG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  date.textContent = dateText;
}


// Start the Command Center clock
updateGreyCommandCenter();


// Update every second
setInterval(updateGreyCommandCenter, 1000);

// ===================================
// GREY LIVE SYSTEM ACTIVITY
// ===================================

const greyActivityMessages = [
  "GREY AI system initialized",
  "Portfolio interface active",
  "Command center operational",
  "Digital environment synchronized",
  "Technology stack loaded",
  "User interface running",
  "GREY CORE monitoring active"
];

let greyActivityIndex = 0;

function updateGreyActivity() {

  const log = document.getElementById("grey-activity-log");

  if (!log) return;

  const now = new Date();

  const time = now.toLocaleTimeString("en-UG", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const message =
    greyActivityMessages[greyActivityIndex];

  const activity = document.createElement("div");

  activity.className = "activity-line";

  const dot = document.createElement("span");

  const text = document.createElement("span");

  text.textContent = `${time} — ${message}`;

  activity.append(dot, text);

  log.prepend(activity);

  while (log.children.length > 4) {
    log.lastElementChild.remove();
  }

  greyActivityIndex =
    (greyActivityIndex + 1) % greyActivityMessages.length;
}

// First activity
updateGreyActivity();

// New activity every 8 seconds
setInterval(updateGreyActivity, 8000);

// ======================================================
// GREY AI COMMAND CENTER STATUS
// ======================================================

async function checkGreyAIStatus() {

  const status = document.getElementById("greyAiStatus");
  const text = document.getElementById("greyAiStatusText");

  if (!status || !text) return;

  try {

    const response = await fetch(
      "https://grey-ai-backend.legitmategrey.workers.dev/",
      {
        method: "GET",
        cache: "no-store"
      }
    );

    if (response.ok) {

      status.classList.remove("offline");
      status.classList.add("online");

      text.textContent = "ONLINE";

    } else {

      throw new Error("Backend unavailable");

    }

  } catch (error) {

    status.classList.remove("online");
    status.classList.add("offline");

    text.textContent = "OFFLINE";

  }
}


// Check when the portfolio loads
checkGreyAIStatus();


// Check again every 30 seconds
setInterval(checkGreyAIStatus, 30000);