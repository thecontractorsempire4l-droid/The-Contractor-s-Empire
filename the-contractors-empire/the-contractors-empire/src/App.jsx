import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import DirectoryPage from './pages/DirectoryPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

/**
 * Scrolls to the top on route change, or to the #anchor when a hash
 * is present (so header links like /#pricing work across pages).
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait a tick so the target section is mounted, then scroll to it.
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-empire-navy">
      <ScrollManager />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/contractor/:slug" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
