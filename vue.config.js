const WebpackNotifierPlugin = require("webpack-notifier");

module.exports = {
    publicPath: "/",
    parallel: true,
    lintOnSave: process.env.NODE_ENV !== "production" ? "error" : false,
    outputDir: `/public/dist`,
    chainWebpack: config => {
        if (process.env.NODE_ENV !== "production") {
            config.plugin("notifier").use(WebpackNotifierPlugin, [
                {
                    alwaysNotify: true,
                },
            ]);
        }

        config.devtool(
            process.env.NODE_ENV === "production"
                ? "cheap-source-map"
                : "eval-source-map"
        );

        if (process.env.NODE_ENV === "production") {
            config.resolve.alias
                .set("vue-router$", "vue-router/dist/vue-router.min.js")
                .set("vuex$", "vuex/dist/vuex.min.js")
                .set("vue$", "vue/dist/vue.runtime.min.js");

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