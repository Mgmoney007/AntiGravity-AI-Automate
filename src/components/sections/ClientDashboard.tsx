"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Bot,
  Workflow,
  Bell,
  Users,
  CheckCircle2,
  Play,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Briefcase,
  Layers,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// Mock Data
const initialAgents = [
  { id: 1, name: "LeadScout-v4", type: "Lead Generation", status: "ACTIVE", speed: "1.2s/lead", jobs: 1420 },
  { id: 2, name: "OmniSupport-v2", type: "Customer Support", status: "ACTIVE", speed: "0.8s/msg", jobs: 3840 },
  { id: 3, name: "DataSync-v1.5", type: "Database Integrator", status: "IDLE", speed: "3.5s/batch", jobs: 820 },
  { id: 4, name: "DealCloser-v3", type: "Sales Outreach", status: "ACTIVE", speed: "1.5s/email", jobs: 2410 },
];

const initialCrmActions = [
  { id: 1, text: "AI qualified lead: Jane Ostin", value: "$18,500", time: "2 min ago", type: "deal" },
  { id: 2, text: "Auto-scheduled Call: Alex Carter", value: "Strategy", time: "8 min ago", type: "booking" },
  { id: 3, text: "Quote generated & sent: Acme Corp", value: "$42,000", time: "15 min ago", type: "quote" },
  { id: 4, text: "Inbound email triage complete", value: "7 Emails", time: "32 min ago", type: "system" },
];

const initialNotifications = [
  { id: 1, title: "System Health Optimal", desc: "All 12 background nodes running at <40ms latency.", time: "Just now", unread: true },
  { id: 2, title: "LeadScout Upgrade Complete", desc: "Accuracy increased by 8.4% using model-triage.", time: "1 hr ago", unread: false },
  { id: 3, title: "CRM Sync Success", desc: "Synchronized 1,420 automated records to HubSpot.", time: "3 hr ago", unread: false },
];

// Active pipeline nodes with custom colors matching the user request & second image
const pipelineNodes = [
  {
    id: 1,
    title: "1. Trigger Inbound",
    subtitle: "Webhook Web",
    icon: Activity,
    activeColor: "rgba(234, 179, 8, 0.25)",
    textClass: "text-amber-400",
    borderClass: "border-amber-500/40",
    bgClass: "bg-amber-500/5",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    id: 2,
    title: "2. Lead Classifier",
    subtitle: "Triage GPT-4",
    icon: Briefcase,
    activeColor: "rgba(59, 130, 246, 0.25)",
    textClass: "text-blue-400",
    borderClass: "border-blue-500/40",
    bgClass: "bg-blue-500/5",
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    id: 3,
    title: "3. HubSpot Inject",
    subtitle: "CRM AutoFill",
    icon: Users,
    activeColor: "rgba(249, 115, 22, 0.25)",
    textClass: "text-orange-400",
    borderClass: "border-orange-500/40",
    bgClass: "bg-orange-500/5",
    badgeClass: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  {
    id: 4,
    title: "4. Slack Alert",
    subtitle: "Notify Channel",
    icon: CheckCircle2,
    activeColor: "rgba(16, 185, 129, 0.25)",
    textClass: "text-emerald-400",
    borderClass: "border-emerald-500/40",
    bgClass: "bg-emerald-500/5",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  }
];

const stepPercentages = ["0%", "33.3%", "66.6%", "100%"];

export default function ClientDashboard() {
  const [agents, setAgents] = useState(initialAgents);
  const [crmActions, setCrmActions] = useState(initialCrmActions);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState<"hours" | "tasks" | "revenue">("hours");
  const [triggerPulse, setTriggerPulse] = useState(false);
  const [tasksRun, setTasksRun] = useState(84209);
  const [hoursSaved, setHoursSaved] = useState(1248);
  const [revenueLeaked, setRevenueLeaked] = useState(14850);
  const [activeStep, setActiveStep] = useState(0);

  // Active step for pipeline animation
  useEffect(() => {
    const pipelineInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(pipelineInterval);
  }, []);

  // Auto-pulse numbers and feeds for real-time live feeling
  useEffect(() => {
    const interval = setInterval(() => {
      setTriggerPulse(true);
      setTasksRun((prev) => prev + Math.floor(Math.random() * 3) + 1);
      if (Math.random() > 0.7) {
        setHoursSaved((prev) => prev + 1);
      }
      setTimeout(() => setTriggerPulse(false), 800);

      // Randomly inject a new CRM action
      if (Math.random() > 0.8) {
        const names = ["Marcus Sterling", "Elena Rostova", "Devon Miller", "Sophia Martinez"];
        const values = ["$12,000", "$25,000", "$8,500", "$32,000"];
        const types = ["deal", "booking", "quote", "system"];
        const chosenName = names[Math.floor(Math.random() * names.length)];
        const chosenVal = values[Math.floor(Math.random() * values.length)];
        const chosenType = types[Math.floor(Math.random() * types.length)];
        
        const newAction = {
          id: Date.now(),
          text: `AI qualified lead: ${chosenName}`,
          value: chosenVal,
          time: "Just now",
          type: chosenType,
        };
        setCrmActions((prev) => [newAction, ...prev.slice(0, 3)]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="client-dashboard" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none -z-10" />
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-secondary/10 blur-[130px] opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-brand-cyan/20 px-4 py-1.5 rounded-full bg-brand-cyan/5 text-brand-cyan text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Client Portal preview
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-heading mb-4 text-white"
          >
            Your AI-Powered Command Center
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
          >
            Take full control of your automated operations. Monitor agents, workflow pipelines, live metrics, and CRM leads as they process in real-time.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Main Live Analytics Chart (7 Columns Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-between glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden group border border-glass-border shadow-glow"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 z-10">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brand-cyan animate-pulse" /> Live Performance
                </h3>
                <p className="text-sm text-text-secondary mt-1">Real-time metrics tracking automated efficiency</p>
              </div>

              {/* Tabs */}
              <div className="flex p-1 rounded-xl bg-white/5 border border-white/5 text-xs">
                {(["hours", "tasks", "revenue"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${
                      activeTab === tab
                        ? "bg-brand-purple text-white shadow-md"
                        : "text-text-secondary hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Display Active Metric */}
            <div className="grid grid-cols-3 gap-4 mb-6 z-10">
              <div className="bg-white/3 rounded-2xl p-4 border border-white/5 hover:border-brand-purple/20 transition-all">
                <span className="text-xs text-text-secondary flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-purple" /> Hours Saved
                </span>
                <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {hoursSaved}h
                </p>
              </div>
              <div className="bg-white/3 rounded-2xl p-4 border border-white/5 hover:border-brand-cyan/20 transition-all">
                <span className="text-xs text-text-secondary flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-brand-cyan" /> Tasks Run
                </span>
                <p className={`text-xl sm:text-2xl font-extrabold text-white mt-1 transition-all ${triggerPulse ? "text-brand-cyan scale-105" : ""}`}>
                  {tasksRun.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/3 rounded-2xl p-4 border border-white/5 hover:border-brand-orange/20 transition-all">
                <span className="text-xs text-text-secondary flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-orange" /> Revenue Saved
                </span>
                <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  ${(hoursSaved * 45).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Simulated Graphic Chart */}
            <div className="h-44 sm:h-52 w-full relative bg-white/2 rounded-2xl border border-white/5 flex items-end overflow-hidden p-2 z-10">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                <line x1="0" y1="37.5" x2="400" y2="37.5" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="112.5" x2="400" y2="112.5" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                
                {/* SVG Line path drawing itself */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  d="M 0 120 C 50 110, 80 50, 130 65 C 180 80, 220 20, 280 40 C 330 60, 360 15, 400 25"
                  fill="none"
                  stroke={activeTab === "revenue" ? "#F97316" : activeTab === "hours" ? "#7C3AED" : "#06B6D4"}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 0 120 C 50 110, 80 50, 130 65 C 180 80, 220 20, 280 40 C 330 60, 360 15, 400 25 L 400 150 L 0 150 Z"
                  fill="url(#chartGrad)"
                />
              </svg>

              {/* Glowing animated pulse dot along the graph */}
              <div className="absolute top-[12%] right-[5%] w-3 h-3 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(6,182,212,0.8)] animate-ping" />
              <div className="absolute top-[14%] right-[5.2%] w-2 h-2 rounded-full bg-brand-cyan" />
              
              <div className="absolute bottom-2 left-4 text-[10px] text-text-secondary font-mono flex gap-4">
                <span>08:00 AM</span>
                <span>12:00 PM</span>
                <span>04:00 PM</span>
                <span>08:00 PM (LIVE)</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: AI Agents Hub (5 Columns Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between glass-panel rounded-3xl p-6 md:p-8 border border-glass-border shadow-md"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-brand-purple" /> Active AI Agents
                </h3>
                <span className="text-xs font-semibold text-brand-purple bg-brand-purple/10 border border-brand-purple/20 px-2.5 py-0.5 rounded-full">
                  {agents.filter(a => a.status === "ACTIVE").length} Operational
                </span>
              </div>

              {/* List of Agents */}
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex justify-between items-center bg-white/2 hover:bg-white/5 border border-white/5 p-3 rounded-2xl hover:border-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{agent.name}</h4>
                        <p className="text-[11px] text-text-secondary">{agent.type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right text-[11px] text-text-secondary hidden sm:block">
                        <div>{agent.jobs} jobs run</div>
                        <div>{agent.speed}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1.5 ${
                        agent.status === "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${agent.status === "ACTIVE" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                        {agent.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full mt-6 py-2.5 rounded-xl border border-white/10 hover:border-brand-purple/40 text-xs font-semibold text-white hover:bg-brand-purple/5 transition-all duration-300 flex items-center justify-center gap-1.5">
              Launch Agent Studio <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Card 3: Visual Workflow Map & Data Pipeline (Full Width / 8 Columns Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 flex flex-col justify-between glass-panel rounded-3xl p-6 md:p-8 border border-glass-border shadow-md relative overflow-hidden"
          >
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                <Workflow className="w-5 h-5 text-brand-cyan" /> Active Automation Pipeline
              </h3>
              <p className="text-sm text-text-secondary mb-8">Visualization of active multi-agent workflow paths</p>

              {/* Node Map Grid */}
              <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 py-6 px-4 border border-white/5 bg-white/2 rounded-2xl">
                {/* Horizontal flow connectors (desktop) */}
                <div className="absolute top-[48%] left-[12%] right-[12%] h-[2px] bg-white/10 -z-10 hidden md:block">
                  {/* Active segment highlight */}
                  <motion.div
                    className="absolute h-full top-0 left-0 rounded-full"
                    style={{
                      background: "linear-gradient(to right, #EAB308, #3B82F6, #F97316, #10B981)",
                    }}
                    animate={{
                      width: stepPercentages[activeStep],
                    }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                  />
                  {/* Glowing moving dot */}
                  <motion.div
                    className="absolute w-3 h-3 rounded-full top-[-5px] -translate-x-1/2"
                    animate={{
                      left: stepPercentages[activeStep],
                      backgroundColor: activeStep === 0 ? "#EAB308" : activeStep === 1 ? "#3B82F6" : activeStep === 2 ? "#F97316" : "#10B981",
                      boxShadow: activeStep === 0 
                        ? "0 0 12px #EAB308" 
                        : activeStep === 1 
                        ? "0 0 12px #3B82F6" 
                        : activeStep === 2 
                        ? "0 0 12px #F97316" 
                        : "0 0 12px #10B981",
                    }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                  />
                </div>

                {pipelineNodes.map((node, index) => {
                  const IconComponent = node.icon;
                  const isActive = activeStep === index;
                  return (
                    <React.Fragment key={node.id}>
                      <motion.div
                        className={`flex flex-col items-center text-center bg-brand-black/40 border p-4 rounded-2xl w-36 relative transition-all duration-500 ${
                          isActive
                            ? `${node.borderClass} ${node.bgClass}`
                            : "border-white/5"
                        }`}
                        animate={{
                          scale: isActive ? 1.05 : 1,
                          boxShadow: isActive ? `0 0 20px ${node.activeColor}` : "none",
                        }}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2.5 transition-all duration-500 ${
                          isActive
                            ? `${node.bgClass} border ${node.borderClass} ${node.textClass}`
                            : "bg-white/5 border border-white/10 text-white/60"
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h4 className={`text-xs font-bold leading-tight transition-all duration-500 ${isActive ? "text-white" : "text-white/80"}`}>
                          {node.title}
                        </h4>
                        <span className={`text-[10px] font-medium mt-1.5 px-2 py-0.5 rounded border transition-all duration-500 ${
                          isActive
                            ? node.badgeClass
                            : "bg-white/3 text-white/40 border-white/5"
                        }`}>
                          {node.subtitle}
                        </span>
                      </motion.div>

                      {index < 3 && (
                        <ChevronRight className={`w-5 h-5 rotate-90 md:rotate-0 transition-all duration-500 ${
                          activeStep === index ? node.textClass : "text-text-secondary/60"
                        }`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 text-xs text-text-secondary">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Pipeline Healthy (Latency: 142ms)
              </span>
              <button className="text-brand-cyan hover:underline font-semibold flex items-center gap-1">
                Configure Nodes <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 4: Live Notifications & Activity Feed (4 Columns Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4 flex flex-col justify-between glass-panel rounded-3xl p-6 md:p-8 border border-glass-border shadow-md"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-brand-orange" /> Notifications
                </h3>
                <span className="text-xs bg-brand-orange/10 border border-brand-orange/20 text-brand-orange px-2 py-0.5 rounded-full">
                  {notifications.filter(n => n.unread).length} New
                </span>
              </div>

              {/* Feed List */}
              <div className="space-y-4">
                {notifications.map((n) => (
                  <div key={n.id} className="relative flex gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                    {n.unread && (
                      <span className="absolute top-1.5 left-0 w-2 h-2 rounded-full bg-brand-orange" />
                    )}
                    <div className={`${n.unread ? "pl-4" : "pl-4"} flex-1`}>
                      <h4 className="text-xs font-bold text-white flex justify-between">
                        {n.title}
                        <span className="text-[9px] text-text-secondary font-normal font-mono">{n.time}</span>
                      </h4>
                      <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full mt-6 py-2 border border-white/5 hover:border-white/10 bg-white/2 hover:bg-white/5 text-[11px] font-semibold text-text-secondary hover:text-white rounded-xl transition-all duration-300">
              View Audit History Logs
            </button>
          </motion.div>

          {/* Card 5: CRM Live Qualified Actions (Full Width / 12 Columns Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-12 flex flex-col justify-between glass-panel rounded-3xl p-6 md:p-8 border border-glass-border shadow-md"
          >
            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-cyan" /> CRM & Automated Outreach Feed
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">Leads captured, filtered, and qualified automatically by AI</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-text-secondary font-mono">Synced with Salesforce, HubSpot, Zapier</span>
                </div>
              </div>

              {/* Actions Feed Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {crmActions.map((action) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white/2 hover:bg-white/5 border border-white/5 p-4 rounded-2xl hover:border-brand-cyan/20 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                          action.type === "deal"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10"
                            : action.type === "booking"
                            ? "bg-brand-purple/10 text-brand-purple border border-brand-purple/10"
                            : action.type === "quote"
                            ? "bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/10"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/10"
                        }`}>
                          {action.type}
                        </span>
                        <span className="text-[10px] text-text-secondary font-mono">{action.time}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-white leading-normal mb-1">{action.text}</h4>
                      <div className="text-sm font-extrabold text-white flex items-center gap-1.5 mt-2">
                        <span className="text-brand-cyan font-mono">•</span> {action.value}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
        
      </div>
    </section>
  );
}
