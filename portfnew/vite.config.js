import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: { "/api": "http://127.0.0.1:5000" },
  },
  base: "/", // Ensures assets load from root
  build: {
    outDir: "dist", // Explicitly set output folder
    emptyOutDir: true, // Clears old files on build
  },
});
