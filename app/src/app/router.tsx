import { createBrowserRouter } from "react-router-dom"
import { AppShell } from "../components/layout/AppShell"
import { HomePage } from "../pages/HomePage"
import { SkillTreePage } from "../pages/SkillTreePage"
import { SkillDetailPage } from "../pages/SkillDetailPage"
import { TrainingPage } from "../pages/TrainingPage"
import { HistoryPage } from "../pages/HistoryPage"
import { SettingsPage } from "../pages/SettingsPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "skills/:strokeId", element: <SkillTreePage /> },
      { path: "skills/:strokeId/:skillId", element: <SkillDetailPage /> },
      { path: "training", element: <TrainingPage /> },
      { path: "history", element: <HistoryPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
])
