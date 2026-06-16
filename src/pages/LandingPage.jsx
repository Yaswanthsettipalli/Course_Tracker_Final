import { useEffect } from "react";
import "../styles/LandingPage.css";

/* ─── Navbar ─────────────────────────────────────── */
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Course<span>Track</span></div>
      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#stats">Stats</a></li>
        <li><a href="#preview">Preview</a></li>
        <li><a href="#testimonials">Reviews</a></li>
      </ul>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <a href="/login" style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--muted)" }}>Log in</a>
        <a href="/register"><button className="sign-btn">Get Started Free</button></a>
      </div>
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-content reveal">
        <div className="hero-badge">🎓 Built for final-year students</div>
        <h1>
          Track Every Course.<br />
          <span className="highlight">Master Your Progress.</span>
        </h1>
        <p>
          CourseTrack helps students enroll in courses, complete lessons at their
          own pace, and visualize their growth — all in one clean dashboard.
        </p>
        <div className="hero-buttons">
          <a href="/register"><button className="primary-btn">Start Learning Free →</button></a>
          <button className="secondary-btn">Watch Demo</button>
        </div>
        <div className="reviews">
          <div className="avatars">
            <img src="https://i.pravatar.cc/150?img=11" alt="Student" />
            <img src="https://i.pravatar.cc/150?img=22" alt="Student" />
            <img src="https://i.pravatar.cc/150?img=33" alt="Student" />
            <img src="https://i.pravatar.cc/150?img=44" alt="Student" />
          </div>
          <p>Trusted by <strong>2,400+ students</strong><br />across 18 colleges</p>
        </div>
      </div>

      <div className="hero-image reveal">
        <div className="circle" />
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80"
          alt="Students learning"
        />
        <div className="floating-card card-1">
          <p>Lessons completed today</p>
          <strong>🔥 12 / 15</strong>
        </div>
        <div className="floating-card card-2">
          <p>React for Beginners</p>
          <strong>78% complete</strong>
          <button>Continue →</button>
        </div>
      </div>
    </section>
  );
}

/* ─── Features ───────────────────────────────────── */
const FEATURES = [
  {
    icon: "📚",
    title: "Course Catalog",
    desc: "Browse a rich library of courses across web dev, data science, design, and more. Filter by category or skill level.",
  },
  {
    icon: "⚡",
    title: "One-Click Enroll",
    desc: "Enroll in any course instantly. Your seat is saved and your progress starts from where you left off — always.",
  },
  {
    icon: "📊",
    title: "Progress Dashboard",
    desc: "See exactly how far you've come with per-course progress bars, completion rates, and streak tracking.",
  },
  {
    icon: "🎯",
    title: "Lesson Checkpoints",
    desc: "Mark individual lessons complete as you go. Never lose your place, even across devices.",
  },
  {
    icon: "🏆",
    title: "Completion Certificates",
    desc: "Earn a shareable certificate the moment you finish a course — perfect for LinkedIn and your resume.",
  },
  {
    icon: "🔐",
    title: "Secure & Private",
    desc: "JWT-based authentication keeps your account and learning history safe. Your data stays yours.",
  },
];

function Features() {
  return (
    <section className="features" id="features">
      <div className="section-label">What you get</div>
      <h2 className="section-title">Everything you need to learn faster</h2>
      <p className="section-subtitle">
        A focused set of tools designed specifically for self-paced learners who
        want results, not distractions.
      </p>
      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <div className="feature-card reveal" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Stats ──────────────────────────────────────── */
const STATS = [
  { value: "2,400+", label: "Active Students" },
  { value: "180+",   label: "Courses Available" },
  { value: "94%",    label: "Completion Rate" },
  { value: "4.8 ★",  label: "Average Rating" },
];

function Stats() {
  return (
    <section className="stats" id="stats">
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <div className="stat-item reveal" key={i}>
            <h2>{s.value}</h2>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Dashboard Preview ──────────────────────────── */
function DashboardPreview() {
  return (
    <section className="dashboard-preview" id="preview">
      <div className="dashboard-preview-inner">
        <div className="dashboard-preview-content reveal">
          <div className="section-label">The Dashboard</div>
          <h2 className="section-title">Your learning hub, at a glance</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: 0 }}>
            The student dashboard gives you a birds-eye view of all your enrolled
            courses, progress percentages, and upcoming lessons — so you always
            know what to do next.
          </p>
          <ul className="dashboard-checklist">
            <li>See progress bars for every enrolled course</li>
            <li>Jump back into your last lesson in one click</li>
            <li>Track how many lessons you've completed this week</li>
            <li>Download your certificate the moment you finish</li>
          </ul>
          <div style={{ marginTop: "36px" }}>
            <a href="/register">
              <button className="primary-btn">Try the Dashboard →</button>
            </a>
          </div>
        </div>

        <div className="dashboard-preview-image reveal">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80"
            alt="Dashboard preview"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "I used CourseTrack to finish three full-stack courses before my placement interviews. The progress tracker kept me accountable every single day.",
    name: "Arjun Mehta",
    role: "Final Year, NIT Warangal",
    avatar: "https://i.pravatar.cc/150?img=51",
  },
  {
    quote: "The dashboard is so clean. I could see exactly which lessons I had left and it made me feel like I was actually making progress instead of just watching videos.",
    name: "Sneha Reddy",
    role: "B.Tech CSE, CBIT Hyderabad",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    quote: "The certificate feature is brilliant. I finished the React course and added it to my LinkedIn the same day. Got two interview calls within a week.",
    name: "Rahul Sharma",
    role: "Final Year, BITS Pilani",
    avatar: "https://i.pravatar.cc/150?img=68",
  },
];

function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="section-label">Student Stories</div>
      <h2 className="section-title">Real results from real learners</h2>
      <p className="section-subtitle">
        Students across India use CourseTrack to stay consistent, finish what they
        start, and land their first tech job.
      </p>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <div className="testimonial-card reveal" key={i}>
            <div className="stars">★★★★★</div>
            <blockquote>"{t.quote}"</blockquote>
            <div className="testimonial-author">
              <img src={t.avatar} alt={t.name} />
              <div>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────── */
function CTA() {
  return (
    <section className="cta">
      <div className="cta-inner reveal">
        <div className="section-label" style={{ textAlign: "center" }}>Ready to start?</div>
        <h2>Stop watching. Start finishing.</h2>
        <p>
          Join thousands of students who use CourseTrack to stay consistent,
          build real skills, and finally complete the courses they start.
        </p>
        <div className="cta-buttons">
          <a href="/register"><button className="primary-btn">Create Free Account →</button></a>
          <a href="/courses"><button className="sign-btn">Browse Courses</button></a>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer-logo">Course<span>Track</span></div>
        <p style={{ marginTop: "6px" }}>© 2025 CourseTrack. Built with ❤️ for students.</p>
      </div>
      <ul className="footer-links">
        <li><a href="/courses">Courses</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────── */
function LandingPage() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <DashboardPreview />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default LandingPage;