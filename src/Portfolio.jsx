import React, { useState, useEffect, useMemo, useRef } from 'react';
import './Portfolio.css';

/* ---------------- CONTENT ---------------- */
const EMAIL = 'naveenkumarr722@gmail.com';
const PHONE_RAW = '+919942677752';
const PHONE = '+91 99426 77752';
const LINKEDIN = 'https://www.linkedin.com/in/naveenkumar-r-a763a21a4';
const RESUME = '/Naveenkumar_R_Resume.pdf'; /* put the PDF in the public/ folder with this exact name */
const SITE_URL = 'https://naveenkumarnk2.github.io/';

/* Availability: edit these to match your real working hours (IST, 24-hour clock) */
const WORK = { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], from: 9.5, to: 18.5 };

/* Lighthouse: run it on SITE_URL (see the steps I gave you), then type the real numbers here.
   While any score is null, the whole badge block stays hidden, so nothing unmeasured is ever shown. */
const LIGHTHOUSE = {
  date: '',            /* e.g. 'November 2026' */
  device: 'Mobile',    /* 'Mobile' or 'Desktop': whichever you measured */
  scores: { Performance: null, Accessibility: null, 'Best Practices': null, SEO: null },
};

const NAV = [
  ['top', 'Overview'], ['work', 'Experience'], ['projects', 'Projects'],
  ['skills', 'Skills'], ['background', 'Background'], ['contact', 'Contact'],
];

const METRICS = [
  { end: 100, suffix: '%', label: 'On-time delivery across government-facing projects' },
  { end: 60, suffix: '+', label: 'Live production websites built and maintained' },
  { text: '10K+', label: 'Users protected by hardened applications' },
  { end: 100, suffix: '+', label: 'Security vulnerabilities audited and resolved' },
];

const EXPERIENCE = [
  'Developed, maintained and enhanced <b>60+ live web applications</b> using PHP and Laravel (MVC), including government portals, corporate websites, content management systems and administrative dashboards.',
  'Built responsive, cross-browser interfaces with HTML5, CSS3, JavaScript, Bootstrap and jQuery that work seamlessly on desktop, tablet and mobile devices, including <b>20+ mobile-first websites</b>.',
  'Developed and maintained Embassy of India portals in compliance with <b>DBIM, GIGW 3.0 and WCAG</b> accessibility standards.',
  'Developed and integrated RESTful APIs to connect front-end interfaces, back-end services and third-party applications, including Facebook, Twitter, News and Weather.',
  'Designed, optimized and maintained MySQL databases, improving query performance and data retrieval speed by <b>25%</b>.',
  'Built custom CMS platforms, dynamic modules and administrative dashboards that let non-technical staff manage website content without developer support.',
  'Maintained, upgraded and optimized <b>50+ existing websites</b>, improving performance, stability and reliability while reducing downtime by <b>35%</b>.',
  'Conducted security audits across <b>50+ Laravel-based government websites</b> and fixed vulnerabilities, including Cross-Site Scripting (XSS), SQL injection, insecure file uploads and improper input validation.',
  'Strengthened application security by implementing HTTPS, HSTS, Content Security Policy (CSP), CSRF protection, Role-Based Access Control (RBAC) and secure cache-control headers.',
  'Improved data protection through secure password storage, encryption of sensitive information and fixes for information disclosure vulnerabilities.',
  'Replaced insecure CAPTCHA implementations and upgraded outdated third-party libraries, including the jQuery Validation Plugin.',
  'Delivered government-facing projects with a <b>100% on-time delivery rate</b> through careful development, debugging and project coordination.',
  'Mentored junior developers through code reviews and technical knowledge-sharing sessions.',
];

const PROJECTS = [
  {
    wide: true, kind: 'Government web platform · 60+ live sites',
    title: 'Embassy of India: Multi-Site Platform',
    points: [
      'Managed, maintained and redeveloped 60+ official government websites with zero critical downtime.',
      'Aligned front-end interfaces with DBIM (Design for Bharat / Indian Missions), GIGW 3.0 (Guidelines for Indian Government Websites) and WCAG 2.1/2.2 AA standards.',
      'Built a centralized admin dashboard so embassy staff can manage all site content without technical knowledge.',
      'Audited and resolved 100+ vulnerabilities, including HTTPS, CSP, XSS, SQL injection and CSRF issues.',
      'Implemented role-based access control (RBAC) for multi-team content management.',
      'Reduced website downtime by 35% through proactive monitoring and performance optimization.',
    ],
    tags: ['Laravel', 'Blade', 'MySQL', 'Bootstrap 5', 'HTML5', 'CSS3', 'JavaScript', 'Git'],
    // link: ['https://roiramallah.gov.in/', 'roiramallah.gov.in (Embassy of India, Ramallah)'],
    // note: 'Source code is confidential client work and is not public. I am happy to walk through the architecture in an interview.',
  },
  {
    kind: 'Admin panel · CMS', title: 'Client Data Management Portal',
    points: [
      'Built a CMS portal where clients log in and independently view, insert, update and delete their data.',
      'Automated manual content workflows so clients can update their own data without developer help.',
      'Implemented role-based permissions (Admin, Editor, Viewer) with audit logging.',
      'Created dynamic data tables with search, filters, pagination and CSV export.',
    ],
    tags: ['Laravel', 'MySQL', 'Bootstrap', 'jQuery', 'AJAX'],
  },
  {
    kind: 'Full-stack web application', title: 'Responsive Full-Stack Website',
    points: [
      'Built a mobile-first website with a Laravel back end and a React.js front end.',
      'Optimized page load times through caching and front-end performance tuning.',
      'Delivered a fully responsive layout that works across desktop, tablet and mobile devices.',
    ],
    tags: ['Laravel', 'React.js', 'MySQL', 'REST APIs'],
  },
  {
    kind: 'Back-end automation', title: 'Bulk Email and Notification System',
    points: [
      'Used Laravel Queues to send targeted messages to every user in the database without slowing the application.',
      'Automated triggers and scheduling for recurring notifications.',
      'Added smart contact forms that send automatic email notifications to clients.',
    ],
    tags: ['Laravel', 'Queue', 'SMTP', 'AJAX'],
  },
  {
    kind: 'API integration · Web and mobile', title: 'Third-Party API Integration Platform',
    points: [
      'Integrated 4+ third-party APIs (Facebook, Twitter, News and Weather) into web and mobile platforms.',
      'Added real-time social feeds, news and weather content to the platforms.',
      'Built reusable Laravel service classes for each API, keeping the architecture clean and easy to update.',
    ],
    tags: ['Laravel', 'React Native', 'REST APIs'],
  },
];

const SKILLS = [
  ['Languages', ['PHP', 'JavaScript', 'Java', 'HTML5', 'CSS3']],
  ['Frameworks and libraries', ['Laravel 5.x–11.x', 'React.js', 'React Native', 'jQuery', 'Bootstrap']],
  ['Databases', ['MySQL']],
  ['APIs and tools', ['RESTful APIs', 'AJAX', 'GitHub', 'WordPress', 'Composer', 'NPM']],
  ['Security and standards', ['OWASP Top 10', 'HTTPS/SSL', 'CSP', 'CSRF', 'XSS', 'SQL injection prevention', 'RBAC', 'DBIM', 'GIGW 3.0', 'WCAG']],
  ['Admin and architecture', ['Custom Laravel dashboards', 'CMS portals', 'CRUD systems', 'Dynamic data tables', 'MVC', 'Responsive design']],
];

const EDUCATION = [
  ['2019', 'Master of Computer Applications (MCA)', 'Hindusthan College of Arts and Science, Coimbatore · First Class, 73%'],
  ['2017', 'Bachelor of Computer Applications (BCA)', 'Hindusthan College of Arts and Science, Coimbatore · First Class, 65%'],
  ['2014', 'Higher Secondary Certificate (HSC)', 'Thiruvalluvar Govt. Higher Secondary School, Tirupur · 69%'],
  ['2012', 'Secondary School Leaving Certificate (SSLC)', 'Thiruvalluvar Govt. Higher Secondary School, Tirupur · 86%'],
];

const CERTS = [
  ['Android Development Internship', 'Accent Techno Soft, Coimbatore'],
  ['Internet of Things (IoT)', 'National-level workshop'],
  ['Technological Innovations in the Computer Field', 'National-level workshop'],
  ['Ethical Hacking', 'National-level workshop'],
];

/* Google Translate and React both edit the DOM; this stops React crashing on translated nodes */
if (typeof Node === 'function' && Node.prototype && !Node.prototype.__gtPatched) {
  const rc = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return rc.apply(this, arguments);
  };
  const ib = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (node, ref) {
    if (ref && ref.parentNode !== this) return node;
    return ib.apply(this, arguments);
  };
  Node.prototype.__gtPatched = true;
}

const LANGS = [
  ['en', 'English'], ['hi', 'हिंदी (Hindi)'], ['ta', 'தமிழ் (Tamil)'], ['te', 'తెలుగు (Telugu)'],
  ['ml', 'മലയാളം (Malayalam)'], ['kn', 'ಕನ್ನಡ (Kannada)'], ['ar', 'العربية (Arabic)'],
  ['zh-CN', '中文 (Chinese)'], ['es', 'Español (Spanish)'], ['fr', 'Français (French)'],
  ['de', 'Deutsch (German)'], ['pt', 'Português (Portuguese)'], ['ru', 'Русский (Russian)'],
  ['ja', '日本語 (Japanese)'], ['ko', '한국어 (Korean)'], ['it', 'Italiano (Italian)'],
];

const strip = (s) => s.replace(/<[^>]+>/g, '');

/* Search index built from the content above */
const INDEX = [
  ...EXPERIENCE.map((t) => ({ id: 'work', group: 'Experience', text: strip(t) })),
  ...PROJECTS.map((p) => ({ id: 'projects', group: 'Project', text: `${p.title} ${p.points.join(' ')} ${p.tags.join(' ')}`, title: p.title })),
  ...SKILLS.flatMap(([cat, items]) => items.map((i) => ({ id: 'skills', group: 'Skill', text: `${i} ${cat}`, title: i }))),
  ...EDUCATION.map(([y, d, s]) => ({ id: 'background', group: 'Education', text: `${y} ${d} ${s}`, title: d })),
  ...CERTS.map(([t, s]) => ({ id: 'background', group: 'Certification', text: `${t} ${s}`, title: t })),
];

/* ---------------- ACCESSIBILITY SETTINGS ---------------- */
const DEFAULTS = { theme: null, size: 0, contrast: false, invert: false, sat: 0, links: false, images: false, cursor: false };
const SAT_LABELS = ['Saturation', 'Low saturation', 'High saturation', 'Grayscale'];
const SAT_VALUES = [1, 0.5, 2, 0];

const loadSettings = () => {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('a11y-settings')) }; }
  catch { return DEFAULTS; }
};

const Icon = ({ d, children }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {d ? <path d={d} /> : children}
  </svg>
);

const ICONS = {
  search: <Icon><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></Icon>,
  sun: <Icon><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Icon>,
  moon: <Icon d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  access: <Icon><circle cx="12" cy="4.5" r="1.8" /><path d="M5 8.5c4.7 1.3 9.3 1.3 14 0M12 8.5v5M9 21l3-7.5 3 7.5" /></Icon>,
  close: <Icon d="M18 6 6 18M6 6l12 12" />,
  mail: <Icon><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Icon>,
  phone: <Icon d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  contrast: <Icon><rect x="3" y="6" width="18" height="12" rx="3" /><circle cx="12" cy="12" r="2.5" /></Icon>,
  invert: <Icon><circle cx="12" cy="12" r="9" /><path d="M12 3v18" /><path d="M12 7h3M12 12h5M12 17h3" /></Icon>,
  sat: <Icon><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></Icon>,
  link: <Icon d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />,
  image: <Icon><rect x="3" y="3" width="18" height="18" rx="2" /><path d="m3 3 18 18M3 16l5-5 4 4" /></Icon>,
  cursor: <Icon d="m4 3 7 17 2.5-7.5L21 10z" />,
  translate: <Icon><path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" /></Icon>,
  linkedin: <Icon><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></Icon>,
  reset: <Icon d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />,
};

/* ---------------- SMALL COMPONENTS ---------------- */
const Counter = ({ end, suffix = '' }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(end); return; }
    let raf; const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / 900, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end]);
  return <span className="metric-num">{n}{suffix}</span>;
};

/* Live India time. Updates every 30 s and is not an aria-live region, so screen readers are not interrupted. */
const istParts = (d) => {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false,
    }).formatToParts(d).map((x) => [x.type, x.value])
  );
  return { day: p.weekday, hour: Number(p.hour) % 24, minute: Number(p.minute) };
};

const AvailabilityStrip = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const { day, hour, minute } = istParts(now);
  const time = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true,
  }).format(now).toUpperCase();
  const decimal = hour + minute / 60;
  const inHours = WORK.days.includes(day) && decimal >= WORK.from && decimal < WORK.to;
  const fmt = (h) => `${Math.floor(h) % 12 || 12}:${String(Math.round((h % 1) * 60)).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  return (
    <div className="availability" translate="no">
      <p className="avail-line">
        {/* <span className={`dot ${inHours ? '' : 'dot-off'}`} aria-hidden="true" />
        <strong>{inHours ? 'Available now' : 'Currently offline'}</strong> */}
        <span className="avail-sep" aria-hidden="true">·</span>
        <span>Open to work</span>
      </p>
      <p className="avail-time">
        Coimbatore, India · <time dateTime={now.toISOString()}>{time} IST</time> (UTC+5:30)
      </p>
      {/* <p className="avail-hours">
        Working hours {WORK.days[0]}–{WORK.days[WORK.days.length - 1]}, {fmt(WORK.from)} to {fmt(WORK.to)} IST
      </p> */}
    </div>
  );
};

const scoreBand = (n) => (n >= 90 ? 'good' : n >= 50 ? 'ok' : 'poor');

const LighthouseBadges = () => {
  const entries = Object.entries(LIGHTHOUSE.scores);
  if (!entries.every(([, v]) => typeof v === 'number')) return null;
  const circ = 2 * Math.PI * 28;
  return (
    <div className="lh" role="group" aria-labelledby="lh-heading">
      <h2 id="lh-heading" className="lh-title">Lighthouse audit of this page</h2>
      <ul className="lh-grid">
        {entries.map(([label, v]) => (
          <li key={label} className={`lh-item lh-${scoreBand(v)}`}>
            <svg className="lh-ring" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <circle cx="32" cy="32" r="28" className="lh-track" />
              <circle cx="32" cy="32" r="28" className="lh-arc"
                strokeDasharray={`${(v / 100) * circ} ${circ}`} transform="rotate(-90 32 32)" />
            </svg>
            <span className="lh-num">{v}</span>
            <span className="lh-label">{label}<span className="sr-only"> score {v} out of 100</span></span>
          </li>
        ))}
      </ul>
      <p className="lh-note">
        Measured with Google Lighthouse ({LIGHTHOUSE.device}{LIGHTHOUSE.date ? `, ${LIGHTHOUSE.date}` : ''}).
        Automated checks cover only part of WCAG.{' '}
        <a href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_URL)}`} target="_blank" rel="noopener noreferrer">
          Run the audit yourself<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
};

const CopyButton = ({ text, label }) => {
  const [done, setDone] = useState(false);
  const copy = () => navigator.clipboard.writeText(text).then(() => {
    setDone(true); setTimeout(() => setDone(false), 2000);
  });
  return (
    <button type="button" className="copy-btn" onClick={copy} aria-label={`${label}: ${text}`}>
      {done ? 'Copied' : 'Copy'}
    </button>
  );
};

const Search = ({ onPick }) => {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false); /* small screens only */
  const inputRef = useRef(null);
  const term = q.trim().toLowerCase();
  const results = useMemo(
    () => (term.length < 2 ? [] : INDEX.filter((r) => r.text.toLowerCase().includes(term)).slice(0, 8)),
    [term]
  );
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  const pick = (id) => { setQ(''); setOpen(false); onPick(id); };
  const onKey = (e) => { if (e.key === 'Escape') { setQ(''); setOpen(false); } };
  return (
    <>
      <button type="button" className="icon-btn search-toggle" aria-label="Search" aria-expanded={open}
        aria-controls="search-box" onClick={() => setOpen((o) => !o)}>{ICONS.search}</button>
      <div id="search-box" className={`search ${open ? 'open' : ''}`} role="search">
        <label htmlFor="site-search" className="sr-only">Search this portfolio</label>
        <input id="site-search" ref={inputRef} type="search" placeholder="Search…" value={q} autoComplete="off"
          onChange={(e) => setQ(e.target.value)} onKeyDown={onKey}
          aria-controls="search-results" aria-expanded={term.length >= 2} />
        <span className="search-icon">{ICONS.search}</span>
        <div id="search-results" className="search-results" aria-live="polite" hidden={term.length < 2}>
          {term.length >= 2 && results.length === 0 && <p className="search-empty">No results for “{q}”. Try a skill, project or technology.</p>}
          {results.length > 0 && (
            <ul>
              {results.map((r, i) => (
                <li key={i}>
                  <a href={`#${r.id}`} onClick={() => pick(r.id)}>
                    <span className="res-group">{r.group}</span>
                    <span className="res-text">{r.title || r.text.slice(0, 90) + '…'}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

const LanguageMenu = () => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(() => {
    const m = document.cookie.match(/googtrans=\/en\/([\w-]+)/);
    return m ? m[1] : 'en';
  });
  const ref = useRef(null);

  /* load Google Website Translator once */
  useEffect(() => {
    if (document.getElementById('google-translate-script')) return;
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: LANGS.map((l) => l[0]).join(','), autoDisplay: false },
        'google_translate_element'
      );
    };
    const sc = document.createElement('script');
    sc.id = 'google-translate-script';
    sc.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    sc.async = true;
    document.body.appendChild(sc);
  }, []);

  useEffect(() => {
    const away = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', away);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', away); document.removeEventListener('keydown', esc); };
  }, []);

  const choose = (code) => {
    setLang(code);
    setOpen(false);
    const combo = document.querySelector('select.goog-te-combo');
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event('change'));
    } else {
      /* widget not ready: set the cookie and reload */
      document.cookie = code === 'en'
        ? 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
        : `googtrans=/en/${code}; path=/`;
      window.location.reload();
    }
  };

  const current = LANGS.find((l) => l[0] === lang)?.[1] || 'English';
  return (
    <div className="lang" ref={ref} translate="no">
      <button type="button" className="icon-btn" aria-haspopup="true" aria-expanded={open}
        aria-controls="lang-list" aria-label={`Language: ${current}. Change language`}
        onClick={() => setOpen((o) => !o)}>
        {ICONS.translate}
      </button>
      {open && (
        <ul id="lang-list" className="lang-list">
          {LANGS.map(([code, name]) => (
            <li key={code}>
              <button type="button" lang={code} aria-current={lang === code ? 'true' : undefined} onClick={() => choose(code)}>
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
      <div id="google_translate_element" />
    </div>
  );
};

const A11yPanel = ({ s, set, reset, onClose }) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.querySelector('button')?.focus();
    const esc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [onClose]);

  const tools = [
    ['Dark contrast', ICONS.contrast, s.contrast, () => set({ contrast: !s.contrast })],
    ['Invert', ICONS.invert, s.invert, () => set({ invert: !s.invert })],
    [SAT_LABELS[s.sat], ICONS.sat, s.sat > 0, () => set({ sat: (s.sat + 1) % 4 })],
    ['Text size increase', <b className="aa">A+</b>, false, () => set({ size: Math.min(s.size + 1, 4) })],
    ['Text size decrease', <b className="aa">A−</b>, false, () => set({ size: Math.max(s.size - 1, -2) })],
    ['Highlight links', ICONS.link, s.links, () => set({ links: !s.links })],
    ['Hide images', ICONS.image, s.images, () => set({ images: !s.images })],
    ['Large cursor', ICONS.cursor, s.cursor, () => set({ cursor: !s.cursor })],
  ];

  return (
    <div className="a11y-panel" role="dialog" aria-modal="false" aria-labelledby="a11y-title" ref={ref}>
      <div className="a11y-head">
        <h2 id="a11y-title">{ICONS.access} Accessibility Controls</h2>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Close accessibility controls">{ICONS.close}</button>
      </div>
      <div className="a11y-grid">
        {tools.map(([label, icon, on, fn]) => (
          <button key={label} type="button" className="a11y-tool" aria-pressed={on || undefined} onClick={fn}>
            {icon}<span>{label}</span>
          </button>
        ))}
      </div>
      <p className="a11y-size" aria-live="polite">Text size: {100 + s.size * 10}%</p>
      <div className="a11y-foot">
        <span />
        <button type="button" className="link-btn" onClick={reset}>{ICONS.reset} Reset all</button>
      </div>
    </div>
  );
};

/* ---------------- PAGE ---------------- */
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [active, setActive] = useState('top');
  const [s, setS] = useState(loadSettings);
  const a11yBtn = useRef(null);

  const set = (patch) => setS((p) => ({ ...p, ...patch }));
  const reset = () => setS({ ...DEFAULTS, theme: s.theme });
  const theme = s.theme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  /* apply settings to <html> */
  useEffect(() => {
    const r = document.documentElement;
    r.dataset.theme = theme;
    r.style.setProperty('--fs', `${100 + s.size * 10}%`);
    r.style.setProperty('--f-invert', s.invert ? 1 : 0);
    r.style.setProperty('--f-sat', SAT_VALUES[s.sat]);
    r.classList.toggle('a11y-contrast', s.contrast);
    r.classList.toggle('a11y-links', s.links);
    r.classList.toggle('a11y-hide-img', s.images);
    r.classList.toggle('a11y-cursor', s.cursor);
    try { localStorage.setItem('a11y-settings', JSON.stringify(s)); } catch { /* storage unavailable */ }
  }, [s, theme]);

  /* active section */
  useEffect(() => {
    const onScroll = () => {
      let cur = NAV[0][0];
      NAV.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closePanel = () => { setPanelOpen(false); a11yBtn.current?.focus(); };
  const goTo = (id) => { setMenuOpen(false); document.getElementById(id)?.focus({ preventScroll: true }); };

  const navLinks = (cls) => NAV.map(([id, label]) => (
    <a key={id} href={`#${id}`} className={cls && active === id ? 'active' : ''}
      aria-current={active === id ? 'true' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>
  ));

  return (
    <>
      <div className="utility-bar">
        <a href="#main-content">Skip to main content</a>
      </div>

      <header className="topbar" role="banner">
        <a href="#top" className="brand" translate="no">R. Naveenkumar</a>
        <div className="tools">
          <Search onPick={goTo} />
          <span className="divider" aria-hidden="true" />
          <LanguageMenu />
          <span className="divider" aria-hidden="true" />
          <button type="button" className="icon-btn" onClick={() => set({ theme: theme === 'dark' ? 'light' : 'dark' })}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>
            {theme === 'dark' ? ICONS.sun : ICONS.moon}
          </button>
          <button type="button" ref={a11yBtn} className="icon-btn" onClick={() => setPanelOpen((o) => !o)}
            aria-label="Accessibility controls" aria-expanded={panelOpen} aria-controls="a11y-panel-wrap">
            {ICONS.access}
          </button>
          <button type="button" className="menu-btn" aria-expanded={menuOpen} aria-controls="mobileMenu"
            onClick={() => setMenuOpen((o) => !o)}>{menuOpen ? 'Close' : 'Menu'}</button>
        </div>
        <div id="a11y-panel-wrap">
          {panelOpen && <A11yPanel s={s} set={set} reset={reset} onClose={closePanel} />}
        </div>
      </header>

      <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobileMenu" aria-label="Mobile navigation">
        {navLinks(true)}
      </nav>

      <div className="shell">
        <aside className="sidebar" aria-label="Profile and navigation">
          <div>
            <p className="status-pill"><span className="dot" aria-hidden="true" />Open to work</p>
            <p className="id-name" translate="no">R.&nbsp;Naveenkumar</p>
            <p className="id-role">Software Developer</p>
            <p className="id-loc">Coimbatore, Tamil Nadu, India</p>
            <nav className="side-nav" aria-label="Primary navigation">{navLinks(true)}</nav>
          </div>
          <div className="sidebar-bottom">
            <a href={`mailto:${EMAIL}`}>{ICONS.mail}<span>{EMAIL}</span></a>
            <a href={`tel:${PHONE_RAW}`}>{ICONS.phone}<span>{PHONE}</span></a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              {ICONS.linkedin}<span>LinkedIn profile</span><span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </aside>

        <main className="main" id="main-content" tabIndex={-1}>
          <section id="top" tabIndex={-1} aria-labelledby="hero-heading">
            <h1 id="hero-heading" className="hero-lede">
              Software Developer keeping 60+ production websites secure, fast and online.
            </h1>
            <p className="hero-sub">
              Five years of building and hardening web applications, from multi-site government platforms to client CMS portals, with 100% on-time delivery and zero critical downtime.
            </p>
            <AvailabilityStrip />
            <div className="metric-grid">
              {METRICS.map((m) => (
                <div className="metric-tile" key={m.label}>
                  {m.text ? <span className="metric-num">{m.text}</span> : <Counter end={m.end} suffix={m.suffix} />}
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>
            <LighthouseBadges />
            <div className="cta-row">
              <a className="btn-solid" href={`mailto:${EMAIL}`}>Get in touch</a>
              <a className="btn-outline" href={RESUME} download>Download resume (PDF)</a>
              <a className="btn-outline" href="#projects">View projects</a>
            </div>
          </section>

          <section id="work" tabIndex={-1} aria-labelledby="exp-heading">
            <h2 id="exp-heading" className="section-title">Experience</h2>
            <div className="exp-panel">
              <div className="exp-head">
                <h3 className="exp-role">Software Developer</h3>
                <span className="exp-period">2021 – Present</span>
              </div>
              <p className="exp-org">Ardhas Technology, Coimbatore</p>
              <ul className="achieve-list">
                {EXPERIENCE.map((t, i) => <li key={i} dangerouslySetInnerHTML={{ __html: t }} />)}
              </ul>
            </div>
          </section>

          <section id="projects" tabIndex={-1} aria-labelledby="proj-heading">
            <h2 id="proj-heading" className="section-title">Key projects</h2>
            <div className="project-grid">
              {PROJECTS.map((p) => (
                <article key={p.title} className={`project-card ${p.wide ? 'wide' : ''}`}>
                  <p className="project-kicker">{p.kind}</p>
                  <h3 className="project-title">{p.title}</h3>
                  <ul className="project-desc">{p.points.map((t) => <li key={t}>{t}</li>)}</ul>
                  <ul className="tag-row" aria-label="Technologies used">
                    {p.tags.map((t) => <li className="tag" key={t}>{t}</li>)}
                  </ul>
                  {/* {p.link && (
                    <p className="project-link">
                      Live example:{' '}
                      <a href={p.link[0]} target="_blank" rel="noopener noreferrer">
                        {p.link[1]}<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </p>
                  )}
                  {p.note && <p className="project-note">{p.note}</p>} */}
                </article>
              ))}
            </div>
          </section>

          <section id="skills" tabIndex={-1} aria-labelledby="skills-heading">
            <h2 id="skills-heading" className="section-title">Technical skills</h2>
            <div className="skill-grid">
              {SKILLS.map(([cat, items]) => (
                <div className="skill-cell" key={cat}>
                  <h3 className="skill-cat">{cat}</h3>
                  <ul className="tag-row">{items.map((t) => <li className="tag" key={t}>{t}</li>)}</ul>
                </div>
              ))}
            </div>
            <p className="soft-skills"><b>Soft skills:</b> problem-solving, analytical thinking, team collaboration, communication, time management, adaptability and mentoring.</p>
          </section>

          <section id="background" tabIndex={-1} aria-labelledby="bg-heading">
            <h2 id="bg-heading" className="section-title">Background and education</h2>
            <div className="bg-columns">
              <div>
                <ol className="timeline">
                  {EDUCATION.map(([y, d, sch]) => (
                    <li className="tl-item" key={y}>
                      <span className="tl-year">{y}</span>
                      <div className="tl-body"><b>{d}</b><span>{sch}</span></div>
                    </li>
                  ))}
                </ol>
                <ul className="lang-row" aria-label="Languages known">
                  <li><b>Tamil</b><span>Native</span></li>
                  <li><b>English</b><span>Professional working proficiency</span></li>
                </ul>
              </div>
              <div>
                <h3 className="skill-cat">Internship</h3>
                <p className="intern">
                  <b>Android Application Developer</b>
                  Accent Techno Soft, Coimbatore · December 2018 – March 2019. Built an Android application during hands-on training, gaining practical experience with the Android SDK, Java and mobile UI/UX design.
                </p>
                <h3 className="skill-cat">Certifications and workshops</h3>
                <ul className="cert-list">
                  {CERTS.map(([t, d]) => <li key={t}><b>{t}</b>{d}</li>)}
                </ul>
              </div>
            </div>
          </section>

          <section id="contact" tabIndex={-1} aria-labelledby="contact-heading">
            <div className="contact-panel">
              <div>
                <h2 id="contact-heading" className="contact-lede">
                  Need a developer who keeps government-scale websites secure and online?
                </h2>
                <p className="contact-note">I am open to new opportunities. Reach out by email or phone.</p>
              </div>
              <div className="contact-list">
                <div className="contact-row">
                  <div><span className="clabel">Email</span><div className="cval">{EMAIL}</div></div>
                  <CopyButton text={EMAIL} label="Copy email address" />
                </div>
                <div className="contact-row">
                  <div><span className="clabel">Phone</span><div className="cval">{PHONE}</div></div>
                  <CopyButton text={PHONE_RAW} label="Copy phone number" />
                </div>
                <div className="contact-row">
                  <div><span className="clabel">LinkedIn</span><div className="cval">naveenkumar-r-a763a21a4</div></div>
                  <a className="copy-btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                    Open<span className="sr-only"> LinkedIn profile (opens in a new tab)</span>
                  </a>
                </div>
                <div className="contact-row">
                  <div><span className="clabel">Location</span><div className="cval">Coimbatore, Tamil Nadu, India</div></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer role="contentinfo">
        <span>R. Naveenkumar · Software Developer</span>
        <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
      </footer>
    </>
  );
}
