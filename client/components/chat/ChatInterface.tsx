'use client'

import { useState } from 'react'
import { FileText, MoreVertical, Trash2, Send, Bot, User, Search, Download, Sparkles, Settings } from 'lucide-react'
import SourcesPanel from './SourcesPanel'

type ChatTab = 'chat' | 'preview' | 'insights' | 'settings'

interface ChatInterfaceProps {
  onClearChat: () => void
}

export default function ChatInterface({ onClearChat }: ChatInterfaceProps) {
  const [activeTab, setActiveTab] = useState<ChatTab>('chat')
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="flex h-full w-full bg-background relative overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 border-r border-border">
        {/* Document Header */}
        <header className="flex-shrink-0 flex flex-col border-b border-border bg-card/50 backdrop-blur-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center text-primary">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Machine_Learning_Guide.pdf</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span>45 pages</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>4.2 MB</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>Uploaded Today, 10:24 AM</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={onClearChat}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-md transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear Chat</span>
              </button>
              <button className="p-1.5 text-muted-foreground hover:bg-secondary rounded-md transition-colors cursor-pointer">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center px-4 gap-1 overflow-x-auto hide-scrollbar">
            {[
              { id: 'chat', label: 'Chat' },
              { id: 'preview', label: 'Document Preview' },
              { id: 'insights', label: 'Key Insights' },
              { id: 'settings', label: 'Settings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ChatTab)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full relative">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* AI Message */}
                <div className="flex gap-4 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex flex-shrink-0 items-center justify-center text-primary mt-1">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">AI Assistant</span>
                      <span className="text-xs text-muted-foreground">10:25 AM</span>
                    </div>
                    <div className="bg-card border border-border text-foreground px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed shadow-sm">
                      Hello! I've analyzed "Machine_Learning_Guide.pdf". I can help you summarize the document, extract key concepts, or answer specific questions. What would you like to know?
                    </div>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex gap-4 max-w-3xl self-end flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-secondary flex flex-shrink-0 items-center justify-center text-muted-foreground mt-1">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0 items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">10:26 AM</span>
                      <span className="font-semibold text-sm text-foreground">You</span>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed shadow-sm">
                      What is the definition of machine learning according to this document?
                    </div>
                  </div>
                </div>

                {/* AI Message with Citations */}
                <div className="flex gap-4 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex flex-shrink-0 items-center justify-center text-primary mt-1">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">AI Assistant</span>
                      <span className="text-xs text-muted-foreground">10:26 AM</span>
                    </div>
                    <div className="bg-card border border-border text-foreground px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed shadow-sm">
                      <p className="mb-3">
                        According to the document, machine learning is a branch of artificial intelligence that focuses on building systems that learn from data, rather than being explicitly programmed.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-border">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Sources:</span>
                        <button className="inline-flex items-center gap-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-medium px-2 py-1 rounded-md transition-colors cursor-pointer">
                          <FileText className="w-3 h-3" />
                          Page 12
                        </button>
                        <button className="inline-flex items-center gap-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-medium px-2 py-1 rounded-md transition-colors cursor-pointer">
                          <FileText className="w-3 h-3" />
                          Page 15
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Input Area */}
              <div className="p-4 bg-background border-t border-border shrink-0">
                <div className="relative max-w-4xl mx-auto flex items-end gap-2 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                  <textarea 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask a question about your document..."
                    className="flex-1 max-h-32 min-h-[24px] bg-transparent resize-none outline-none text-sm text-foreground placeholder:text-muted-foreground py-1"
                    rows={1}
                  />
                  <button className="p-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-sm cursor-pointer flex-shrink-0">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center mt-2">
                  <span className="text-[11px] text-muted-foreground">AI responses can be inaccurate. Please verify important information.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="flex h-full items-center justify-center bg-secondary/30">
              <div className="text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-foreground mb-1">Document Preview</h3>
                <p className="text-sm text-muted-foreground">PDF viewer will be implemented here.</p>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="flex flex-col h-full overflow-y-auto p-6 md:p-10 bg-secondary/20">
              <div className="max-w-3xl mx-auto w-full space-y-8">
                <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" /> Document Summary
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    This document provides a comprehensive introduction to machine learning concepts, algorithms, and real-world applications. It covers the fundamental differences between supervised, unsupervised, and reinforcement learning, and provides practical examples of neural network architectures and model evaluation metrics.
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Key Topics</h3>
                    <ul className="space-y-3">
                      {['Machine Learning', 'Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Neural Networks', 'Model Evaluation'].map((topic, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </section>
                  
                  <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Common Questions</h3>
                    <div className="space-y-2">
                      {[
                        'Summarize this document',
                        'What are the key concepts?',
                        'Explain the main algorithms',
                        'Give real-world examples'
                      ].map((q, i) => (
                        <button key={i} className="w-full text-left px-4 py-2.5 rounded-lg bg-secondary/50 hover:bg-secondary text-sm text-foreground transition-colors cursor-pointer border border-transparent hover:border-border">
                          {q}
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="flex h-full items-center justify-center bg-secondary/30">
              <div className="text-center">
                <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-foreground mb-1">Chat Settings</h3>
                <p className="text-sm text-muted-foreground">Model selection and chunking options will go here.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Sources Panel */}
      {activeTab === 'chat' && (
        <SourcesPanel />
      )}
    </div>
  )
}
