import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
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
  // `vite build --watch` (used by the devbox dev container to live-rebuild dist)
  // empties outDir at the start of every rebuild. In watch mode we keep the
  // previous output in place and overwrite files as they rebuild.
  const isWatch = process.argv.includes("--watch") || process.argv.includes("-w");

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
      emptyOutDir: !isWatch,
      cssCodeSplit: false,
      lib: {
        entry: "./src/index.ts",
        formats: ["es", "cjs"],
        name: "UILibrary",
        fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
        cssFileName: "styles",
      },
      rolldownOptions: {
        external: ["vue", /^@assemblyvoting\/types(\/.*)?$/],
        output: {
          exports: "named",
          globals: {
            vue: "Vue",
          },
        },
        onwarn(warning, rolldownWarn) {
          if (warning.code && !["UNUSED_EXTERNAL_IMPORT"].includes(warning.code)) {
            rolldownWarn(warning);
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
      include: ["motion", "bootstrap", "@assemblyvoting/js-client"],
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
