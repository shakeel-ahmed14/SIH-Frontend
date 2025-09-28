import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Download,
  FileSearch,
  Map,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useCallback } from "react";

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

interface StatCard {
  title: string;
  value: string;
  change: string;
}

interface ComplianceScore {
  label: string;
  value: string;
  status: string;
  tone: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: typeof Search;
  accent: string;
  page: string;
}

interface OperationFeedItem {
  title: string;
  description: string;
  time: string;
  action: string;
}

const stats: StatCard[] = [
  { title: "NAMASTE Codes", value: "12,847", change: "+127 this week" },
  { title: "TM2 Codes", value: "8,652", change: "+43 this week" },
  { title: "Active Mappings", value: "6,234", change: "+89 this week" },
  { title: "Patient Records", value: "1,456", change: "+12 today" },
];

const complianceScores: ComplianceScore[] = [
  { label: "WHO TM2 readiness", value: "82%", status: "↑ improving", tone: "text-green-600" },
  { label: "ABDM policy controls", value: "6 / 8", status: "2 pending", tone: "text-amber-600" },
  { label: "Audit exceptions", value: "3 open", status: "triaged", tone: "text-blue-600" },
];

const quickActions: QuickAction[] = [
  {
    title: "Code Lookup",
    description: "Search and browse medical codes",
    icon: Search,
    accent: "bg-blue-50 border-blue-200 text-blue-700",
    page: "namaste-codes",
  },
  {
    title: "Mapping Explorer",
    description: "Explore code mappings between systems",
    icon: Map,
    accent: "bg-teal-50 border-teal-200 text-teal-700",
    page: "mappings",
  },
  {
    title: "Smart Search",
    description: "Unified search across all systems",
    icon: FileSearch,
    accent: "bg-indigo-50 border-indigo-200 text-indigo-700",
    page: "namaste-codes",
  },
  {
    title: "Bulk Downloads",
    description: "Download FHIR data in bulk",
    icon: Download,
    accent: "bg-amber-50 border-amber-200 text-amber-700",
    page: "downloads",
  },
];

const operationsFeed: OperationFeedItem[] = [
  {
    title: "WHO TM2 sync completed",
    description: "43 TM2 respiratory codes aligned with NAMASTE mappings",
    time: "45 minutes ago",
    action: "Open sync report",
  },
  {
    title: "Clinical QA approved mapping batch",
    description: "12 mappings cleared with ≥92% confidence",
    time: "Today • 11:20 IST",
    action: "View approvals",
  },
  {
    title: "FHIR bundle export scheduled",
    description: "District pilot data export queued for 18:00 window",
    time: "Today • 09:05 IST",
    action: "Manage exports",
  },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const handleActionClick = useCallback(
    (page: string) => {
      if (onNavigate) {
        onNavigate(page);
      }
    },
    [onNavigate],
  );

  return (
    <div className="min-h-screen space-y-12 px-2 py-6 sm:px-0">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-6 rounded-3xl border border-white/70 bg-gradient-to-br from-white via-[#f4f1ff]/85 to-[#fff3e7]/80 p-8 shadow-xl shadow-blue-100/45 backdrop-blur"
      >
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/70 bg-slate-50/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Command center · live oversight
        </span>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Code Mapping Control Center</h1>
            <p className="max-w-2xl text-base text-slate-600">
              Govern NAMASTE, TM2, and ICD-11 interoperability with policy-aligned guardrails, real-time analytics, and ABDM-ready workflows that scale across states.
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/95 px-4 py-3 text-sm text-slate-600 shadow-sm shadow-amber-100/40">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-sky-500" />
            <div>
              <p className="font-semibold text-slate-800">Release readiness: 84%</p>
              <p className="text-xs text-slate-500">Aligned with SIH 2025 compliance baseline</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {complianceScores.map((score) => (
            <div
              key={score.label}
              className="relative overflow-hidden rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm"
            >
              <div className="absolute left-4 top-0 h-0.5 w-8 bg-slate-600" />
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{score.label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className={`text-2xl font-semibold text-slate-900 ${score.tone}`}>{score.value}</span>
                <span className="text-xs font-medium text-slate-500">{score.status}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            whileHover={{ y: -2 }}
          >
                            <div className="absolute left-6 top-0 h-0.5 w-8 bg-teal-600" />
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <TrendingUp className="h-4 w-4 text-teal-600" />
                {stat.change}
              </div>
              <div>
                <p className="text-sm text-slate-500">{stat.title}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25 }}
        className="space-y-6 rounded-3xl border border-white/70 bg-gradient-to-br from-white via-[#f6f2ff]/85 to-[#fff4e6]/80 p-6 shadow-lg shadow-blue-100/35 backdrop-blur"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Priority workflows</h2>
            <p className="text-sm text-slate-500">Navigate to the most requested governance tasks.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm shadow-amber-100/40">
            <Sparkles className="h-4 w-4 text-sky-500" />
            Smart recommendations refreshed hourly
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                type="button"
                key={action.title}
                className="group relative flex h-full w-full flex-col items-stretch gap-4 overflow-hidden rounded-3xl border border-white/70 bg-white/95 p-6 text-left shadow-xl shadow-blue-100/30 backdrop-blur transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3 + index * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => handleActionClick(action.page)}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-lg border ${action.accent}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-slate-900">{action.title}</h3>
                      <p className="text-sm text-slate-600">{action.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 text-slate-300 transition group-hover:text-slate-600" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.35 }}
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr),360px]"
      >
        <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Operational pulse</h3>
              <p className="text-sm text-slate-500">Latest governance signals across your mapping estates.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-green-300 hover:text-green-600">
              View audit log
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            {operationsFeed.map((item) => (
              <div
                key={item.title}
                className="relative flex flex-col gap-2 overflow-hidden rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-slate-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.description}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.time}</p>
                </div>
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-500">
                  {item.action}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Realtime runtime checks</p>
              <p className="text-xs text-slate-500">ABDM policy & WHO TM2 monitors</p>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 border border-teal-200 text-teal-600">
              <Activity className="h-5 w-5" />
            </span>
          </div>
          <div className="grid gap-3">
            <div className="rounded-lg bg-green-50 border border-green-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">FHIR export SLA</p>
              <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
                <span>Current run</span>
                <span className="font-semibold text-green-600">On schedule</span>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Terminology sync window</span>
                <span className="font-semibold text-slate-900">02:30–03:45 IST</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">Guarded with automatic WHO rate limit protection.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Consent audit trail freshness</span>
                <span className="font-semibold text-blue-600">14 minutes</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">Last event logged by National Ayurveda Mission.</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}