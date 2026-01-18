import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // simula el navegador
    globals: true, // te permite usar "describe" y "test" sin importarlos
    setupFiles: "./src/setupTests.js", // archivo de configuración inicial
  },
});
