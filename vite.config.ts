import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import typescript2 from "rollup-plugin-typescript2";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { viteStaticCopy } from "vite-plugin-static-copy";

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
    viteStaticCopy({
      targets: [
        {
          src: resolve(__dirname, "node_modules/bootstrap"),
          dest: "node_modules",
        },
        {
          src: resolve(__dirname, "src/bootstrap/bootstrap.customized.scss"),
          dest: "src/bootstrap",
        },
        {
          src: resolve(__dirname, "src/fonts"),
          dest: "src/fonts",
        },
      ],
    }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "./src/index.ts",
      formats: ["es", "cjs"],
      name: "UILibrary",
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      cssFileName: "styles",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
      onwarn(warning, rollupWarn) {
        if (warning.code && !["UNUSED_EXTERNAL_IMPORT"].includes(warning.code)) {
          rollupWarn(warning);
        }
      },
    },
    chunkSizeWarningLimit: 2000,
    minify: true,
    cssMinify: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // bootstrap: DON'T USE ALIAS FOR IT. Path should be written complete on scss files in order to work when imported in different projects.
    },
  },
  optimizeDeps: {
    include: ["motion", "bootstrap"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: [
          "mixed-decls",
          "color-functions",
          "global-builtin",
          "import",
          "abs-percent",
        ],
      },
    },
  },
});
