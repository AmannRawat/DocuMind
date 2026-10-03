'use client'

import { useState } from 'react'
import AppSidebar, { TabType } from './AppSidebar'
import EmptyPdfState from '../pdf/EmptyPdfState'
import PdfUpload from '../pdf/PdfUpload'
import ChatInterface from '../chat/ChatInterface'

type PdfState = 'empty' | 'uploading' | 'processing' | 'ready'

export default function DashboardController() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [pdfState, setPdfState] = useState<PdfState>('empty')

  const handleNewChat = () => {
    setActiveTab('dashboard')
    setPdfState('uploading')
  }

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      switch (pdfState) {
        case 'empty':
          return <EmptyPdfState onUploadClick={() => setPdfState('uploading')} />
        case 'uploading':
        case 'processing':
          return <PdfUpload state={pdfState} onSimulateComplete={() => setPdfState('ready')} />
        case 'ready':
          return <ChatInterface onClearChat={() => setPdfState('empty')} />
      }
    }
    
    // Static placeholders for other tabs
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background">
        <div className="bg-card border border-border p-8 rounded-xl shadow-sm text-center max-w-md w-full">
          <h2 className="text-xl font-semibold mb-2 capitalize">{activeTab.replace('-', ' ')}</h2>
          <p className="text-muted-foreground text-sm">
            This section is currently a UI placeholder. Real functionality will be implemented with the backend.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full bg-background overflow-hidden">
      <AppSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onNewChat={handleNewChat} 
      />
      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        {renderContent()}
      </main>
    </div>
  )
}
