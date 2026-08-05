import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      /*
       * This fixture must use plain <img> and <picture> tags everywhere.
       * next/image rewrites src into an /_image URL and injects its own
       * srcset, which would mean the attribute a variant rewrites is not the
       * attribute that was authored. Off, deliberately and permanently.
       */
      "@next/next/no-img-element": "off",

      /* The marketing copy is prose; escaping every apostrophe hurts it. */
      "react/no-unescaped-entities": "off",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
