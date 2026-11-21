import { lazy, Suspense, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { blogPosts, writingTopics } from '../data/posts'
import type { BlogPost } from '../data/posts'

const MarkdownArticle = lazy(() => import('./MarkdownArticle'))
const allTopics = 'All notes'

type BlogEntryProps = {
  post: BlogPost
  isOpen: boolean
  onToggle: () => void
}

function BlogEntry({ post, isOpen, onToggle }: BlogEntryProps) {
  const triggerId = `post-trigger-${post.slug}`
  const panelId = `post-panel-${post.slug}`

  return (
    <article className={`blog-entry ${isOpen ? 'blog-entry-open' : ''}`}>
      <button
        id={triggerId}
        className="blog-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="blog-meta">
          {post.example ? `Example · ${post.topics[0]}` : post.topics[0]}
        </span>
        <span className="blog-heading">
          <span className="blog-title-line">
            <span className="blog-title">{post.title}</span>
            <time className="blog-date" dateTime={post.date}>{post.date}</time>
          </span>
          <span className="blog-summary">{post.summary}</span>
        </span>
        <ChevronDown className="blog-chevron" size={20} strokeWidth={1.6} aria-hidden="true" />
      </button>

      {isOpen && (
        <div id={panelId} className="article-panel" role="region" aria-labelledby={triggerId}>
          <Suspense fallback={<p className="article-loading" role="status">Loading article…</p>}>
            <MarkdownArticle content={post.content} />
          </Suspense>
        </div>
      )}
    </article>
  )
}

export default function BlogList() {
  const [selectedTopic, setSelectedTopic] = useState(allTopics)
  const [openPost, setOpenPost] = useState<string | null>(null)
  const visiblePosts = selectedTopic === allTopics
    ? blogPosts
    : blogPosts.filter((post) => post.topics.includes(selectedTopic))

  const selectTopic = (topic: string) => {
    setSelectedTopic(topic)
    setOpenPost(null)
  }

  return (
    <div className="writing-layout">
      <aside className="topic-sidebar">
        <p className="topic-label">Topics</p>
        <nav className="topic-nav" aria-label="Filter writing by topic">
          {[allTopics, ...writingTopics].map((topic) => {
            const count = topic === allTopics
              ? blogPosts.length
              : blogPosts.filter((post) => post.topics.includes(topic)).length
            const active = selectedTopic === topic

            return (
              <button
                key={topic}
                className={`topic-button ${active ? 'topic-button-active' : ''}`}
                type="button"
                aria-pressed={active}
                onClick={() => selectTopic(topic)}
              >
                <span>{topic}</span>
                <span className="topic-count">{count}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      <div className="writing-results" aria-live="polite">
        <p className="writing-result-count">
          {selectedTopic} <span>{visiblePosts.length}</span>
        </p>
        <div className="blog-list">
          {visiblePosts.map((post) => (
            <BlogEntry
              key={post.slug}
              post={post}
              isOpen={openPost === post.slug}
              onToggle={() => setOpenPost((current) => current === post.slug ? null : post.slug)}
            />
          ))}
        </div>
        <p className="section-note">New notes are added as individual Markdown files.</p>
      </div>
    </div>
  )
}
