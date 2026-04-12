import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["main.js"],
    languageOptions:
      { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "semi": ["error", "always"],
      "quotes": ["warn", "single"],
    }
  }
]);