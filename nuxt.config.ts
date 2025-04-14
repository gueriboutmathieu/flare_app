import colors from "./src/assets/colors";

export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    sourcemap: {
        server: true,
        client: true,
    },
    app: {
        baseURL: "/",
    },
    srcDir: "src/",
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
    css: ["@/assets/css/tailwind.css"],
    tailwindcss: {
        exposeConfig: true,
        config: {
            content: ["*.vue"],
            theme: {
                extend: {
                    colors: colors,
                    screens: {
                        // TODO: add custom screens
                    },
                },
            },
        },
    },
    runtimeConfig: {
        public: {
            api: {
                baseUrl: process.env.API_BASE_URL,
            },
        },
    },
});
