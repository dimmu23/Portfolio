import { useEffect, useRef, useState } from "react";
import {
  Code2,
  Layers3,
  Cpu,
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  Menu,
  X,
  ExternalLink,
  Phone,
  Braces,
  Download,
} from "lucide-react";
import { profile, projects, skills, services } from "./portfolioData";
import ContactForm from "./components/ContactForm";

const navigation = [
  ["home", "Home"],
  ["features", "Expertise"],
  ["projects", "Projects"],
  ["resume", "Resume"],
  ["contact", "Contact"],
];
const tabs = ["Education", "Skills", "Achievements"];

function ResumeDownload() {
  return (
    <a
      className="button secondary"
      href={`${import.meta.env.BASE_URL}sumit-saraswat-resume.pdf`}
      download="Sumit-Saraswat-Resume.pdf"
    >
      <Download size={17} aria-hidden="true" />
      Download resume
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <Github size={19} />
      </a>
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <Linkedin size={19} />
      </a>
      <a
        href={profile.leetcode}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LeetCode"
      >
        <Code2 size={20} />
      </a>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          className="wordmark"
          href="#home"
          aria-label="Sumit Saraswat, home"
          onClick={() => setOpen(false)}
        >
          sumit<span>.</span>saraswat
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "navigation is-open" : "navigation"}
        >
          {navigation.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            <Mail size={16} /> Let’s talk
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section-shell">
      <div className="hero-copy">
        <p className="eyebrow">Software engineer · Full-stack developer</p>
        <h1>
          Thoughtful code.
          <br />
          <span>Real-world impact.</span>
        </h1>
        <p className="hero-intro">
          Hi, I’m <strong>Sumit Saraswat.</strong> I build full-stack
          applications and AI-powered platforms, with a focus on the systems
          that make them work.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">
            Explore my work
          </a>
          <ResumeDownload />
        </div>
        <div className="hero-social">
          <SocialLinks />
          <span>Find me on the internet</span>
        </div>
      </div>
      <div className="hero-art" aria-label="Code is poetry written in logic">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="code-window">
          <div className="window-top">
            <div className="window-dots">
              <i />
              <i />
              <i />
            </div>
            <span>sumit / developer.js</span>
            <Code2 size={16} />
          </div>
          <div className="code-content">
            <p>
              <span className="code-purple">const</span> developer = {"{"}
            </p>
            <p className="indent">
              name: <span className="code-green">'Sumit Saraswat'</span>,
            </p>
            <p className="indent">focus: [</p>
            <p className="indent-two code-green">'Full-stack',</p>
            <p className="indent-two code-green">'Backend',</p>
            <p className="indent-two code-green">'AI applications'</p>
            <p className="indent">],</p>
            <p>{"}"};</p>
            <p className="code-comment">// Code is poetry written in logic.</p>
          </div>
          <div className="window-bottom">
            <span>JavaScript</span>
            <span>Built with curiosity</span>
          </div>
        </div>
        <div className="floating-label">
          <Braces size={19} /> Ideas into applications
        </div>
      </div>
      <div className="tech-strip">
        <span>My toolkit</span>
        {["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"].map(
          (tech) => (
            <span key={tech}>{tech}</span>
          ),
        )}
      </div>
    </section>
  );
}

function Expertise() {
  const icons = [Layers3, Cpu, Code2];
  return (
    <section id="features" className="section-shell section-spacing">
      <div className="section-heading">
        <div>
          <p className="eyebrow">What I do</p>
          <h2>From interface to infrastructure.</h2>
        </div>
        <p>
          Connecting thoughtful experiences
          <br className="desktop-break" /> with the engineering underneath.
        </p>
      </div>
      <div className="expertise-grid">
        {services.map(({ title, text }, index) => {
          const Icon = icons[index];
          return (
            <article className="expertise-card" key={title}>
              <div className="service-icon">
                <Icon size={25} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Projects() {
  const trackRef = useRef(null);
  const [position, setPosition] = useState({ index: 0, visible: 2, max: 2 });

  useEffect(() => {
    const track = trackRef.current;
    function syncPosition() {
      const cards = track.children;
      if (cards.length < 2) return;
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      const max = Math.max(
        0,
        Math.round((track.scrollWidth - track.clientWidth) / step),
      );
      const index = Math.min(
        max,
        Math.max(0, Math.round(track.scrollLeft / step)),
      );
      const visible = Math.max(1, Math.round(track.clientWidth / step));
      setPosition((current) =>
        current.index === index &&
        current.visible === visible &&
        current.max === max
          ? current
          : { index, visible, max },
      );
    }
    const observer = new ResizeObserver(syncPosition);
    observer.observe(track);
    track.addEventListener("scroll", syncPosition, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", syncPosition);
    };
  }, []);

  function goTo(index) {
    const track = trackRef.current;
    const step = track.children[1].offsetLeft - track.children[0].offsetLeft;
    track.scrollTo({
      left: Math.min(position.max, Math.max(0, index)) * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  function handleSliderKey(event) {
    if (event.target !== event.currentTarget) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    goTo(
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? position.max
          : position.index + (event.key === "ArrowRight" ? 1 : -1),
    );
  }

  return (
    <section id="projects" className="section-shell section-spacing">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2>Built to solve something.</h2>
        </div>
        <a
          className="text-link"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={17} /> More on GitHub
        </a>
      </div>
      <div
        className="project-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected projects"
      >
        <p className="slider-hint" id="project-slider-hint">
          Browse with the controls, swipe, or use the arrow keys when the slider
          is focused.
        </p>
        <div
          className="project-slider"
          id="project-slider"
          ref={trackRef}
          tabIndex={0}
          onKeyDown={handleSliderKey}
          aria-label="Project cards"
          aria-describedby="project-slider-hint"
        >
          {projects.map((project, index) => (
            <article
              className="project-card"
              key={project.name}
              aria-label={`${index + 1} of ${projects.length}: ${project.name}`}
              aria-roledescription="slide"
            >
              <div className={`project-visual ${project.theme}`}>
                <img
                  className="project-logo"
                  src={`${import.meta.env.BASE_URL}${project.logo}`}
                  alt={`${project.name} logo`}
                  width={140}
                  height={140}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="project-content">
                <p className="eyebrow">{project.category}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <ul
                  className="tag-list"
                  aria-label={`${project.name} technologies`}
                >
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="project-result">
                  <strong>{project.metric}</strong>
                  <span>{project.metricLabel}</span>
                </div>
                <a
                  className="project-link"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore {project.name}
                  <ExternalLink size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="slider-controls">
          <p className="slider-status" aria-live="polite" aria-atomic="true">
            Projects {position.index + 1}
            {position.visible > 1
              ? `–${Math.min(projects.length, position.index + position.visible)}`
              : ""}{" "}
            of {projects.length}
          </p>
          <div className="slider-dots" aria-label="Choose project slide">
            {Array.from({ length: position.max + 1 }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show projects starting with ${projects[index].name}`}
                aria-current={position.index === index ? "true" : undefined}
                onClick={() => goTo(index)}
              >
                <span />
              </button>
            ))}
          </div>
          <div className="slider-buttons">
            <button
              type="button"
              aria-controls="project-slider"
              disabled={position.index === 0}
              onClick={() => goTo(position.index - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              aria-controls="project-slider"
              disabled={position.index === position.max}
              onClick={() => goTo(position.index + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Resume() {
  const [active, setActive] = useState("Education");
  const refs = useRef([]);
  function handleKey(event, index) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActive(tabs[next]);
    refs.current[next]?.focus();
  }
  return (
    <section
      id="resume"
      className="section-shell section-spacing resume-section"
    >
      <div className="resume-intro">
        <p className="eyebrow">The foundation</p>
        <h2>
          Always building.
          <br />
          Always learning.
        </h2>
        <p>
          My education, technical toolkit,
          <br />
          and milestones along the way.
        </p>
        <div className="resume-download">
          <ResumeDownload />
        </div>
        <div
          role="tablist"
          aria-label="Resume sections"
          className="resume-tabs"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab}
              ref={(el) => {
                refs.current[index] = el;
              }}
              role="tab"
              id={`tab-${tab}`}
              aria-controls={`panel-${tab}`}
              aria-selected={active === tab}
              tabIndex={active === tab ? 0 : -1}
              onClick={() => setActive(tab)}
              onKeyDown={(event) => handleKey(event, index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div
        className="resume-panel"
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
      >
        {active === "Education" && (
          <div className="education-list">
            <article>
              <div className="education-meta">
                <span>2022 — 2026</span>
                <span className="grade">7.14 / 10 CGPA</span>
              </div>
              <h3>
                The LNM Institute of
                <br className="desktop-break" /> Information Technology
              </h3>
              <p>B.Tech · Electronics & Communication Engineering</p>
              <span className="muted">Jaipur, India</span>
            </article>
            <article>
              <div className="education-meta">
                <span>2020 — 2021</span>
                <span className="grade">98.40%</span>
              </div>
              <h3>S.L. Memorial English School</h3>
              <p>Class 12 · RBSE</p>
              <span className="muted">Nokha, India</span>
            </article>
            <article>
              <div className="education-meta">
                <span>2018 — 2019</span>
                <span className="grade">92.00%</span>
              </div>
              <h3>S.L. Memorial English School</h3>
              <p>Class 10 · RBSE</p>
              <span className="muted">Nokha, India</span>
            </article>
          </div>
        )}
        {active === "Skills" && (
          <div className="skills-panel">
            <Code2 size={30} />
            <h3>A toolkit for bringing ideas to life.</h3>
            <ul className="skill-list">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
        {active === "Achievements" && (
          <div className="achievement-list">
            <article>
              <span className="achievement-number">400+</span>
              <h3>LeetCode problems solved</h3>
              <p>
                Building stronger problem-solving and algorithmic thinking
                through data structures and algorithms.
              </p>
              <a
                className="text-link"
                href={profile.leetcode}
                target="_blank"
                rel="noopener noreferrer"
              >
                View LeetCode profile <ExternalLink size={16} />
              </a>
            </article>
            <article>
              <span className="achievement-number">39,081</span>
              <h3>All India Rank · JEE Main 2022</h3>
              <p>Among over one million candidates nationwide.</p>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}

function Contact() {
  const [message, setMessage] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setMessage("Email copied to clipboard.");
    } catch {
      setMessage(
        "Copy unavailable. Select the email address above, or use Email me.",
      );
    }
  }
  return (
    <section id="contact" className="section-shell section-spacing">
      <div className="contact-card">
        <div>
          <p className="eyebrow">Let’s connect</p>
          <h2>
            Have something
            <br />
            in mind?
          </h2>
          <p>
            For projects, creative collaborations,
            <br />
            or a conversation about what comes next.
          </p>
          <details className="email-options">
            <summary className="button primary">
              <Mail size={18} aria-hidden="true" /> Email me
            </summary>
            <div className="email-options-panel">
              <p>Choose where to write your email.</p>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Gmail <ExternalLink size={15} aria-hidden="true" />
              </a>
              <a href={`mailto:${profile.email}`}>Use my email app</a>
              <span>
                Gmail opens in a new tab. The email app option requires a
                configured mail app.
              </span>
            </div>
          </details>
        </div>
        <div className="contact-details">
          <span className="contact-caption">START A CONVERSATION</span>
          <a className="email-address" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <button className="copy-button" onClick={copyEmail}>
            {message.startsWith("Email copied") ? (
              <Check size={16} />
            ) : (
              <Copy size={16} />
            )}{" "}
            {message.startsWith("Email copied")
              ? "Copied"
              : "Copy email address"}
          </button>
          <p className="copy-status" role="status">
            {message}
          </p>
          <a className="phone-link" href="tel:+916350248296">
            <Phone size={17} />
            {profile.phone}
          </a>
          <SocialLinks />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Expertise />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <footer className="site-footer section-shell">
        <a className="wordmark" href="#home">
          sumit<span>.</span>saraswat
        </a>
        <p>© {new Date().getFullYear()} Sumit Saraswat</p>
        <a className="back-top" href="#home">
          Back to top
        </a>
      </footer>
    </>
  );
}
