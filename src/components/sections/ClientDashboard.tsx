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
  Cpu,
  MessageSquare,
  Database,
} from "lucide-react";

// Mock Data
const initialAgents = [
  {
    id: 1,
    name: "LeadScout-v4",
    type: "Lead Triage & Qualification",
    status: "RUNNING",
    accentColor: "#EAB308", // Amber
    bgGlow: "rgba(234, 179, 8, 0.03)",
    borderColor: "rgba(234, 179, 8, 0.2)",
    icon: Activity,
    metricValue: 342,
    metricLabel: "Leads Qualified Today",
    metricAccuracy: "99.4% Accuracy",
    activity: "Scanned inbound lead request from enterprise tier and initiated profiling",
    speed: "0.8s triage latency"
  },
  {
    id: 2,
    name: "OmniSupport-v2",
    type: "Omnichannel Customer Support",
    status: "ACTIVE",
    accentColor: "#3B82F6", // Blue
    bgGlow: "rgba(59, 130, 246, 0.03)",
    borderColor: "rgba(59, 130, 246, 0.2)",
    icon: Bot,
    metricValue: 1248,
    metricLabel: "Tickets Resolved Today",
    metricAccuracy: "<45ms Response Time",
    activity: "Resolved billing query for client subscription #8210 via Stripe API",
    speed: "Interacting via chat"
  },
  {
    id: 3,
    name: "DataSync-v1.5",
    type: "Real-time CRM Synchronizer",
    status: "SYNCING",
    accentColor: "#F97316", // Orange
    bgGlow: "rgba(249, 115, 22, 0.03)",
    borderColor: "rgba(249, 115, 22, 0.2)",
    icon: Layers,
    metricValue: 12840,
    metricLabel: "Automated CRM Syncs",
    metricAccuracy: "0 Failures Detected",
    activity: "Synchronizing contact record to HubSpot contacts tier in real time",
    speed: "Batch sync complete"
  },
  {
    id: 4,
    name: "DealCloser-v3",
    type: "Autonomous Outreach Specialist",
    status: "ACTIVE",
    accentColor: "#A855F7", // Purple
    bgGlow: "rgba(168, 85, 247, 0.03)",
    borderColor: "rgba(168, 85, 247, 0.2)",
    icon: Zap,
    metricValue: 48,
    metricLabel: "Meetings Booked Today",
    metricAccuracy: "$142,500 Pipeline Generated",
    activity: "Sent hyper-personalized follow-up to enterprise VP of Sales",
    speed: "Outreach dispatching"
  }
];

const initialCrmActions = [
  {
    id: 1,
    platform: "HUBSPOT",
    eventTitle: "CRM Contact Created & Enriched",
    metadata: "id: hs_84209 | name: Marcus Sterling | org: Acme Corp | tier: Enterprise",
    status: "SUCCESS",
    time: "Just now",
    type: "deal",
    value: "$18,500"
  },
  {
    id: 2,
    platform: "APOLLO.IO",
    eventTitle: "Outreach Campaign Dispatched",
    metadata: "campaign: ent_scaling_2026 | recipient: m.sterling@acme.com | seq: 1",
    status: "DEPLOYED",
    time: "2 min ago",
    type: "booking",
    value: "Strategy"
  },
  {
    id: 3,
    platform: "CALENDLY",
    eventTitle: "Discovery Briefing Booked",
    metadata: "event: 30-min-intro | host: Sarah Jenkins (VP Sales) | date: 2026-05-12",
    status: "BOOKED",
    time: "8 min ago",
    type: "quote",
    value: "Sarah J."
  },
  {
    id: 4,
    platform: "SALESFORCE",
    eventTitle: "Opportunity Stage Auto-Updated",
    metadata: "opp_id: sf_7c666 | stage: Discovery | val: $42,000 | owner: AI-Agent-v4",
    status: "SYNCED",
    time: "15 min ago",
    type: "system",
    value: "$42,000"
  }
];


// Active pipeline nodes with custom colors matching the user request & second image
const pipelineNodes = [
  {
    id: 1,
    title: "1. New Lead Captured",
    subtitle: "Web Form / Ad",
    icon: Activity,
    activeColor: "rgba(234, 179, 8, 0.25)",
    textClass: "text-amber-400",
    borderClass: "border-amber-500/40",
    bgClass: "bg-amber-500/5",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    id: 2,
    title: "2. AI Qualification",
    subtitle: "GPT-4 Agent",
    icon: Sparkles,
    activeColor: "rgba(59, 130, 246, 0.25)",
    textClass: "text-blue-400",
    borderClass: "border-blue-500/40",
    bgClass: "bg-blue-500/5",
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    id: 3,
    title: "3. CRM Entry",
    subtitle: "HubSpot CRM",
    icon: Users,
    activeColor: "rgba(249, 115, 22, 0.25)",
    textClass: "text-orange-400",
    borderClass: "border-orange-500/40",
    bgClass: "bg-orange-500/5",
    badgeClass: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  {
    id: 4,
    title: "4. Sales Rep Assigned",
    subtitle: "Auto-Routing",
    icon: Briefcase,
    activeColor: "rgba(168, 85, 247, 0.25)",
    textClass: "text-purple-400",
    borderClass: "border-purple-500/40",
    bgClass: "bg-purple-500/5",
    badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    id: 5,
    title: "5. Meeting Booked",
    subtitle: "Calendar Sync",
    icon: CheckCircle2,
    activeColor: "rgba(16, 185, 129, 0.25)",
    textClass: "text-emerald-400",
    borderClass: "border-emerald-500/40",
    bgClass: "bg-emerald-500/5",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  }
];

const stepPercentages = ["0%", "25%", "50%", "75%", "100%"];

export default function ClientDashboard() {
  const [agents, setAgents] = useState(initialAgents);
  const [crmActions, setCrmActions] = useState(initialCrmActions);
  const [activeTab, setActiveTab] = useState<"hours" | "tasks" | "revenue">("hours");
  const [triggerPulse, setTriggerPulse] = useState(false);
  const [tasksRun, setTasksRun] = useState(84209);
  const [hoursSaved, setHoursSaved] = useState(1248);
  const [revenueLeaked, setRevenueLeaked] = useState(14850);
  const [activeStep, setActiveStep] = useState(0);
  const [liveEvents, setLiveEvents] = useState([
    { id: 1, text: "LeadScout-v4 qualified enterprise lead: Acme Corp", time: "Just now", color: "#EAB308" },
    { id: 2, text: "DataSync-v1.5 synchronized lead Marcus Sterling to HubSpot", time: "12s ago", color: "#F97316" },
    { id: 3, text: "DealCloser-v3 auto-scheduled briefing: Sophia Martinez", time: "25s ago", color: "#A855F7" },
    { id: 4, text: "OmniSupport-v2 auto-resolved support query #1402", time: "1m ago", color: "#3B82F6" },
  ]);

  // Active step for pipeline animation
  useEffect(() => {
    const pipelineInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
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

      // Randomly increment agent metrics
      setAgents((prevAgents) =>
        prevAgents.map((agent) => {
          if (Math.random() > 0.5) {
            return {
              ...agent,
              metricValue: agent.metricValue + Math.floor(Math.random() * 2) + 1,
            };
          }
          return agent;
        })
      );

      // Randomly inject a new live activity event
      if (Math.random() > 0.6) {
        const templates = [
          { text: "LeadScout-v4 qualified high-intent enterprise lead: Vanguard LLC", color: "#EAB308" },
          { text: "DataSync-v1.5 updated HubSpot CRM contact Elena Rostova", color: "#F97316" },
          { text: "DealCloser-v3 dispatched proposals & pricing packages", color: "#A855F7" },
          { text: "OmniSupport-v2 auto-resolved payment query via conversational agent", color: "#3B82F6" },
          { text: "LeadScout-v4 initiated profiling on inbound web request", color: "#EAB308" },
          { text: "DealCloser-v3 booked discovery call: John Doe", color: "#A855F7" },
        ];
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        setLiveEvents((prev) => [
          { id: Date.now(), text: randomTemplate.text, time: "Just now", color: randomTemplate.color },
          ...prev.map((ev) => {
            if (ev.time === "Just now") return { ...ev, time: "12s ago" };
            if (ev.time === "12s ago") return { ...ev, time: "30s ago" };
            return { ...ev, time: "1m ago" };
          }).slice(0, 3),
        ]);
      }

      // Randomly inject a new CRM action
      if (Math.random() > 0.8) {
        const templates = [
          {
            platform: "HUBSPOT",
            eventTitle: "CRM Contact Created & Enriched",
            metadata: "id: hs_84310 | name: Devon Miller | org: TechCorp | tier: Scale",
            status: "SUCCESS",
            type: "deal",
            value: "$12,000"
          },
          {
            platform: "APOLLO.IO",
            eventTitle: "Outreach Campaign Dispatched",
            metadata: "campaign: growth_pulse_2026 | recipient: d.miller@techcorp.com | seq: 2",
            status: "DEPLOYED",
            type: "booking",
            value: "Growth Pulse"
          },
          {
            platform: "CALENDLY",
            eventTitle: "Discovery Briefing Booked",
            metadata: "event: 15-min-intro | host: Sarah Jenkins (VP Sales) | date: 2026-05-15",
            status: "BOOKED",
            type: "quote",
            value: "Sarah J."
          },
          {
            platform: "SALESFORCE",
            eventTitle: "Opportunity Stage Auto-Updated",
            metadata: "opp_id: sf_9d210 | stage: Closed Won | val: $25,000 | owner: AI-Agent-v2",
            status: "SYNCED",
            type: "system",
            value: "$25,000"
          }
        ];
        const randomAction = templates[Math.floor(Math.random() * templates.length)];
        
        const newAction = {
          id: Date.now(),
          platform: randomAction.platform,
          eventTitle: randomAction.eventTitle,
          metadata: randomAction.metadata,
          status: randomAction.status,
          time: "Just now",
          type: randomAction.type,
          value: randomAction.value,
        };
        setCrmActions((prev) => [
          newAction,
          ...prev.map((act) => {
            if (act.time === "Just now") return { ...act, time: "2 min ago" };
            if (act.time === "2 min ago") return { ...act, time: "8 min ago" };
            if (act.time === "8 min ago") return { ...act, time: "15 min ago" };
            return { ...act, time: "30 min ago" };
          }).slice(0, 3)
        ]);
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
          
          {/* Left Column: Lead Pipeline & Live Performance Monitoring (8 Columns Wide) */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full gap-6">
            
            {/* Card 1: Lead Pipeline Automation */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full flex flex-col justify-between glass-panel rounded-3xl p-6 md:p-8 border border-glass-border shadow-md relative overflow-hidden"
            >
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center"
                  >
                    <Workflow className="w-5 h-5 text-cyan-400 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                  </motion.div>{" "}
                  Lead Pipeline Automation
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary mt-1.5 font-medium mb-8">Visualization of active lead to client workflow paths</p>

                {/* Node Map Grid */}
                <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 pt-14 pb-6 px-4 border border-white/5 bg-white/2 rounded-2xl">
                  {/* Horizontal flow connectors (desktop) */}
                  <div className="absolute top-[24px] left-[10%] right-[10%] h-[2px] bg-white/10 z-10 hidden md:block">
                    {/* Active segment highlight */}
                    <motion.div
                      className="absolute h-full top-0 left-0 rounded-full"
                      style={{
                        background: "linear-gradient(to right, #EAB308, #3B82F6, #F97316, #A855F7, #10B981)",
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
                        backgroundColor: activeStep === 0 ? "#EAB308" : activeStep === 1 ? "#3B82F6" : activeStep === 2 ? "#F97316" : activeStep === 3 ? "#A855F7" : "#10B981",
                        boxShadow: activeStep === 0 
                          ? "0 0 12px #EAB308" 
                          : activeStep === 1 
                          ? "0 0 12px #3B82F6" 
                          : activeStep === 2 
                          ? "0 0 12px #F97316" 
                          : activeStep === 3
                          ? "0 0 12px #A855F7"
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
                          className={`flex flex-col items-center text-center bg-brand-black/40 border p-3 rounded-2xl w-28 relative transition-all duration-500 ${
                            isActive
                              ? `${node.borderClass} ${node.bgClass}`
                              : "border-white/5"
                          }`}
                          animate={{
                            scale: isActive ? 1.05 : 1,
                            boxShadow: isActive ? `0 0 20px ${node.activeColor}` : "none",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                            delay: isActive ? 0.4 : 0,
                          }}
                        >
                          {/* Vertical Connector Line (from master glidewire top-[24px] down to card top-[48px]) */}
                          <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 w-[2px] h-[24px] hidden md:block z-10">
                            {/* Idle low-opacity line */}
                            <div className="absolute inset-0 bg-white/10" />
                            {/* Active glowing energy pulse beam */}
                            <motion.div
                              className="absolute inset-0 origin-top"
                              style={{
                                background: node.activeColor.replace("0.25", "0.8") || "rgba(59, 130, 246, 0.8)",
                                boxShadow: `0 0 8px ${node.activeColor.replace("0.25", "1")}`,
                              }}
                              initial={{ scaleY: 0 }}
                              animate={{
                                scaleY: isActive ? 1 : 0,
                              }}
                              transition={{
                                duration: 0.25,
                                ease: "easeOut",
                                delay: isActive ? 0.15 : 0,
                              }}
                            />
                          </div>

                          <motion.div
                            className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 transition-all duration-500 ${
                              isActive
                                ? `${node.bgClass} border ${node.borderClass} ${node.textClass}`
                                : "bg-white/5 border border-white/10 text-white/60"
                            }`}
                            animate={isActive ? {
                              scale: [1, 1.15, 1],
                              rotate: [0, 5, -5, 0],
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse",
                              delay: 0.4,
                            }}
                          >
                            <IconComponent className="w-4.5 h-4.5" />
                          </motion.div>
                          <h4 className={`text-[11px] font-bold leading-tight transition-all duration-500 ${isActive ? "text-white" : "text-white/80"}`}>
                            {node.title}
                          </h4>
                          <span className={`text-[9px] font-medium mt-1 px-1.5 py-0.5 rounded border transition-all duration-500 ${
                            isActive
                              ? node.badgeClass
                              : "bg-white/3 text-white/40 border-white/5"
                          }`}>
                            {node.subtitle}
                          </span>
                        </motion.div>

                        {index < 4 && (
                          <ChevronRight className={`w-4 h-4 rotate-90 md:rotate-0 transition-all duration-500 ${
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

            {/* Card 3: Live Performance Monitoring (Repositioned, Aligned Perfectly in Left Column) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full flex flex-col justify-between glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden group border border-glass-border shadow-glow"
            >
              {/* Ambient environmental glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-brand-cyan/5 blur-[50px] pointer-events-none" />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 z-10">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center"
                    >
                      <Activity className="w-5 h-5 text-cyan-400 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                    </motion.div>{" "}
                    Live Performance Monitoring
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1.5 font-medium">Real-time tracking of lead pipeline automation efficiency</p>
                </div>

                {/* Tabs */}
                <div className="flex p-1 rounded-xl bg-white/5 border border-white/5 text-xs">
                  {(["hours", "tasks", "revenue"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-all duration-300 ${
                        activeTab === tab
                          ? tab === "hours"
                            ? "bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/30 scale-105 font-bold"
                            : tab === "tasks"
                            ? "bg-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/30 scale-105 font-bold"
                            : "bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 scale-105 font-bold"
                          : "text-text-secondary hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
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
              <div className="h-80 sm:h-[420px] w-full relative bg-white/2 rounded-2xl border border-white/5 flex items-end overflow-hidden p-2 z-10">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={activeTab === "revenue" ? "#F97316" : activeTab === "hours" ? "#3B82F6" : "#06B6D4"} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={activeTab === "revenue" ? "#F97316" : activeTab === "hours" ? "#3B82F6" : "#06B6D4"} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  <line x1="0" y1="37.5" x2="400" y2="37.5" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="112.5" x2="400" y2="112.5" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  
                  <motion.path
                    initial={{ pathLength: 0, strokeDashoffset: 0 }}
                    animate={{ pathLength: 1, strokeDashoffset: [0, -24] }}
                    transition={{
                      pathLength: { duration: 1.5, ease: "easeOut" },
                      strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: "linear" }
                    }}
                    d="M 0 120 C 50 110, 80 50, 130 65 C 180 80, 220 20, 280 40 C 330 60, 360 15, 400 25"
                    fill="none"
                    stroke={activeTab === "revenue" ? "#F97316" : activeTab === "hours" ? "#3B82F6" : "#06B6D4"}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="6, 6"
                  />
                  <path
                    d="M 0 120 C 50 110, 80 50, 130 65 C 180 80, 220 20, 280 40 C 330 60, 360 15, 400 25 L 400 150 L 0 150 Z"
                    fill="url(#chartGrad)"
                    className="opacity-50"
                  />

                  {/* Stage Data Points synchronized with Active Step of Pipeline */}
                  {[
                    { cx: 15, cy: 118, color: "#EAB308", step: 0 },
                    { cx: 105, cy: 58, color: "#3B82F6", step: 1 },
                    { cx: 200, cy: 75, color: "#F97316", step: 2 },
                    { cx: 305, cy: 50, color: "#A855F7", step: 3 },
                    { cx: 380, cy: 23, color: "#10B981", step: 4 },
                  ].map((pt, i) => {
                    const isActive = activeStep === pt.step;
                    return (
                      <g key={i}>
                        {/* Outer Glow Pulsing Aura */}
                        {isActive && (
                          <motion.circle
                            cx={pt.cx}
                            cy={pt.cy}
                            r={10}
                            fill={pt.color}
                            opacity={0.5}
                            animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                        {/* Core Dot */}
                        <circle
                          cx={pt.cx}
                          cy={pt.cy}
                          r={isActive ? 5 : 3.5}
                          fill={pt.color}
                          className="transition-all duration-300"
                          style={{
                            filter: isActive ? `drop-shadow(0 0 12px ${pt.color})` : "none",
                            opacity: isActive ? 1 : 0.6,
                          }}
                        />
                      </g>
                    );
                  })}
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

          </div>

          {/* Right Column: AI Operations Core (4 Columns Wide, Expanded) */}
          <div className="lg:col-span-4 flex flex-col h-full">

            {/* Card 2: AI Operations Core */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full flex-1 h-full flex flex-col justify-between glass-panel rounded-3xl p-6 md:p-8 border border-glass-border shadow-md relative overflow-hidden"
            >
              <div>
                {/* Header: AI Orchestration Core */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="flex items-center"
                      >
                        <Cpu className="w-5 h-5 text-purple-400 filter drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
                      </motion.div>{" "}
                      AI Operations Core
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary mt-1.5 font-medium">Orchestration active & routing workflows in real time</p>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex-shrink-0">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">Synced</span>
                  </div>
                </div>

                {/* Central Agent Stack with Vertical Connection Flow */}
                <div className="relative space-y-5 md:space-y-6">
                  {/* Vertical timeline connector line down the left */}
                  <div className="absolute left-[23px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-yellow-500/30 via-blue-500/30 via-orange-500/30 to-purple-500/30 pointer-events-none">
                    {/* Animated laser pulse traversing the vertical pipeline */}
                    <motion.div
                      className="absolute top-0 left-[-1.5px] w-1 h-12 bg-gradient-to-b from-brand-cyan to-brand-purple rounded-full blur-[1px]"
                      animate={{ top: ["0%", "100%"] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {agents.map((agent) => {
                    const AgentIcon = agent.icon || Bot;
                    return (
                      <motion.div
                        key={agent.id}
                        className="relative group flex items-start gap-4 p-5 md:p-6 rounded-2xl border transition-all duration-500 bg-white/2 hover:bg-white/4 cursor-pointer overflow-hidden"
                        style={{
                          borderColor: agent.borderColor,
                          background: agent.bgGlow,
                        }}
                        whileHover={{
                          scale: 1.015,
                          borderColor: agent.accentColor,
                          boxShadow: `0 0 15px -4px ${agent.accentColor}40`,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        {/* Subtle background flow pulse lines */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/1 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                        {/* Pulsing indicator light */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <span className="text-[8px] font-mono text-white/40 tracking-wider uppercase font-semibold">{agent.status}</span>
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: agent.accentColor }}></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: agent.accentColor }}></span>
                          </span>
                        </div>

                        {/* Icon Container with Accent Glow */}
                        <div className="relative z-10 flex-shrink-0">
                          <motion.div
                            className="absolute inset-0 rounded-xl opacity-20 blur-md"
                            style={{ backgroundColor: agent.accentColor }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <div
                            className="w-12 h-12 rounded-xl border flex items-center justify-center relative bg-black/40"
                            style={{
                              borderColor: agent.borderColor,
                              color: agent.accentColor
                            }}
                          >
                            <AgentIcon className="w-5 h-5" />
                          </div>
                        </div>

                        {/* Info Details */}
                        <div className="flex-1 min-w-0">
                          <div>
                            <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-white transition-colors">
                              {agent.name}
                            </h4>
                            <p className="text-[10px] text-white/50 tracking-wide font-medium mt-0.5">
                              {agent.type}
                            </p>
                          </div>

                          {/* Metrics Row */}
                          <div className="flex items-center gap-3 mt-2 font-mono text-[9px]">
                            <div className="flex items-center gap-1">
                              <span className="text-white/40">Active:</span>
                              <span className="font-bold text-white tracking-wider tabular-nums">
                                {agent.metricValue.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-[1px] h-2 bg-white/10" />
                            <span className="text-white/40 whitespace-normal break-words">{agent.metricAccuracy}</span>
                          </div>

                          {/* Live activity text box with pulsing terminal cursor */}
                          <div className="mt-2 text-[10px] font-mono text-white/70 bg-black/20 p-1.5 rounded-lg border border-white/5 flex items-start gap-1">
                            <span className="text-white/30 flex-shrink-0">&gt;</span>
                            <motion.span
                              initial={{ opacity: 0.8 }}
                              animate={{ opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              className="whitespace-normal break-words"
                            >
                              {agent.activity}
                            </motion.span>
                            <motion.span
                              className="inline-block w-1.5 h-3 ml-0.5 flex-shrink-0"
                              style={{ backgroundColor: agent.accentColor }}
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Live Operations Feed Segment */}
                <div className="mt-6 pt-5 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-brand-purple animate-pulse" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">Live Operations Feed</span>
                  </div>

                  <div className="space-y-2 max-h-[140px] overflow-hidden relative">
                    <AnimatePresence mode="popLayout">
                      {liveEvents.map((event) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.35 }}
                          className="flex items-center justify-between text-[9px] font-mono bg-white/2 hover:bg-white/4 border border-white/3 p-2 rounded-xl transition-all duration-300"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: event.color }} />
                            <motion.p
                              initial={{ opacity: 0.8 }}
                              animate={{ opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              className="text-white/80 whitespace-normal break-words"
                            >
                              {event.text}
                            </motion.p>
                          </div>
                          <span className="text-white/40 flex-shrink-0 ml-2 font-medium">{event.time}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-2.5 rounded-xl border border-white/10 hover:border-brand-purple/40 text-xs font-semibold text-white hover:bg-brand-purple/5 transition-all duration-300 flex items-center justify-center gap-1.5">
                Launch Agent Studio <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

          </div>

          {/* Card 5: CRM Live Qualified Actions (Full Width / 12 Columns Wide, Bottom) */}
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
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center"
                    >
                      <Users className="w-5 h-5 text-cyan-400 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                    </motion.div>{" "}
                    CRM & Automated Outreach Feed
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">Leads captured, filtered, and qualified automatically by AI</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-text-secondary font-mono">Synced with Salesforce, HubSpot, Zapier</span>
                </div>
              </div>

              {/* Actions Feed Vertical Log Stream */}
              <div className="flex flex-col gap-3 md:gap-4">
                <AnimatePresence mode="popLayout">
                  {crmActions.map((action) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ x: 6, backgroundColor: "rgba(255, 255, 255, 0.04)" }}
                      className="bg-white/2 hover:bg-white/4 border border-white/5 p-4 md:p-5 rounded-2xl hover:border-brand-cyan/20 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4 min-w-0 flex-1">
                        {/* Platform Badge */}
                        <span className={`text-[10px] uppercase font-mono font-extrabold px-3 py-1 rounded-full border tracking-widest text-center self-start md:self-auto ${
                          action.platform === "HUBSPOT"
                            ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                            : action.platform === "APOLLO.IO"
                            ? "bg-brand-purple/10 text-brand-purple border-brand-purple/20"
                            : action.platform === "CALENDLY"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20"
                        }`}>
                          {action.platform}
                        </span>

                        {/* Title and Metadata */}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-white tracking-wide mb-1.5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                            {action.eventTitle}
                          </h4>
                          <div className="text-xs font-mono text-text-secondary/90 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5 whitespace-normal break-words">
                            <span className="text-brand-cyan/70 mr-1.5">&gt;_</span>
                            <motion.span
                              initial={{ opacity: 0.9 }}
                              animate={{ opacity: [0.9, 1, 0.9] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                              {action.metadata}
                            </motion.span>
                          </div>
                        </div>
                      </div>

                      {/* Right Section: Status, Value & Time */}
                      <div className="flex items-center justify-between md:justify-end gap-4 flex-shrink-0">
                        {action.value && (
                          <div className="text-xs font-mono font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                            {action.value}
                          </div>
                        )}
                        <span className={`text-[10px] uppercase font-mono font-extrabold px-2.5 py-1 rounded-full border tracking-wider ${
                          action.status === "SUCCESS"
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                            : action.status === "DEPLOYED"
                            ? "bg-purple-500/15 text-purple-400 border-purple-500/25"
                            : action.status === "BOOKED"
                            ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                            : "bg-cyan-500/15 text-cyan-400 border-cyan-500/25"
                        }`}>
                          {action.status}
                        </span>
                        <span className="text-xs text-text-secondary font-mono min-w-[70px] text-right">{action.time}</span>
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
