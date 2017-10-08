module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "camelcase": [2, {"properties": "always"}],
      "wrap-iife": [2, "inside"],
      "new-cap": [2, { "capIsNewExceptions": [] }],
      "no-invalid-this": 2,
      "class-methods-use-this": 1,
      "react/prop-types": 0,
      "global-require": 0,
      "comma-dangle": [2, {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "never"
      }],
      "no-plusplus": 0,
      "no-return-assign": 0,
      "no-underscore-dangle": 0,
      "no-unused-expressions": [2, {
        "allowShortCircuit": true,
        "allowTernary": true
      }],
      "import/no-extraneous-dependencies": 0,
      "import/prefer-default-export": 0,
      "react/forbid-prop-types": 1,
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/prefer-stateless-function": 0,
      "react/sort-comp": [1, {
        "order": [
          "type-annotations",
          "static-methods",
          "lifecycle",
          "everything-else",
          "render"
        ]
      }],
      "react-native/no-unused-styles": 0,
      "react-native/split-platform-components": 0,
      "react-native/no-inline-styles": 0,
      "react-native/no-color-literals": 2,
      "spaced-comment": ["error", "always"]
    },
};
