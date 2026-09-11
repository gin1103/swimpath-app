import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        id: "/",
        name: "SwimPath",
        short_name: "SwimPath",
        description: "个人自学游泳训练与技能进阶 PWA",
        lang: "zh-CN",
        start_url: "/",
        display: "standalone",
        background_color: "#f7fafc",
        theme_color: "#0e74bd",
        icons: [
          { src: "pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "pwa-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // PRD.md 第3节: HTML/JS/CSS/图标/课程数据/必要静态资源 must work offline.
        // Curriculum data is currently seeded straight into IndexedDB rather
        // than fetched as a static asset, so build output + icons are all
        // there is to precache for now; this list grows once a curriculum
        // JSON asset exists (CLAUDE.md Development Workflow step 4).
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
      },
    }),
  ],
})
