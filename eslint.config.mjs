import { defineConfig, globalIgnores } from "eslint/config";
import prettierConfig from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
import eslint from "@eslint/js";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  prettierConfig,
  globalIgnores([".wrangler/**", ".next/**", "out/**", "build/**", "docs/.docusaurus/**"]),
  {
    rules: {
      // Custom rules go here
    },
  },
]);
