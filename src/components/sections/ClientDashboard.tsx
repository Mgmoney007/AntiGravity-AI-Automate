"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Bot,
  Workflow,
  Users,
  CheckCircle2,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Briefcase,
  Layers,
  ChevronRight,
  Sparkles,
  Cpu,
  Database,
  Radio,
  Terminal,
  ShieldCheck,
  Server,
  ArrowUpRight,
} from "lucide-react";

// Mock Agent Initial Configuration
const initialAgents = [
  {
    id: 1,
    name: "LeadScout-v4",
    type: "Lead Triage & Qualification",
    accentColor: "#EAB308", // Amber
    bgGlow: "rgba(234, 179, 8, 0.03)",
    borderColor: "rgba(234, 179, 8, 0.15)",
    icon: Activity,
    metricLabel: "Qualified Today",
    metricAccuracy: "99.4% Accuracy",
    activity: "Scanned inbound lead request from enterprise tier and initiated profiling",
    metricValue: 342,
  },
  {
    id: 2,
    name: "OmniSupport-v2",
    type: "Omnichannel Customer Support",
    accentColor: "#3B82F6", // Blue
    bgGlow: "rgba(59, 130, 246, 0.03)",
    borderColor: "rgba(59, 130, 246, 0.15)",
    icon: Bot,
    metricLabel: "Resolved Today",
    metricAccuracy: "<45ms Response Time",
    activity: "Resolved billing query for client subscription #8210 via Stripe API",
    metricValue: 1248,
  },
  {
    id: 3,
    name: "DataSync-v1.5",
    type: "Real-time CRM Synchronizer",
    accentColor: "#F97316", // Orange
    bgGlow: "rgba(249, 115, 22, 0.03)",
    borderColor: "rgba(249, 115, 22, 0.15)",
    icon: Layers,
    metricLabel: "Automated CRM Syncs",
    metricAccuracy: "0 Failures Detected",
    activity: "Synchronizing contact record to HubSpot contacts tier in real time",
    metricValue: 12840,
  },
  {
    id: 4,
    name: "DealCloser-v3",
    type: "Autonomous Outreach Specialist",
    accentColor: "#A855F7", // Purple
    bgGlow: "rgba(168, 85, 247, 0.03)",
    borderColor: "rgba(168, 85, 247, 0.15)",
    icon: Zap,
    metricLabel: "Meetings Booked Today",
    metricAccuracy: "$142,500 Pipeline Generated",
    activity: "Sent hyper-personalized follow-up to enterprise VP of Sales",
    metricValue: 48,
  }
];

const initialCrmActions = [
  {
    id: 1,
    platform: "HUBSPOT",
    eventTitle: "CRM Contact Created & Enriched",
    metadata: "id: hs_84209 | name: Marcus Sterling | org: Acme Corp | tier: Enterprise",
    status: "SUCCESS",
    value: 18500,
    confidence: 99.4,
  },
  {
    id: 2,
    platform: "APOLLO.IO",
    eventTitle: "Outreach Campaign Dispatched",
    metadata: "campaign: ent_scaling_2026 | recipient: m.sterling@acme.com | seq: 1",
    status: "DEPLOYED",
    value: 8500,
    confidence: 98.2,
  },
  {
    id: 3,
    platform: "CALENDLY",
    eventTitle: "Discovery Briefing Booked",
    metadata: "event: 30-min-intro | host: Sarah Jenkins (VP Sales) | date: 2026-05-12",
    status: "BOOKED",
    value: 12500,
    confidence: 99.1,
  },
  {
    id: 4,
    platform: "SALESFORCE",
    eventTitle: "Opportunity Stage Auto-Updated",
    metadata: "opp_id: sf_7c666 | stage: Discovery | val: $42,000 | owner: AI-Agent-v4",
    status: "SYNCED",
    value: 42000,
    confidence: 97.8,
  }
];

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

interface CrmAction {
  id: number;
  platform: string;
  eventTitle: string;
  metadata: string;
  status: string;
  value?: number;
  confidence: number;
  isSpecial?: boolean;
}

export default function ClientDashboard() {
  const [agents, setAgents] = useState(initialAgents);
  const [crmActions, setCrmActions] = useState<CrmAction[]>(initialCrmActions);
  const [activeTab, setActiveTab] = useState<"hours" | "tasks" | "revenue">("hours");
  const [triggerPulse, setTriggerPulse] = useState(false);
  const [tasksRun, setTasksRun] = useState(84209);
  const [hoursSaved, setHoursSaved] = useState(1248);
  const [activeStep, setActiveStep] = useState(0);

  // Time metrics state to update second increments continuously
  const [secondsAgo, setSecondsAgo] = useState([4, 120, 480, 900]);

  // Super Pulse Orchestration Sequence States
  const [pulseStage, setPulseStage] = useState<"idle" | "core" | "pipeline" | "graph" | "crm">("idle");
  const [floatingLabel, setFloatingLabel] = useState("AI Routing Stable");
  const [floatingLabelColor, setFloatingLabelColor] = useState("text-cyan-400 border-cyan-500/30 bg-cyan-500/5");

  // Sync floating graph label with current active pipeline step
  useEffect(() => {
    if (pulseStage !== "idle") return;
    const labels = [
      { text: "Lead Captured - Routing Initiated", color: "text-amber-400 border-amber-500/20 bg-amber-500/5", step: 0 },
      { text: "AI Qualification - Score: 98.4%", color: "text-blue-400 border-blue-500/20 bg-blue-500/5", step: 1 },
      { text: "CRM Contact Enriched & Replicated", color: "text-orange-400 border-orange-500/20 bg-orange-500/5", step: 2 },
      { text: "Dynamic Apollo Outreach Launched", color: "text-purple-400 border-purple-500/20 bg-purple-500/5", step: 3 },
      { text: "Calendly Sync Complete - Booked", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5", step: 4 }
    ];
    const current = labels[activeStep];
    setFloatingLabel(current.text);
    setFloatingLabelColor(current.color);
  }, [activeStep, pulseStage]);

  // Standard step progression
  useEffect(() => {
    if (pulseStage !== "idle") return;
    const pipelineInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(pipelineInterval);
  }, [pulseStage]);

  // Dynamic seconds counter increment
  useEffect(() => {
    const secInterval = setInterval(() => {
      setSecondsAgo((prev) => prev.map((s) => s + 1));
    }, 1000);
    return () => clearInterval(secInterval);
  }, []);

  // Format seconds into highly realistic, dynamic timestamps
  const formatSecondsAgo = (seconds: number) => {
    if (seconds < 60) return `${seconds}s ago`;
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  // Automated Real-Time Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTriggerPulse(true);
      setTasksRun((prev) => prev + Math.floor(Math.random() * 3) + 1);
      if (Math.random() > 0.7) {
        setHoursSaved((prev) => prev + 1);
      }
      setTimeout(() => setTriggerPulse(false), 800);

      // Dynamically tick up CRM pipeline values to simulate active growth
      setCrmActions((prev) =>
        prev.map((act) => {
          if (Math.random() > 0.75 && typeof act.value === "number") {
            return {
              ...act,
              value: act.value + Math.floor(Math.random() * 45) + 15,
              confidence: Math.min(99.9, +(act.confidence + Math.random() * 0.1).toFixed(1))
            };
          }
          return act;
        })
      );

      // Increment agent metric values
      setAgents((prev) =>
        prev.map((agent) => {
          if (Math.random() > 0.5) {
            return {
              ...agent,
              metricValue: agent.metricValue + Math.floor(Math.random() * 2) + 1,
            };
          }
          return agent;
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // THE "HOLY SH*T" MOMENT: Grand Cascade Orchestration Sequence
  // Triggers every 24 seconds, orchestrating an incredible system-wide wave
  useEffect(() => {
    const triggerSuperPulseSequence = () => {
      // Step 1: Core Burst at AI Operations Core
      setPulseStage("core");
      setFloatingLabel("SYSTEM CASCADE: Core Orchestration Initiated");
      setFloatingLabelColor("text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-500/10 shadow-[0_0_15px_rgba(240,70,250,0.2)]");
      setTasksRun((prev) => prev + 42);

      // Step 2: Cascade through Lead Pipeline
      setTimeout(() => {
        setPulseStage("pipeline");
        setFloatingLabel("SYSTEM CASCADE: Energy Routing Active");
        setFloatingLabelColor("text-amber-400 border-amber-500/40 bg-amber-500/10");
        let step = 0;
        const speedInterval = setInterval(() => {
          setActiveStep(step);
          step++;
          if (step >= 5) clearInterval(speedInterval);
        }, 300);
      }, 1500);

      // Step 3: Performance Graph Peak Spike
      setTimeout(() => {
        setPulseStage("graph");
        setFloatingLabel("SYSTEM CASCADE: Routing Throughput Spike [9.8 GB/s]");
        setFloatingLabelColor("text-cyan-400 border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]");
      }, 3500);

      // Step 4: High-Value CRM Feed Injection
      setTimeout(() => {
        setPulseStage("crm");
        setFloatingLabel("SYSTEM CASCADE: Autopilot Deal Sealed");
        setFloatingLabelColor("text-emerald-400 border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]");

        const specialAction = {
          id: Date.now() + 777,
          platform: "AUTOPILOT",
          eventTitle: "SYSTEM CASCADE: High-Value Deal Locked",
          metadata: "id: ap_99420 | org: Vanguard Enterprises | tier: Global | val: $145,000 ARR",
          status: "AUTOPILOT",
          value: 145000,
          confidence: 99.9,
          isSpecial: true,
        };

        setCrmActions((prev) => [specialAction, ...prev.slice(0, 3)]);
        setSecondsAgo((prev) => [0, ...prev.slice(0, 3)]);
      }, 5500);

      // Step 5: Reset back to standard loop
      setTimeout(() => {
        setPulseStage("idle");
      }, 9500);
    };

    // First sequence triggers after 12s, then loops every 28s
    const initialTimeout = setTimeout(() => {
      triggerSuperPulseSequence();
    }, 12000);

    const interval = setInterval(() => {
      triggerSuperPulseSequence();
    }, 28000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Determine active status of agents based on step sync
  const isAgent1Active = activeStep === 0 || pulseStage === "core";
  const isAgent2Active = activeStep === 1 || pulseStage === "core";
  const isAgent3Active = activeStep === 2 || pulseStage === "core";
  const isAgent4Active = activeStep === 3 || activeStep === 4 || pulseStage === "core";

  return (
    <section id="client-dashboard" className="py-24 relative overflow-hidden bg-transparent">
      {/* 1. ENVIRONMENTAL DEPTH: Immersive atmospheric light diffusion & digital grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40 -z-20" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none -z-10" />

      {/* Volumetric ambient lighting orbs shifting slowly */}
      <motion.div
        className="absolute top-[15%] left-[5%] w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[5%] w-[700px] h-[700px] rounded-full bg-purple-500/5 blur-[160px] pointer-events-none -z-10"
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Global Synchronized "Holy Sh*t" Moment Header HUD Indicator */}
      <AnimatePresence>
        {pulseStage !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="flex items-center gap-3 bg-fuchsia-500/10 border border-fuchsia-500/30 px-5 py-2 rounded-full backdrop-blur-xl shadow-[0_0_30px_rgba(240,70,250,0.3)]">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping" />
              <span className="text-[10px] font-mono font-black text-fuchsia-400 uppercase tracking-widest">
                SYSTEM CASCADE ORCHESTRATION EVENT IN PROGRESS
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-brand-cyan/20 px-4 py-1.5 rounded-full bg-brand-cyan/5 text-brand-cyan text-xs font-semibold uppercase tracking-wider mb-6 hover:border-brand-cyan/40 transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Client Portal Live Preview
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-heading mb-4 text-white filter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
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
            An autonomous orchestration ecosystem actively coordinating workflows, agents, CRM automation, routing, and live business intelligence in real time.
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
              className={`w-full flex flex-col justify-between glass-panel rounded-3xl p-6 md:p-8 border relative overflow-hidden transition-all duration-700 ${
                pulseStage === "pipeline" 
                  ? "border-fuchsia-500/50 shadow-[0_0_40px_rgba(240,70,250,0.15)] bg-fuchsia-950/5" 
                  : "border-glass-border shadow-md"
              }`}
            >
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                  <motion.div
                    animate={pulseStage === "pipeline" ? { scale: [1, 1.25, 1], rotate: 180 } : { scale: [1, 1.12, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center"
                  >
                    <Workflow className={`w-5 h-5 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] ${pulseStage === "pipeline" ? "text-fuchsia-400" : "text-cyan-400"}`} />
                  </motion.div>{" "}
                  Lead Pipeline Automation
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary mt-1.5 font-medium mb-8">Visualization of active lead to client workflow paths</p>

                {/* Node Map Grid */}
                <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 pt-14 pb-6 px-4 border border-white/5 bg-brand-black/40 rounded-2xl">
                  
                  {/* Master horizontal glidewire (running across the top of all 5 nodes) */}
                  <div className="absolute top-[24px] left-[10%] right-[10%] h-[3px] bg-white/5 z-10 hidden md:block rounded-full">
                    
                    {/* Background track indicator */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-blue-500/10 via-orange-500/10 via-purple-500/10 to-emerald-500/10" />
                    
                    {/* Flowing active energy segment */}
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

                    {/* Glowing moving dot (power transmission pulse) */}
                    <motion.div
                      className="absolute w-3.5 h-3.5 rounded-full top-[-5px] -translate-x-1/2 bg-white"
                      style={{
                        boxShadow: "0 0 15px #fff, 0 0 30px rgba(34,211,238,0.6)",
                      }}
                      animate={{
                        left: stepPercentages[activeStep],
                      }}
                      transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    />

                    {/* Kinetic particles moving horizontally along paths */}
                    {[0, 1, 2].map((pId) => (
                      <motion.div
                        key={pId}
                        className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                        style={{ left: "0%" }}
                        animate={{
                          left: ["0%", "100%"],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 4 + pId,
                          repeat: Infinity,
                          ease: "linear",
                          delay: pId * 1.5,
                        }}
                      />
                    ))}
                  </div>

                  {pipelineNodes.map((node, index) => {
                    const IconComponent = node.icon;
                    const isActive = activeStep === index;
                    return (
                      <React.Fragment key={node.id}>
                        <motion.div
                          className={`flex flex-col items-center text-center bg-brand-black/50 border p-3.5 rounded-2xl w-28 relative transition-all duration-500 cursor-pointer ${
                            isActive
                              ? `${node.borderClass} ${node.bgClass}`
                              : "border-white/5 hover:border-white/10"
                          }`}
                          animate={{
                            scale: isActive ? 1.05 : 1,
                            boxShadow: isActive ? `0 0 25px ${node.activeColor}` : "none",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                          }}
                        >
                          {/* Vertical Connector Dropline Dropping Down Directly into Center/Top of Node Card */}
                          <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 w-[2px] h-[24px] hidden md:block z-10">
                            {/* Idle low-opacity track */}
                            <div className="absolute inset-0 bg-white/10" />
                            {/* Active glowing dropline energy beam */}
                            <motion.div
                              className="absolute inset-0 origin-top"
                              style={{
                                background: node.activeColor.replace("0.25", "0.9") || "rgba(59, 130, 246, 0.9)",
                                boxShadow: `0 0 10px ${node.activeColor.replace("0.25", "1")}`,
                              }}
                              initial={{ scaleY: 0 }}
                              animate={{
                                scaleY: isActive ? 1 : 0,
                              }}
                              transition={{
                                duration: 0.3,
                                ease: "easeOut",
                              }}
                            />
                            {/* Laser Particle dropping down on activation */}
                            {isActive && (
                              <motion.div
                                className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff] left-[-0.75px]"
                                initial={{ top: "0%" }}
                                animate={{ top: "100%" }}
                                transition={{ duration: 0.5, repeat: Infinity, ease: "easeIn" }}
                              />
                            )}
                          </div>

                          {/* Outer Shockwave Pulsing Aura on Activation */}
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 rounded-2xl border opacity-70"
                              style={{ borderColor: node.activeColor.replace("0.25", "0.8") }}
                              initial={{ scale: 0.9, opacity: 0.8 }}
                              animate={{ scale: 1.25, opacity: 0 }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                            />
                          )}

                          <motion.div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-500 relative ${
                              isActive
                                ? `${node.bgClass} border ${node.borderClass} ${node.textClass}`
                                : "bg-white/5 border border-white/10 text-white/50"
                            }`}
                            animate={isActive ? {
                              scale: [1, 1.15, 1],
                              rotate: [0, 5, -5, 0],
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          >
                            <IconComponent className="w-5 h-5" />
                          </motion.div>
                          
                          <h4 className={`text-[11px] font-bold leading-tight transition-all duration-500 ${isActive ? "text-white" : "text-white/60"}`}>
                            {node.title}
                          </h4>
                          
                          <span className={`text-[9px] font-semibold mt-1.5 px-1.5 py-0.5 rounded border transition-all duration-500 ${
                            isActive
                              ? node.badgeClass
                              : "bg-white/3 text-white/40 border-white/5"
                          }`}>
                            {node.subtitle}
                          </span>
                        </motion.div>

                        {index < 4 && (
                          <ChevronRight className={`w-4 h-4 rotate-90 md:rotate-0 transition-all duration-500 ${
                            activeStep === index ? node.textClass : "text-text-secondary/40"
                          }`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 text-xs text-text-secondary">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse relative">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                  </span>
                  Live Pipeline Sync (Latency: 142ms)
                </span>
                <button className="text-brand-cyan hover:text-brand-cyan/80 hover:underline font-semibold flex items-center gap-1 transition-all">
                  Configure Nodes <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Environmental Cascade Orchestration Bar (Positioned outside the cards as a subtle system layer) */}
            <div className="w-full relative overflow-hidden transition-all duration-500 min-h-[38px] mt-2 mb-1">
              <AnimatePresence mode="wait">
                {pulseStage !== "idle" ? (
                  <motion.div
                    key="orchestration-active"
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full bg-brand-black/60 border border-fuchsia-500/20 rounded-2xl p-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-3 backdrop-blur-xl relative overflow-hidden shadow-[0_0_20px_rgba(240,70,250,0.05)]"
                  >
                    {/* Moving background glow segment */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/20 to-fuchsia-500/0 animate-shimmer" style={{ animationDuration: "3s" }} />
                    
                    <span className="flex items-center gap-2 text-[10px] font-mono text-fuchsia-400 font-bold uppercase tracking-widest relative z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-ping" />
                      System Cascade Orchestration Active
                    </span>
                    <span className="text-[9px] font-mono text-text-secondary/80 font-medium relative z-10 hidden sm:inline-block">
                      [STAGE: <span className="text-white font-bold">{pulseStage.toUpperCase()}</span>] • ROUTING KINETIC ENERGY THROUGH SYSTEM CORE
                    </span>
                    <div className={`px-2.5 py-0.5 rounded border text-[9px] font-mono font-bold tracking-wider relative z-10 backdrop-blur-md ${floatingLabelColor}`}>
                      {floatingLabel}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="orchestration-idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full bg-brand-black/20 border border-white/5 rounded-2xl p-2 px-4 flex justify-between items-center gap-3"
                  >
                    <span className="flex items-center gap-2 text-[9px] font-mono text-text-secondary/50 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/30" />
                      Telemetry Routing Stable
                    </span>
                    <span className="text-[9px] font-mono text-text-secondary/40">
                      LATENCY: 142ms • PACKET LOSS: 0.00%
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Card 2: AI Operational Throughput Monitoring */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`w-full flex flex-col justify-between glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden group border transition-all duration-700 ${
                pulseStage === "graph"
                  ? "border-fuchsia-500/50 shadow-[0_0_40px_rgba(240,70,250,0.15)] bg-fuchsia-950/5"
                  : "border-glass-border shadow-glow"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 z-10">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-center"
                    >
                      <Activity className="w-5 h-5 text-cyan-400 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                    </motion.div>{" "}
                    AI Operational Throughput Monitoring
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1.5 font-medium">Real-time tracking of lead pipeline automation efficiency</p>
                </div>

                {/* Premium Glass Segmented Control */}
                <div className="flex p-[3px] rounded-full bg-brand-black/20 border border-white/5 text-xs relative overflow-hidden backdrop-blur-xl shadow-inner">
                  {(["hours", "tasks", "revenue"] as const).map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="px-4 py-1.5 rounded-full font-bold capitalize relative transition-all duration-300 z-10 text-[10px] outline-none tracking-wide"
                        style={{
                          color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
                        }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeThroughputTab"
                            className="absolute inset-0 rounded-full border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.03)] backdrop-blur-sm"
                            style={{
                              background:
                                tab === "hours"
                                  ? "linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.02) 100%)"
                                  : tab === "tasks"
                                  ? "linear-gradient(180deg, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.02) 100%)"
                                  : "linear-gradient(180deg, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0.02) 100%)",
                              borderColor:
                                tab === "hours"
                                  ? "rgba(59, 130, 246, 0.2)"
                                  : tab === "tasks"
                                  ? "rgba(6, 182, 212, 0.2)"
                                  : "rgba(249, 115, 22, 0.2)",
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          >
                            <div className="absolute inset-x-2 bottom-0 h-px" style={{ 
                                background: tab === "hours" ? "rgba(59,130,246,0.5)" : tab === "tasks" ? "rgba(6,182,212,0.5)" : "rgba(249,115,22,0.5)",
                                boxShadow: tab === "hours" ? "0 -2px 10px rgba(59,130,246,0.5)" : tab === "tasks" ? "0 -2px 10px rgba(6,182,212,0.5)" : "0 -2px 10px rgba(249,115,22,0.5)"
                            }} />
                          </motion.div>
                        )}
                        <span className="relative z-20">{tab}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* High-fidelity Operational Chart Ecosystem */}
              <div className="h-[500px] sm:h-[550px] w-full relative rounded-2xl border border-white/5 flex items-end overflow-visible p-4 z-10 bg-[#020205]">
                
                {/* Layered Environmental Depth */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none mix-blend-screen z-0" />
                
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-cyan/5 to-brand-purple/5 opacity-30 pointer-events-none mix-blend-screen z-0" />

                {/* Localized Signal Diffusion / Digital Fog */}
                <motion.div 
                  className="absolute bottom-0 left-[20%] w-[60%] h-[50%] bg-cyan-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none z-10"
                  animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <motion.div 
                  className="absolute top-[30%] right-[10%] w-[30%] h-[40%] bg-fuchsia-500/5 blur-[60px] rounded-full mix-blend-screen pointer-events-none z-10"
                  animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.9, 1.2, 0.9] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                {/* Floating Signal Metrics (Integrated) */}
                <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:bottom-6 md:right-6 z-40 flex flex-row flex-wrap md:block pointer-events-none gap-2">
                  {/* Hours Saved Floating Indicator */}
                  <motion.div 
                    className="md:absolute md:top-0 md:left-0 bg-black/40 backdrop-blur-md border border-white/5 px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex-1 md:flex-none min-w-[140px]"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center shrink-0">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 text-brand-purple" />
                    </div>
                    <div>
                      <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-text-secondary/50 block font-mono">Hours Saved</span>
                      <span className="text-sm md:text-xl sm:text-2xl font-black font-mono text-white leading-none tracking-tight tabular-nums filter drop-shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                        {hoursSaved}h
                      </span>
                    </div>
                  </motion.div>

                  {/* Tasks Run Floating Indicator */}
                  <motion.div 
                    className="md:absolute md:top-[90px] md:left-0 bg-black/40 backdrop-blur-md border border-white/5 px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex-1 md:flex-none min-w-[140px]"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center shrink-0">
                      <Zap className="w-3 h-3 md:w-4 md:h-4 text-brand-cyan" />
                    </div>
                    <div>
                      <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-text-secondary/50 block font-mono">Tasks Run</span>
                      <span className={`text-sm md:text-xl sm:text-2xl font-black font-mono text-white leading-none tracking-tight tabular-nums transition-all duration-300 ${triggerPulse ? "text-brand-cyan scale-105 filter drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" : "filter drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]"}`}>
                        {tasksRun.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>

                  {/* Est Revenue Floating Indicator */}
                  <motion.div 
                    className="md:absolute md:top-0 md:right-0 bg-black/40 backdrop-blur-md border border-white/5 px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex-1 md:flex-none min-w-[140px]"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-brand-orange" />
                    </div>
                    <div>
                      <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-text-secondary/50 block font-mono">Est Revenue</span>
                      <span className="text-sm md:text-xl sm:text-2xl font-black font-mono text-white leading-none tracking-tight tabular-nums filter drop-shadow-[0_0_12px_rgba(249,115,22,0.3)]">
                        ${(hoursSaved * 45).toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Graph-Safe Plotting Area */}
                {/* This wrapper restricts the SVG rendering strictly below the floating widgets to prevent collisions */}
                <div className="absolute left-0 right-0 bottom-0 h-[65%] sm:h-[70%] z-20 pointer-events-none">
                  {/* Dynamic Contextual Event Labels (Floating near signal peaks) */}
                  <AnimatePresence>
                     <motion.div
                       key={pulseStage + activeStep}
                       initial={{ opacity: 0, scale: 0.9, y: 10 }}
                       animate={{ opacity: 1, scale: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 0.9, y: -10 }}
                       className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
                     >
                       <div className="bg-black/50 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                          <span className={`w-1.5 h-1.5 rounded-full animate-ping ${
                            pulseStage === "core" ? "bg-fuchsia-400" :
                            activeStep === 0 ? "bg-yellow-400" :
                            activeStep === 1 ? "bg-blue-400" :
                            activeStep === 2 ? "bg-orange-400" :
                            activeStep === 3 ? "bg-purple-400" : "bg-emerald-400"
                          }`} />
                          <span className="text-[10px] font-mono text-white/90 uppercase tracking-widest">
                            {pulseStage === "core" ? "Orchestration Surge" :
                             activeStep === 0 ? "Lead Surge Detected" :
                             activeStep === 1 ? "AI Qualification Active" :
                             activeStep === 2 ? "CRM Sync Boost" :
                             activeStep === 3 ? "AI Routing Spike" : "Meeting Cluster Triggered"}
                          </span>
                       </div>
                     </motion.div>
                  </AnimatePresence>
                  
                  <svg className="absolute inset-0 w-full h-full overflow-visible z-20 pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <defs>
                    <filter id="neonEdgeGlowThin" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="neonPulse" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Faint Horizontal Technical Grid Lines */}
                  <line x1="0" y1="25" x2="400" y2="25" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="125" x2="400" y2="125" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
                  <line x1="0" y1="175" x2="400" y2="175" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" strokeDasharray="3 3" />

                  {/* Faint Vertical Grid Lines for telemetry stages */}
                  <line x1="15" y1="0" x2="15" y2="200" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
                  <line x1="105" y1="0" x2="105" y2="200" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
                  <line x1="200" y1="0" x2="200" y2="200" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
                  <line x1="305" y1="0" x2="305" y2="200" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />
                  <line x1="380" y1="0" x2="380" y2="200" stroke="rgba(255,255,255,0.015)" strokeWidth="0.5" />

                  {/* Luminous Signal Curve (Thinner, Sharper Signal Line) */}
                  <motion.path
                    d={
                      pulseStage === "graph"
                        ? "M 0 160 C 50 80, 80 50, 130 55 C 180 50, 220 45, 280 48 C 330 52, 360 44, 400 45"
                        : "M 0 160 C 50 150, 80 90, 130 105 C 180 120, 220 60, 280 80 C 330 100, 360 55, 400 65"
                    }
                    fill="none"
                    stroke={activeTab === "revenue" ? "#F97316" : activeTab === "hours" ? "#3B82F6" : "#06B6D4"}
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    filter="url(#neonEdgeGlowThin)"
                    className="transition-all duration-700"
                  />

                  {/* High-speed glowing signal pulses moving through the graph line */}
                  <motion.path
                    d={
                      pulseStage === "graph"
                        ? "M 0 160 C 50 80, 80 50, 130 55 C 180 50, 220 45, 280 48 C 330 52, 360 44, 400 45"
                        : "M 0 160 C 50 150, 80 90, 130 105 C 180 120, 220 60, 280 80 C 330 100, 360 55, 400 65"
                    }
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeDasharray="4 250"
                    filter="url(#neonPulse)"
                    animate={{ strokeDashoffset: [254, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="opacity-90 transition-all duration-700"
                  />
                  
                  <motion.path
                    d={
                      pulseStage === "graph"
                        ? "M 0 160 C 50 80, 80 50, 130 55 C 180 50, 220 45, 280 48 C 330 52, 360 44, 400 45"
                        : "M 0 160 C 50 150, 80 90, 130 105 C 180 120, 220 60, 280 80 C 330 100, 360 55, 400 65"
                    }
                    fill="none"
                    stroke={activeTab === "revenue" ? "#F97316" : activeTab === "hours" ? "#3B82F6" : "#06B6D4"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="1 100"
                    filter="url(#neonPulse)"
                    animate={{ strokeDashoffset: [101, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                    className="opacity-100 transition-all duration-700"
                  />

                  {/* Stage Data Points synchronized with Active Step of Pipeline */}
                  {[
                    { cx: 15, cy: 158, color: "#EAB308", step: 0, text: "LEAD IN" },
                    { cx: 105, cy: 98, color: "#3B82F6", step: 1, text: "QUALIFIED" },
                    { cx: 200, cy: 115, color: "#F97316", step: 2, text: "CRM SYNC" },
                    { cx: 305, cy: 90, color: "#A855F7", step: 3, text: "DISPATCH" },
                    { cx: 380, cy: 63, color: "#10B981", step: 4, text: "BOOKED" },
                  ].map((pt, i) => {
                    const isActive = activeStep === pt.step;
                    const resolvedCy = pulseStage === "graph" ? pt.cy - 30 : pt.cy;
                    return (
                      <g key={i} className="overflow-visible z-30 pointer-events-none">
                        {/* Telemetry Stage Vertical Track Line (Faint indicator) */}
                        {isActive && (
                          <line
                            x1={pt.cx}
                            y1="0"
                            x2={pt.cx}
                            y2="200"
                            stroke={pt.color}
                            strokeWidth="0.5"
                            strokeDasharray="2 2"
                            className="opacity-30"
                          />
                        )}

                        {/* Outer Glow Pulsing Aura */}
                        {isActive && (
                          <motion.circle
                            cx={pt.cx}
                            cy={resolvedCy}
                            r={14}
                            fill={pt.color}
                            opacity={0.2}
                            animate={{ scale: [1, 2.5, 1], opacity: [0.2, 0, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}

                        {/* Core Micro-Dot */}
                        <circle
                          cx={pt.cx}
                          cy={resolvedCy}
                          r={isActive ? 3 : 2}
                          fill="#ffffff"
                          className="transition-all duration-500"
                          style={{
                            filter: isActive ? `drop-shadow(0 0 6px ${pt.color}) drop-shadow(0 0 12px ${pt.color})` : "none",
                            opacity: isActive ? 1 : 0.6,
                          }}
                        />

                        {/* TECHNICAL HUD info bracket on active coordinates */}
                        {isActive && (
                          <g className="pointer-events-none">
                            <motion.g
                              initial={{ opacity: 0, scale: 0.9, y: 5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ duration: 0.4, type: "spring" }}
                            >
                              {/* Floating Glass Box - Resized for minimal visual weight */}
                              <rect
                                x={pt.cx - 28}
                                y={resolvedCy - 22}
                                width={56}
                                height={14}
                                rx={7}
                                fill="rgba(2, 2, 5, 0.5)"
                                stroke={pt.color}
                                strokeWidth="0.4"
                                className="backdrop-blur-sm"
                              />
                              <text
                                x={pt.cx}
                                y={resolvedCy - 13}
                                textAnchor="middle"
                                fill="#ffffff"
                                fontSize="6.5"
                                fontFamily="monospace"
                                fontWeight="600"
                                letterSpacing="0.5"
                                className="drop-shadow-[0_0_3px_rgba(0,0,0,0.8)]"
                              >
                                {pt.text}
                              </text>
                            </motion.g>
                          </g>
                        )}
                      </g>
                    );
                  })}
                  </svg>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-[9px] text-text-secondary/40 font-mono flex justify-between z-20 pointer-events-none mix-blend-screen">
                  <span>08:00 AM • NODE_01</span>
                  <span className="hidden sm:inline">12:00 PM • NODE_02</span>
                  <span className="hidden sm:inline">04:00 PM • NODE_03</span>
                  <span className="flex items-center gap-1 text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    LIVE TELEMETRY
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: AI Operations Core (4 Columns Wide, Expanded) */}
          <div className="lg:col-span-4 flex flex-col h-full">

            {/* Card 3: AI Operations Core */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`w-full flex-1 h-full flex flex-col justify-between glass-panel rounded-3xl p-6 md:p-8 border relative overflow-hidden transition-all duration-700 ${
                pulseStage === "core"
                  ? "border-fuchsia-500/50 shadow-[0_0_40px_rgba(240,70,250,0.15)] bg-fuchsia-950/5"
                  : "border-glass-border shadow-md"
              }`}
            >
              <div>
                {/* Header: AI Orchestration Core */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                      <motion.div
                        animate={pulseStage === "core" ? { rotate: 360, scale: 1.2 } : { rotate: 360 }}
                        transition={pulseStage === "core" ? { duration: 2, ease: "easeInOut" } : { duration: 15, repeat: Infinity, ease: "linear" }}
                        className="flex items-center"
                      >
                        <Cpu className={`w-5 h-5 filter drop-shadow-[0_0_8px_rgba(192,132,252,0.6)] ${pulseStage === "core" ? "text-fuchsia-400" : "text-purple-400"}`} />
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
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">Active</span>
                  </div>
                </div>

                {/* Central Agent Stack with Vertical Connection Flow */}
                <div className="relative space-y-5 md:space-y-6">
                  
                  {/* Subtle Connection Lines between Agents */}
                  <div className="absolute left-[23px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-yellow-500/30 via-blue-500/30 via-orange-500/30 to-purple-500/30 pointer-events-none">
                    {/* Orchestration pulse waves traversing the vertical pipeline */}
                    <motion.div
                      className="absolute top-0 left-[-1.5px] w-1 h-12 bg-gradient-to-b from-brand-cyan to-brand-purple rounded-full blur-[1px]"
                      animate={{ top: ["0%", "100%"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {agents.map((agent) => {
                    const AgentIcon = agent.icon || Bot;
                    const isActive = 
                      (agent.id === 1 && isAgent1Active) ||
                      (agent.id === 2 && isAgent2Active) ||
                      (agent.id === 3 && isAgent3Active) ||
                      (agent.id === 4 && isAgent4Active);

                    return (
                      <motion.div
                        key={agent.id}
                        className="relative group flex items-start gap-4 p-5 md:p-6 rounded-2xl border transition-all duration-500 bg-brand-black/40 hover:bg-white/4 cursor-pointer overflow-hidden"
                        style={{
                          borderColor: isActive ? agent.accentColor : agent.borderColor,
                          boxShadow: isActive ? `0 0 20px ${agent.accentColor}25` : "none"
                        }}
                        whileHover={{
                          scale: 1.02,
                          borderColor: agent.accentColor,
                          boxShadow: `0 0 25px ${agent.accentColor}30`,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        {/* High-fidelity scanning background flow pulse */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/1 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                        {/* Pulsing indicator light */}
                        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                          <span className="text-[8px] font-mono text-white/40 tracking-wider uppercase font-semibold">
                            {isActive ? "PROCESSING" : "STANDBY"}
                          </span>
                          <span className="relative flex h-2 w-2">
                            {isActive && (
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: agent.accentColor }} />
                            )}
                            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: agent.accentColor }} />
                          </span>
                        </div>

                        {/* Icon Container with Accent Glow */}
                        <div className="relative z-10 flex-shrink-0">
                          <motion.div
                            className="absolute inset-0 rounded-xl opacity-20 blur-md"
                            style={{ backgroundColor: agent.accentColor }}
                            animate={isActive ? { scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] } : {}}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <div
                            className="w-12 h-12 rounded-xl border flex items-center justify-center relative bg-black/40"
                            style={{
                              borderColor: isActive ? agent.accentColor : agent.borderColor,
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

                          {/* Dynamic Agent Identity Micro-Animations */}
                          <div className="mt-2.5 flex items-center gap-3">
                            {agent.id === 1 && (
                              /* LeadScout Radar Scanner Sweep */
                              <div className="flex items-center gap-2">
                                <div className="relative w-4 h-4 rounded-full border border-yellow-500/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                                  <motion.div
                                    className="absolute inset-0 rounded-full border-t border-yellow-500 origin-center"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  />
                                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                </div>
                                <span className="text-[9px] font-mono text-yellow-500 font-bold uppercase tracking-wider">Triage Radar</span>
                              </div>
                            )}

                            {agent.id === 2 && (
                              /* OmniSupport Live Waveform Equalizer */
                              <div className="flex items-center gap-2">
                                <div className="flex items-end gap-0.5 h-3 flex-shrink-0">
                                  {[1, 2, 3, 4, 5].map((bar) => (
                                    <motion.div
                                      key={bar}
                                      className="w-0.5 rounded-full bg-blue-400"
                                      animate={{ height: isActive ? ["20%", "100%", "20%"] : "20%" }}
                                      transition={{
                                        duration: 0.4 + bar * 0.1,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }}
                                    />
                                  ))}
                                </div>
                                <span className="text-[9px] font-mono text-blue-400 font-bold uppercase tracking-wider">Voice Sync</span>
                              </div>
                            )}

                            {agent.id === 3 && (
                              /* DataSync Rotating Database Synchronization Cubes */
                              <div className="flex items-center gap-2">
                                <motion.div
                                  animate={isActive ? { rotate: -360 } : {}}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                  className="flex-shrink-0"
                                >
                                  <Database className="w-3.5 h-3.5 text-orange-400" />
                                </motion.div>
                                <span className="text-[9px] font-mono text-orange-400 font-bold uppercase tracking-wider">Sync State</span>
                              </div>
                            )}

                            {agent.id === 4 && (
                              /* DealCloser Confidence Sales Multiplier */
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 font-mono text-[9px] text-purple-400">
                                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                                  <span className="font-bold">98.6% Conf</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Metrics Row */}
                          <div className="flex items-center gap-3 mt-2 font-mono text-[9px]">
                            <div className="flex items-center gap-1">
                              <span className="text-white/40">{agent.metricLabel}:</span>
                              <span className="font-bold text-white tracking-wider tabular-nums">
                                {agent.metricValue.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-[1px] h-2.5 bg-white/10" />
                            <span className="text-white/40">{agent.metricAccuracy}</span>
                          </div>

                          {/* Live terminal box with pulsing indicator */}
                          <div className="mt-2.5 text-[10px] font-mono text-white/70 bg-black/30 p-2 rounded-lg border border-white/5 flex items-start gap-1">
                            <span className="text-white/30 flex-shrink-0">&gt;</span>
                            <motion.span
                              initial={{ opacity: 0.8 }}
                              animate={{ opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              className="whitespace-normal break-words leading-tight"
                            >
                              {pulseStage === "core" ? "CRITICAL BURST SEQUENCE RUNNING..." : agent.activity}
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

              </div>

              <button className="w-full mt-6 py-3 rounded-xl border border-white/10 hover:border-brand-purple/40 text-xs font-semibold text-white hover:bg-brand-purple/5 transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md">
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
            className={`lg:col-span-12 flex flex-col justify-between glass-panel rounded-3xl p-6 md:p-8 border transition-all duration-700 ${
              pulseStage === "crm"
                ? "border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.15)] bg-emerald-950/5"
                : "border-glass-border shadow-md"
            }`}
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
                    Live CRM Activity & Automated Outreach Stream
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">Leads captured, filtered, and qualified automatically by AI</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-text-secondary font-mono bg-white/5 border border-white/5 px-3 py-1 rounded-full">
                    Synced with Salesforce, HubSpot, Zapier
                  </span>
                </div>
              </div>

              {/* Actions Feed Vertical Log Stream */}
              <div className="flex flex-col gap-3 md:gap-4 relative">
                
                <AnimatePresence mode="popLayout">
                  {crmActions.map((action, index) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, x: -30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{ duration: 0.45, type: "spring", stiffness: 100 }}
                      whileHover={{ x: 6, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                      className={`border p-4 md:p-5 rounded-2xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        action.isSpecial
                          ? "bg-gradient-to-r from-fuchsia-950/20 via-amber-950/10 to-transparent border-fuchsia-500/40 hover:border-fuchsia-500 shadow-[0_0_20px_rgba(240,70,250,0.15)]"
                          : "bg-brand-black/30 hover:border-brand-cyan/20 border-white/5"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4 min-w-0 flex-1">
                        
                        {/* Platform Badge with high-end typography */}
                        <span className={`text-[9px] uppercase font-mono font-black px-3.5 py-1.5 rounded-full border tracking-widest text-center self-start md:self-auto shadow-md ${
                          action.platform === "HUBSPOT"
                            ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                            : action.platform === "APOLLO.IO"
                            ? "bg-brand-purple/10 text-brand-purple border-brand-purple/20"
                            : action.platform === "CALENDLY"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : action.platform === "AUTOPILOT"
                            ? "bg-gradient-to-r from-fuchsia-500/20 to-amber-500/20 text-amber-300 border-fuchsia-500/30 font-black animate-pulse"
                            : "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20"
                        }`}>
                          {action.platform}
                        </span>

                        {/* Title and Metadata */}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-white tracking-wide mb-1.5 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full animate-pulse ${action.isSpecial ? "bg-fuchsia-400" : "bg-brand-cyan"}`} />
                            {action.eventTitle}
                          </h4>
                          <div className="text-xs font-mono text-text-secondary/90 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5 whitespace-normal break-words flex items-center gap-1">
                            <span className="text-brand-cyan/70 flex-shrink-0">&gt;_</span>
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

                      {/* Right Section: AI Confidence Score, Value & Dynamic Real-time Timestamps */}
                      <div className="flex items-center justify-between md:justify-end gap-4 flex-shrink-0">
                        {/* AI Confidence Score Badge */}
                        <div className="flex flex-col items-end gap-1 font-mono text-[9px] bg-white/2 border border-white/5 px-2.5 py-1 rounded-lg">
                          <span className="text-white/40">Confidence</span>
                          <span className={`font-black tracking-wider ${action.isSpecial ? "text-fuchsia-400" : "text-brand-cyan"}`}>
                            {action.confidence}%
                          </span>
                        </div>

                        {action.value && (
                          <div className="text-xs font-mono font-extrabold text-white bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-1 tabular-nums">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                            ${action.value.toLocaleString()}
                          </div>
                        )}
                        
                        <span className={`text-[10px] uppercase font-mono font-black px-3 py-1.5 rounded-full border tracking-wider ${
                          action.status === "SUCCESS"
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                            : action.status === "DEPLOYED"
                            ? "bg-purple-500/15 text-purple-400 border-purple-500/25"
                            : action.status === "BOOKED"
                            ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                            : "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/25 animate-pulse"
                        }`}>
                          {action.status}
                        </span>
                        
                        <span className="text-xs text-text-secondary font-mono min-w-[70px] text-right font-medium">
                          {formatSecondsAgo(secondsAgo[index] || 0)}
                        </span>
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
