
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function App() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Welcome to Harizons.ai — Your Global AI Assistant.' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input || loading) return
    const updated = [...messages, { role: 'user', content: input }]
    setMessages(updated)
    setInput('')
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updated })
    })

    const reader = res.body.getReader()
    let ai = ''
    setMessages([...updated, { role: 'assistant', content: '' }])

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      ai += new TextDecoder().decode(value)
      setMessages(m => {
        const c = [...m]
        c[c.length - 1] = { role: 'assistant', content: ai }
        return c
      })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Harizons.ai</h1>
      <div className="space-y-4 max-w-3xl">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
            className={m.role==='user' ? 'bg-blue-600 text-white p-4 rounded-2xl ml-auto max-w-[80%]' : 'bg-white p-4 rounded-2xl max-w-[80%]'}>
            {m.content}
          </motion.div>
        ))}
        {loading && <p className="text-sm text-gray-400">AI typing…</p>}
      </div>
      <div className="mt-6 flex gap-2 max-w-3xl">
        <input className="flex-1 rounded-xl p-3 border" value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&send()}
          placeholder="Ask anything..." />
        <button onClick={send} className="bg-blue-600 text-white px-6 rounded-xl">Send</button>
      </div>
      <p className="text-xs text-gray-400 mt-10">© 2026 I MADE MERTHA DNA — Harizons.ai</p>
    </div>
  )
}
