import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    proxy: {
      "/api": "http://localhost:3500",
    },
  },
  plugins: [react()],
});
