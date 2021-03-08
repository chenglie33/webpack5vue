module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    	//关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    "no-async-promise-executor":0,
    "no-misleading-character-class": 0,
    "no-useless-catch": 0,
    "prettier/prettier": [  
      "error",
      {
        printWidth: 200,
        singleQuote: false,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        htmlWhitespaceSensitivity: "ignore"
      }
    ]

  },
  globals: {
    BASE_URL: true
  }
};
