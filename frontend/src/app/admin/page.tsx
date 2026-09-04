'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LogOut, FileText, MessageSquare, BarChart2, Eye,
  RefreshCw, Trash2, CheckCircle, ChevronDown, Download, X
} from 'lucide-react'

interface Quote {
  _id: string
  name: string
  company: string
  email: string
  phone: string
  serviceType: string
  origin: string
  destination: string
  cargoType: string
  weight: string
  volume: string
  readyDate: string
  additionalInfo: string
  createdAt: string
  status: 'new' | 'reviewed' | 'quoted' | 'won' | 'lost'
  notes: string
}

interface Contact {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: string
  read: boolean
  replied: boolean
}

const STATUS_COLORS: Record<string, string> = {
  new:      'text-brand-red border-brand-red/30 bg-brand-red/10',
  reviewed: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  quoted:   'text-blue-400 border-blue-400/30 bg-blue-400/10',
  won:      'text-green-400 border-green-400/30 bg-green-400/10',
  lost:     'text-white/30 border-white/10 bg-white/5',
}

const STATUS_OPTIONS = ['new', 'reviewed', 'quoted', 'won', 'lost']

function exportCSV(data: Quote[]) {
  const headers = ['Name','Company','Email','Phone','Service','Origin','Destination','Cargo Type','Weight','Volume','Ready Date','Status','Date','Additional Info']
  const rows = data.map(q => [
    q.name, q.company || '', q.email, q.phone || '',
    q.serviceType, q.origin, q.destination,
    q.cargoType || '', q.weight || '', q.volume || '',
    q.readyDate || '', q.status,
    new Date(q.createdAt).toLocaleDateString('en-IN'),
    (q.additionalInfo || '').replace(/,/g, ';'),
  ])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `sainik-quotes-${new Date().toISOString().slice(0,10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [tab, setTab] = useState<'quotes' | 'contacts'>('quotes')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'
  const apiBase =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://sainik-global-backend.onrender.com'

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      })
      const data = await res.json()
      console.log('Login response:', data)
      if (data.token) {
        setToken(data.token)
        localStorage.setItem('admin_token', data.token)
        // Fetch data immediately after login
        await new Promise(r => setTimeout(r, 100))
        fetchData(data.token)
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Cannot reach API server. Is the backend running?')
    }
  }

  const fetchData = useCallback(async (t: string) => {
    setLoading(true)
    try {
      const [qRes, cRes] = await Promise.all([
        fetch(`${apiBase}/api/quotes`, { headers: { Authorization: `Bearer ${t}` } }),
        fetch(`${apiBase}/api/contact`, { headers: { Authorization: `Bearer ${t}` } }),
      ])
      
      if (!qRes.ok || !cRes.ok) {
        console.error('API Error - Quotes:', qRes.status, 'Contacts:', cRes.status)
        setError('Failed to load data. Check backend connection.')
        setLoading(false)
        return
      }

      const [q, c] = await Promise.all([qRes.json(), cRes.json()])
      console.log('Quotes data:', q)
      console.log('Contacts data:', c)
      
      setQuotes(q.quotes || q.data?.quotes || [])
      setContacts(c.contacts || c.data?.contacts || [])
      setError('')
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Failed to load data: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
    setLoading(false)
  }, [apiBase])

  useEffect(() => {
    const saved = localStorage.getItem('admin_token')
    if (saved) { setToken(saved); fetchData(saved) }
  }, [fetchData])

  const logout = () => { setToken(null); localStorage.removeItem('admin_token') }

  const updateQuoteStatus = async (id: string, status: string) => {
    if (!token) return
    try {
      await fetch(`${apiBase}/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      })
      setQuotes(prev => prev.map(q => q._id === id ? { ...q, status: status as Quote['status'] } : q))
      if (selectedQuote?._id === id) setSelectedQuote(prev => prev ? { ...prev, status: status as Quote['status'] } : null)
    } catch { /* silent */ }
  }

  const deleteQuote = async (id: string) => {
    if (!token || !confirm('Delete this quote request?')) return
    try {
      await fetch(`${apiBase}/api/quotes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setQuotes(prev => prev.filter(q => q._id !== id))
      if (selectedQuote?._id === id) setSelectedQuote(null)
    } catch { /* silent */ }
  }

  const markContactRead = async (id: string, read: boolean) => {
    if (!token) return
    try {
      await fetch(`${apiBase}/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ read }),
      })
      setContacts(prev => prev.map(c => c._id === id ? { ...c, read } : c))
      if (selectedContact?._id === id) setSelectedContact(prev => prev ? { ...prev, read } : null)
    } catch { /* silent */ }
  }

  const deleteContact = async (id: string) => {
    if (!token || !confirm('Delete this inquiry?')) return
    try {
      await fetch(`${apiBase}/api/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setContacts(prev => prev.filter(c => c._id !== id))
      if (selectedContact?._id === id) setSelectedContact(null)
    } catch { /* silent */ }
  }

  const inputClass = 'w-full bg-brand-dark-3 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-colors'

  // ── Login Screen ────────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center relative">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <motion.div
          className="relative w-full max-w-md p-8 glass border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 border border-brand-red/50 rotate-45 flex items-center justify-center">
              <span className="font-display font-black text-sm text-brand-red -rotate-45">SG</span>
            </div>
            <div>
              <p className="font-display font-bold text-white tracking-wider uppercase">Admin Portal</p>
              <p className="font-mono text-[9px] text-brand-red tracking-widest">Sainik Global Logistics</p>
            </div>
          </div>

          {error && (
            <div className="bg-brand-red/10 border border-brand-red/30 text-brand-red text-sm px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={login} className="space-y-4">
            <input
              required type="email" placeholder="Admin Email"
              value={loginForm.email}
              onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
              className={inputClass}
            />
            <input
              required type="password" placeholder="Password"
              value={loginForm.password}
              onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
              className={inputClass}
            />
            <button type="submit" className="btn-primary w-full justify-center">
              Sign In
            </button>
          </form>
          <p className="text-white/20 text-xs mt-6 text-center font-mono">
            Sainik Global Logistics Pvt. Ltd. — Admin Access Only
          </p>
        </motion.div>
      </div>
    )
  }

  const filteredQuotes = statusFilter === 'all'
    ? quotes
    : quotes.filter(q => q.status === statusFilter)

  const unreadContacts = contacts.filter(c => !c.read).length

  // ── Dashboard ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="bg-brand-dark-2 border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-white uppercase tracking-wider text-sm">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => token && fetchData(token)}
            className="text-white/40 hover:text-white transition-colors"
            title="Refresh data"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-white/40 hover:text-brand-red transition-colors text-xs font-mono uppercase tracking-wider"
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </div>

      <div className="p-6 max-w-screen-2xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: FileText,      label: 'Total Quotes',     value: quotes.length },
            { icon: MessageSquare, label: 'Total Inquiries',   value: contacts.length },
            { icon: BarChart2,     label: 'New / Pending',     value: quotes.filter(q => q.status === 'new').length },
            { icon: Eye,           label: 'Unread Inquiries',  value: unreadContacts },
          ].map(stat => (
            <div key={stat.label} className="card-dark p-5">
              <stat.icon size={16} className="text-brand-red mb-3" />
              <p className="font-display font-bold text-white text-3xl">{stat.value}</p>
              <p className="text-white/40 text-xs mt-1 uppercase tracking-wider font-mono">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs + Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-1">
            {(['quotes', 'contacts'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-6 py-2.5 font-display text-sm uppercase tracking-wider transition-colors ${
                  tab === t ? 'bg-brand-red text-white' : 'bg-brand-dark-2 text-white/40 hover:text-white'
                }`}
              >
                {t === 'quotes'
                  ? `Quote Requests (${quotes.length})`
                  : <>Inquiries ({contacts.length}){unreadContacts > 0 && (
                      <span className="ml-2 w-4 h-4 rounded-full bg-brand-red text-white text-[9px] inline-flex items-center justify-center font-mono">
                        {unreadContacts}
                      </span>
                    )}</>
                }
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {tab === 'quotes' && (
              <>
                {/* Status filter */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="appearance-none bg-brand-dark-2 border border-white/10 text-white/60 text-xs px-4 py-2.5 pr-8 focus:outline-none focus:border-brand-red font-mono uppercase tracking-wider"
                  >
                    <option value="all">All Status</option>
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                </div>
                {/* CSV Export */}
                <button
                  onClick={() => exportCSV(filteredQuotes)}
                  className="flex items-center gap-2 border border-white/10 text-white/50 hover:text-white hover:border-white/30 px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  <Download size={12} /> Export CSV
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tables */}
        {loading ? (
          <div className="text-center py-20 text-white/30 font-mono text-sm">Loading data…</div>
        ) : tab === 'quotes' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {['Name / Company', 'Contact', 'Service', 'Route', 'Date', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-4 font-mono text-[10px] text-white/30 tracking-widest uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map(q => (
                  <tr
                    key={q._id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => setSelectedQuote(q)}
                  >
                    <td className="py-3 px-4">
                      <p className="text-white font-body">{q.name}</p>
                      <p className="text-white/40 text-xs">{q.company || '—'}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-white/60 text-xs">{q.email}</p>
                      <p className="text-white/40 text-xs">{q.phone || '—'}</p>
                    </td>
                    <td className="py-3 px-4 text-brand-red text-xs font-mono">{q.serviceType}</td>
                    <td className="py-3 px-4">
                      <p className="text-white/60 text-xs">{q.origin}</p>
                      <p className="text-white/40 text-xs">→ {q.destination}</p>
                    </td>
                    <td className="py-3 px-4 text-white/40 text-xs whitespace-nowrap">
                      {new Date(q.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                      <div className="relative">
                        <select
                          value={q.status}
                          onChange={e => updateQuoteStatus(q._id, e.target.value)}
                          className={`appearance-none text-[10px] font-mono px-2 py-1 pr-5 border uppercase tracking-widest focus:outline-none cursor-pointer ${STATUS_COLORS[q.status] || STATUS_COLORS.new}`}
                          style={{ background: 'transparent' }}
                        >
                          {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-gray-900 text-white">{s}</option>)}
                        </select>
                        <ChevronDown size={10} className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                      </div>
                    </td>
                    <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => deleteQuote(q._id)}
                        className="text-white/20 hover:text-brand-red transition-colors p-1"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredQuotes.length === 0 && (
                  <tr><td colSpan={7} className="py-16 text-center text-white/20 font-mono text-xs">No quote requests found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {['Name / Email', 'Phone', 'Subject', 'Date', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-4 font-mono text-[10px] text-white/30 tracking-widest uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr
                    key={c._id}
                    className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer ${!c.read ? 'bg-brand-red/[0.02]' : ''}`}
                    onClick={() => { setSelectedContact(c); if (!c.read) markContactRead(c._id, true) }}
                  >
                    <td className="py-3 px-4">
                      <p className={`font-body ${!c.read ? 'text-white' : 'text-white/70'}`}>{c.name}</p>
                      <p className="text-white/40 text-xs">{c.email}</p>
                    </td>
                    <td className="py-3 px-4 text-white/40 text-xs">{c.phone || '—'}</td>
                    <td className="py-3 px-4 text-white/60 text-xs max-w-xs truncate">{c.subject}</td>
                    <td className="py-3 px-4 text-white/40 text-xs whitespace-nowrap">
                      {new Date(c.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      {!c.read
                        ? <span className="font-mono text-[9px] bg-brand-red/10 text-brand-red border border-brand-red/20 px-2 py-0.5 uppercase tracking-widest">Unread</span>
                        : <span className="font-mono text-[9px] bg-white/5 text-white/30 border border-white/10 px-2 py-0.5 uppercase tracking-widest">Read</span>
                      }
                    </td>
                    <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        {!c.read && (
                          <button
                            onClick={() => markContactRead(c._id, true)}
                            className="text-white/20 hover:text-green-400 transition-colors p-1"
                            title="Mark as read"
                          >
                            <CheckCircle size={13} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteContact(c._id)}
                          className="text-white/20 hover:text-brand-red transition-colors p-1"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr><td colSpan={6} className="py-16 text-center text-white/20 font-mono text-xs">No inquiries yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quote Detail Drawer */}
      <AnimatePresence>
        {selectedQuote && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedQuote(null)}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-brand-dark-2 border-l border-white/10 z-50 overflow-y-auto"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="eyebrow">Quote Request Detail</p>
                    <p className="text-white font-display font-bold text-lg mt-1">{selectedQuote.name}</p>
                  </div>
                  <button onClick={() => setSelectedQuote(null)} className="text-white/40 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                {/* Status selector */}
                <div className="flex items-center gap-3 mb-6 p-4 bg-brand-dark-3 border border-white/5">
                  <p className="text-white/40 text-xs font-mono uppercase tracking-wider">Status:</p>
                  <select
                    value={selectedQuote.status}
                    onChange={e => updateQuoteStatus(selectedQuote._id, e.target.value)}
                    className={`appearance-none text-xs font-mono px-3 py-1.5 pr-7 border uppercase tracking-widest focus:outline-none cursor-pointer ${STATUS_COLORS[selectedQuote.status]}`}
                    style={{ background: 'transparent' }}
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-gray-900 text-white">{s}</option>)}
                  </select>
                </div>

                {/* Detail rows */}
                <div className="space-y-3">
                  {[
                    ['Company',     selectedQuote.company],
                    ['Email',       selectedQuote.email],
                    ['Phone',       selectedQuote.phone],
                    ['Service',     selectedQuote.serviceType],
                    ['Origin',      selectedQuote.origin],
                    ['Destination', selectedQuote.destination],
                    ['Cargo Type',  selectedQuote.cargoType],
                    ['Weight',      selectedQuote.weight ? selectedQuote.weight + ' kg' : null],
                    ['Volume',      selectedQuote.volume ? selectedQuote.volume + ' CBM' : null],
                    ['Ready Date',  selectedQuote.readyDate],
                    ['Submitted',   new Date(selectedQuote.createdAt).toLocaleString('en-IN')],
                  ].filter(([, v]) => v).map(([label, value]) => (
                    <div key={label as string} className="grid grid-cols-5 gap-3 py-2.5 border-b border-white/5">
                      <p className="col-span-2 text-white/30 text-xs font-mono uppercase tracking-wider">{label}</p>
                      <p className="col-span-3 text-white text-sm">{value}</p>
                    </div>
                  ))}
                </div>

                {selectedQuote.additionalInfo && (
                  <div className="mt-4 p-4 bg-brand-dark-3 border-l-2 border-brand-red">
                    <p className="text-white/30 text-xs font-mono uppercase tracking-wider mb-2">Additional Info</p>
                    <p className="text-white/60 text-sm leading-relaxed">{selectedQuote.additionalInfo}</p>
                  </div>
                )}

                <div className="flex gap-3 mt-8">
                  <a
                    href={`mailto:${selectedQuote.email}?subject=Re: ${selectedQuote.serviceType} Quote — Sainik Global Logistics`}
                    className="btn-primary flex-1 justify-center text-xs py-3"
                  >
                    Reply via Email
                  </a>
                  <button
                    onClick={() => deleteQuote(selectedQuote._id)}
                    className="btn-outline text-xs py-3 px-4 hover:border-brand-red hover:text-brand-red"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Detail Drawer */}
      <AnimatePresence>
        {selectedContact && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedContact(null)}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-brand-dark-2 border-l border-white/10 z-50 overflow-y-auto"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="eyebrow">Inquiry Detail</p>
                    <p className="text-white font-display font-bold text-lg mt-1">{selectedContact.name}</p>
                  </div>
                  <button onClick={() => setSelectedContact(null)} className="text-white/40 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    ['Email',     selectedContact.email],
                    ['Phone',     selectedContact.phone],
                    ['Subject',   selectedContact.subject],
                    ['Received',  new Date(selectedContact.createdAt).toLocaleString('en-IN')],
                  ].filter(([, v]) => v).map(([label, value]) => (
                    <div key={label as string} className="grid grid-cols-5 gap-3 py-2.5 border-b border-white/5">
                      <p className="col-span-2 text-white/30 text-xs font-mono uppercase tracking-wider">{label}</p>
                      <p className="col-span-3 text-white text-sm">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-brand-dark-3 border-l-2 border-brand-red">
                  <p className="text-white/30 text-xs font-mono uppercase tracking-wider mb-2">Message</p>
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
                </div>

                <div className="flex gap-3 mt-8">
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                    className="btn-primary flex-1 justify-center text-xs py-3"
                    onClick={() => markContactRead(selectedContact._id, true)}
                  >
                    Reply via Email
                  </a>
                  {!selectedContact.read && (
                    <button
                      onClick={() => markContactRead(selectedContact._id, true)}
                      className="btn-outline text-xs py-3 px-4"
                    >
                      <CheckCircle size={13} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteContact(selectedContact._id)}
                    className="btn-outline text-xs py-3 px-4 hover:border-brand-red hover:text-brand-red"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
