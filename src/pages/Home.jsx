import { createElement, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  BadgeCheck,
  Braces,
  Code2,
  Github,
  Linkedin,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  Twitter,
  Workflow,
} from "lucide-react";
import HeroScene from "../components/HeroScene";
import MagneticButton from "../components/MagneticButton";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Seo from "../components/Seo";
import {
  experience,
  profile,
  projects,
  roles,
  services,
  skillGroups,
  socialLinks,
  stack,
  stats,
  testimonials,
} from "../data/portfolio";

const MotionSpan = motion.span;
const socialIcons = { email: Mail, github: Github, linkedin: Linkedin, twitter: Twitter };

function RoleTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % roles.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex min-h-9 items-center overflow-hidden rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] px-3 text-sm font-semibold text-[color:var(--accent)]">
      <AnimatePresence mode="wait">
        <MotionSpan
          key={roles[index]}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {roles[index]}
        </MotionSpan>
      </AnimatePresence>
    </span>
  );
}

function HeroCommandCenter() {
  const featured = projects.slice(0, 4);
  const pipeline = [
    { icon: Workflow, label: "Product flow", value: "Research -> UI -> API -> deploy" },
    { icon: ShieldCheck, label: "Reliability", value: "Validation, limits, fallback states" },
    { icon: Rocket, label: "Launch", value: "Vercel, Render, SEO, performance pass" },
  ];

  return (
    <div className="hero-stage hero-reveal relative rounded-lg p-4 md:p-6">
      <div className="relative z-10 flex items-start justify-between gap-5 border-b border-[color:var(--line)] pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--accent)]">
            Portfolio operating system
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[color:var(--text)] md:text-3xl">
            Proof, process, and product depth in one view.
          </h2>
        </div>
        <span className="rounded-lg border border-[color:var(--line)] px-3 py-2 text-xs font-semibold text-[color:var(--muted)]">
          2026
        </span>
      </div>

      <div className="relative z-10 mt-6 grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {featured.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-4 transition hover:-translate-y-1 hover:border-[color:var(--accent)]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: project.accent }}>
                  {project.type}
                </span>
                <ArrowUpRight size={16} className="text-[color:var(--muted)] transition group-hover:text-[color:var(--text)]" />
              </div>
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[color:var(--muted)]">
                {project.summary}
              </p>
            </Link>
          ))}
        </div>

        <div className="rounded-lg border border-[color:var(--line)] bg-[color:var(--panel)] p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--accent-2)]">
              Build pipeline
            </p>
            <span className="hero-line h-px w-20 rounded-full" />
          </div>
          <div className="grid gap-3">
            {pipeline.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[color:var(--surface-strong)] text-[color:var(--accent)]">
                  {createElement(Icon, { size: 17 })}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block text-xs leading-5 text-[color:var(--muted)]">{value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const staticPreview = new URLSearchParams(window.location.search).has("static");
    if (staticPreview) return undefined;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-shell relative min-h-screen overflow-hidden px-5 pt-32">
      <HeroScene />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[color:var(--bg)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-[calc(100vw-40px)] min-w-0 items-center gap-12 py-10 lg:max-w-7xl lg:grid-cols-[0.92fr_1.08fr]">
        <div className="min-w-0 max-w-full">
          <div className="hero-reveal mb-6 flex flex-wrap items-center gap-3">
            <span className="hero-line h-px w-12 rounded-full" />
            <RoleTicker />
            <span className="inline-flex min-h-9 items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--panel)] px-3 text-sm text-[color:var(--muted)]">
              {profile.location} / {profile.timezone}
            </span>
          </div>

          <p className="hero-reveal mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Full-stack product engineer
          </p>

          <h1 className="hero-reveal max-w-full break-words text-4xl font-bold leading-tight text-[color:var(--text)] sm:max-w-4xl sm:text-5xl xl:text-5xl 2xl:text-6xl">
            Premium web products, shipped with serious engineering.
          </h1>

          <p className="hero-reveal mt-6 max-w-[39rem] text-base leading-8 text-[color:var(--muted)] md:text-xl">
            {profile.subline}
          </p>

          <div className="hero-reveal mt-8 flex flex-wrap gap-3">
            <MagneticButton to="/projects">Explore work</MagneticButton>
            <MagneticButton href={`mailto:${profile.email}`} icon="arrow" variant="secondary">
              Email me
            </MagneticButton>
          </div>

          <div className="hero-reveal mt-7 flex flex-wrap items-center gap-3">
            {socialLinks.map(({ href, label, type }) => {
              const Icon = socialIcons[type];

              return (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--panel)] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
                >
                  {createElement(Icon, { size: 18 })}
                </a>
              );
            })}
          </div>

          <div className="hero-reveal mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ["Mode", "Build, measure, polish"],
              ["Focus", "React, AI, backend"],
              ["Status", "Open to serious builds"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--panel)] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">{label}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <HeroCommandCenter />
      </div>

      <div className="relative z-10 mx-auto -mt-8 hidden max-w-7xl border-t border-[color:var(--line)] py-4 lg:block">
        <div className="marquee flex w-max gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          {[...stack.slice(0, 9), ...stack.slice(0, 9)].map((item, index) => (
            <span key={`${item}-${index}`} className="rounded-lg border border-[color:var(--line)] px-3 py-2">
              {item}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#featured-work"
        aria-label="Scroll to featured work"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-sm text-[color:var(--muted)] md:flex"
      >
        <ArrowDown size={16} className="animate-bounce" />
        Scroll
      </a>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-4">
        {stats.map((stat) => (
          <Reveal key={stat.label} className="solid-panel rounded-lg p-5">
            <div className="text-3xl font-bold text-[color:var(--text)]">{stat.value}</div>
            <div className="mt-2 text-sm text-[color:var(--muted)]">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <Seo
        title="Premium Full-Stack Developer Portfolio"
        description="Shikhar builds premium full-stack products with React, Node.js, AI workflows, polished UX, and production-minded engineering."
      />
      <HomeHero />
      <StatsSection />

      <section id="featured-work" className="section-pad">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Featured projects"
            title="Case studies that show product judgment, not just screenshots."
            description="Each build is framed around the problem, architecture, interface decisions, and production thinking behind the work."
          />
          <div className="grid gap-8">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} featured />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad surface-band">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Engineering range"
            title="A product-focused stack for frontend polish and backend discipline."
            description="The work sits between visual craft and practical systems: fast React interfaces, clean Node APIs, AI workflows, data models, and deployable product surfaces."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.05} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[color:var(--surface-strong)] text-[color:var(--accent)]">
                  {index % 2 === 0 ? <Code2 size={20} /> : <Braces size={20} />}
                </div>
                <h3 className="text-xl font-semibold">{group.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{group.detail}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-lg border border-[color:var(--line)] px-3 py-2 text-xs text-[color:var(--muted)]">
                      {skill}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-xl grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeader
            eyebrow="Journey"
            title="Built through execution, polish, and repeated product reps."
            description="The path is practical: build, deploy, refine, learn from friction, then raise the quality bar on the next system."
          />
          <div className="grid gap-4">
            {experience.slice(0, 2).map((item) => (
              <Reveal key={item.title} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
                <div className="mb-3 text-sm font-semibold text-[color:var(--accent)]">{item.period}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad surface-band">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Services"
            title="For teams and founders who need the product to feel engineered."
            description="Focused collaboration areas with a premium finish and clean delivery habits."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.04} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-5">
                <Sparkles size={20} className="mb-4 text-[color:var(--accent)]" />
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{service.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-xl grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Proof signals"
              title="Trusted for clarity, speed, and the details that make software feel complete."
            />
            <div className="grid gap-4">
              {testimonials.slice(0, 2).map((item) => (
                <Reveal key={item.name} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
                  <p className="text-lg leading-8 text-[color:var(--text)]">"{item.quote}"</p>
                  <p className="mt-4 text-sm font-semibold">{item.name}</p>
                  <p className="text-sm text-[color:var(--muted)]">{item.role}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow">
            <BadgeCheck size={24} className="mb-5 text-[color:var(--accent)]" />
            <h3 className="text-2xl font-semibold">Tech stack preview</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              A practical toolchain for building, animating, validating, shipping, and iterating modern web products.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span key={item} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] px-3 py-2 text-xs text-[color:var(--muted)]">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="connect" className="px-5 pb-24">
        <Reveal className="mx-auto max-w-7xl rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase text-[color:var(--accent)]">Connect</p>
              <h2 className="text-3xl font-semibold md:text-5xl">No form. Just the fastest useful links.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)]">
                {profile.availability}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, label, type }) => {
                const Icon = socialIcons[type];

                return (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-[color:var(--line)] px-4 text-sm font-semibold text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
                  >
                    {createElement(Icon, { size: 17 })}
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
