'use client'
import { UploadCloud } from 'lucide-react'

interface EmptyPdfStateProps {
  onUploadClick: () => void
}

export default function EmptyPdfState({ onUploadClick }: EmptyPdfStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-background/50">
      <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-6 text-primary">
        <UploadCloud className="w-12 h-12" />
      </div>
      <h2 className="text-2xl font-bold mb-3 text-foreground">Upload your first PDF</h2>
      <p className="text-muted-foreground max-w-sm mb-8 text-base">
        Start a conversation with your documents. Extract insights, summarize, and get answers instantly.
      </p>
      
      <div 
        onClick={onUploadClick}
        className="border-2 border-dashed border-border rounded-xl p-10 w-full max-w-lg flex flex-col items-center justify-center hover:bg-secondary/50 hover:border-primary/40 transition-all cursor-pointer group bg-card"
      >
        <div className="bg-primary text-primary-foreground font-medium px-6 py-2.5 rounded-full mb-4 shadow-sm group-hover:bg-primary/90 transition-colors">
          Choose File
        </div>
        <p className="text-sm font-medium text-foreground mb-1">or drag and drop a file here</p>
        <p className="text-xs text-muted-foreground">Supports PDF files up to 50MB</p>
      </div>
    </div>
  )
}
