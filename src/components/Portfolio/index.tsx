import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Home, User2, Wrench, GraduationCap, FolderKanban, Mail } from "lucide-react";
import { PortfolioTestIds } from "../__testids__/Portfolio.ids";
import {
  theme,
  PERSON,
  SKILLS,
  PROJECTS,
  TIMELINE,
  HERO_TITLES,
} from "../../data/portfolioData";
import SecondaryLogo from '../../Secondary Logo.png';
function classNames(...a: string[]) {
  return a.filter(Boolean).join(" ");
}

const flipStyles = {
  transformStyle: "preserve-3d" as const,
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const,
  MozBackfaceVisibility: "hidden" as const,
};

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  unlocked: boolean;
}

interface AchievementContextType {
  achievements: Achievement[];
  totalPoints: number;
  unlockAchievement: (id: string) => void;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "explorer",
    title: "Portfolio Explorer",
    description: "Viewed all sections of the portfolio",
    points: 100,
    unlocked: false
  },
  {
    id: "skill_master",
    title: "Skill Master",
    description: "Explored all skills in detail",
    points: 50,
    unlocked: false
  },
  {
    id: "project_enthusiast",
    title: "Project Enthusiast",
    description: "Viewed all projects",
    points: 75,
    unlocked: false
  },
  {
    id: "contact_initiator",
    title: "Contact Initiator",
    description: "Initiated contact through the form",
    points: 25,
    unlocked: false
  }
];

const AchievementContext = createContext<AchievementContextType | null>(null);

function useAchievements() {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error("useAchievements must be used within an AchievementProvider");
  }
  return context;
}

function AchievementNotification({ achievement }: Readonly<{ achievement: Achievement }>) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className="fixed bottom-20 right-4 z-50 bg-violet-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-3"
    >
      <div className="h-10 w-10 rounded-full bg-violet-500/20 grid place-items-center">
        <GraduationCap className="h-5 w-5" />
      </div>
      <div>
        <h4 className="font-semibold">{achievement.title}</h4>
        <p className="text-sm text-violet-200">{achievement.description}</p>
        <p className="text-sm font-semibold text-violet-300">+{achievement.points} points</p>
      </div>
    </motion.div>
  );
}

function AchievementProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);
  
  const totalPoints = achievements.reduce((total, achievement) => 
    total + (achievement.unlocked ? achievement.points : 0), 0
  );

  const unlockAchievement = React.useCallback((id: string) => {
    setAchievements(prev => {
      const newAchievements = prev.map(achievement => {
        if (achievement.id === id && !achievement.unlocked) {
          setRecentAchievement(achievement);
          setTimeout(() => setRecentAchievement(null), 3000);
          return { ...achievement, unlocked: true };
        }
        return achievement;
      });
      return newAchievements;
    });
  }, []);

  const contextValue = React.useMemo(() => ({
    achievements,
    totalPoints,
    unlockAchievement
  }), [achievements, totalPoints, unlockAchievement]);

  return (
    <AchievementContext.Provider value={contextValue}>
      {children}
      <AnimatePresence mode="wait">
        <React.Fragment key="achievement-wrapper">
          {recentAchievement && <AchievementNotification achievement={recentAchievement} />}
        </React.Fragment>
      </AnimatePresence>
    </AchievementContext.Provider>
  );  
}

function ProgressBar() {
  const [scrollDirection, setScrollDirection] = useState("none");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const newProgress = scrolled / scrollHeight;
      setProgress(newProgress);

      // Update scroll direction
      if (scrolled > lastScrollY) {
        setScrollDirection("down");
      } else if (scrolled < lastScrollY) {
        setScrollDirection("up");
      }
      setLastScrollY(scrolled);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, [lastScrollY]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-50 overflow-hidden"
      style={{ background: "rgba(124,58,237,0.2)" }}
    >
      <motion.div
        className="h-full w-full bg-violet-500"
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: progress,
          boxShadow: scrollDirection === "down" 
            ? "0 0 10px rgba(124,58,237,0.5), 0 0 5px rgba(124,58,237,0.3)"
            : "none"
        }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 30,
          mass: 0.5
        }}
      />
    </motion.div>
  );
}

const focusable =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

interface FloatingNavProps {
  readonly active: string;
}

function FloatingNav({ active }: FloatingNavProps) {
  const items = [
    { id: "home", icon: Home, label: "Home" },
    { id: "about", icon: User2, label: "About" },
    { id: "skills", icon: Wrench, label: "Skills" },
    { id: "education", icon: GraduationCap, label: "Education" },
    { id: "projects", icon: FolderKanban, label: "Projects" },
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  return (
    <nav 
      aria-label="Section navigation" 
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
    >
      <div className="bg-slate-950/95 backdrop-blur border-t border-slate-800">
        <div className="max-w-lg mx-auto px-4 py-2 flex items-center justify-between">
          {items.map(({ id, icon: Icon, label }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={classNames(
                  "flex flex-col items-center gap-1 p-2 rounded-xl transition-colors",
                  isActive ? "text-violet-400" : "text-slate-400 hover:text-slate-200"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

interface AchievementCardProps {
  readonly achievement: typeof PERSON.achievements[0];
}

function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={classNames(
        "group relative overflow-hidden rounded-2xl p-4",
        "bg-slate-900/60 backdrop-blur-sm",
        "ring-1 ring-slate-800/60 hover:ring-violet-500/50 transition-all"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="grid place-items-center h-12 w-12 rounded-xl bg-violet-500/10">
          <achievement.icon className="h-6 w-6 text-violet-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-slate-200">{achievement.title}</h3>
          <p className="text-sm text-slate-400/90">{achievement.description}</p>
          <div className="mt-3 h-1 w-full rounded-full bg-slate-800/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400 transition-all duration-1000"
              style={{ width: `${achievement.progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_TITLES.length);
    }, 3000); // Increased duration to 3 seconds
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      aria-label="Intro"
      className="relative min-h-[90vh] flex items-center"
      data-testid={PortfolioTestIds.hero.container}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-32 -left-32 h-80 w-80 rounded-full blur-3xl opacity-25"
          style={{ background: theme.primary }}
        />
        <div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl opacity-20"
          style={{ background: theme.primary }}
        />
      </div>

      <div className="w-full max-w-md mx-auto px-4 sm:px-6 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-blue-400">
              HELLO, I'M
            </p>
            <h1 className="mt-2 text-5xl sm:text-6xl font-extrabold text-white">
              {PERSON.name}
            </h1>
          </div>

          <div className="h-12 sm:h-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-2xl sm:text-3xl font-semibold text-purple-400"
                aria-live="polite"
              >
                {HERO_TITLES[index]}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl">
            {PERSON.tagline}
          </p>

          <div className="flex flex-wrap gap-3">
            {PERSON.socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className={classNames(
                  "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm bg-slate-900/60",
                  "ring-1 ring-slate-800 hover:ring-violet-500",
                  focusable
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </a>
            ))}
          </div>

          <div
            className="grid gap-3"
            data-testid={PortfolioTestIds.hero.achievements}
          >
            {PERSON.achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-label="About me" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-slate-100">About</h2>
        <p className="mt-4 max-w-3xl text-slate-300">
        I’m a Full-Stack Developer passionate about building performant, accessible, and user-friendly products that create real impact. My approach combines clean architecture, scalable systems design, and attention to detail in UI/UX, ensuring that every project I work on is not only functional but also delightful to use.
        I enjoy working across the entire product lifecycle — from design systems and frontend development to backend services and database optimization. I take pride in writing clean, maintainable code and follow the best practices to deliver proper solutions.
        </p>
      </div>
    </section>
  );
}

interface SkillCardProps {
  readonly skill: typeof SKILLS[0];
}

function SkillCard({ skill }: Readonly<SkillCardProps>) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { unlockAchievement } = useAchievements();
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInteraction = () => {
    if (!hasInteracted) {
      unlockAchievement("skill_master");
      setHasInteracted(true);
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <button
      onClick={handleInteraction}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleInteraction();
        }
      }}
      className={classNames(
        "group relative w-full text-left rounded-xl p-4",
        theme.card,
        "ring-1 ring-slate-800 hover:ring-violet-500 transition-all",
        "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
      )}
      style={{ perspective: "1000px" }}
      data-testid={PortfolioTestIds.skills.skillCard}
      aria-label={`${skill.label} skill card - click to see experience level`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ ...flipStyles }}
      >
        <motion.div
          className="flex items-center gap-3"
          style={{ ...flipStyles }}
          animate={{
            opacity: isFlipped ? 0 : 1,
            rotateY: isFlipped ? 180 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid place-items-center h-10 w-10 rounded-lg" style={{ backgroundColor: `${skill.color}20` }}>
            <skill.icon className="h-6 w-6 group-hover:scale-110 transition-transform" style={{ color: skill.color }} />
          </div>
          <span className="text-sm font-medium text-slate-200">{skill.label}</span>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col justify-center p-4 text-center"
          style={{ ...flipStyles }}
          animate={{
            opacity: isFlipped ? 1 : 0,
            rotateY: isFlipped ? 0 : -180
          }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-sm font-semibold text-violet-400 mb-2">Experience Level</h4>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-violet-500"
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-300">Click to flip back</p>
        </motion.div>
      </motion.div>
      </motion.div>
    </button>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="py-20"
      data-testid={PortfolioTestIds.skills.container}
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-slate-100">Skills</h2>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.label} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  readonly project: typeof PROJECTS[0];
}

function ProjectCard({ project }: Readonly<ProjectCardProps>) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { unlockAchievement } = useAchievements();
  const [hasInteracted, setHasInteracted] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasInteracted) {
              unlockAchievement("project_enthusiast");
              setHasInteracted(true);
            }
            setIsUnlocked(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [hasInteracted, unlockAchievement]);

  return (
    <article
      ref={cardRef}
      className={classNames(
        "group relative overflow-hidden rounded-2xl p-5",
        theme.card,
        "ring-1 ring-slate-800 transition-all hover:-translate-y-1 hover:shadow-2xl"
      )}
      data-testid={PortfolioTestIds.projects.projectCard}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
        viewport={{ once: true }}
        className="h-full w-full"
      >
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0.3 }}
          animate={isUnlocked ? { filter: "blur(0px)", opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
          </div>
          <p className="mt-2 text-sm text-slate-300">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <motion.div
                key={t}
                initial={{ scale: 0, opacity: 0 }}
                animate={isUnlocked ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: Math.random() * 0.3 }}
                className="inline-block rounded-full bg-slate-800/70 px-2 py-0.5 text-xs text-slate-300 ring-1 ring-slate-700"
              >
                {t}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isUnlocked ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className={classNames(
              "absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium",
              "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all",
              "bg-violet-600/90 hover:bg-violet-500 text-white",
              focusable
            )}
          >
            Visit <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-violet-400">Unlocking...</span>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </article>
  );
 
}

function Projects() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="py-20"
      data-testid={PortfolioTestIds.projects.container}
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-slate-100">Projects and Creations</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section
      id="education"
      aria-label="Experience & Education"
      className="py-20"
      data-testid={PortfolioTestIds.timeline.container}
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-slate-100">
          Experience & Education
        </h2>
        <ol className="relative mt-8 border-l border-slate-700">
          {TIMELINE.map((item) => (
            <motion.li
              key={`${item.type}-${item.title}`}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: TIMELINE.indexOf(item) * 0.1 }}
              className="mb-10 ml-6"
              data-testid={PortfolioTestIds.timeline.timelineItem}
            >
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 ring-4 ring-slate-950">
                {item.type === "education" ? (
                  <GraduationCap className="h-3.5 w-3.5 text-white" />
                ) : (
                  <FolderKanban className="h-3.5 w-3.5 text-white" />
                )}
              </span>
              <h3 className="text-lg font-semibold text-slate-100">
                {item.title}
              </h3>
              <time className="block text-xs text-slate-400">{item.date}</time>
              <p className="mt-2 text-sm text-slate-300">{item.desc}</p>

              <div
                className="mt-4 space-y-2"
                data-testid={PortfolioTestIds.timeline.achievements}
              >
                {item.achievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {item.skillsGained.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-violet-500/10 px-2 py-0.5 text-xs font-medium text-violet-400 ring-1 ring-violet-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  const { unlockAchievement } = useAchievements();
  
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    alert("Thanks! Your message has been submitted.");
    unlockAchievement("contact_initiator");
    form.reset();
    return data;
  }

  return (
    <section id="contact" aria-label="Contact" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-slate-100">Contact</h2>
        <p className="mt-2 text-slate-300">
          Want to collaborate or just say hi? Fill the form or reach me via
          socials.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <form
            onSubmit={onSubmit}
            className={classNames(
              "rounded-2xl p-6",
              theme.card,
              "ring-1 ring-slate-800"
            )}
            aria-describedby="contact-note"
          >
            <p id="contact-note" className="sr-only">
              All fields are required.
            </p>
            <div className="grid gap-4">
              <div>
                <label htmlFor="name" className="block text-sm text-slate-300">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={classNames(
                    "mt-1 w-full rounded-xl border-0 bg-slate-800/60 px-4 py-2 text-slate-100 placeholder-slate-500",
                    "ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-violet-500"
                  )}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-slate-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={classNames(
                    "mt-1 w-full rounded-xl border-0 bg-slate-800/60 px-4 py-2 text-slate-100 placeholder-slate-500",
                    "ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-violet-500"
                  )}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className={classNames(
                    "mt-1 w-full rounded-xl border-0 bg-slate-800/60 px-4 py-2 text-slate-100 placeholder-slate-500",
                    "ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-violet-500"
                  )}
                  placeholder="Tell me about your project..."
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  I usually reply within 1–2 days.
                </div>
                <button
                  type="submit"
                  className={classNames(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold",
                    "bg-violet-600 text-white hover:bg-violet-500",
                    focusable
                  )}
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>

          <div
            className="rounded-2xl p-6 ring-1 ring-slate-800"
            style={{
              background:
                "linear-gradient(180deg, rgba(124,58,237,0.08), rgba(2,6,23,0.6))",
            }}
          >
            <div className="grid gap-3">
              {PERSON.socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-3 rounded-xl p-3 hover:bg-slate-900/60 transition-colors"
                >
                  <Icon className="h-5 w-5 text-slate-200 group-hover:text-violet-400" />
                  <span className="text-slate-200">{label}</span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-slate-500 group-hover:text-violet-400" />
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="/resume.pdf" // You'll need to add your resume file to the public folder
                  download
                  className="group flex items-center gap-3 rounded-xl p-3 bg-violet-600/20 hover:bg-violet-600/30 transition-colors border border-violet-500/20"
                >
                  <motion.div
                    className="h-5 w-5 text-violet-400"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12" y2="12" />
                      <line x1="9" y1="15" x2="15" y2="15" />
                    </svg>
                  </motion.div>
                  <span className="text-violet-400 font-medium">Download CV</span>
                  <motion.div
                    className="ml-auto text-violet-400"
                    initial={{ y: 0 }}
                    whileHover={{ y: -2 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3v13M7 12l5 5 5-5" />
                      <path d="M20 21H4" />
                    </svg>
                  </motion.div>
                </a>
                <div className="text-slate-300">
                  Or email:{" "}
                  <a
                    className="underline decoration-dotted underline-offset-4 hover:text-violet-400"
                    href={`mailto:${PERSON.email}`}
                  >
                    {PERSON.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function WrappedPortfolio() {
  return (
    <AchievementProvider>
      <Portfolio />
    </AchievementProvider>
  );
}

function Portfolio() {
  const [active, setActive] = useState("home");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const ids = ["home", "about", "skills", "education", "projects", "contact"];

  const { unlockAchievement } = useAchievements();
  const viewedSections = useRef(new Set<string>());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            viewedSections.current.add(entry.target.id);
            
            // Check for achievements
            if (viewedSections.current.size === ids.length) {
              unlockAchievement("explorer");
            }
            if (entry.target.id === "skills") {
              unlockAchievement("skill_master");
            }
            if (entry.target.id === "projects") {
              unlockAchievement("project_enthusiast");
            }
          }
        });
      },
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: 0.2 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
      sectionsRef.current[id] = el;
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AchievementProvider>
      <div
        className={classNames(
          theme.bg,
          theme.text,
          "min-h-screen font-sans antialiased scroll-smooth"
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 10%, rgba(124,58,237,0.08) 0, transparent 40%), radial-gradient(circle at 90% 80%, rgba(124,58,237,0.08) 0, transparent 40%), radial-gradient(circle at 50% 50%, rgba(124,58,237,0.06) 0, transparent 60%)",
          position: "relative",
          overflow: "hidden"
        }}
        data-testid={PortfolioTestIds.container}
      >
        <ProgressBar />
        
        <a
          href="#home"
          className="sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-violet-600 focus:px-3 focus:py-1 focus:text-white focus:rounded"
        >
          Skip to content
        </a>

        <motion.div 
          className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 bg-slate-950/80"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <motion.div 
            className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              onClick={() => window.location.href = '#home'}
              className="text-sm font-semibold text-slate-200 hover:text-violet-400 relative cursor-pointer transform hover:scale-105 active:scale-95 transition-transform"
            >
              <motion.div
                className="h-10 w-auto"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={SecondaryLogo}
                  alt="Portfolio Logo"
                  className="h-full w-auto"
                />
              </motion.div>
            </div>
            <nav aria-label="Primary" className="hidden gap-6 md:flex">
              {ids.map((id, index) => (
                <div
                  key={id}
                  onClick={() => window.location.href = `#${id}`}
                  className={classNames(
                    "text-sm text-slate-300 hover:text-white relative cursor-pointer transform hover:-translate-y-0.5 transition-transform",
                    active === id ? "text-violet-400" : ""
                  )}
                >
                  <span className="relative">
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                    {active === id && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-400"
                        animate={{ scaleX: 1 }}
                        initial={{ scaleX: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </span>
                </div>
              ))}
            </nav>
          </motion.div>
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-px bg-slate-800"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }}
          />
        </motion.div>

        <FloatingNav active={active} />

        <main>
          <Hero />
          <About />
          <Skills />
          <Timeline />
          <Projects />
          <Contact />
        </main>

        <footer className="py-10 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {PERSON.name}. All rights reserved.
        </footer>
      </div>
    </AchievementProvider>
  );
}