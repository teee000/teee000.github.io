import { ArrowUpRight } from 'lucide-react'
import type { ResearchProject } from '../data/content'

export default function ResearchItem({ project }: { project: ResearchProject }) {
  return (
    <article className="research-item">
      <a
        className="research-image-link"
        href={project.links[0].href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title} project`}
      >
        <img className="research-image" src={project.image} alt={project.imageAlt} loading="lazy" />
      </a>

      <div className="research-copy">
        <p className="research-meta">{project.meta}</p>
        <h3 className="research-title">{project.title}</h3>
        <p className="research-subtitle">{project.subtitle}</p>
        <p className="research-description">{project.description}</p>
        <div className="research-links" aria-label={`${project.title} links`}>
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-link">
              {link.label}
              <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
