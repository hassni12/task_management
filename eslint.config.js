import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks"; // Import react-hooks

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // Basic JavaScript rules
      "no-console": "warn", // Warn on console.log statements
      eqeqeq: ["error", "always"], // Enforce === and !==
      // quotes: ["error", "single"], // Enforce single quotes
      semi: ["error", "always"], // Enforce semicolons

      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn", // Warn against using any type
      "@typescript-eslint/explicit-function-return-type": "off", // Disable requiring return types for functions
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ], // Disallow unused variables, allow underscore prefix
      // "@typescript-eslint/explicit-module-boundary-types": "warn", // Warn on missing return types for exported functions and classes

      // React rules
      "react/react-in-jsx-scope": "off", // Disable for React 17+
      "react/prop-types": "off", // Disable prop-types since we use TypeScript
      "react/jsx-boolean-value": ["error", "never"], // Enforce the use of boolean attributes
      "react/jsx-filename-extension": [
        "error",
        { extensions: [".jsx", ".tsx"] },
      ], // Limit file extensions for JSX
      "react/no-array-index-key": "warn", // Warn on using array index as a key in lists
      "react/no-unused-prop-types": "warn", // Warn about unused prop types

      // Additional rules
      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies

      // You can add more rules as necessary
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          paths: ["src"], 
        },
      },
    },
  },
];
