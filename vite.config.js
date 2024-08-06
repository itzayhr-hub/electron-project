import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        visualizer({
            filename: "stats.html", //Nombre del archivo con estadisticas
            emitFile: false, //Si es false, no se creará el archivo
            template: "treemap", //Formato en el que se verá las stats
            open: false, //Si es true, se abrirá automáticamente las stats, pero será ignorado si emitFile si es true
        }),
        cssInjectedByJsPlugin({ topExecutionPriority: false }),
    ],
    resolve: {
        alias: {
            Assets: "/src/Assets",
            Components: "/src/Components",
            CSS: "/src/CSS",
            Helpers: "/src/Helpers",
            Hooks: "/src/Hooks",
            Pages: "/src/Pages",
            Routes: "/src/Routes",
            Services: "/src/Services",
            Store: "/src/Store",
            Theme: "/src/Theme",
        },
    },
    build: {
        rollupOptions: {
            external: "dist",
        },
        outDir: "dist",
    },
});
