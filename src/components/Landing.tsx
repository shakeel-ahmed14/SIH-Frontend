import React from "react";
import {
  ArrowRight,
  Layers,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Building2,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

interface LandingProps {
  onNavigate: (page: string) => void;
}

const pillars = [
  {
    title: "Unified Governance",
    description: "One control plane across NAMASTE, TM2, and ICD-11",
    Icon: ShieldCheck,
    accent: "bg-green-50 border-green-200 text-green-700",
  },
  {
    title: "Semantic Fidelity",
    description: "Preserve intent with clinically aware mappings",
    Icon: Layers,
    accent: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    title: "Augmented Insights",
    description: "Surface gaps and overlaps before they become risk",
    Icon: Sparkles,
    accent: "bg-amber-50 border-amber-200 text-amber-700",
  },
];

const stats = [
  { label: "NAMASTE codes curated", value: "12,847", accent: "bg-green-50 border-green-200" },
  { label: "Mappings validated", value: "6,234", accent: "bg-blue-50 border-blue-200" },
  { label: "FHIR bundles exported", value: "4.2k", accent: "bg-amber-50 border-amber-200" },
];

const heroHighlights = [
  {
    text: "ICD-11 TM2 pathways with audit-ready traceability",
    gradient: "",
    accent: "bg-green-50 border-green-200 text-green-700",
  },
  {
    text: "ABDM aligned consent & ABHA verification workflows",
    gradient: "",
    accent: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    text: "FHIR-first exchange with deterministic mapping quality",
    gradient: "",
    accent: "bg-amber-50 border-amber-200 text-amber-700",
  },
];

const complianceSnapshot = [
  { label: "WHO TM2 alignment", value: "82%", helper: "+5% vs last review" },
  { label: "ABDM policy controls", value: "6/8", helper: "two controls under review" },
  { label: "Audit exceptions", value: "3 open", helper: "triaged for clinical QA" },
];

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-20 sm:px-10">
      <div className="absolute inset-0 -z-20 bg-white" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr),360px] lg:items-center">
          <div className="flex flex-col gap-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/70 bg-white/85 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-slate-600 shadow-sm backdrop-blur"
            >
              National Ayush Terminology Platform
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.55 }}
              className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl sm:leading-tight"
            >
              <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                Harmonise NAMASTE, TM2, and ICD-11
              </span>
              <br /> with clinical confidence and policy guardrails.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="max-w-3xl text-lg leading-relaxed text-slate-600"
            >
              AyushVardhan gives programme leads a unified cockpit for mapping governance, WHO TM2 migrations, and FHIR-first exchanges—ready for SIH 2025 compliance reviews and ABDM audits.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.55 }}
              className="grid gap-3 text-left sm:grid-cols-2"
            >
              {heroHighlights.map((highlight) => (
                <li
                  key={highlight.text}
                  className="group relative flex items-start gap-3 overflow-hidden rounded-lg border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600 shadow-sm"
                >
                  <span className={`relative flex h-9 w-9 items-center justify-center rounded-lg border ${highlight.accent}`}>
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <span className="relative">{highlight.text}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <button
                onClick={() => onNavigate("home")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Enter console
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate("mappings")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:border-green-300 hover:text-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Review mapping strategy
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.32, duration: 0.5 }}
            className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-8 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                  Compliance snapshot
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">Release readiness: 84%</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <Building2 className="h-6 w-6" />
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {complianceSnapshot.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 shadow-sm shadow-amber-100/30"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.helper}</p>
                  </div>
                  <span className="text-lg font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-green-50 border border-green-200 p-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Activity className="h-5 w-5 text-green-600" />
                WHO TM2 delta monitoring active • Sync guardrails enabled
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55 }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {pillars.map(({ title, description, Icon, accent }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1"
            >
              <div className="absolute left-6 top-0 h-0.5 w-8 bg-green-500" />
              <div className="relative flex flex-col gap-4">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-lg border ${accent}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-600">{description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.55 }}
          className="flex w-full flex-col gap-8 rounded-lg border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="flex flex-col gap-4 text-left sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl space-y-2">
              <h4 className="text-xl font-semibold text-slate-900">Your compliance cockpit at a glance</h4>
              <p className="text-sm text-slate-600">
                Track code ingestion, mapping curation, and FHIR exports in one console with ABDM guidance layered into every workflow.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
              Automated health checks are stable
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`relative overflow-hidden rounded-lg border bg-white px-4 py-4 shadow-sm ${stat.accent}`}
              >
                <div className="absolute left-4 top-0 h-0.5 w-8 bg-green-500" />
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Landing;