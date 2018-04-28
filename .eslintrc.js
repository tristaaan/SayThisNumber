module.exports = {
    extends: "standard",
    rules: {
      "semi": ["error", "always"],
      "space-before-function-paren": ["error", "never"],
      "no-multi-spaces": [2, { exceptions: { "ImportDeclaration": true } }],
      "key-spacing": ["off"],
      "object-property-newline": ["off"]
    }
};