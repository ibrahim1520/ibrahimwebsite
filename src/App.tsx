// === Project: Profile Website Starter (React + TS)
// Single-file build for canvas preview. No local path imports.
// If you move to a real project, split into files and keep the same exports.

// =============================
// FILE: index.tsx (single-file bundle)
// =============================
'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Layers, BookOpen, Send, Download, MapPin } from 'lucide-react';

// =============================
// TYPES (hoisted for TS usage below)
// =============================
export type PortfolioItem = { label: string; title: string; subtitle: string; image: string };
export type BlogPost = { title: string; excerpt: string; content: string };

// =============================
// DATA
// =============================
import { Github, Linkedin, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
export const profile = {
  name: 'IBRAHIM KHALILULAH',
  role: 'Computer Science Undergraduate Student',
  email: 'ibrahimkhalilullah215@gmail.com',
  location: 'Karachi, Pakistan',
  status: 'Open to opportunities',
  statusEmoji: '🍉',
  cvUrl: '#',
  socials: [
    { label: 'Facebook', href: '#', icon: Facebook },
    { label: 'Twitter', href: '#', icon: Twitter },
    { label: 'Instagram', href: '#', icon: Instagram },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ibrahim-khalilullah-ba0a64296', icon: Linkedin },
    { label: 'GitHub', href: 'https://github.com/', icon: Github },
  ],
  avatar: 'ibrahim.png.png',
};

export const portfolio: PortfolioItem[] = [
  { label: 'Project', title: 'Calculator GUI (Tkinter)', subtitle: 'Python desktop app', image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Website', title: 'WordPress Business Site', subtitle: 'Theme setup, content & SEO', image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Landing Page', title: 'Responsive HTML/CSS', subtitle: 'Pixel-perfect layout', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Graphics', title: 'Cover design (PS/AI)', subtitle: 'Brand visual design', image: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Laravel/PHP', title: 'Business site', subtitle: 'Custom PHP + MySQL', image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Cloud', title: 'Static Website on OCI', subtitle: 'S3/Object Storage + Compute + Domain', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop' },
];
export function PortfolioPanel({ items }: { items: PortfolioItem[] }) {
  // Helpful fallback if the array is empty
  if (!items || items.length === 0) {
    return (
      <SectionCard title="Portfolio">
        <p className="text-slate-400">
          No projects to show yet. Add items to the <code>portfolio</code> array.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Portfolio">
      {/* 1 col on mobile, 2 on laptops, 3 on xl */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {items.map((it) => (
          <motion.div
            key={it.title}
            whileHover={{ y: -4 }}
            className="rounded-3xl overflow-hidden bg-[var(--card)] border border-white/5 shadow"
          >
            <div
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${it.image})` }}
            />
            <div className="p-4">
              <span className="inline-flex text-xs px-2 py-1 rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)] border border-[var(--badge-border)]">
                {it.label}
              </span>
              <h3 className="mt-2 font-medium">{it.title}</h3>
              <p className="text-sm text-slate-400">{it.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionCard>
  );
}


export const blog: BlogPost[] = [
  {
    title: 'Static Website Deployment on Oracle Cloud',
    excerpt: 'Built a 3‑page responsive site, deployed to OCI with custom domain.',
    content: `Built a 3-page static website using HTML, CSS, and JavaScript.
Designed a responsive layout ensuring compatibility across devices.
Deployed the site on Oracle Cloud (Object Storage + Compute).
Configured custom domain integration to make the website live and publicly accessible.`,
  },
];

export const skills = [
  { group: 'Languages/Frameworks', items: ['HTML','CSS','JavaScript','PHP','MySQL','Java','Python','Flutter'] },
  { group: 'Tools', items: ['WordPress','Adobe Photoshop','Adobe Illustrator','Canva','Oracle Cloud Console','GitHub','Microsoft Office'] },
  { group: 'Other', items: ['SEO','Content Writing','Blogging','Excel','Word','PowerPoint'] },
];

export const education = [
  { school: 'SZABIST Karachi Campus', degree: 'BS Computer Science', period: '2021 — 2025' },
  { school: 'SZABIST ZabTech Larkana', degree: 'Diploma in Information Technology (IT)', period: '2020 — 2021' },
];

// =============================
// LIB
// =============================
/** Split blog content into lines (supports CRLF/LF), trims and drops empties */
export function splitLines(content: string): string[] {
  return content.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
}

// Dev-only lightweight tests (strings are properly escaped)
if (typeof window !== 'undefined' && typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
  try {
    console.assert(
      JSON.stringify(splitLines('a\nb')) === JSON.stringify(['a','b']),
      'split on LF'
    );
    console.assert(
      JSON.stringify(splitLines('a\r\nb')) === JSON.stringify(['a','b']),
      'split on CRLF'
    );
    console.assert(
      JSON.stringify(splitLines('a\n\n b ')) === JSON.stringify(['a','b']),
      'drop blanks + trim'
    );
    console.assert(
      JSON.stringify(splitLines('single')) === JSON.stringify(['single']),
      'single line'
    );
    console.assert(
      JSON.stringify(splitLines('a\n')) === JSON.stringify(['a']),
      'ignore trailing'
    );
    console.assert(
      JSON.stringify(splitLines('\na')) === JSON.stringify(['a']),
      'ignore leading'
    );
    console.assert(
      JSON.stringify(splitLines('a\r\n\r\n\tb\t')) === JSON.stringify(['a','b']),
      'multi CRLF + tabs'
    );
    console.assert(
      JSON.stringify(splitLines('a\nb\nc')) === JSON.stringify(['a','b','c']),
      'multi LF'
    );
    console.assert(
      JSON.stringify(splitLines('a\n\n\n\n b')) === JSON.stringify(['a','b']),
      'collapse many empty lines'
    );
  } catch (e) { console.warn('splitLines tests failed:', e); }
}

// =============================
// UI PRIMITIVES
// =============================
export function Info({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-2xl bg-[var(--card)] border border-white/5 p-3 min-w-[200px]">
      <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
      {/* Prevent line-wrap and clip long text with ellipsis so email/CV fit */}
      <div className="mt-1 text-slate-100 truncate">{value}</div>
    </div>
  );
}

export function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl bg-[var(--panel)] border border-white/5 shadow p-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="h-1 w-16 bg-gradient-to-r from-[var(--grad-from)] to-[var(--grad-to)] rounded mt-2" />
      <div className="mt-4 text-slate-300 leading-relaxed">{children}</div>
    </section>
  );
}

export function ThemeStyles() {
  const css = `
  .theme-navy{ --bg:#0b1220; --panel:#0f172a; --card:#0b1220; --button:#111a2e; --button-hover:#172342; --active:#1e3a8a; --active-shadow: rgba(30,58,138,0.35); --active-weak: rgba(30,58,138,0.25); --grad-from:#f59e0b; --grad-to:#1e3a8a; --badge-bg: rgba(245,158,11,0.15); --badge-text:#f6c76e; --badge-border: rgba(245,158,11,0.35); --tri1:#f59e0b; --tri2:#1e3a8a; --tri3:#64748b; --tri4:#22d3ee; }
  .theme-equine{ --bg:#11100E; --panel:#1a1512; --card:#1c1714; --button:#2b231c; --button-hover:#3a2d22; --active:#2E7D6E; --active-shadow: rgba(46,125,110,0.35); --active-weak: rgba(46,125,110,0.25); --grad-from:#C58F5C; --grad-to:#2E7D6E; --badge-bg: rgba(197,143,92,0.15); --badge-text:#E2B083; --badge-border: rgba(197,143,92,0.35); --tri1:#C58F5C; --tri2:#2E7D6E; --tri3:#EAD7BD; --tri4:#87BFAE; }
  .theme-charcoal{ --bg:#0f1115; --panel:#161a22; --card:#121722; --button:#1a2030; --button-hover:#232a3b; --active:#0ea5e9; --active-shadow: rgba(14,165,233,0.35); --active-weak: rgba(14,165,233,0.2); --grad-from:#f59e0b; --grad-to:#0ea5e9; --badge-bg: rgba(14,165,233,0.15); --badge-text:#bae6fd; --badge-border: rgba(14,165,233,0.35); --tri1:#0ea5e9; --tri2:#f59e0b; --tri3:#38bdf8; --tri4:#94a3b8; }
  `;
  return <style>{css}</style>;
}

export type ThemeName = 'navy' | 'equine' | 'charcoal';
export function ThemePicker({ theme, setTheme }: { theme: ThemeName; setTheme: (t: ThemeName) => void }) {
  return (
    <label className="flex items-center gap-2 text-xs text-slate-400">
      Theme
      <select value={theme} onChange={(e) => setTheme(e.target.value as ThemeName)} className="rounded-xl bg-[var(--card)] border border-white/10 px-2 py-1 text-slate-200">
        <option value="navy">Professional Navy</option>
        <option value="equine">Equine Classic</option>
        <option value="charcoal">Charcoal & Teal</option>
      </select>
    </label>
  );
}

export function TrianglesBg() {
  return (
    <svg className="fixed left-0 top-0 h-full pointer-events-none opacity-[0.22] -z-10" viewBox="0 0 220 800" aria-hidden>
      <polygon points="0,0 130,70 0,140" fill="var(--tri1)" />
      <polygon points="30,120 160,190 30,260" fill="var(--tri2)" />
      <polygon points="10,260 140,330 10,400" fill="var(--tri3)" />
      <polygon points="40,380 170,450 40,520" fill="var(--tri4)" />
    </svg>
  );
}

// =============================
// HEADER CARD
// =============================
export function ProfileCardHeader() {
  return (
    <section className="rounded-3xl bg-[var(--panel)] border border-white/5 shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left: Avatar + Name + Role + Socials */}
        <div className="flex items-center gap-4">
          <img src={profile.avatar} alt="Profile" className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white/10" />
          <div>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-slate-400 text-sm mt-1">{profile.role}</p>
            <div className="flex gap-3 mt-3 text-slate-400">
              {profile.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Right: Contact grid */}
        <div className="flex-1 min-w-0 md:pl-6 md:border-l md:border-white/10">
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">Email</p>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 font-medium truncate w-full" title={profile.email}>
                <span className="truncate">{profile.email}</span>
                <Mail className="w-4 h-4 flex-none" />
              </a>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">CV</p>
              <a href={profile.cvUrl} className="inline-flex items-center gap-2 hover:underline text-slate-100 whitespace-nowrap">
                Download <Download className="w-4 h-4" />
              </a>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">Location</p>
              <p className="inline-flex items-center gap-2 font-medium truncate w-full" title={profile.location}>
                {profile.location} <MapPin className="w-4 h-4" />
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">Status</p>
              <p className="text-lg">{profile.statusEmoji ?? '🍉'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================
// PANELS
// =============================
export function AboutPanel() {
  return (
    <SectionCard title="About Me">
      <p>Attempting to replace 'Hello World' with 'ABC' as the new standard.

I'm currently pursuing a degree in Computer Science at Szabist, Karachi. I've completed internships with various departments of the Sindh government, as well as with other software houses. Additionally, I work as a freelancer, taking on fundamental projects.

Technology excites me and I am always in awe of the change it drives in the world. Certain skills that I have worked with include Data Structures and Algorithms (Java), Web Development (html css,php, javascript, MySQL), Graphic design (Adobe Photoshop, Adobe Illustrator, canvas), WordPress Developer, content writer, SEO. And what I might lack in skills I make up for with my determination to learn.

Outside of tech, I am a tea lover, and an avid actor and have spent my days exploring video graphics.</p>
      <ul className="mt-4 grid md:grid-cols-2 gap-3">
        {['Service mesh & microservices','CI/CD with Terraform & Jenkins','Monitoring with Datadog/Prometheus','Secure networking & IAM'].map((t) => (
          <li key={t} className="rounded-2xl bg-[var(--card)] border border-white/5 p-4 flex items-center gap-2">
            {/* Decorative bullet could go here */} {t}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export function ResumePanel() {
  // Example experience — add more objects if needed
  const experience = [
    {
      title: 'Flutter Intern',
      company: 'AKSiQ',
      period: 'Jun 2022 — Jul 2022',
      points: ['Worked on cross-platform app development using Flutter'],
    },
  ];

  // Certifications — extend as you like
  const certifications = [
    'Google — Fundamentals of Digital Marketing (2020)',
    'Google — IT Automation with Python (6-course series, 2021)',
    'Google — Configuration Management and the Cloud (2020)',
    'Google — Introduction to Git and GitHub (2020)',
    'University of Michigan — Programming for Everybody (2020)',
    'Oracle University — OCI 2025 Foundations Associate (1Z0-1085-25) (2025)',
  ];

  // Languages
  const languages = ['English', 'Urdu', 'Sindhi'];

  return (
    <SectionCard title="Resume">
      {/* Two columns layout */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* Experience */}
          {experience.map((job) => (
            <div
              key={`${job.title}-${job.company}`}
              className="rounded-2xl bg-[var(--card)] border border-white/5 p-4"
            >
              <div className="font-medium">
                {job.title} — {job.company}
              </div>
              <div className="text-sm text-slate-400">{job.period}</div>
              <ul className="list-disc ms-5 mt-2 text-sm text-slate-300">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Education */}
          <div className="rounded-2xl bg-[var(--card)] border border-white/5 p-4">
            <div className="flex items-center gap-2 font-medium">Education</div>
            <div className="mt-2 space-y-2">
              {education.map((e) => (
                <div key={e.school}>
                  <div>{e.school}</div>
                  <div className="text-sm text-slate-400">
                    {e.degree} • {e.period}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* Skills */}
          <div className="rounded-2xl bg-[var(--card)] border border-white/5 p-4">
            <div className="flex items-center gap-2 font-medium">Skills</div>
            <div className="mt-2 space-y-2">
              {skills.map((s) => (
                <div key={s.group}>
                  <div className="text-sm text-slate-400">{s.group}</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {s.items.map((i) => (
                      <span
                        key={i}
                        className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="rounded-2xl bg-[var(--card)] border border-white/5 p-4">
            <div className="flex items-center gap-2 font-medium">
              Certifications
            </div>
            <ul className="mt-2 list-disc ms-5 text-sm text-slate-300 space-y-1">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="rounded-2xl bg-[var(--card)] border border-white/5 p-4">
            <div className="flex items-center gap-2 font-medium">Languages</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {languages.map((l) => (
                <span
                  key={l}
                  className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-1"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}


export function BlogPanel({ posts }: { posts: BlogPost[] }) {
  // Instead of switching between posts, just show the first one:
  const post = posts[0];

  return (
    <SectionCard title="Blog">
      <article className="rounded-2xl bg-[var(--card)] border border-white/5 p-5 leading-relaxed">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <ol className="list-decimal ms-5 mt-3 space-y-1 text-slate-300">
          {splitLines(post.content).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </article>
    </SectionCard>
  );
}

export function ContactPanel() {
  return (
    <SectionCard title="Contact">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[var(--card)] border border-white/5 p-5">
          <div className="text-sm text-slate-400">Email</div>
          <a href={`mailto:${profile.email}`} className="text-lg">{profile.email}</a>
        </div>
        <div className="rounded-2xl bg-[var(--card)] border border-white/5 p-5">
          <div className="text-sm text-slate-400">Location</div>
          <div className="text-lg inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {profile.location}</div>
        </div>
      </div>
    </SectionCard>
  );
}

// =============================
// PAGE COMPONENT
// =============================
export default function PortfolioDarkClone() {
  const [active, setActive] = useState<'about'|'resume'|'portfolio'|'blog'|'contact'>('portfolio');
  const [theme, setTheme] = useState<ThemeName>('navy');
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className={`theme-${theme} min-h-screen bg-[var(--bg)] text-slate-100`}>
      <ThemeStyles />
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 flex flex-col md:flex-row gap-6 relative">
        {/* Sidebar */}
        <aside className="md:sticky md:top-6 self-start z-20">
          <div className="rounded-3xl bg-[var(--panel)] border border-white/5 shadow p-3 flex md:flex-col gap-3">
            {[
              { id: 'about', label: 'About', icon: User },
              { id: 'resume', label: 'Resume', icon: Briefcase },
              { id: 'portfolio', label: 'Portfolio', icon: Layers },
              { id: 'blog', label: 'Blog', icon: BookOpen },
              { id: 'contact', label: 'Contact', icon: Send },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id as typeof active)}
                title={item.label}
                aria-label={item.label}
                className={`flex items-center justify-center h-14 w-14 rounded-2xl border border-white/5 transition ${
                  active === (item.id as typeof active)
                    ? 'bg-[var(--active)] text-white shadow-[0_8px_30px_var(--active-shadow)]'
                    : 'bg-[var(--button)] text-slate-300 hover:bg-[var(--button-hover)]'
                }`}
              >
                <item.icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 space-y-6 relative z-10">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <ProfileCardHeader />
          </motion.div>

          {/* Panels */}
          {active === 'about' && <AboutPanel />}
          {active === 'resume' && <ResumePanel />}
          {active === 'portfolio' && <PortfolioPanel items={portfolio} />}
          {active === 'blog' && <BlogPanel posts={blog} />}
          {active === 'contact' && <ContactPanel />}

          {/* Footer */}
          <footer className="pt-2 pb-8 text-center text-xs text-slate-500">© {year} {profile.name}</footer>
        </main>
      </div>

      <TrianglesBg />
    </div>
  );
}

