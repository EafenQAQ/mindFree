import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import VitePluginVueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(), VitePluginVueDevTools()],
  base: "/mindFree/",
  build: {
    outDir: "dist/mindFree",
  },
});
