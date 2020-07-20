module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
      "plugin:prettier/recommended",
      "eslint:recommended"
    ],
    parser: "babel-eslint",
    plugins: ["prettier", "import"],
    parserOptions: {
      parser: "babel-eslint",
    },
    rules: {
      "import/prefer-default-export": "off",
      "prettier/prettier": ["error"],
      quotes: ["error", "backtick"],
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
    overrides: [
        {
            files: ["**/__tests__/*.{j,t}s?(x)", "**/test/**/*.spec.{j,t}s?(x)"],
            env: {
                mocha: true,
            },
        },
    ],
};
