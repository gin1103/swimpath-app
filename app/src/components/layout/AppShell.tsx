import { NavLink, Outlet } from "react-router-dom"
import { useT } from "../../i18n/uiStrings"

const NAV_ITEMS = [
  { to: "/", key: "nav.home", end: true },
  { to: "/training", key: "nav.training", end: false },
  { to: "/history", key: "nav.history", end: false },
  { to: "/settings", key: "nav.settings", end: false },
] as const

/**
 * Shared page frame: scrollable content area plus a fixed bottom nav. Every
 * routed page renders inside `<Outlet />` here (see `src/app/router.tsx`).
 */
export function AppShell() {
  const t = useT()

  return (
    <div className="app-shell">
      <main className="app-shell__content">
        <Outlet />
      </main>
      <nav className="app-shell__nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
          >
            {t(item.key)}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
