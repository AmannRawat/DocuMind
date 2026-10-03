'use client'

import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { FileText, MessageSquare, Sparkles, Shield, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2 text-primary">
          <FileText className="w-6 h-6" />
          <span className="font-bold text-xl tracking-tight text-foreground">PDF RAG Chat</span>
        </div>
        <div className="flex items-center gap-4 relative z-20">
          <SignInButton mode="modal">
            <button className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Log In</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors cursor-pointer">
              Get Started
            </button>
          </SignUpButton>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 relative z-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          Chat with your documents
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl">
          Upload a PDF. <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">Ask anything.</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          Transform your static documents into interactive conversations. Instantly extract insights, summarize reports, and find exactly what you're looking for with AI.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 relative z-20">
          <SignUpButton mode="modal">
            <button className="flex items-center justify-center gap-2 text-base font-medium bg-primary text-primary-foreground px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 cursor-pointer w-full sm:w-auto">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </SignUpButton>
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="flex items-center justify-center gap-2 text-base font-medium bg-secondary text-secondary-foreground px-8 py-3.5 rounded-full hover:bg-secondary/80 transition-all cursor-pointer w-full sm:w-auto"
          >
            See how it works
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Accurate answers</h3>
            <p className="text-muted-foreground text-sm">Get precise answers extracted directly from your uploaded documents, not generic knowledge.</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Source citations</h3>
            <p className="text-muted-foreground text-sm">Every answer includes page references and exact source snippets so you can verify information.</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure & private</h3>
            <p className="text-muted-foreground text-sm">Your documents remain private and secure. Access them anytime from your personal dashboard.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
