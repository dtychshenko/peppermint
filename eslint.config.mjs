import eslint from "@eslint/js";
import prettierConfig from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  prettierConfig,
  globalIgnores([
    ".github",
    ".wrangler/",
    ".vscode",
    "dist",
    "node_modules",
    "out",
    "build",
    "docs/.docusaurus",
    "docs/build",
    "docs/node_modules",
    "postcss.config.cjs",
  ]),
  {
    rules: {
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
    },
  },
]);
