import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  // GitHub Pages serves the app from /<repository name>/.
  // With npm run dev the app stays at http://localhost:5173/
  base:
    command === "build" || isPreview ? "/PersonalTrainer_FrontEndProject/" : "/",
  plugins: [react()],
}));
