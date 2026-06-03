import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
    {
        ignores: ["dist", "node_modules"],
    },

    js.configs.recommended,

    {
        files: ["src/**/*.{ts,tsx,js,jsx}"],

        languageOptions: {
            parser: tsParser,

            ecmaVersion: "latest",
            sourceType: "module",

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },

            globals: {
                ...globals.browser,
            },
        },

        plugins: {
            "@typescript-eslint": tsPlugin,
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            ...tsPlugin.configs.recommended.rules,

            indent: ["error", 2],
            semi: ["error", "always"],
            "no-mixed-spaces-and-tabs": "error",

            "react/react-in-jsx-scope": "off",

            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
        },
    },
];