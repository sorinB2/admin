export default {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    overrides: [{
        files: ['*.ts', '*.tsx'],
        rules: {
            '@typescript-eslint/no-shadow': ['error'],
            'no-shadow': 'off',
            'no-undef': 'off',
        },
    }, ],
}