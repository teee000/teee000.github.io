import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

export type SiteView = 'writing' | 'research' | 'about'

const navigation: { label: string; id: SiteView; href: string }[] = [
  { label: 'Writing', id: 'writing', href: '#writing' },
  { label: 'Research', id: 'research', href: '#research' },
  { label: 'About', id: 'about', href: '#about' },
]

type SiteHeaderProps = {
  currentView: SiteView
  onNavigate: (view: SiteView) => void
}

export default function SiteHeader({ currentView, onNavigate }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <div className="header-inner">
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-link ${currentView === item.id ? 'nav-link-active' : ''}`}
              aria-current={currentView === item.id ? 'page' : undefined}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} strokeWidth={1.7} /> : <Menu size={21} strokeWidth={1.7} />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? 'mobile-nav-open' : ''}`}
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {navigation.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`mobile-nav-link ${currentView === item.id ? 'mobile-nav-link-active' : ''}`}
            aria-current={currentView === item.id ? 'page' : undefined}
            onClick={() => {
              onNavigate(item.id)
              setOpen(false)
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
