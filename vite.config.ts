import { fileURLToPath, URL } from "node:url";
import typescript2 from "rollup-plugin-typescript2";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    typescript2({
      check: false,
      include: ["src/**/*.vue", "src/index.ts"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ["vite.config.ts"],
    }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "./src/index.ts",
      formats: ["es", "cjs"],
      name: "UILibrary",
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      cssFileName: "styles.css",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
