interface PagePlaceholderProps {
  title: string
  description: string
}

/**
 * Shared shell for pages that are only scaffolded so far. Each real page
 * (Home, SkillTree, ...) is a later CLAUDE.md Development Workflow phase —
 * this keeps the placeholder markup in one place instead of repeated
 * per-page boilerplate.
 */
export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section>
      <h1>{title}</h1>
      <div className="page-placeholder">
        <p>{description}</p>
      </div>
    </section>
  )
}
