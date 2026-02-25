'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Copy, 
  Check, 
  Terminal, 
  Code2,
  RotateCcw
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface PythonPlaygroundProps {
  initialCode: string
  output: string
  title?: string
  description?: string
}

export function PythonPlayground({ 
  initialCode, 
  output,
  title,
  description 
}: PythonPlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'code' | 'output'>('code')

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetCode = () => {
    setCode(initialCode)
  }

  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
      {/* Header */}
      {(title || description) && (
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
          {title && <h4 className="font-semibold text-slate-900">{title}</h4>}
          {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
        </div>
      )}
      
      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Code Editor */}
        <div className="relative">
          <div className="bg-slate-900 p-4 min-h-[350px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-slate-400 font-medium">Editor</span>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-slate-700 hover:bg-slate-600"
                  onClick={copyCode}
                  title="Salin kode"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-slate-300" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-slate-700 hover:bg-slate-600"
                  onClick={resetCode}
                  title="Reset kode"
                >
                  <RotateCcw className="h-4 w-4 text-slate-300" />
                </Button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[280px] bg-transparent text-slate-100 font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output */}
        <div className="bg-slate-50">
          <div className="p-4 min-h-[350px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-500 font-medium">Output</span>
              </div>
              <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                Hasil Eksekusi
              </Badge>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3 h-[280px] overflow-auto">
              <pre className="text-emerald-600 font-mono text-sm whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
