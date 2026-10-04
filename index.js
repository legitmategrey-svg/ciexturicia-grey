// ======================================================
// GREY AI BACKEND
// Ciexturicia Grey Portfolio
// ======================================================

const ALLOWED_ORIGIN =
  "https://legitmategrey-svg.github.io";


// ======================================================
// GREY'S PUBLIC KNOWLEDGE
// ======================================================

const GREY_KNOWLEDGE = `
You are GREY AI, the AI assistant for the personal portfolio
of Ciexturicia Grey.

Only use the following information when answering questions
about Grey. Do not invent personal information.

IDENTITY
Name: Ciexturicia Grey
Real name: Lutwama Darglous
Nickname: Legitmate Grey
Role: Web Developer and Programmer in Training

EDUCATION
Credential: National Certificate: ICT
School: Merryhill Christian High School

CAREER
Dream: Become a software engineer
Career goal: Become a full-stack developer

SKILLS
HTML
CSS
JavaScript
Web Design
ICT
Programming

INTERESTS
Programming
Web designing
Artificial intelligence
Computers
Robotics
Gaming
Listening to music
Watching movies
Traveling
Exploring new places

PERSONALITY
Quiet
Observant
Creative
Loyal
Hardworking
Passionate

MUSIC
Favorite major artist: Tatiana Manaois

Other artists:
Central Cee
Kendrick Lamar
Anne-Marie
Jax
Alan Walker
Cardi B
Doechii
Jim nola mc

Genres:
Hip-hop
Rap
Pop
R&B
Drill

GAMES
GTA
Blur
Call of Duty
Need for Speed

PORTFOLIO PROJECTS
Personal Portfolio
GREY AI
GREY Audio System

WEBSITE
Portfolio:
https://legitmategrey-svg.github.io/ciexturicia-grey/

GREY AI PERSONALITY

GREY AI should sound friendly, natural, intelligent and confident.

Do not repeatedly use the same greeting.

Do not say:
"I don't have a prepared answer"
unless the information genuinely isn't known.

Understand normal conversational language.

For example:
"Who is this guy?"
"What does he do?"
"What's he studying?"
"What is he into?"
"Tell me about his coding."
"Does he like music?"
should be understood as questions about Ciexturicia Grey.

If the user asks something that is not contained
in Grey's public knowledge, clearly say that you don't
have that information rather than inventing an answer.

Do not reveal private information.

Do not claim to know Grey's exact home address or
precise location.

Keep responses reasonably short unless the user asks
for more detail.
`;


// ======================================================
// CORS
// ======================================================

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
}


// ======================================================
// JSON RESPONSE
// ======================================================

function json(data, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: corsHeaders()
    }
  );
}


// ======================================================
// MAIN WORKER
// ======================================================

export default {

  async fetch(request, env) {

    // --------------------------------------------------
    // Handle browser CORS preflight
    // --------------------------------------------------

    if (request.method === "OPTIONS") {

      return new Response(null, {
        status: 204,
        headers: corsHeaders()
      });

    }


    // --------------------------------------------------
    // Only allow POST requests
    // --------------------------------------------------

    if (request.method !== "POST") {

      return json({
        success: false,
        error: "GREY AI accepts POST requests only."
      }, 405);

    }


    // --------------------------------------------------
    // Read incoming message
    // --------------------------------------------------

    let body;

    try {

      body = await request.json();

    } catch (error) {

      return json({
        success: false,
        error: "Invalid JSON request."
      }, 400);

    }


    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";


    // --------------------------------------------------
    // Validate message
    // --------------------------------------------------

    if (!message) {

      return json({
        success: false,
        error: "Message cannot be empty."
      }, 400);

    }


    // Prevent unnecessarily huge requests
    if (message.length > 2000) {

      return json({
        success: false,
        error: "Message is too long."
      }, 400);

    }


    // --------------------------------------------------
    // Conversation history
    // --------------------------------------------------

    let history = [];

    if (Array.isArray(body.history)) {

      history = body.history
        .filter(item =>
          item &&
          (item.role === "user" || item.role === "assistant") &&
          typeof item.content === "string"
        )
        .slice(-10);

    }


    // --------------------------------------------------
    // Build AI messages
    // --------------------------------------------------

    const messages = [

      {
        role: "system",
        content: GREY_KNOWLEDGE
      },

      ...history,

      {
        role: "user",
        content: message
      }

    ];


    // --------------------------------------------------
    // RUN AI MODEL
    // --------------------------------------------------

    try {

      const result = await env.AI.run(
        "@cf/google/gemma-4-26b-a4b-it",
        {
          messages: messages,

          chat_template_kwargs: {
            enable_thinking: false
          }
        }
      );


      // ------------------------------------------------
      // Extract response
      // ------------------------------------------------

      let answer = "";

      if (result && typeof result.response === "string") {

        answer = result.response;

      } else if (
        result &&
        Array.isArray(result.choices) &&
        result.choices[0] &&
        result.choices[0].message
      ) {

        answer =
          result.choices[0].message.content || "";

      }


      // ------------------------------------------------
      // Safety fallback
      // ------------------------------------------------

      if (!answer.trim()) {

        answer =
          "Sorry, GREY AI couldn't generate a response right now.";

      }


      return json({
        success: true,
        answer: answer.trim()
      });

    } catch (error) {

      console.error("GREY AI ERROR:", error);

      return json({

        success: false,

        error:
          "GREY AI is temporarily unavailable. Please try again."

      }, 500);

    }

  }

};