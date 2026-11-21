import { VFile } from 'vfile'
import { matter } from 'vfile-matter'

export type BlogPost = {
  slug: string
  title: string
  date: string
  summary: string
  topics: string[]
  example: boolean
  content: string
}

type PostMetadata = {
  title?: unknown
  date?: unknown
  summary?: unknown
  topics?: unknown
  example?: unknown
}

const postFiles = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function requiredText(value: unknown, field: string, path: string) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${path}: "${field}" must be a non-empty string.`)
  }
  return value.trim()
}

function parsePost(path: string, source: string): BlogPost {
  const file = new VFile({ path, value: source })
  matter(file, { strip: true })
  const metadata = file.data.matter as PostMetadata
  const date = requiredText(metadata.date, 'date', path)

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`${path}: "date" must use YYYY-MM-DD.`)
  }
  if (!Array.isArray(metadata.topics) || metadata.topics.length === 0) {
    throw new Error(`${path}: "topics" must contain at least one topic.`)
  }

  const topics = metadata.topics.map((topic) => requiredText(topic, 'topics', path))
  const slug = path.split('/').pop()!.replace(/\.md$/, '')

  return {
    slug,
    title: requiredText(metadata.title, 'title', path),
    date,
    summary: requiredText(metadata.summary, 'summary', path),
    topics: [...new Set(topics)],
    example: metadata.example === true,
    content: String(file).trim(),
  }
}

export const blogPosts = Object.entries(postFiles)
  .map(([path, source]) => parsePost(path, source))
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))

export const writingTopics = [...new Set(blogPosts.flatMap((post) => post.topics))]
  .sort((a, b) => a.localeCompare(b))
