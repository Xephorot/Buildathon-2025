module.exports = {
  extends: [
    "next/core-web-vitals",
    "prettier"
  ],
  rules: {
    // Permitir imports no utilizados durante el build
    "@typescript-eslint/no-unused-vars": process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true" ? "off" : "warn",
    // Permitir comillas sin escapar en JSX
    "react/no-unescaped-entities": process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true" ? "off" : "warn",
    // Otros ajustes para deployment
    "@next/next/no-img-element": "warn",
    "react-hooks/exhaustive-deps": "warn",
    // Permitir any en producción
    "@typescript-eslint/no-explicit-any": process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true" ? "off" : "warn",
    // Permitir parámetros implícitos any
    "@typescript-eslint/no-implicit-any": "off"
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "out/",
    "build/"
  ]
};
