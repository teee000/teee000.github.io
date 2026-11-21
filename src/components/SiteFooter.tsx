import { ArrowUp, ArrowUpRight, Github } from 'lucide-react'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} Fan Yang</p>
        <div className="footer-links">
          <a href="https://github.com/teee000" target="_blank" rel="noreferrer" className="footer-link">
            <Github size={16} strokeWidth={1.6} aria-hidden="true" />
            GitHub
            <ArrowUpRight size={13} strokeWidth={1.6} aria-hidden="true" />
          </a>
          <a href="#top" className="footer-link">
            Back to top
            <ArrowUp size={14} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
