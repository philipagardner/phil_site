import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'src', 'data');

const portfolioProfile = {
  name: 'Phil Gardner',
  role: 'UX-focused product engineer and front-end builder',
  summary:
    'He blends UX thinking and front-end engineering to build accessible digital products and AI-assisted experiences that reduce friction in real work.',
  focusAreas: [
    'UX engineering',
    'accessible front-end systems',
    'agentic AI interfaces',
    'design systems',
    'workflow simplification'
  ],
  contact: {
    email: 'Philipgardner7@gmail.com',
    note: 'Best for project inquiries, consulting, and product design and engineering work.'
  }
};

async function loadJson(fileName) {
  try {
    const filePath = path.join(DATA_DIR, fileName);
    const contents = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(contents);
  } catch (error) {
    return [];
  }
}

const portfolioKnowledge = {
  profile: portfolioProfile,
  services: await loadJson('pricing.json'),
  caseStudies: await loadJson('case-studies.json'),
  testimonials: await loadJson('testimonials.json')
};

const toolDefinitions = [
  {
    name: 'get_about_summary',
    description: 'Return Phil Gardner’s background, role, and focus areas.',
    parameters: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'get_services',
    description: 'Return the services and offerings shown on the portfolio site.',
    parameters: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'get_case_studies',
    description: 'Return selected work or case study summaries.',
    parameters: {
      type: 'object',
      properties: {
        limit: { type: 'number' }
      },
      required: []
    }
  },
  {
    name: 'get_testimonials',
    description: 'Return quotes or testimonials from collaborators.',
    parameters: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'get_contact_info',
    description: 'Return the best contact details for reaching Phil.',
    parameters: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'offer_button_game',
    description:
      'Offer the visitor the original button game. Call this when the visitor mentions games, play, fun, boredom, or asks for something interactive. The visitor is shown Yes and No choices to accept or decline the offer.',
    parameters: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'create_button_game_variant',
    description:
      'Invent a brand new variation of the button game and offer it to the visitor. Call this when the visitor asks for another game, something different, a new game, or anything else to play. Make it different from the original (20 clicks, red round button, trophy). Pick creative values.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Short fun name for this variation, e.g. "The Blue Moon Button".' },
        clicks: { type: 'number', description: 'Clicks needed to win, a whole number from 3 to 100. Not 20.' },
        buttonColor: { type: 'string', description: 'Button color as a hex code like #1e88e5.' },
        buttonShape: { type: 'string', enum: ['circle', 'square', 'rounded'], description: 'Shape of the button.' },
        buttonLabel: { type: 'string', description: 'Optional 1-12 character text shown on the button, e.g. "PUSH".' },
        trophy: { type: 'string', description: 'A single emoji used as the trophy, e.g. "👑" or "🦄".' },
        winMessage: { type: 'string', description: 'Short congratulation message shown on winning.' }
      },
      required: ['title', 'clicks', 'buttonColor', 'buttonShape', 'trophy', 'winMessage']
    }
  }
];

const tools = {
  get_about_summary: () => ({
    name: portfolioKnowledge.profile.name,
    role: portfolioKnowledge.profile.role,
    summary: portfolioKnowledge.profile.summary,
    focusAreas: portfolioKnowledge.profile.focusAreas
  }),
  get_services: () => ({
    services: portfolioKnowledge.services
  }),
  get_case_studies: ({ limit = 3 } = {}) => ({
    caseStudies: portfolioKnowledge.caseStudies.slice(0, limit)
  }),
  get_testimonials: () => ({
    testimonials: portfolioKnowledge.testimonials
  }),
  get_contact_info: () => ({
    email: portfolioKnowledge.profile.contact.email,
    note: portfolioKnowledge.profile.contact.note
  }),
  offer_button_game: () => ({
    buttonsShown: true,
    gameDescription:
      'The button game has ONE big red button. The player clicks it repeatedly until they reach 20 clicks, and then they win a trophy. There are no Yes or No buttons inside the game.',
    note: 'Yes and No choices to accept or decline the offer are displayed automatically. In one short, playful sentence, ask if they want to play the button game. Do not describe or list the choices, and do not say the game involves Yes or No buttons.'
  }),
  create_button_game_variant: (args) => {
    const game = buildGameVariant(args);

    return {
      _game: game,
      variant: game,
      note: 'This new variation works like the original button game but with these settings. Yes and No choices are displayed automatically. In one or two playful sentences, introduce it by name, mention the number of clicks, the button look and the trophy, and ask if they want to play. Do not mention Yes or No buttons.'
    };
  }
};

const uiActionsByTool = {
  offer_button_game: 'button_game_offer'
};

const NAMED_COLORS = {
  red: '#e53935',
  blue: '#1e88e5',
  green: '#43a047',
  purple: '#8e24aa',
  orange: '#fb8c00',
  yellow: '#fdd835',
  pink: '#ec407a',
  teal: '#00897b',
  cyan: '#00acc1',
  indigo: '#3949ab',
  black: '#424242',
  gold: '#f9a825'
};
const FALLBACK_COLORS = ['#1e88e5', '#43a047', '#8e24aa', '#fb8c00', '#ec407a', '#00897b', '#3949ab'];
const FALLBACK_TROPHIES = ['👑', '🥇', '🚀', '🦄', '🎉', '🌟', '🍕'];
const BUTTON_SHAPES = ['circle', 'square', 'rounded'];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function cleanText(value, maxLength, fallback) {
  const text = typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, maxLength) : '';
  return text || fallback;
}

function buildGameVariant(args = {}) {
  const rawColor = typeof args.buttonColor === 'string' ? args.buttonColor.trim().toLowerCase() : '';
  const color = /^#[0-9a-f]{6}$/.test(rawColor)
    ? rawColor
    : NAMED_COLORS[rawColor] || pickRandom(FALLBACK_COLORS);

  const rawClicks = Math.round(Number(args.clicks));
  const baseGoal = Number.isFinite(rawClicks) ? Math.min(100, Math.max(3, rawClicks)) : 5 + Math.floor(Math.random() * 40);
  const goal = baseGoal === 20 ? 25 : baseGoal;

  const trophyText = typeof args.trophy === 'string' ? args.trophy.trim() : '';
  const trophy =
    trophyText && trophyText.length <= 8 && /\p{Extended_Pictographic}/u.test(trophyText)
      ? trophyText
      : pickRandom(FALLBACK_TROPHIES);

  return {
    title: cleanText(args.title, 40, 'A Brand New Button Game'),
    goal,
    color,
    shape: BUTTON_SHAPES.includes(args.buttonShape) ? args.buttonShape : pickRandom(BUTTON_SHAPES),
    label: cleanText(args.buttonLabel, 12, ''),
    trophy,
    winMessage: cleanText(args.winMessage, 80, 'You won!')
  };
}

const systemPrompt = `
You are Tracy, the bombastic yet charming AI assistant for Phil Gardner’s portfolio site. You are having a real conversation with a visitor, such as a recruiter, hiring manager, or potential client.

Your responsibilities:
- Open conversations playfully, first by introducing yourself as Tracy, Phil's personal assistant, then asking the visitor if they have heard of Phil Gardner and would like to know more about him. Acknowledge that Phil is pretty great afterall.
- When starting a conversation with a new user for the first time, ask them what they want to be called, then suggest calling them a very normal, human name like Henry Man Guy or something because it's getting hard for you, the ai, to keep track of everybody's names.
- Answer questions about Phil’s background, work, and services.
- Talk naturally, like a knowledgeable colleague. Respond directly to what the visitor actually asked, including casual chat, follow-ups, and opinions like "what roles suit him?", using the facts from your tools.
- Use earlier messages in the conversation for context, and don't re-introduce Phil every time.
- End with a short, relevant follow-up question or suggestion when it helps the conversation continue.
- Be grounded in the actual portfolio content, and make reasonable inferences from it without presenting guesses as facts.
- Prefer clear, direct responses and short paragraphs.
- Never invent projects, results, or contact details that are not in the portfolio data.
- If the requested information is not available, say so plainly and suggest a related topic.
- If the user is asking what to do next or how to contact Phil, point them toward the contact details.
- Do not repeat the same idea twice in one answer.
- Keep each answer to 2-4 sentences unless the user asks for a list.
- Use tools when the visitor asks for facts about Phil's background, services, projects, testimonials or contact details. Don't call tools for greetings, thanks, or small talk. Never state facts about Phil that didn't come from a tool result. If a question isn't about Phil, say you only have information about Phil.
- If a question is unrelated to Phil or this portfolio, politely say you can only help with Phil's work and background.
- If the visitor mentions games, playing, fun, being bored, or wants something interactive, call offer_button_game and ask if they want to play the button game. If the visitor asks for another game, something different, or anything else to play, call create_button_game_variant and invent a new variation with different numbers of clicks, a different button color and shape, and a different emoji trophy, as often as they ask. Make each one creative. The button game is a tiny game with one big red button that you click 20 times to win a trophy. It has no Yes or No buttons; those only appear to accept or decline the offer. Never claim to have a game without calling that tool. Never bring up or suggest the game on your own; only mention it after the visitor asks about games, play, fun, or says they are bored.

Priority rules (these override the introduction and naming rules above):
1. If the visitor asks about Phil's work, projects, "what he has built", skills, technologies, services, testimonials or contact details, you MUST call a tool before answering: get_case_studies for projects/work/what he built, get_services for skills/technologies/services, get_testimonials for feedback, get_contact_info for contact, get_about_summary for background. Answer from the tool result. Keep any Taz introduction to a few words, and skip the name question.
2. If the tool result does not mention something the visitor asked about (for example a specific technology), say plainly it isn't listed in Phil's portfolio. Never infer or imply that Phil has that skill.
3. If the question is unrelated to Phil, reply in one sentence that you can only help with Phil's work and background, then suggest something you can answer. Skip the name question.
4. Do the full Taz introduction and the name question only when the visitor's message is a greeting or small talk.

When you don't know or can't answer:
- Say so plainly in one sentence. Don't guess and don't substitute a different answer.
- Then help the visitor move forward: ask one short clarifying question if the request is vague (for example, which project or skill they mean), or suggest 2-3 things you can answer, such as Phil's background, services, selected projects, testimonials, or how to contact him.
- If the visitor needs something you can't provide, point them to Phil's contact details.

Voice and style:
- Professional, friendly, and helpful
- Use plain language, not marketing jargon
- Keep answers naturally conversational but accurate
- Prefer a single clear answer over stacked summary phrases
- For lists, prefer 3-5 bullets max
`;

const LLM_BASE_URL = (process.env.LLM_BASE_URL || 'http://localhost:11434').replace(/\/$/, '');
const LLM_MODEL = process.env.LLM_MODEL || 'llama3.2';
const LLM_API_KEY = process.env.LLM_API_KEY || '';
const MAX_TOOL_ROUNDS = 4;

const llmTools = toolDefinitions.map((definition) => ({ type: 'function', function: definition }));

function sanitizeMessages(messages) {
  return messages
    .filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
}

async function callLlm(messages, toolList = llmTools) {
  const response = await fetch(`${LLM_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(LLM_API_KEY ? { Authorization: `Bearer ${LLM_API_KEY}` } : {})
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      messages,
      tools: toolList,
      stream: false,
      options: {
        temperature: 0.3
      }
    }),
    signal: AbortSignal.timeout(50000)
  });

  if (!response.ok) {
    throw new Error(`LLM request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.message;
}

function looksLikeToolCall(text) {
  const trimmed = (text || '').trim();
  return trimmed.startsWith('{') && /"name"\s*:/.test(trimmed) && /"(parameters|arguments)"/.test(trimmed);
}

const VARIANT_TOOL = 'create_button_game_variant';
const variantOnlyTools = llmTools.filter((tool) => tool.function.name === VARIANT_TOOL);

function wantsNewGame(history) {
  const lastUser = [...history].reverse().find((message) => message.role === 'user');
  const text = lastUser?.content || '';
  const newWords = 'another|other|different|new|more|else|variation|variant';
  const gameWords = 'game|games|play|button';

  if (
    new RegExp(`(${newWords})\\b.*\\b(${gameWords})`, 'i').test(text) ||
    new RegExp(`\\b(${gameWords})\\b.*\\b(${newWords})`, 'i').test(text)
  ) {
    return true;
  }

  const recentlyTalkedGame = history.slice(-5, -1).some((message) => /game|button/i.test(message.content));
  return recentlyTalkedGame && /anything else|something (else|different|new)|what else do you have|do you have anything/i.test(text);
}

async function runAgent(history) {
  const messages = [{ role: 'system', content: systemPrompt }, ...history];
  const toolsUsed = [];
  let ui = null;
  let game = null;
  let malformedRetries = 0;
  const newGameRequested = wantsNewGame(history);

  for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
    const variantPending = newGameRequested && !toolsUsed.includes(VARIANT_TOOL);
    let message = await callLlm(messages, variantPending ? variantOnlyTools : llmTools);

    if (!message) {
      throw new Error('Empty LLM response');
    }

    if (variantPending && !message.tool_calls?.length) {
      message = {
        role: 'assistant',
        content: '',
        tool_calls: [{ function: { name: VARIANT_TOOL, arguments: {} } }]
      };
    }

    if (!message.tool_calls?.length) {
      const content = (message.content || '').trim();

      if (looksLikeToolCall(content)) {
        if (malformedRetries >= 1) {
          throw new Error('Model returned a malformed tool call');
        }

        malformedRetries += 1;
        messages.push({
          role: 'system',
          content:
            'Your last reply was malformed JSON instead of a valid tool call. Either call a tool correctly, or answer the visitor in plain conversational text with no JSON.'
        });
        continue;
      }

      const leakedToolName = toolDefinitions.some((tool) =>
        new RegExp(`\\b${tool.name}\\b`, 'i').test(content)
      );
      const cleaned = toolDefinitions
        .reduce((text, tool) => text.replace(new RegExp(`\\b${tool.name}\\b`, 'gi'), ''), content)
        .replace(/[ \t]+\n/g, '\n')
        .trim();

      if (leakedToolName && !ui && /offer_button_game/i.test(content)) {
        ui = 'button_game_offer';
      }

      return { reply: cleaned, toolsUsed, ui, game };
    }

    messages.push(message);

    for (const call of message.tool_calls) {
      let args = call.function.arguments ?? {};
      if (typeof args === 'string') {
        try {
          args = JSON.parse(args || '{}');
        } catch (error) {
          args = {};
        }
      }

      const result = runTool(call.function.name, args);
      toolsUsed.push(call.function.name);

      let modelPayload = result.payload;
      if (modelPayload && modelPayload._game) {
        const { _game, ...rest } = modelPayload;
        game = _game;
        ui = 'button_game_offer';
        modelPayload = rest;
      } else if (modelPayload && uiActionsByTool[call.function.name]) {
        ui = uiActionsByTool[call.function.name];
      }

      messages.push({
        role: 'tool',
        tool_call_id: call.id,
        content: JSON.stringify(modelPayload ?? { error: 'Unknown tool' })
      });
    }
  }

  throw new Error('Tool loop limit reached');
}

function runTool(toolName, args = {}) {
  const tool = tools[toolName];

  if (!tool) {
    return { tool: toolName, payload: null };
  }

  return {
    tool: toolName,
    payload: tool(args)
  };
}

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'phil-portfolio-agent',
    tools: toolDefinitions.map((tool) => tool.name)
  });
});

app.post('/api/chat', async (req, res) => {
  const history = sanitizeMessages(Array.isArray(req.body?.messages) ? req.body.messages : []);

  if (!history.some((message) => message.role === 'user')) {
    return res.status(400).json({ error: 'No user message provided.' });
  }

  try {
    const { reply, toolsUsed, ui, game } = await runAgent(history);

    if (!reply) {
      throw new Error('Empty reply from model');
    }

    const replyOffersGame = /button game/i.test(reply) && /\?/.test(reply);

    if (!ui && replyOffersGame) {
      return res.json({ reply, toolCallSummary: toolsUsed, ui: 'button_game_offer', game });
    }

    return res.json({ reply, toolCallSummary: toolsUsed, ui, game });
  } catch (error) {
    console.error(`Agent error: ${error.message}`);
    return res.status(503).json({ error: 'The assistant is unavailable right now.' });
  }
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Portfolio agent running on http://localhost:${PORT}`);
  });
}

export default app;
