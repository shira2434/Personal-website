import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// ── Knowledge base — English + Hebrew ──
const knowledge = {
  greetings: ['hi', 'hello', 'hey', 'sup', 'yo', 'שלום', 'היי', 'הי', 'מה נשמע', 'מה קורה'],
  about: ['who', 'about', 'yourself', 'tell me', 'shira', 'you', 'מי', 'אודות', 'ספרי', 'שירה', 'על עצמך'],
  skills: ['skill', 'tech', 'technolog', 'know', 'stack', 'language', 'use', 'work with', 'כישור', 'טכנולוגי', 'יודע', 'יודעת', 'stack', 'במה', 'עובד', 'עובדת', 'שפות תכנות'],
  projects: ['project', 'built', 'portfolio', 'made', 'develop', 'פרויקט', 'בנתה', 'עבודות', 'portfolio', 'פרויקטים'],
  experience: ['experience', 'job', 'tax', 'practicum', 'intern', 'ניסיון', 'עבודה', 'מס הכנסה', 'פרקטיקום', 'תפקיד'],
  education: ['education', 'study', 'school', 'degree', 'grade', 'learn', 'seminar', 'לימודים', 'בית ספר', 'תואר', 'ציון', 'ממוצע', 'לומדת'],
  contact: ['contact', 'email', 'reach', 'hire', 'linkedin', 'touch', 'קשר', 'מייל', 'איך', 'ליצור', 'linkedin'],
  certifications: ['certif', 'course', 'ux', 'security', 'תעודה', 'קורס', 'הסמכה'],
  grade: ['grade', 'average', 'score', '98', 'ציון', 'ממוצע', 'ציונים'],
  hire: ['hire', 'available', 'freelance', 'work together', 'זמינה', 'פנויה', 'שיתוף פעולה', 'לשכור'],
};

const responses = {
  greetings: "היי! 👋 אני העוזרת של שירה. שאלי אותי כל דבר על הכישורים, הפרויקטים, הניסיון שלה — או איך ליצור קשר!\n\nHi! I'm Shira's assistant. Ask me anything! 😊",
  about: "שירה מרנשטיין היא מפתחת Full Stack המתמחה ב-Angular, React ו-C#.\n\nShe's a Software Engineering student with a **98 average grade**, currently doing a practicum at the **Israel Tax Authority**. Known for clean code, fast learning and great teamwork! 🚀",
  skills: "הכישורים של שירה:\n\n• **Programming Languages:** JavaScript, CSS, SCSS, HTML, C++, C#, Java, React, Python, Node.js, Angular\n• **Databases:** MongoDB, SQL Server\n• **Technologies:** .NET Core, Entity Framework, WebAPI, OOP\n• **Dev Environments:** PyCharm, VS Code, Visual Studio\n• **Version Control & OS:** Git, Linux\n• **Generative AI & LLMs:** ChatGPT, Gemini, Claude, Prompt Engineering, GitHub Copilot, Amazon Q, OpenAI GPT-4o, LangChain, Pinecone",
  projects: "שירה בנתה 9 פרויקטים! הבולטים:\n\n🥗 **B-FRESH** — Catering platform (React & Node.js)\n🎉 **Events Platform** — 360° event planning marketplace\n📚 **Bookstore** — Angular + C# full stack\n🏋️ **Gym System** — C# OOP with SQL Server\n\nלחצי על כל פרויקט בעמוד הפרויקטים לפרטים מלאים!",
  experience: "שירה מבצעת כרגע פרקטיקום פיתוח תוכנה ב**רשות המסים** (2026–עכשיו).\n\nShe works with Angular, SQL Server, Git and Material Design — including pair programming and code reviews with her team.",
  education: "שירה לומדת ב**סמינר בנות אלישבע** (2024–2026), הנדסת תוכנה תואר פרקטי תחת מה\"ט.\n\nממוצע ציונים: **98** · משתתפת בתוכנית Kama-Tech (UltraCode) 🏆",
  contact: "ליצור קשר עם שירה:\n\n📧 shirameren2434@gmail.com\n💼 linkedin.com/in/shira-merenstein-b284aa403\n💻 github.com/shira2434\n\nאו השתמש/י בעמוד **Contact** באתר! 😊",
  certifications: "לשירה 4 תעודות:\n\n✦ UX Design\n✦ AI Course\n✦ Advanced Data Security & Privacy\n✦ Kama-Tech (UltraCode) Program",
  grade: "שירה מחזיקה ממוצע של **98** בלימודי הנדסת תוכנה בסמינר בנות אלישבע תחת מה\"ט. 🏆 מדהים!",
  hire: "שירה פתוחה לשיתופי פעולה ופרויקטים! 🚀\n\nThe best way to reach her is:\n📧 shirameren2434@gmail.com\n\nOr use the **Contact page** on this site to send a message directly!",
  default: "שאלה מעניינת! לא בטוח שאני יודעת לענות על זה 😅\n\nYou can explore the site or contact Shira directly at **shirameren2434@gmail.com**",
};

// ── Email detection ──
function detectEmail(text) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  return emailRegex.test(text);
}

function getResponse(input) {
  const lower = input.toLowerCase();
  for (const [key, keywords] of Object.entries(knowledge)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return { type: 'text', text: responses[key] };
    }
  }
  return { type: 'text', text: responses.default };
}

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
        {msg.status === 'sending' && <span className="ml-2 text-xs opacity-60">sending...</span>}
        {msg.status === 'sent' && <span className="ml-2 text-xs opacity-60">✓ sent</span>}
        {msg.status === 'error' && <span className="ml-2 text-xs text-rose-400">✗ failed</span>}
      </div>
    </div>
  );
}

// ── Email form inside chat ──
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

const SUGGESTIONS = ['מי זו שירה?', 'What are her skills?', 'Show projects', 'Send a message'];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "שלום! 👋 אני העוזרת של שירה.\nHi! I'm Shira's assistant.\n\nAsk me anything — גם בעברית וגם באנגלית! 😊" }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, showEmailForm]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { from: 'bot', text }]);
  };

  const send = (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput('');

    // Check if user wants to send email
    if (['send a message', 'contact', 'email', 'מייל', 'שלח הודעה', 'ליצור קשר'].some(kw => userMsg.toLowerCase().includes(kw))) {
      setMessages((prev) => [...prev, { from: 'user', text: userMsg }]);
      setShowEmailForm(true);
      return;
    }

    setMessages((prev) => [...prev, { from: 'user', text: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const res = getResponse(userMsg);
      addBotMessage(res.text);
      if (!open) setUnread((n) => n + 1);
    }, 600 + Math.random() * 400);
  };

  const handleEmailSent = (success) => {
    setShowEmailForm(false);
    addBotMessage(
      success
        ? '✅ ההודעה נשלחה לשירה! היא תחזור אליך בהקדם 😊\nMessage sent to Shira! She\'ll get back to you soon.'
        : '❌ משהו השתבש. נסה שוב או שלח ישירות ל-shirameren2434@gmail.com'
    );
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

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
