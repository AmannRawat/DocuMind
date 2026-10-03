import { Search, X, FileText, ChevronRight } from 'lucide-react'

export default function SourcesPanel() {
  return (
    <aside className="w-80 bg-card flex flex-col h-full flex-shrink-0 hidden lg:flex relative z-20 shadow-sm border-l border-border">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          Sources
        </h3>
        <button className="p-1 text-muted-foreground hover:bg-secondary rounded-md cursor-pointer transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4 border-b border-border bg-card/50">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search in sources..."
            className="w-full bg-secondary border border-transparent focus:border-primary/50 focus:bg-background outline-none rounded-lg pl-9 pr-4 py-2 text-sm text-foreground transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/20">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Relevant Pages</p>
        
        {/* Source Item 1 */}
        <div className="group rounded-xl border border-border p-3 hover:border-primary/40 hover:shadow-sm bg-card transition-all cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              Page 12
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-foreground line-clamp-3 leading-relaxed">
            "Machine learning enables systems to learn and improve from experience without being explicitly programmed. The process begins with observations or data..."
          </p>
        </div>

        {/* Source Item 2 */}
        <div className="group rounded-xl border border-border p-3 hover:border-primary/40 hover:shadow-sm bg-card transition-all cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              Page 15
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-foreground line-clamp-3 leading-relaxed">
            "The primary aim is to allow the computers learn automatically without human intervention or assistance and adjust actions accordingly..."
          </p>
        </div>

        {/* Source Item 3 */}
        <div className="group rounded-xl border border-border p-3 hover:border-primary/40 hover:shadow-sm bg-card transition-all cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              Page 18
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-foreground line-clamp-3 leading-relaxed">
            "Supervised machine learning algorithms can apply what has been learned in the past to new data using labeled examples to predict future events."
          </p>
        </div>
      </div>
      
      <div className="p-4 border-t border-border bg-card">
        <button className="w-full text-sm text-primary font-medium hover:underline flex items-center justify-center gap-1 cursor-pointer">
          View full document <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </aside>
  )
}
