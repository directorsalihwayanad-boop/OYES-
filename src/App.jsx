import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { CONTACTS, FOLDERS, OFFICIAL_EMAIL, UI } from './data.js'
import { isConfigured, supabase } from './supabase.js'

const waLink = (num, text) => `https://wa.me/${num}?text=${encodeURIComponent(text)}`
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function Shell({ lang, setLang, t, children }) {
  return (
    <div className="app">
      <header className="top">
        <Link to="/" className="brand">
          <span className="logo" aria-hidden>🌍🦅</span>
          <span><b>{t.title}</b><small>{t.brand}</small></span>
        </Link>
        <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language">
          <option value="en">English</option>
          <option value="ml">മലയാളം</option>
        </select>
      </header>
      <main>{children}</main>
      <footer>
        <a href={`mailto:${OFFICIAL_EMAIL}`}>{OFFICIAL_EMAIL}</a>
      </footer>
    </div>
  )
}

function Home({ lang, t }) {
  const [installEvt, setInstallEvt] = useState(null)
  useEffect(() => {
    const h = (e) => { e.preventDefault(); setInstallEvt(e) }
    window.addEventListener('beforeinstallprompt', h)
    return () => window.removeEventListener('beforeinstallprompt', h)
  }, [])

  const share = async () => {
    const data = { title: 'OYES', text: t.brand, url: location.href }
    if (navigator.share) { try { await navigator.share(data) } catch { /* cancelled */ } }
    else { await navigator.clipboard?.writeText(location.href); alert(location.href) }
  }
  const install = async () => {
    if (installEvt) { installEvt.prompt(); setInstallEvt(null) }
    else alert(lang === 'ml' ? 'ബ്രൗസർ മെനുവിൽ "Add to Home screen" തിരഞ്ഞെടുക്കുക.' : 'Use your browser menu → "Add to Home screen".')
  }

  return (
    <>
      <div className="grid">
        {FOLDERS.map((f) => (
          <Link key={f.id} to={`/f/${f.id}`} className="card">
            <span className="ico">{f.icon}</span>
            <span>{f.title[lang]}</span>
          </Link>
        ))}
      </div>
      <div className="row">
        <button onClick={share}>{t.share}</button>
        <button onClick={install}>{t.install}</button>
        <Link className="btn" to="/settings">{t.settings}</Link>
      </div>
      <h3 className="h">{t.contact}</h3>
      <div className="row">
        {CONTACTS.map((c) => (
          <div key={c.id} className="contact">
            <b>{c.name}</b>
            <a href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a>
            <a href={waLink(c.wa, 'OYES enquiry')} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        ))}
      </div>
    </>
  )
}

function Folder({ lang, t }) {
  const { fid, sid } = useParams()
  const f = FOLDERS.find((x) => x.id === fid)
  if (!f) return <NotFound t={t} />
  const sub = sid ? f.subs.find((s) => slug(s) === sid) : null
  if (sid && !sub) return <NotFound t={t} />

  return (
    <>
      <Link className="btn" to={sub ? `/f/${f.id}` : '/'}>{t.back}</Link>
      <h2>{f.icon} {sub || f.title[lang]}</h2>
      {!sub && (
        <div className="grid">
          {f.subs.map((s) => <Link key={s} to={`/f/${f.id}/${slug(s)}`} className="card"><span>{s}</span></Link>)}
        </div>
      )}
      {sub && <p className="muted">{t.soon}</p>}
      {f.contact && (
        <div className="contact">
          <b>{f.contact.name}</b>
          <a href={`tel:${f.contact.phone.replace(/\s/g, '')}`}>{f.contact.phone}</a>
          <a href={waLink(f.contact.wa, `${sub || f.title.en} enquiry`)} target="_blank" rel="noopener noreferrer">{t.enquiry}</a>
        </div>
      )}
    </>
  )
}

function Settings({ t }) {
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const checkRole = async (s) => {
    setSession(s)
    if (!s) return setIsAdmin(false)
    const { data } = await supabase.from('profiles').select('role').eq('id', s.user.id).maybeSingle()
    setIsAdmin(data?.role === 'admin')
  }

  useEffect(() => {
    if (!isConfigured) return
    supabase.auth.getSession().then(({ data }) => checkRole(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => checkRole(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!isConfigured) return <><Link className="btn" to="/">{t.back}</Link><p className="warn">{t.notConfigured}</p></>

  const signIn = async (e) => {
    e.preventDefault(); setBusy(true); setMsg('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMsg(error.message)
    setBusy(false)
  }
  const reset = async () => {
    if (!email) return setMsg(t.email + '?')
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname })
    setMsg(error ? error.message : t.resetSent)
  }

  return (
    <>
      <Link className="btn" to="/">{t.back}</Link>
      <h2>⚙️ {t.settings}</h2>
      {!session && (
        <form onSubmit={signIn} className="form">
          <h3>{t.login}</h3>
          <input type="email" required placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          <input type="password" required placeholder={t.password} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          <button disabled={busy}>{busy ? '…' : t.signIn}</button>
          <button type="button" className="link" onClick={reset}>{t.reset}</button>
          {msg && <p className="warn">{msg}</p>}
        </form>
      )}
      {session && !isAdmin && <p className="warn">{t.denied}</p>}
      {session && isAdmin && <p className="muted">✅ {session.user.email} — admin tools (folders, file manager, studio, AI) arrive in the next phases.</p>}
      {session && <button onClick={() => supabase.auth.signOut()}>{t.signOut}</button>}
    </>
  )
}

function NotFound({ t }) {
  return <><h2>404</h2><p>{t.notFound}</p><Link className="btn" to="/">{t.home}</Link></>
}

export default function App() {
  const [lang, setLang] = useState(localStorage.getItem('oyes_lang') || 'en')
  const t = UI[lang]
  const change = (l) => { setLang(l); localStorage.setItem('oyes_lang', l) }
  const nav = useNavigate()
  useEffect(() => { document.documentElement.lang = lang }, [lang, nav])

  return (
    <Shell lang={lang} setLang={change} t={t}>
      <Routes>
        <Route path="/" element={<Home lang={lang} t={t} />} />
        <Route path="/f/:fid" element={<Folder lang={lang} t={t} />} />
        <Route path="/f/:fid/:sid" element={<Folder lang={lang} t={t} />} />
        <Route path="/settings" element={<Settings t={t} />} />
        <Route path="*" element={<NotFound t={t} />} />
      </Routes>
    </Shell>
  )
}
