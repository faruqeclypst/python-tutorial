'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { 
  Copy, 
  Check, 
  Terminal, 
  Code2,
  User
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface InputField {
  name: string
  label: string
  type: 'text' | 'number'
  placeholder: string
  defaultValue: string
}

interface InputPlaygroundProps {
  title?: string
  description?: string
  inputFields: InputField[]
  generateOutput: (inputs: Record<string, string>) => string
  generateCode: (inputs: Record<string, string>) => string
}

export function InputPlayground({ 
  title, 
  description,
  inputFields,
  generateOutput,
  generateCode
}: InputPlaygroundProps) {
  const [inputs, setInputs] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    inputFields.forEach(field => {
      initial[field.name] = field.defaultValue
    })
    return initial
  })
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleInputChange = (name: string, value: string) => {
    setInputs(prev => ({ ...prev, [name]: value }))
  }

  const copyCode = () => {
    const code = generateCode(inputs)
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border border-slate-700 overflow-hidden bg-slate-800">
      {/* Header */}
      {(title || description) && (
        <div className="bg-slate-700/50 border-b border-slate-700 px-4 py-3">
          {title && <h4 className="font-semibold text-white">{title}</h4>}
          {description && <p className="text-sm text-slate-300 mt-1">{description}</p>}
        </div>
      )}

      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-700">
        {/* Input Section */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-slate-200">Input Data</span>
          </div>
          <div className="space-y-4">
            {inputFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-slate-300">
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={inputs[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-slate-700/30 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-slate-200">Output</span>
            </div>
            <Badge variant="secondary" className="text-xs bg-emerald-600/20 text-emerald-400">
              Hasil
            </Badge>
          </div>
          <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 min-h-[200px] overflow-auto">
            <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap">
              {generateOutput(inputs)}
            </pre>
          </div>
        </div>
      </div>

      {/* Code Preview Toggle */}
      <div className="border-t border-slate-700">
        <button
          onClick={() => setShowCode(!showCode)}
          className="w-full px-4 py-2 flex items-center justify-between text-sm text-slate-300 hover:bg-slate-700/50"
        >
          <span className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            {showCode ? 'Sembunyikan Kode' : 'Lihat Kode Python'}
          </span>
        </button>
        {showCode && (
          <div className="relative bg-slate-900 p-4 border-t border-slate-700">
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-8 w-8 p-0 bg-slate-700 hover:bg-slate-600"
              onClick={copyCode}
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-slate-300" />}
            </Button>
            <pre className="text-slate-100 font-mono text-sm overflow-x-auto">
              <code>{generateCode(inputs)}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
