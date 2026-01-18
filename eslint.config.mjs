import eslint from "@eslint/js";
import prettierConfig from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  prettierConfig,
  globalIgnores([".wrangler/**", ".next/**", "out/**", "build/**", "docs/.docusaurus/**"]),
  {
    rules: {
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
    },
  },
]);
