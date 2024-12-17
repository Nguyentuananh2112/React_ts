import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },  // Đảm bảo Vite sử dụng SWC để biên dịch TypeScript và JSX
});
