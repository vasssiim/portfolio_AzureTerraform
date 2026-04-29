/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  Terminal, 
  Lock, 
  Settings, 
  Cpu, 
  RefreshCw, 
  Activity, 
  Box, 
  ShieldCheck,
  Workflow,
  ExternalLink,
  Info,
  ChevronRight,
  LayoutDashboard,
  Server,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface FlowNodeProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  active?: boolean;
  onClick?: () => void;
  status?: 'completed' | 'in-progress' | 'pending';
  index: number;
}

const FlowNode: React.FC<FlowNodeProps> = ({ title, icon, description, active, onClick, status, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
        active 
          ? 'bg-white border-azure shadow-[0_20px_50px_rgba(0,138,215,0.15)] ring-1 ring-azure/20' 
          : 'bg-white/50 backdrop-blur-sm border-slate-200 hover:border-azure/30 hover:bg-white hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3.5 rounded-xl transition-colors duration-300 ${
          active ? 'bg-azure text-white shadow-lg shadow-azure/30' : 'bg-slate-100 text-slate-500 group-hover:bg-azure-light group-hover:text-azure'
        }`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`text-base font-bold tracking-tight transition-colors ${active ? 'text-slate-900' : 'text-slate-700'}`}>
              {title}
            </h3>
            {status === 'completed' && <CheckCircle2 size={14} className="text-emerald-500" />}
          </div>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            {description}
          </p>
        </div>
        <div className={`mt-1 transition-transform duration-300 ${active ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}>
          <ChevronRight size={18} className="text-azure" />
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 'infrastructure',
      title: 'Terraform IaC',
      icon: <Terminal size={20} />,
      description: 'Modular cloud provisioning with secure remote state management.',
      details: 'Architecture defined as code using Terraform Cloud modules. State is hardened in Azure Blob Storage with AES-256 encryption and state-locking.',
      tags: ['HCL', 'Azure Blob', 'IaC']
    },
    {
      id: 'security',
      title: 'Secrets Management',
      icon: <Lock size={20} />,
      description: 'Zero-trust certificate and credential handling via Key Vault.',
      details: 'Hardware-backed security. Secrets are injected at runtime through managed identities, ensuring zero plain-text credentials in code or CI/CD.',
      tags: ['Key Vault', 'RBAC', 'Managed Identity']
    },
    {
      id: 'automation',
      title: 'DevOps Pipelines',
      icon: <Workflow size={20} />,
      description: 'End-to-end CI/CD orchestration for multi-stage deployments.',
      details: 'Azure DevOps YAML pipelines handle automated testing, container builds, and blue-green deployments with manual approval gates for production.',
      tags: ['YAML', 'CI/CD', 'Gates']
    },
    {
      id: 'deployment',
      title: 'AKS Runtime',
      icon: <Cpu size={20} />,
      description: 'High-availability Kubernetes clusters for microservices.',
      details: 'Production-grade AKS clusters utilizing ACR for container registry. Integrated with Azure Monitor and Log Analytics for observability.',
      tags: ['K8s', 'Helm', 'Ingress']
    }
  ];

  return (
    <div className="min-h-screen selection:bg-azure/10 selection:text-azure">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-azure/5 to-transparent backdrop-blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Header */}
      <nav className="sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-md border border-white/40 shadow-sm rounded-2xl h-16 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-abbott flex items-center justify-center rounded-lg shadow-inner">
                <Cloud className="text-white" size={20} />
              </div>
              <div>
                <h1 className="font-display font-bold text-base text-slate-900 leading-none mb-0.5">Abbott Operations</h1>
                <p className="text-[10px] font-bold text-azure uppercase tracking-wider">Azure Infrastructure</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {['Dashboard', 'Architecture', 'Security', 'logs'].map((link) => (
                <a key={link} href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors capitalize tracking-wide">{link}</a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden sm:flex text-xs font-bold text-slate-600 px-4 py-2 hover:bg-slate-50 rounded-xl transition-colors">
                Support
              </button>
              <button className="bg-azure hover:shadow-lg hover:shadow-azure/20 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 group">
                Access Project <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          
          {/* Left Column: Vision & Flow */}
          <div className="space-y-12">
            <header className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-azure/10 text-azure border border-azure/20 rounded-full">
                <Zap size={14} className="fill-azure" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Enterprise Automation</span>
              </div>
              <h2 className="text-5xl font-display font-bold text-slate-900 leading-[1.1] tracking-tight">
                Secure Cloud <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure to-abbott">Orchestration.</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
                Visualizing the core flow of Abbott India's automated Azure infrastructure—from modular Terraform components to scalable AKS microservices.
              </p>
            </header>

            <div className="space-y-4 relative">
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  {index < steps.length - 1 && (
                    <div className="absolute left-[36px] top-[80px] bottom-[-20px] w-[2px] bg-slate-200/60 overflow-hidden">
                      {activeStep > index && (
                        <motion.div 
                          className="w-full bg-azure"
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </div>
                  )}
                  <FlowNode 
                    {...step} 
                    index={index}
                    active={activeStep === index} 
                    onClick={() => setActiveStep(index)}
                    status={activeStep > index ? 'completed' : activeStep === index ? 'in-progress' : 'pending'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visualization Panel */}
          <div className="lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white rounded-[32px] border border-slate-200/80 p-10 shadow-2xl shadow-slate-200/50 relative overflow-hidden"
              >
                {/* Background Pattern for the card */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(#008AD7_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>

                <div className="relative">
                  <div className="flex items-start justify-between mb-10">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-azure-light text-azure rounded-2xl shadow-sm ring-4 ring-azure-light/30">
                        {steps[activeStep].icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-display text-slate-900">{steps[activeStep].title}</h3>
                        <div className="flex gap-2 mt-2">
                          {steps[activeStep].tags.map(tag => (
                            <span key={tag} className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-bold text-slate-700">Operational</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-lg leading-relaxed font-normal mb-10">
                    {steps[activeStep].details}
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4 group transition-colors hover:bg-azure-light/30 hover:border-azure/10">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm text-azure transition-transform group-hover:scale-110">
                        <Activity size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Reliability</p>
                        <p className="text-sm font-bold text-slate-800">99.9% Uptime</p>
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4 group transition-colors hover:bg-emerald-50 hover:border-emerald-100">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm text-emerald-500 transition-transform group-hover:scale-110">
                        <Zap size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Execution</p>
                        <p className="text-sm font-bold text-slate-800">Real-time sync</p>
                      </div>
                    </div>
                  </div>

                  {/* Context-Specific Visualization Content */}
                  <div className="rounded-2xl overflow-hidden border border-slate-200">
                    {activeStep === 0 && (
                      <div className="bg-[#0F172A] p-6 font-mono text-xs leading-relaxed">
                        <div className="flex gap-2 mb-4">
                          <div className="w-3 h-3 rounded-full bg-red-500/50" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                          <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-slate-500">Initializing project modules...</p>
                          <p className="text-indigo-400">Terraform v1.5.0 on linux_amd64</p>
                          <p className="text-emerald-400"># Updating resource "azurerm_kubernetes_cluster" "aks"</p>
                          <p className="text-white">+ id = (known after apply)</p>
                          <p className="text-white">+ kube_config_raw = (sensitive value)</p>
                          <div className="pt-2">
                            <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse align-middle" />
                            <span className="text-emerald-400 ml-2">Appling changes...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeStep === 1 && (
                      <div className="bg-slate-50 p-8 flex flex-col items-center justify-center min-h-[220px]">
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="relative"
                        >
                          <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-[40px] animate-pulse" />
                          <div className="relative w-20 h-20 bg-white rounded-[24px] shadow-xl border border-emerald-100 flex items-center justify-center text-emerald-500">
                            <ShieldCheck size={40} />
                          </div>
                        </motion.div>
                        <div className="mt-6 text-center">
                          <p className="text-sm font-bold text-slate-800 tracking-tight">Key Vault Integration Active</p>
                          <p className="text-xs text-slate-500 mt-1 font-medium italic">"HSM-backed certificate protection"</p>
                        </div>
                      </div>
                    )}

                    {activeStep === 2 && (
                      <div className="bg-white p-6 space-y-3">
                        {['Code Checkout', 'Unit Testing', 'Docker Build', 'Security Scan', 'Publish Artifact'].map((task, i) => (
                          <div key={task} className="flex items-center justify-between p-3.5 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className={`p-1.5 rounded-lg ${i < 4 ? 'bg-emerald-50 text-emerald-500' : 'bg-azure-light text-azure'}`}>
                                {i < 4 ? <CheckCircle2 size={14} /> : <RefreshCw size={14} className="animate-spin" />}
                              </div>
                              <span className="text-xs font-bold text-slate-700">{task}</span>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border tracking-wider uppercase ${
                              i < 4 ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-azure bg-azure/5 border-azure/20'
                            }`}>
                              {i < 4 ? 'Complete' : 'Running'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeStep === 3 && (
                      <div className="bg-slate-50 p-8">
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className={`h-10 rounded-xl shadow-sm border flex items-center justify-center ${
                                i % 5 === 0 ? 'bg-white text-slate-300 border-slate-100' : 'bg-emerald-500 text-white border-emerald-400/30'
                              }`}
                            >
                              <Box size={14} />
                            </motion.div>
                          ))}
                        </div>
                        <div className="mt-8 p-4 bg-white border border-slate-200/60 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                              <Server size={18} />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Node Pool</p>
                              <p className="text-sm font-bold text-slate-800">Standard_DS2_v2</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Healthy</p>
                            <p className="text-sm font-bold text-emerald-500">100.0%</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Support Card */}
            <div className="mt-8 bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-azure/20 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-azure/30 transition-colors" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                    <LayoutDashboard size={24} className="text-azure" />
                  </div>
                  <h4 className="text-2xl font-display font-bold">Operational Command</h4>
                </div>
                <p className="text-slate-400 leading-relaxed mb-8 font-medium">
                  Real-time visibility into your infrastructure lifecycle. Manage resources, monitor pipelines, and secure secrets from a single interface.
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-[3px] border-slate-900 bg-azure flex items-center justify-center text-[10px] font-bold text-white shadow-xl ring-1 ring-white/10">
                        Dev
                      </div>
                    ))}
                  </div>
                  <div className="h-4 w-px bg-white/10" />
                  <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Core Platform Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 md:py-16 border-t border-slate-200/60 mt-12 bg-slate-50/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 opacity-70 scale-90">
            <div className="w-8 h-8 bg-abbott flex items-center justify-center rounded-lg">
              <Cloud className="text-white" size={16} />
            </div>
            <p className="text-sm font-bold text-slate-500 tracking-tight">
              Abbott India Ltd. <span className="font-medium text-slate-300 mx-2">|</span> Azure Operations
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Settings size={18} /></a>
            <a href="#" className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Activity size={18} /></a>
            <a href="#" className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Info size={18} /></a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Abbott - Confidential Operational Data
          </p>
        </div>
      </footer>
    </div>
  );
}
