// @ts-check

import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactPluginHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default tsEslint.config(
    eslint.configs.recommended,
    ...tsEslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                projectService: true,
                project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
        ...reactPlugin.configs.flat.recommended,
        // Required when using React 17+.
        ...reactPlugin.configs.flat['jsx-runtime'],
        languageOptions: {
            ...reactPlugin.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.serviceworker,
                ...globals.browser,
            },
        },
    },
    {
        plugins: {
            "react-hooks": reactPluginHooks,
        },
        rules: {
            ...reactPluginHooks.configs.recommended.rules,
        },
    },
    {
        ignores: [
            "tailwind.config.js",
            "postcss.config.js"
        ],
    }
)