import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 6500, host: "0.0.0.0" },
  plugins: [react(), checker({ typescript: false })],
});
