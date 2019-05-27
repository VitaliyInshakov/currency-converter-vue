const WebpackNotifierPlugin = require("webpack-notifier");

const publicPath = "/dist/";

module.exports = {
    publicPath,
    parallel: true,
    lintOnSave: process.env.NODE_ENV !== "production" ? "error" : false,
    css: {
        modules: true,
        loaderOptions: {
            sass: {
                context: "./src",
                data: "",
                implementation: require("dart-sass"),
                fiber: require("fibers"),
            },
        },
    },
    outputDir: `../public${publicPath}`,
    chainWebpack: config => {
        if (process.env.NODE_ENV !== "production") {
            config.plugin("notifier").use(WebpackNotifierPlugin, [
                {
                    alwaysNotify: true,
                },
            ]);
        }

        config.stats({
            colors: true,
            env: true,
            hash: false,
            modules: false,
            children: false,
            entrypoints: false,
        });

        config.plugins.delete("copy");
        config.plugins.delete("hmr");
        config.plugins.delete("html");
        config.plugins.delete("preload");
        config.plugins.delete("prefetch");
        config.plugins.delete("pwa");

        config.devtool(
            process.env.NODE_ENV === "production"
                ? "cheap-source-map"
                : "eval-source-map"
        );

        if (process.env.NODE_ENV === "production") {
            config.resolve.alias
                .set("vue-router$", "vue-router/dist/vue-router.min.js")
                .set("vue-resource$", "vue-resource/dist/vue-resource.min.js")
                .set("vuex$", "vuex/dist/vuex.min.js")
                .set("vue$", "vue/dist/vue.runtime.min.js");

            config.recordsPath(path.resolve(__dirname, "./node_modules/.cache/records.json"));

            // optimization for build
            config.module
                .rule("js")
                .uses
                .get("thread-loader")
                .loader("thread-loader")
                .options({workerParallelJobs: 50, workerNodeArgs: ['--max-old-space-size=4096']});

            config.module
                .rule("ts")
                .uses
                .get("thread-loader")
                .loader("thread-loader")
                .options({workerParallelJobs: 50, workerNodeArgs: ['--max-old-space-size=4096']});

            //remove caching for production build
            config.module
                .rule("vue")
                .uses
                .delete("cache-loader");

            config.module
                .rule("js")
                .uses
                .delete("cache-loader");

            config.module
                .rule("ts")
                .uses
                .delete("cache-loader");
        }
    },
};
