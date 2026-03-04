import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { defineConfig, type ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteStaticCopy } from "vite-plugin-static-copy";

let vueDevToolsPlugin: unknown = null;
try {
  // Only load vueDevTools in dev mode to avoid localStorage access during build
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  vueDevToolsPlugin = require("vite-plugin-vue-devtools");
} catch {
  // Silently fail if vueDevTools can't be imported
}

// https://vite.dev/config/
export default defineConfig((env: ConfigEnv) => {
  const plugins = [vue()];

  if (
    env.command === "serve" &&
    vueDevToolsPlugin &&
    typeof vueDevToolsPlugin === "object" &&
    "default" in vueDevToolsPlugin
  ) {
    const pluginFn = (vueDevToolsPlugin as Record<string, unknown>).default;
    if (typeof pluginFn === "function") {
      plugins.push(pluginFn());
    }
  }

  plugins.push(
    dts({
      entryRoot: "src",
      outDir: "dist",
      tsconfigPath: "tsconfig.build.json",
    }),
  );

  plugins.push(
    ...viteStaticCopy({
      targets: [
        {
          src: resolve(__dirname, "node_modules/bootstrap"),
          dest: "node_modules",
        },
        {
          src: resolve(__dirname, "src/bootstrap/bootstrap.customized.scss"),
          dest: "src/bootstrap",
        },
      ],
    }),
  );

  return {
    plugins,
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
            "color-functions",
            "global-builtin",
            "import",
            "abs-percent",
            "if-function",
          ],
        },
      },
    },
  };
});
