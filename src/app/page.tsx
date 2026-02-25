'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { 
  Code2, 
  Download, 
  FunctionSquare, 
  BookOpen, 
  Terminal, 
  CheckCircle2,
  ArrowRight,
  Zap,
  Globe,
  Users,
  Package,
  FileCode,
  Copy,
  Check,
  Lightbulb,
  TrendingUp,
  Briefcase,
  Rocket,
  Brain,
  Database,
  Palette,
  Cpu,
  LineChart,
  Shield,
  Layers
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { PythonPlayground } from '@/components/python-playground'

// Simple Code Block Component
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 z-10">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-700 hover:bg-slate-600"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-slate-300" />}
        </Button>
      </div>
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// Code Block with Tabs
function CodeWithOutput({ code, output, title }: { code: string; output: string; title?: string }) {
  const [activeTab, setActiveTab] = useState<'code' | 'output'>('code')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      {title && (
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
          <span className="text-slate-300 text-sm font-medium">{title}</span>
          <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">python</Badge>
        </div>
      )}
      <div className="bg-slate-700 flex border-b border-slate-600">
        <button
          onClick={() => setActiveTab('code')}
          className={`px-4 py-2 text-sm font-medium flex items-center gap-1 transition-colors ${
            activeTab === 'code'
              ? 'text-emerald-400 border-b-2 border-emerald-400 bg-slate-800'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="h-4 w-4" />
          Kode
        </button>
        <button
          onClick={() => setActiveTab('output')}
          className={`px-4 py-2 text-sm font-medium flex items-center gap-1 transition-colors ${
            activeTab === 'output'
              ? 'text-emerald-400 border-b-2 border-emerald-400 bg-slate-800'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="h-4 w-4" />
          Output
        </button>
        <div className="flex-1" />
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 m-1 hover:bg-slate-600"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-slate-300" />}
        </Button>
      </div>
      <div className="bg-slate-900 p-4 overflow-x-auto min-h-[100px]">
        {activeTab === 'code' ? (
          <pre className="text-slate-100 font-mono text-sm">
            <code>{code}</code>
          </pre>
        ) : (
          <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap">{output}</pre>
        )}
      </div>
    </div>
  )
}

// Navigation Item
function NavItem({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: string }) {
  return (
    <a href={href} className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
      <Icon className="h-4 w-4" />
      <span className="font-medium">{children}</span>
    </a>
  )
}

// Feature Card
function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <Card className="border-slate-200 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">{description}</p>
      </CardContent>
    </Card>
  )
}

// Installation Step
function InstallStep({ step, title, description, command }: { step: number; title: string; description: string; command?: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
        {step}
      </div>
      <div className="flex-1 space-y-2">
        <h4 className="font-semibold text-slate-900">{title}</h4>
        <p className="text-slate-600 text-sm">{description}</p>
        {command && <CodeBlock code={command} />}
      </div>
    </div>
  )
}

// Playground Component
function DedicatedPlayground() {
  const [selectedSnippet, setSelectedSnippet] = useState<string | null>('hello')
  const [showSidebar, setShowSidebar] = useState(true)

  const codeSnippets = [
    { id: 'hello', name: 'Hello World', code: `print("Hello, World!")\nprint("Selamat belajar Python!")`, output: `Hello, World!\nSelamat belajar Python!` },
    { id: 'variables', name: 'Variabel', code: `nama = "Budi"\numur = 25\nprint(f"Nama: {nama}")\nprint(f"Umur: {umur} tahun")`, output: `Nama: Budi\nUmur: 25 tahun` },
    { id: 'loop', name: 'Perulangan', code: `for i in range(1, 6):\n    print(f"Angka: {i}")`, output: `Angka: 1\nAngka: 2\nAngka: 3\nAngka: 4\nAngka: 5` },
    { id: 'condition', name: 'Kondisi', code: `nilai = 85\nif nilai >= 80:\n    print("Lulus")\nelse:\n    print("Tidak Lulus")`, output: `Lulus` },
    { id: 'function', name: 'Fungsi', code: `def sapa(nama):\n    return f"Halo, {nama}!"\n\nprint(sapa("Budi"))`, output: `Halo, Budi!` },
    { id: 'list', name: 'List/Array', code: `buah = ["apel", "jeruk", "mangga"]\nfor item in buah:\n    print(f"- {item}")\nprint(f"Total: {len(buah)} buah")`, output: `- apel\n- jeruk\n- mangga\nTotal: 3 buah` },
    { id: 'dictionary', name: 'Dictionary', code: `siswa = {\n    "nama": "Budi",\n    "umur": 17,\n    "kelas": "XII IPA 1"\n}\nfor key, value in siswa.items():\n    print(f"{key}: {value}")`, output: `nama: Budi\numur: 17\nkelas: XII IPA 1` },
    { id: 'class', name: 'Class/OOP', code: `class Mobil:\n    def __init__(self, merk, warna):\n        self.merk = merk\n        self.warna = warna\n    \n    def info(self):\n        return f"{self.merk} ({self.warna})"\n\nmobil1 = Mobil("Toyota", "Merah")\nprint(mobil1.info())`, output: `Toyota (Merah)` },
    { id: 'exception', name: 'Error Handling', code: `try:\n    angka = int("abc")\nexcept ValueError:\n    print("Error: Bukan angka valid!")\nfinally:\n    print("Proses selesai")`, output: `Error: Bukan angka valid!\nProses selesai` },
    { id: 'file', name: 'File Handling', code: `# Contoh membaca file\nwith open("data.txt", "w") as f:\n    f.write("Hello File!")\n\nprint("File berhasil dibuat")\nprint("Isi: Hello File!")`, output: `File berhasil dibuat\nIsi: Hello File!` },
    { id: 'comprehension', name: 'List Comprehension', code: `# Membuat list baru dari list existing\nangka = [1, 2, 3, 4, 5]\nkuadrat = [x**2 for x in angka]\nprint(f"Angka: {angka}")\nprint(f"Kuadrat: {kuadrat}")`, output: `Angka: [1, 2, 3, 4, 5]\nKuadrat: [1, 4, 9, 16, 25]` },
    { id: 'lambda', name: 'Lambda & Filter', code: `angka = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\ngenap = list(filter(lambda x: x % 2 == 0, angka))\nprint(f"Angka genap: {genap}")`, output: `Angka genap: [2, 4, 6, 8, 10]` },
    { id: 'recursion', name: 'Rekursi', code: `def faktorial(n):\n    if n <= 1:\n        return 1\n    return n * faktorial(n - 1)\n\nprint(f"5! = {faktorial(5)}")\nprint(f"7! = {faktorial(7)}")`, output: `5! = 120\n7! = 5040` },
    { id: 'module', name: 'Import Module', code: `import math\nimport random\n\nprint(f"PI: {math.pi:.4f}")\nprint(f"Akar 16: {math.sqrt(16)}")\nprint(f"Random 1-10: 7")`, output: `PI: 3.1416\nAkar 16: 4.0\nRandom 1-10: 7` },
    { id: 'string', name: 'String Methods', code: `teks = "Belajar Python"\nprint(f"Upper: {teks.upper()}")\nprint(f"Lower: {teks.lower()}")\nprint(f"Split: {teks.split()}")\nprint(f"Replace: {teks.replace('Python', 'Coding')}")`, output: `Upper: BELAJAR PYTHON\nLower: belajar python\nSplit: ['Belajar', 'Python']\nReplace: Belajar Coding` },
  ]

  const currentSnippet = codeSnippets.find(s => s.id === selectedSnippet)
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    if (currentSnippet) {
      navigator.clipboard.writeText(currentSnippet.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setShowSidebar(!showSidebar)} className="h-10 w-10 p-0 text-slate-400 hover:text-white hover:bg-slate-700">
              <Lightbulb className="h-5 w-5" />
            </Button>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white">Python Playground</h1>
              <p className="text-xs text-slate-400">Latihan coding</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-slate-700 text-slate-300">Python 3</Badge>
        </div>
      </header>

      <div className="flex-1 flex">
        <aside className={`bg-slate-800 border-r border-slate-700 overflow-y-auto transition-all duration-300 ${showSidebar ? 'w-64' : 'w-0'}`}>
          <div className={`p-4 ${showSidebar ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-400" />
                <h2 className="font-semibold text-white text-sm">Contoh Kode</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowSidebar(false)} className="h-6 w-6 p-0 text-slate-400 hover:text-white hover:bg-slate-700">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {codeSnippets.map((snippet) => (
                <button key={snippet.id} onClick={() => setSelectedSnippet(snippet.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedSnippet === snippet.id ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                  {snippet.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col lg:flex-row">
            <div className="flex-1 flex flex-col min-h-[300px]">
              <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-slate-300 text-sm font-medium">Editor</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700" onClick={copyCode}>
                  {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex-1 bg-slate-900 p-4 overflow-auto">
                <pre className="text-slate-100 font-mono text-sm whitespace-pre-wrap">{currentSnippet?.code || 'Pilih contoh kode'}</pre>
              </div>
            </div>
            <div className="flex-1 flex flex-col min-h-[250px] border-t lg:border-t-0 lg:border-l border-slate-700">
              <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-emerald-400" />
                <span className="text-slate-300 text-sm font-medium">Output</span>
              </div>
              <div className="flex-1 bg-slate-900 p-4 overflow-auto">
                <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap">{currentSnippet?.output || 'Pilih contoh kode'}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Learning Module
function LearningModule() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-slate-900">Modul Python</h1>
                <p className="text-xs text-slate-500">Belajar Python dari Dasar</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              <NavItem href="#pengenalan" icon={BookOpen}>Pengenalan</NavItem>
              <NavItem href="#mengapa" icon={Rocket}>Mengapa Python?</NavItem>
              <NavItem href="#instalasi" icon={Download}>Instalasi</NavItem>
              <NavItem href="#fungsi" icon={FunctionSquare}>Fungsi</NavItem>
              <NavItem href="#istilah" icon={FileCode}>Istilah</NavItem>
              <NavItem href="#contoh" icon={Terminal}>Contoh</NavItem>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0"><Zap className="h-3 w-3 mr-1" />Modul Pembelajaran</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Belajar Python dari Nol</h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-8">Pelajari bahasa pemrograman Python dengan contoh kode dan output langsung.</p>
          </div>
        </section>

        {/* Section 1: Pengenalan */}
        <section id="pengenalan" className="py-16 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Section 1</Badge>
              <div className="flex justify-center mb-6">
                <img src="/python-logo.png" alt="Python Logo" className="h-32 w-32 object-contain" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Pengenalan Python</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Kenali apa itu Python dan mengapa bahasa ini sangat populer.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-emerald-600" />Apa itu Python?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">Python adalah bahasa pemrograman tingkat tinggi yang dikembangkan oleh <strong>Guido van Rossum</strong> pada tahun <strong>1991</strong>. Python dirancang dengan filosofi keterbacaan kode dan sintaks yang sederhana.</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-emerald-600" />Mengapa Python Populer?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {['Mudah dipelajari dan dibaca', 'Sintaks mirip bahasa Inggris', 'Banyak library dan framework', 'Komunitas yang besar'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-600"><CheckCircle2 className="h-5 w-5 text-emerald-500" />{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <FeatureCard icon={Zap} title="Mudah Dipelajari" description="Sintaks sederhana untuk pemula." />
              <FeatureCard icon={Globe} title="Multi-Platform" description="Windows, macOS, Linux." />
              <FeatureCard icon={Users} title="Komunitas Besar" description="Jutaan developer worldwide." />
              <FeatureCard icon={Package} title="Kaya Library" description="Ribuan library tersedia." />
            </div>
          </div>
        </section>

        <Separator />

        {/* Section 2: Mengapa Python? */}
        <section id="mengapa" className="py-16 scroll-mt-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Section 2</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Mengapa Harus Belajar Python?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Python adalah salah satu bahasa pemrograman paling diminati di dunia teknologi saat ini.</p>
            </div>

            {/* Trend & Statistik */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-emerald-600" />Tren Python Saat Ini</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <span className="text-slate-700 font-medium">TIOBE Index 2024</span>
                      <Badge className="bg-emerald-600">#1 Bahasa Terpopuler</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-slate-700 font-medium">Stack Overflow Survey</span>
                      <Badge className="bg-blue-600">Top 3 Most Wanted</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-slate-700 font-medium">GitHub Projects</span>
                      <Badge className="bg-purple-600">#2 Most Used</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-emerald-600" />Peluang Karir</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      'Gaji rata-rata Python Developer: $100,000+/tahun (US)',
                      'Permintaan tinggi di startup dan perusahaan besar',
                      'Bisa bekerja remote dari mana saja',
                      'Banyak lowongan di Indonesia dan luar negeri'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Penggunaan Python */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Python Digunakan Untuk Apa?</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-slate-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">AI & Machine Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">TensorFlow, PyTorch, scikit-learn untuk mengembangkan aplikasi AI.</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center mb-4">
                      <Database className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">Data Science</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">Pandas, NumPy, Matplotlib untuk analisis dan visualisasi data.</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">Web Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">Django, Flask, FastAPI untuk membangun aplikasi web.</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">Automation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm">Automate tasks, web scraping, testing dengan Selenium.</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Industri yang Menggunakan Python */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Perusahaan Besar Pengguna Python</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {['Google', 'Facebook', 'Netflix', 'Instagram', 'Spotify', 'NASA', 'Dropbox', 'Uber', 'Reddit', 'Pinterest', 'Quora', 'Instacart'].map((company, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-medium text-slate-700">{company}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Masa Depan Python */}
            <div className="mt-12">
              <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Rocket className="h-5 w-5 text-emerald-600" />Masa Depan Python</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">AI & Data Era</h4>
                      <p className="text-slate-600 text-sm">Python menjadi bahasa utama di era AI dan Big Data. Semakin banyak perusahaan mengadopsi AI.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">IoT & Embedded</h4>
                      <p className="text-slate-600 text-sm">MicroPython dan CircuitPython membawa Python ke perangkat IoT dan microcontroller.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Quantum Computing</h4>
                      <p className="text-slate-600 text-sm">Framework quantum seperti Qiskit menggunakan Python sebagai bahasa utama.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator />

        {/* Section 3: Instalasi */}
        <section id="instalasi" className="py-16 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Section 3</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Instalasi Python</h2>
            </div>

            <Tabs defaultValue="windows" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="windows">Windows</TabsTrigger>
                <TabsTrigger value="macos">macOS</TabsTrigger>
                <TabsTrigger value="linux">Linux</TabsTrigger>
              </TabsList>

              <TabsContent value="windows">
                <Card className="border-slate-200">
                  <CardHeader><CardTitle>Instalasi di Windows</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                    <InstallStep step={1} title="Download Python" description="Kunjungi python.org dan download installer." />
                    <InstallStep step={2} title="Jalankan Installer" description="Centang 'Add Python to PATH' sebelum install." />
                    <InstallStep step={3} title="Verifikasi" description="Buka CMD dan jalankan:" command="python --version" />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="macos">
                <Card className="border-slate-200">
                  <CardHeader><CardTitle>Instalasi di macOS</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                    <InstallStep step={1} title="Homebrew" description="Install via Homebrew:" command="brew install python" />
                    <InstallStep step={2} title="Verifikasi" description="Periksa versi:" command="python3 --version" />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="linux">
                <Card className="border-slate-200">
                  <CardHeader><CardTitle>Instalasi di Linux</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                    <InstallStep step={1} title="Install" description="Via apt:" command="sudo apt install python3 python3-pip" />
                    <InstallStep step={2} title="Verifikasi" description="Periksa versi:" command="python3 --version" />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Separator />

        {/* Section 4: Fungsi */}
        <section id="fungsi" className="py-16 scroll-mt-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Section 4</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Fungsi dalam Python</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FunctionSquare className="h-5 w-5 text-emerald-600" />Apa itu Fungsi?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">Fungsi adalah blok kode yang dapat digunakan kembali untuk melakukan tugas tertentu.</p>
                  <CodeWithOutput code={`def sapa(nama):\n    return f"Halo, {nama}!"\n\nprint(sapa("Budi"))`} output={`Halo, Budi!`} />
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader><CardTitle>Jenis Fungsi</CardTitle></CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="1">
                      <AccordionTrigger>Fungsi dengan Parameter</AccordionTrigger>
                      <AccordionContent>
                        <CodeWithOutput code={`def tambah(a, b):\n    return a + b\n\nprint(tambah(5, 3))`} output={`8`} />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="2">
                      <AccordionTrigger>Lambda Function</AccordionTrigger>
                      <AccordionContent>
                        <CodeWithOutput code={`kuadrat = lambda x: x ** 2\nprint(kuadrat(5))`} output={`25`} />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="3">
                      <AccordionTrigger>Fungsi dengan Return</AccordionTrigger>
                      <AccordionContent>
                        <CodeWithOutput code={`def hitung_luas(panjang, lebar):\n    return panjang * lebar\n\nluas = hitung_luas(10, 5)\nprint(f"Luas: {luas}")`} output={`Luas: 50`} />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="4">
                      <AccordionTrigger>Fungsi dengan Default Parameter</AccordionTrigger>
                      <AccordionContent>
                        <CodeWithOutput code={`def sapa(nama, pesan="Halo"):\n    print(f"{pesan}, {nama}!")\n\nsapa("Budi")\nsapa("Ani", "Selamat pagi")`} output={`Halo, Budi!\nSelamat pagi, Ani!`} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator />

        {/* Section 5: Istilah */}
        <section id="istilah" className="py-16 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Section 5</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Istilah Dasar Python</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Pahami istilah-istilah penting dalam pemrograman Python.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { term: 'print()', type: 'Fungsi', desc: 'Menampilkan output ke layar konsol', code: 'print("Halo Dunia")', output: 'Halo Dunia' },
                { term: 'def', type: 'Keyword', desc: 'Mendefinisikan sebuah fungsi baru', code: 'def halo():\n    print("Hi")', output: 'Hi' },
                { term: 'if/else', type: 'Keyword', desc: 'Struktur kondisi/percabangan', code: 'x = 10\nif x > 5:\n    print("Besar")\nelse:\n    print("Kecil")', output: 'Besar' },
                { term: 'for', type: 'Keyword', desc: 'Perulangan berdasarkan iterasi', code: 'for i in range(3):\n    print(i)', output: '0\n1\n2' },
                { term: 'while', type: 'Keyword', desc: 'Perulangan berdasarkan kondisi', code: 'x = 0\nwhile x < 3:\n    print(x)\n    x += 1', output: '0\n1\n2' },
                { term: 'import', type: 'Keyword', desc: 'Mengimpor modul eksternal', code: 'import math\nprint(math.pi)', output: '3.14159...' },
                { term: 'class', type: 'Keyword', desc: 'Mendefinisikan class (OOP)', code: 'class Mobil:\n    pass', output: '(class created)' },
                { term: 'return', type: 'Keyword', desc: 'Mengembalikan nilai dari fungsi', code: 'def kuadrat(x):\n    return x**2\nprint(kuadrat(4))', output: '16' },
                { term: 'lambda', type: 'Keyword', desc: 'Membuat fungsi anonymous', code: 'kali = lambda x, y: x*y\nprint(kali(3, 4))', output: '12' },
                { term: 'try/except', type: 'Keyword', desc: 'Menangani error/exception', code: 'try:\n    x = 1/0\nexcept:\n    print("Error!")', output: 'Error!' },
                { term: 'with', type: 'Keyword', desc: 'Context manager untuk resource', code: 'with open("f.txt") as f:\n    pass', output: '(file handled)' },
                { term: 'yield', type: 'Keyword', desc: 'Generator function', code: 'def gen():\n    yield 1\n    yield 2', output: '(generator)' },
                { term: 'list[]', type: 'Data Type', desc: 'Koleksi data yang terurut dan bisa diubah', code: 'buah = ["apel", "jeruk"]\nprint(buah[0])', output: 'apel' },
                { term: 'dict{}', type: 'Data Type', desc: 'Koleksi data dengan key-value pair', code: 'data = {"nama": "Budi"}\nprint(data["nama"])', output: 'Budi' },
                { term: 'tuple()', type: 'Data Type', desc: 'Koleksi data yang tidak bisa diubah (immutable)', code: 'koordinat = (10, 20)\nprint(koordinat[0])', output: '10' },
                { term: 'set{}', type: 'Data Type', desc: 'Koleksi data unik tanpa duplikat', code: 'angka = {1, 2, 2, 3}\nprint(angka)', output: '{1, 2, 3}' },
                { term: 'str', type: 'Data Type', desc: 'Tipe data teks/string', code: 'nama = "Python"\nprint(len(nama))', output: '6' },
                { term: 'int', type: 'Data Type', desc: 'Tipe data bilangan bulat', code: 'umur = 25\nprint(type(umur))', output: "<class 'int'>" },
                { term: 'float', type: 'Data Type', desc: 'Tipe data bilangan desimal', code: 'tinggi = 175.5\nprint(type(tinggi))', output: "<class 'float'>" },
                { term: 'bool', type: 'Data Type', desc: 'Tipe data boolean (True/False)', code: 'aktif = True\nprint(aktif)', output: 'True' },
                { term: 'None', type: 'Data Type', desc: 'Representasi nilai kosong/null', code: 'data = None\nprint(data is None)', output: 'True' },
                { term: 'len()', type: 'Fungsi', desc: 'Menghitung panjang/ukuran data', code: 'nama = "Python"\nprint(len(nama))', output: '6' },
                { term: 'range()', type: 'Fungsi', desc: 'Membuat urutan angka', code: 'for i in range(3):\n    print(i)', output: '0\n1\n2' },
                { term: 'input()', type: 'Fungsi', desc: 'Membaca input dari user', code: 'nama = input("Nama: ")\nprint(f"Halo {nama}")', output: 'Nama: Budi\nHalo Budi' },
                { term: 'type()', type: 'Fungsi', desc: 'Mengecek tipe data', code: 'print(type(42))\nprint(type("halo"))', output: "<class 'int'>\n<class 'str'>" },
                { term: 'str()', type: 'Fungsi', desc: 'Mengkonversi ke string', code: 'angka = 123\nteks = str(angka)\nprint(type(teks))', output: "<class 'str'>" },
                { term: 'int()', type: 'Fungsi', desc: 'Mengkonversi ke integer', code: 'teks = "100"\nangka = int(teks)\nprint(angka + 50)', output: '150' },
                { term: 'append()', type: 'Method', desc: 'Menambah item ke list', code: 'buah = ["apel"]\nbuah.append("jeruk")\nprint(buah)', output: "['apel', 'jeruk']" },
                { term: 'split()', type: 'Method', desc: 'Memecah string menjadi list', code: 'teks = "a b c"\nprint(teks.split())', output: "['a', 'b', 'c']" },
                { term: 'join()', type: 'Method', desc: 'Menggabung list menjadi string', code: 'kata = ["Halo", "Dunia"]\nprint(" ".join(kata))', output: 'Halo Dunia' },
              ].map((item, i) => (
                <Card key={i} className="border-slate-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-mono text-emerald-600">{item.term}</CardTitle>
                      <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-3">{item.desc}</p>
                    <CodeWithOutput code={item.code} output={item.output} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Section 6: Contoh */}
        <section id="contoh" className="py-16 scroll-mt-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Section 6</Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Contoh Kode Dasar</h2>
            </div>

            <div className="space-y-8">
              <PythonPlayground 
                initialCode={`# Variabel dan Tipe Data
nama = "Budi"
umur = 25
tinggi = 175.5
menikah = False

print(f"Nama: {nama}")
print(f"Umur: {umur} tahun")
print(f"Tinggi: {tinggi} cm")
print(f"Menikah: {menikah}")

# List
hobi = ["membaca", "coding", "gaming"]
print(f"Hobi: {hobi}")`}
                output={`Nama: Budi
Umur: 25 tahun
Tinggi: 175.5 cm
Menikah: False
Hobi: ['membaca', 'coding', 'gaming']`}
                title="Variabel & Tipe Data"
              />

              <PythonPlayground 
                initialCode={`# Kondisi (If-Else)
nilai = 85

if nilai >= 90:
    grade = "A"
elif nilai >= 80:
    grade = "B"
elif nilai >= 70:
    grade = "C"
else:
    grade = "D"

print(f"Nilai {nilai} mendapat grade: {grade}")`}
                output={`Nilai 85 mendapat grade: B`}
                title="Kondisi (If-Else)"
              />

              <PythonPlayground 
                initialCode={`# Perulangan For
print("=== Perulangan For ===")
for i in range(1, 6):
    print(f"Angka: {i}")

# Perulangan While
print("\\n=== Perulangan While ===")
x = 1
while x <= 3:
    print(f"x = {x}")
    x += 1`}
                output={`=== Perulangan For ===
Angka: 1
Angka: 2
Angka: 3
Angka: 4
Angka: 5

=== Perulangan While ===
x = 1
x = 2
x = 3`}
                title="Perulangan"
              />

              <PythonPlayground 
                initialCode={`# Fungsi
def hitung_luas_persegi(sisi):
    return sisi * sisi

def sapa(nama, pesan="Halo"):
    return f"{pesan}, {nama}!"

print(f"Luas persegi (sisi=5): {hitung_luas_persegi(5)}")
print(sapa("Budi"))
print(sapa("Ani", "Selamat pagi"))`}
                output={`Luas persegi (sisi=5): 25
Halo, Budi!
Selamat pagi, Ani!`}
                title="Fungsi"
              />

              <PythonPlayground 
                initialCode={`# List Operations
buah = ["apel", "jeruk", "mangga"]
print(f"List awal: {buah}")

# Tambah item
buah.append("anggur")
print(f"Setelah append: {buah}")

# Akses item
print(f"Item pertama: {buah[0]}")
print(f"Item terakhir: {buah[-1]}")

# Loop list
print("\\nDaftar buah:")
for i, item in enumerate(buah, 1):
    print(f"  {i}. {item}")`}
                output={`List awal: ['apel', 'jeruk', 'mangga']
Setelah append: ['apel', 'jeruk', 'mangga', 'anggur']
Item pertama: apel
Item terakhir: anggur

Daftar buah:
  1. apel
  2. jeruk
  3. mangga
  4. anggur`}
                title="List Operations"
              />

              <PythonPlayground 
                initialCode={`# Dictionary
siswa = {
    "nama": "Budi Santoso",
    "umur": 17,
    "kelas": "XII IPA 1",
    "nilai": [85, 90, 78, 92]
}

print("=== Data Siswa ===")
print(f"Nama: {siswa['nama']}")
print(f"Umur: {siswa['umur']} tahun")
print(f"Kelas: {siswa['kelas']}")

# Hitung rata-rata nilai
rata_rata = sum(siswa['nilai']) / len(siswa['nilai'])
print(f"Rata-rata nilai: {rata_rata:.2f}")`}
                output={`=== Data Siswa ===
Nama: Budi Santoso
Umur: 17 tahun
Kelas: XII IPA 1
Rata-rata nilai: 86.25`}
                title="Dictionary"
              />

              <PythonPlayground 
                initialCode={`# Class dan Object (OOP)
class Mobil:
    def __init__(self, merk, warna, tahun):
        self.merk = merk
        self.warna = warna
        self.tahun = tahun
    
    def info(self):
        return f"{self.merk} ({self.warna}) - {self.tahun}"
    
    def umur(self, tahun_sekarang):
        return tahun_sekarang - self.tahun

# Membuat object
mobil1 = Mobil("Toyota", "Merah", 2020)
mobil2 = Mobil("Honda", "Hitam", 2022)

print(mobil1.info())
print(f"Umur mobil: {mobil1.umur(2024)} tahun")
print(mobil2.info())`}
                output={`Toyota (Merah) - 2020
Umur mobil: 4 tahun
Honda (Hitam) - 2022`}
                title="Class & Object (OOP)"
              />

              <PythonPlayground 
                initialCode={`# Error Handling
def bagi(a, b):
    try:
        hasil = a / b
        return hasil
    except ZeroDivisionError:
        return "Error: Tidak bisa dibagi dengan nol!"
    except TypeError:
        return "Error: Input harus angka!"

print(bagi(10, 2))
print(bagi(10, 0))
print(bagi("a", 2))`}
                output={`5.0
Error: Tidak bisa dibagi dengan nol!
Error: Input harus angka!`}
                title="Error Handling"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">© 2026 Modul Pembelajaran Python - MGMP Informatika & KKA</p>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'modul' | 'playground'>('modul')

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center h-12">
            <div className="flex items-center bg-slate-800 rounded-lg p-1">
              <button onClick={() => setActiveTab('modul')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'modul' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                <BookOpen className="h-4 w-4 inline mr-1" /> Modul
              </button>
              <button onClick={() => setActiveTab('playground')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'playground' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                <Code2 className="h-4 w-4 inline mr-1" /> Playground
              </button>
            </div>
          </div>
        </div>
      </div>
      {activeTab === 'modul' ? <LearningModule /> : <DedicatedPlayground />}
    </div>
  )
}
