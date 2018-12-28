module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended", "google"],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "linebreak-style": "off",
        "require-jsdoc": "off",
        "max-len": "off",
        "one-var": "off",
        "quotes": ["error", "double"],
        "indent": [
            "error", 2, {
                "FunctionDeclaration": {
                    "body": 1,
                    "parameters": 2,
                },
                "FunctionExpression": {
                    "body": 1,
                    "parameters": 2,
                },
            }
        ],

        /* //TODO(lint) fix these */
        "block-spacing": "off",
        "guard-for-in": "off",
        "object-curly-spacing": "off",
        "padded-blocks": "off",
        "prefer-rest-params": "off",
        "semi-spacing": "off",
        "space-before-blocks": "off",
        "space-before-function-paren": "off",
        "spaced-comment": "off",
        "no-undef": "off",
        "keyword-spacing": "off",
        "key-spacing": "off",
        "no-invalid-this": "off",
        "brace-style": "off",
        "no-console": "off",
        "arrow-parens": "off",
        "curly": "off"
    }
};
