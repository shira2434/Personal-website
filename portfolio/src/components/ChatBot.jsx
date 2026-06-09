import React, { useState, useRef, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { projectsData } from '../data/projects';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// ── RAG Knowledge Base ──
const knowledgeBase = [
  {
    topic: 'about',
    content: `שירה מרנשטיין היא מפתחת Full Stack המתמחה ב-Angular, React ו-C#. היא סטודנטית להנדסת תוכנה בסמינר בנות אלישבע עם ממוצע ציונים 98, ומבצעת פרקטיקום ברשות המסים. Shira Merenstein is a Full Stack developer specializing in Angular, React and C#. She is a Software Engineering student with a 98 average grade, currently doing a practicum at the Israel Tax Authority.`,
  },
  {
    topic: 'skills',
    content: `הכישורים של שירה: JavaScript, CSS, SCSS, HTML, C++, C#, Java, React, Python, Node.js, Angular, MongoDB, SQL Server, .NET Core, Entity Framework, WebAPI, OOP, Git, Linux, PyCharm, VS Code, Visual Studio, ChatGPT, Gemini, Claude, Prompt Engineering, GitHub Copilot, Amazon Q, OpenAI GPT-4o, LangChain, Pinecone.`,
  },
  {
    topic: 'education',
    content: `שירה לומדת בסמינר בנות אלישבע (2024–2026), הנדסת תוכנה תואר פרקטי תחת מה"ט. ממוצע ציונים: 98. משתתפת בתוכנית Kama-Tech (UltraCode).`,
  },
  {
    topic: 'experience',
    content: `שירה מבצעת פרקטיקום פיתוח תוכנה ברשות המסים (2026–עכשיו). עובדת עם Angular, SQL Server, Git ו-Material Design, כולל pair programming וcode reviews.`,
  },
  {
    topic: 'certifications',
    content: `לשירה 4 תעודות: UX Design, AI Course, Advanced Data Security & Privacy, Kama-Tech (UltraCode) Program.`,
  },
  {
    topic: 'contact',
    content: `ליצור קשר עם שירה: מייל shirameren2434@gmail.com, לינקדאין linkedin.com/in/shira-merenstein-b284aa403, גיטהאב github.com/shira2434.`,
  },
  {
    topic: 'projects',
    content: `שירה בנתה 9 פרויקטים: B-FRESH (React, Node.js) - פלטפורמת קייטרינג, Events (React, Node.js) - פלטפורמת אירועים 360 מעלות, Bookstore (Angular, C#, .NET) - חנות ספרים Full Stack, Gym System (C#, SQL Server, OOP) - מערכת ניהול חדר כושר, Hotel Booking (React, TypeScript) - מערכת הזמנת חדרים, Library Management (.NET, SQL Server) - מערכת ניהול ספרייה, Trips Project (React, API) - תכנון טיולים, Hasaot (React, Node.js), React Project (React, TypeScript).`,
  },
  {
    topic: 'hire',
    content: `שירה פתוחה לשיתופי פעולה ופרויקטים. ניתן ליצור קשר במייל shirameren2434@gmail.com או דרך עמוד Contact באתר.`,
  },
];

// ── RAG: find relevant context ──
function retrieveContext(userMessage) {
  const lower = userMessage.toLowerCase();
  const keywords = {
    about: ['who', 'about', 'shira', 'מי', 'אודות', 'ספרי', 'שירה', 'על עצמך'],
    skills: ['skill', 'tech', 'stack', 'language', 'כישור', 'טכנולוגי', 'שפות', 'במה'],
    education: ['education', 'study', 'school', 'degree', 'grade', 'seminar', 'לימודים', 'ציון', 'ממוצע', 'סמינר'],
    experience: ['experience', 'job', 'tax', 'practicum', 'intern', 'ניסיון', 'עבודה', 'מס הכנסה', 'פרקטיקום'],
    certifications: ['certif', 'course', 'ux', 'security', 'תעודה', 'קורס', 'הסמכה'],
    contact: ['contact', 'email', 'reach', 'hire', 'linkedin', 'קשר', 'מייל', 'linkedin'],
    projects: ['project', 'built', 'made', 'develop', 'פרויקט', 'בנתה', 'עבודות'],
    hire: ['hire', 'available', 'freelance', 'work together', 'זמינה', 'פנויה', 'שיתוף פעולה'],
  };

  const matched = [];
  for (const [topic, kws] of Object.entries(keywords)) {
    if (kws.some((kw) => lower.includes(kw))) {
      const entry = knowledgeBase.find((k) => k.topic === topic);
      if (entry) matched.push(entry.content);
    }
  }
  return matched.length > 0 ? matched.join('\n') : knowledgeBase.map((k) => k.content).join('\n');
}

// ── Function Calling: filter projects by technology ──
function filterProjectsByTech({ tech }) {
  const techLower = tech.toLowerCase();
  const filtered = projectsData.filter((p) =>
    p.tags.some((t) => t.toLowerCase().includes(techLower)) ||
    p.fullDescription.toLowerCase().includes(techLower)
  );
  if (filtered.length === 0) return { found: false, tech, projects: [] };
  return {
    found: true,
    tech,
    projects: filtered.map((p) => ({ title: p.title, tags: p.tags, repo: p.repo, icon: p.icon })),
  };
}

const tools = [
  {
    type: 'function',
    function: {
      name: 'filterProjectsByTech',
      description: 'Filter and return projects by a specific technology or programming language',
      parameters: {
        type: 'object',
        properties: {
          tech: { type: 'string', description: 'The technology to filter by, e.g. React, Angular, C#' },
        },
        required: ['tech'],
      },
    },
  },
];

// ── Structured Output schema ──
const responseFormat = {
  type: 'json_schema',
  json_schema: {
    name: 'chatbot_response',
    strict: true,
    schema: {
      type: 'object',
      properties: {
        answer: { type: 'string', description: 'The response to show the user' },
        topic: { type: 'string', description: 'The topic of the question, e.g. skills, projects, education' },
        is_on_topic: { type: 'boolean', description: 'Whether the question is related to Shira or her portfolio' },
      },
      required: ['answer', 'topic', 'is_on_topic'],
      additionalProperties: false,
    },
  },
};

// ── Call OpenAI ──
async function callOpenAI(messages, useStructured = true) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      ...(useStructured ? { response_format: responseFormat } : { tools, tool_choice: 'auto' }),
      max_tokens: 500,
    }),
  });
  return res.json();
}

// ── System Prompt ──
function buildSystemPrompt(context) {
  return `You are Shira Merenstein's personal portfolio assistant. You ONLY answer questions about Shira — her skills, projects, experience, education, certifications, and how to contact her.

If a question is NOT related to Shira or her portfolio, politely refuse and say you can only answer questions about Shira.

Use the following knowledge base to answer accurately:
${context}

Rules:
- Answer in the same language the user writes in (Hebrew or English)
- Be friendly and professional
- Keep answers concise
- Never answer off-topic questions (weather, math, news, etc.)`;
}

// ── Message Component ──
function Message({ msg }) {
  const isBot = msg.from === 'bot';
  return (
    <div className={`flex gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}>
      {isBot && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-xs font-bold text-white shadow-lg shadow-sky-500/20">
          S
        </div>
      )}
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
        isBot
          ? 'rounded-tl-sm bg-slate-800/80 text-slate-200 border border-slate-700/50'
          : 'rounded-tr-sm bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/20'
      }`}>
        {msg.text.split('**').map((part, i) =>
          i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part
        )}
      </div>
    </div>
  );
}

// ── Email Form ──
function EmailForm({ onSend, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!name || !email || !message) return;
    setSending(true);
    try {
      await emailjs.send(
        'service_lc4hkpw',
        'template_a9gdb1m',
        { name, email, message, title: 'Portfolio Chatbot' },
        'Msl7gvtuWwferlS3G'
      );
      onSend(true);
    } catch {
      onSend(false);
    }
    setSending(false);
  };

  return (
    <div className="mx-3 mb-3 rounded-2xl border border-slate-700 bg-slate-800/80 p-4 space-y-3">
      <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Send Shira a message</p>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
        className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" type="email"
        className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message..." rows={3}
        className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500/50 resize-none" />
      <div className="flex gap-2">
        <button onClick={handleSend} disabled={sending || !name || !email || !message}
          className="flex-1 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 py-2 text-xs font-semibold text-white disabled:opacity-40 transition hover:scale-[1.02]">
          {sending ? 'Sending...' : 'Send ✦'}
        </button>
        <button onClick={onCancel}
          className="rounded-xl border border-slate-700 px-4 py-2 text-xs text-slate-400 transition hover:text-white">
          Cancel
        </button>
      </div>
    </div>
  );
}

const SUGGESTIONS = ['מי זו שירה?', 'What are her skills?', 'React projects', 'Send a message'];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "שלום! 👋 אני העוזרת של שירה.\nHi! I'm Shira's assistant.\n\nAsk me anything — גם בעברית וגם באנגלית! 😊" }
  ]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing, showEmailForm]);
  useEffect(() => { if (open) setUnread(0); }, [open]);

  const addBotMessage = useCallback((text) => setMessages((prev) => [...prev, { from: 'bot', text }]), []);

  const send = useCallback(async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput('');

    if (['send a message', 'contact', 'email', 'מייל', 'שלח הודעה', 'ליצור קשר'].some(kw => userMsg.toLowerCase().includes(kw))) {
      setMessages((prev) => [...prev, { from: 'user', text: userMsg }]);
      setShowEmailForm(true);
      return;
    }

    setMessages((prev) => [...prev, { from: 'user', text: userMsg }]);
    setTyping(true);

    try {
      const context = retrieveContext(userMsg);
      const systemPrompt = buildSystemPrompt(context);
      const newHistory = [...history, { role: 'user', content: userMsg }];

      // Step 1: check for function calls (no structured output)
      const data = await callOpenAI([
        { role: 'system', content: systemPrompt },
        ...newHistory,
      ], false);

      const choice = data.choices?.[0];
      let finalText;

      if (choice?.message?.tool_calls) {
        // Function calling path
        const toolCall = choice.message.tool_calls[0];
        const args = JSON.parse(toolCall.function.arguments);
        const result = filterProjectsByTech(args);

        const toolMessages = [
          ...newHistory,
          choice.message,
          { role: 'tool', tool_call_id: toolCall.id, content: JSON.stringify(result) },
        ];

        // Step 2: get structured output after function result
        const data2 = await callOpenAI([
          { role: 'system', content: systemPrompt },
          ...toolMessages,
        ], true);

        const parsed = JSON.parse(data2.choices?.[0]?.message?.content || '{}');
        finalText = parsed.answer || 'לא הצלחתי למצוא תשובה.';
        setHistory([...toolMessages, { role: 'assistant', content: finalText }]);
      } else {
        // Structured output path
        const data2 = await callOpenAI([
          { role: 'system', content: systemPrompt },
          ...newHistory,
        ], true);

        const parsed = JSON.parse(data2.choices?.[0]?.message?.content || '{}');
        finalText = parsed.answer || 'לא הצלחתי למצוא תשובה.';
        setHistory([...newHistory, { role: 'assistant', content: finalText }]);
        if (!open) setUnread((n) => n + 1);
      }

      setTyping(false);
      addBotMessage(finalText);
    } catch {
      setTyping(false);
      addBotMessage('❌ שגיאה בחיבור. נסי שוב.');
    }
  }, [history, open, input, addBotMessage]);

  const handleEmailSent = useCallback((success) => {
    setShowEmailForm(false);
    addBotMessage(
      success
        ? '✅ ההודעה נשלחה לשירה! היא תחזור אליך בהקדם 😊\nMessage sent to Shira! She\'ll get back to you soon.'
        : '❌ משהו השתבש. נסה שוב או שלח ישירות ל-shirameren2434@gmail.com'
    );
  }, [addBotMessage]);

  const handleKey = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }, [send]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex w-80 sm:w-96 flex-col overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/95 shadow-2xl shadow-slate-950/80 backdrop-blur-2xl animate-slide-up"
          style={{ height: '540px' }}>

          {/* Header */}
          <div className="relative flex items-center gap-3 border-b border-slate-800/60 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 px-5 py-4">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.05),transparent)]" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 shadow-lg shadow-sky-500/30">
              <span className="text-sm font-black text-white">S</span>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-green-400" />
            </div>
            <div className="relative">
              <p className="text-sm font-semibold text-white">Shira's Assistant</p>
              <p className="text-xs text-green-400">Online · עברית & English</p>
            </div>
            <button onClick={() => setOpen(false)}
              className="relative ml-auto rounded-full p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-white">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            {typing && (
              <div className="flex gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-xs font-bold text-white">S</div>
                <div className="rounded-2xl rounded-tl-sm border border-slate-700/50 bg-slate-800/80 px-4 py-3">
                  <div className="flex gap-1.5 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Email form */}
          {showEmailForm && <EmailForm onSend={handleEmailSent} onCancel={() => setShowEmailForm(false)} />}

          {/* Suggestions */}
          {messages.length <= 2 && !showEmailForm && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}
                  className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-300 transition hover:border-sky-500/40 hover:text-white">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          {!showEmailForm && (
            <div className="border-t border-slate-800/60 px-4 py-3">
              <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/60 px-4 py-2 focus-within:border-sky-500/50 focus-within:ring-1 focus-within:ring-sky-500/20 transition">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="שאלי כל דבר / Ask anything..."
                  dir="auto"
                  className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none"
                />
                <button onClick={() => send()}
                  disabled={!input.trim()}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white transition disabled:opacity-30 hover:scale-110 disabled:hover:scale-100">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Toggle button */}
      <button onClick={() => setOpen((o) => !o)}
        className="btn-magnetic relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 shadow-xl shadow-sky-500/30 transition hover:shadow-sky-500/50">
        {!open && <span className="absolute inset-0 rounded-full bg-sky-400 opacity-20 animate-ping" />}
        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white shadow-lg">
            {unread}
          </span>
        )}
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6 text-white">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
