const notify = process.env.NODE_ENV !== "production" ? "error" : "off";

module.exports = {
    root: true,
    env: { node: true },
    extends: [
        "plugin:vue/recommended",
        "eslint:recommended",
        "@vue/typescript",
    ],
    plugins: ["typescript"],
    rules: {
        "no-console": [
            notify,
            {
                allow: [
                    "warn",
                    "error",
                ],
            },
        ],
        "no-debugger": notify,
        "array-element-newline": notify,
        "array-bracket-newline": notify,
        "no-empty": [
            "error",
            { "allowEmptyCatch": true },
        ],
        "max-len": [
            notify,
            { "code": 150 },
        ],
        "indent": [
            notify,
            4,
            { "SwitchCase": 1 },
        ],
        semi: [
            notify,
            "always",
        ],
        "no-implicit-dependencies": false,
        "comma-dangle": [
            notify,
            {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "never",
                exports: "never",
                functions: "ignore",
            },
        ],
    },
    parserOptions: {
        parser: "typescript-eslint-parser",
    },
};
