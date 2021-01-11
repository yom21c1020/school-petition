module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true
    },
    extends: [
        'airbnb-base'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        indent: [
            'error',
            4
        ],
        'comma-dangle': ['error', 'never'],
        'no-plusplus': 0,
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'never',
                ignoreRestSiblings: true
            }
        ]
    }
};
