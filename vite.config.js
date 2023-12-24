import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { Plugin as importToCDN } from "vite-plugin-cdn-import";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        importToCDN({
            modules: [
                {
                    name: "react",
                    var: "React",
                    path: "https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/react/18.2.0/umd/react.production.min.js",
                },
                {
                    name: "react-dom",
                    var: "ReactDOM",
                    path: "https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/react-dom/18.2.0/umd/react-dom.production.min.js",
                },
                {
                    name: "dayjs",
                    var: "dayjs",
                    path: "https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/dayjs/1.10.8/dayjs.min.js",
                },
                {
                    name: "icons",
                    var: "icons",
                    path: "https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/ant-design-icons/4.7.0/index.umd.min.js",
                },
                {
                    name: "antd",
                    var: "antd",
                    path: "https://libs.cdnjs.net/antd/5.12.4/antd.min.js",
                    css: "https://libs.cdnjs.net/antd/5.12.4/reset.css",
                },
                {
                    name: "ProComponents",
                    var: "ProComponents",
                    path: "https://unpkg.shop.jd.com/@ant-design/pro-components/dist/pro-components.min.js",
                    css: "https://libs.cdnjs.net/ant-design-pro/2.3.2/ant-design-pro.css",
                },
                {
                    name: "ahooks",
                    var: "ahooks",
                    path: "https://unpkg.shop.jd.com/ahooks/dist/ahooks.js",
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            "@": "/src",
        },
    },

    server: {
        //主要是加上这段代码
        proxy: {
            "/api": {
                target: "http://localhost:3000", //实际请求地址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
