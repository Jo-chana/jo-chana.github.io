// eslint-disable-next-line no-undef
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [ 
        "eslint:recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "react-hooks"
    ],
    "settings": {
        "import/resolver": {
            "typescript": {}
        }
    },
    "rules": {
        "indent": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/indent": ["warn"],
        "@typescript-eslint/no-unused-vars": ["warn"],
        "no-use-before-define": 0,
        "no-redeclare": 1,
        "no-console":0,
        "react-hooks/rules-of-hooks": "error", 
        "react-hooks/exhaustive-deps": "warn"
    }
};
