"use client";
import { motion } from "motion/react";
import { MacbookScrollDemo } from "./components/MacbookScrollDemo";
import { ParticleBackground } from "./components/ParticleBackground";
import { CTAButton } from "./components/CTAButton";
import { InfiniteMarquee } from "./components/InfinityMarquee";
import "../../../styles/index.css"

const fadeUp = (delay = 0) => ({
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

export const HomePage = () => (
  <main className="homepage-root relative min-h-screen overflow-hidden">
    <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]" />
    <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-purple-600/20 blur-[160px]" />
    <div className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[140px]" />
    <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />
    <ParticleBackground />
    <section className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-4 py-24 text-center">
      <motion.div
        {...fadeUp(0)}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-purple-200 backdrop-blur-sm"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        Now Live — Notes to Actions
      </motion.div>
      <motion.h1
        {...fadeUp(0.15)}
        className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
      >
        Turn Meeting Notes
        <br />
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Into Action Items
        </span>
      </motion.h1>
      <motion.p
        {...fadeUp(0.3)}
        className="mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl"
      >
        AI-powered meeting assistant that captures, summarises, and tracks
        every decision — so nothing slips through the cracks.
      </motion.p>
      <motion.div {...fadeUp(0.45)}>
        <CTAButton href="#showcase" className="mt-10">
          Explore Demo
        </CTAButton>
      </motion.div>
      <motion.div
        className="mt-20 flex flex-col items-center gap-1 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          className="h-8 w-[1px] bg-gradient-to-b from-gray-400 to-transparent"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
    <section className="relative z-10 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.h2
          {...fadeIn(0)}
          className="mb-16 text-center text-3xl font-bold text-white sm:text-4xl"
        >
          Why teams love it
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeIn(i * 0.12)}
              className="group cursor-pointer relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-colors hover:border-indigo-500/40"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-2xl">
                {f.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{f.desc}</p>
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-indigo-500/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <section id="showcase" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          {...fadeIn(0)}
          className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl"
        >
          Built with Modern Tech
        </motion.h2>
        <motion.p
          {...fadeIn(0.1)}
          className="mx-auto mb-16 max-w-xl text-center text-gray-400"
        >
          Scroll through the interactive MacBook below to see the product in action.
        </motion.p>

        <MacbookScrollDemo />
        <InfiniteMarquee />
      </div>
    </section>
    <section className="relative z-10 py-24">
      <motion.div
        {...fadeIn(0)}
        className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 px-8 py-16 text-center backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to supercharge your meetings?
        </h2>
        <p className="mt-4 text-gray-400">
          Start capturing action items automatically — no more lost follow-ups.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <CTAButton href="/app">
            Get Started
          </CTAButton>
          <a
            href="/app/action-items"
            className="text-sm font-medium text-indigo-300 underline-offset-4 hover:underline"
          >
            View Action Items →
          </a>
        </div>
      </motion.div>
    </section>
    <footer className="relative z-10 border-t border-white/5 py-8 text-center text-xs text-gray-500">
      © {new Date().getFullYear()} Notes to Actions · By Team Rocket
    </footer>
  </main>
);
const features = [
  {
    icon: "🎙️",
    title: "Smart Capture",
    desc: "Automatically transcribes and summarises your meetings in real-time with AI.",
  },
  {
    icon: "✅",
    title: "Action Tracking",
    desc: "Every decision becomes a trackable action item assigned to the right person.",
  },
  {
    icon: "🔔",
    title: "Auto Reminders",
    desc: "Never miss a deadline — smart notifications keep your team on track.",
  },
  {
    icon: "📊",
    title: "Analytics",
    desc: "Visualise meeting productivity and follow-up completion rates at a glance.",
  },
  {
    icon: "🔗",
    title: "Integrations",
    desc: "Connect with Slack, Jira, Notion, and more — your workflow, your way.",
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    desc: "SOC 2 compliant with end-to-end encryption. Your data stays yours.",
  },
];
