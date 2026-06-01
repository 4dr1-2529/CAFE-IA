import { useEffect, useMemo, useRef, useState } from 'react'
import { Bot, ChevronDown, Send, Sparkles, User } from 'lucide-react'
import { askChatbotIA } from '../../services/api/index.js'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import Input from '../../components/ui/Input.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { isAdminUser } from '../../utils/role.js'
import { getChatbotCategories, countChatbotQuestions } from '../../constants/chatbotQuestions.js'

const STORAGE_KEY = 'chatbot_ia_history'

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatbotIAPage() {
  const { user } = useAuth()
  const isAdmin = isAdminUser(user)
  const SUGGESTED_QUESTIONS = useMemo(() => getChatbotCategories(isAdmin), [isAdmin])
  const totalQuestions = useMemo(() => countChatbotQuestions(isAdmin), [isAdmin])

  const [messages, setMessages] = useState(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]')
      if (Array.isArray(saved) && saved.length) return saved
    } catch {
      // ignore
    }
    return [
      {
        id: 1,
        role: 'bot',
        text: `Hola 👋 Soy el asistente de Café Sostenible AI. Tengo ${totalQuestions} preguntas sugeridas por categoría. Como ${isAdmin ? 'ADMIN' : 'CLIENTE'} solo verás datos ${isAdmin ? 'globales del sistema' : 'de tu cuenta'}.`,
        time: nowTime(),
      },
    ]
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [lastSendAt, setLastSendAt] = useState(0)
  const [openCategory, setOpenCategory] = useState('')
  const listRef = useRef(null)
  const maxLen = 300

  const canSend = useMemo(() => input.trim().length > 0 && input.trim().length <= maxLen && !loading, [input, loading])

  useEffect(() => {
    if (!openCategory && SUGGESTED_QUESTIONS[0]) setOpenCategory(SUGGESTED_QUESTIONS[0].category)
  }, [SUGGESTED_QUESTIONS, openCategory])

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading])

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)))
  }, [messages])

  const typingTimerRef = useRef(null)

  useEffect(() => () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current)
  }, [])

  const typeBotMessage = (text) => new Promise((resolve) => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current)
    setTypingText('')
    let i = 0
    const clean = String(text || '')
    typingTimerRef.current = setInterval(() => {
      i += 2
      setTypingText(clean.slice(0, i))
      if (i >= clean.length) {
        clearInterval(typingTimerRef.current)
        typingTimerRef.current = null
        setTypingText('')
        resolve(clean)
      }
    }, 12)
  })

  const submit = async (rawText) => {
    const text = String(rawText || '').trim()
    if (!text) return
    if (text.length > maxLen) return
    if (Date.now() - lastSendAt < 700) return
    setLastSendAt(Date.now())
    const userMsg = { id: Date.now(), role: 'user', text, time: nowTime() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await askChatbotIA(text)
      const typed = await typeBotMessage(res?.answer || res?.data?.answer || 'No hubo respuesta del chatbot.')
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'bot', text: typed, time: nowTime() }])
    } catch (err) {
      const fallback = err?.status === 429
        ? 'Estás enviando mensajes muy rápido. Espera un segundo e intenta de nuevo.'
        : err?.status === 503
          ? 'No pude acceder a la base de datos en este momento.'
          : 'No pude procesar tu consulta. Inténtalo nuevamente.'
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, role: 'bot', text: fallback, time: nowTime() },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <PageHeader
        title="Chatbot IA lógico"
        subtitle={`Consultas por rol · ${totalQuestions} preguntas sugeridas en ${SUGGESTED_QUESTIONS.length} categorías`}
        icon={Bot}
      />

      <div className="card-panel">
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wide">Preguntas sugeridas</h2>
          </div>
          <span className="text-xs text-muted px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
            {isAdmin ? 'Vista ADMIN · datos globales' : 'Vista CLIENTE · solo tus datos'}
          </span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {SUGGESTED_QUESTIONS.map((group) => {
            const isOpen = openCategory === group.category
            return (
              <div key={group.category} className="border border-card rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenCategory(isOpen ? '' : group.category)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/60 text-primary font-semibold text-xs tracking-wide hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <span>
                    {group.category}
                    <span className="ml-2 font-normal text-muted">({group.questions.length})</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-2 bg-card max-h-56 overflow-y-auto space-y-1 animate-fadeIn border-t border-card">
                    {group.questions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => submit(q)}
                        disabled={loading}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-secondary bg-slate-50 dark:bg-slate-800/50 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-primary border border-transparent hover:border-amber-200/50 dark:hover:border-amber-800/40 transition-all disabled:opacity-60"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="chat-panel animate-fadeIn">
        <div className="px-4 py-3 border-b border-card bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-sm font-semibold text-primary">Conversación</h2>
        </div>
        <div ref={listRef} className="chat-scroll">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
              <div className={`flex gap-2 max-w-[86%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                    m.role === 'user' ? 'bg-amber-500 text-cafe-900' : 'bg-slate-200 dark:bg-slate-700 text-primary'
                  }`}
                >
                  {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-xs uppercase tracking-wide">
                      {m.role === 'user' ? 'Tú' : 'Asistente'}
                    </span>
                    <span className="text-xs text-muted">{m.time}</span>
                  </div>
                  <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-fadeIn">
              <div className="chat-bubble-bot max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-4 h-4" />
                  <span className="font-semibold text-xs">Asistente</span>
                </div>
                {typingText ? (
                  <p>{typingText}</p>
                ) : (
                  <p className="flex items-center gap-2 text-muted">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse [animation-delay:300ms]" />
                    Escribiendo...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="p-4 border-t border-card bg-card"
        >
          <div className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value.replaceAll(/[<>]/g, '').slice(0, maxLen))}
              placeholder="Escribe tu consulta..."
              className="flex-1"
            />
            <Button type="submit" disabled={!canSend} className="shrink-0">
              <Send className="w-4 h-4" />
              Enviar
            </Button>
          </div>
          <p className="text-xs text-muted mt-2 tabular-nums">
            {input.trim().length}/{maxLen} caracteres
          </p>
        </form>
      </div>
    </div>
  )
}
