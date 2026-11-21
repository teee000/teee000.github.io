import { useCallback, useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react'
import SiteHeader from '../components/SiteHeader'
import type { SiteView } from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import ResearchItem from '../components/ResearchItem'
import SectionHeading from '../components/SectionHeading'
import BlogList from '../components/BlogList'
import { researchProjects } from '../data/content'
import '../App.css'

function viewFromHash(): SiteView {
  const hash = window.location.hash.slice(1)
  return hash === 'research' || hash === 'about' ? hash : 'writing'
}

export default function Home() {
  const [view, setView] = useState<SiteView>(viewFromHash)

  useEffect(() => {
    const followHash = () => setView(viewFromHash())
    window.addEventListener('hashchange', followHash)
    return () => window.removeEventListener('hashchange', followHash)
  }, [])

  const navigate = useCallback((nextView: SiteView) => {
    if (window.location.hash !== `#${nextView}`) window.location.hash = nextView
    setView(nextView)
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }))
  }, [])

  return (
    <div className="site-shell" id="top">
      <SiteHeader currentView={view} onNavigate={navigate} />

      <main>
        {view === 'writing' && (
          <>
            <section className="hero hero-compact" aria-labelledby="hero-title">
              <div className="hero-main">
                <p className="affiliation">Tianjin University</p>
                <h1 id="hero-title">Fan Yang</h1>
                <p className="hero-lead">
                  Notes on embodied AI, robot learning, and the ideas behind responsive robotic manipulation.
                </p>
                <div className="hero-actions">
                  <a href="#research" className="primary-link" onClick={() => navigate('research')}>
                    View selected research
                    <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
                  </a>
                  <a href="https://github.com/teee000" target="_blank" rel="noreferrer" className="secondary-link">
                    <Github size={17} strokeWidth={1.6} aria-hidden="true" />
                    GitHub
                    <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>

            <section className="content-section view-section" id="writing" aria-labelledby="writing-title">
              <div id="writing-title">
                <SectionHeading
                  title="Writing"
                  description="Reading notes and technical essays. Choose a topic, then select a title to read it here."
                />
              </div>
              <BlogList />
            </section>
          </>
        )}

        {view === 'research' && (
          <section className="content-section view-section research-view" id="research" aria-labelledby="research-title">
            <div id="research-title">
              <SectionHeading
                title="Selected research"
                description="Research on predicting what comes next and turning those predictions into smooth, purposeful robot behavior."
              />
            </div>
            <div className="research-list">
              {researchProjects.map((project) => (
                <ResearchItem key={project.title} project={project} />
              ))}
            </div>
            <a href="https://github.com/teee000?tab=repositories" target="_blank" rel="noreferrer" className="text-link section-link">
              All repositories on GitHub
              <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </section>
        )}

        {view === 'about' && (
          <section className="content-section view-section about-view" id="about" aria-labelledby="about-title">
            <div id="about-title">
              <SectionHeading title="About" description="Research, code, and ongoing notes in one place." />
            </div>
            <div className="about-copy">
              <p>
                My recent work explores how robot policies can anticipate future states, generate coherent actions,
                and remain responsive during real-time manipulation.
              </p>
              <p>
                This site collects published research alongside the reading notes and technical essays that shape
                the work along the way.
              </p>
              <a href="https://github.com/teee000" target="_blank" rel="noreferrer" className="text-link">
                Find me on GitHub
                <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden="true" />
              </a>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
