import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/df-talent-randomizer",
  server: {
    open: true,
    port: 3000,
  },
  plugins: [react(), nodePolyfills()],
});
