export type ProjectLink = {
  label: string
  href: string
}

export type ResearchProject = {
  order: number
  title: string
  subtitle: string
  description: string
  meta: string
  image: string
  imageAlt: string
  links: ProjectLink[]
}

const paperFiles = import.meta.glob('../content/papers/*.json', {
  import: 'default',
  eager: true,
}) as Record<string, ResearchProject>

export const researchProjects = Object.entries(paperFiles)
  .map(([path, project]) => {
    if (typeof project.order !== 'number' || !project.title || !Array.isArray(project.links)) {
      throw new Error(`${path}: paper metadata requires order, title, and links.`)
    }
    return project
  })
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
