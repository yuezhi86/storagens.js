import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

const config = {
  input: "main.ts",
  plugins: [
    babel({
      babelHelpers: "bundled",
      extensions: [".ts"],
    }),
  ],
};

if (process.env.mode === "esm") {
  config.output = [
    {
      file: "index.esm.js",
      format: "es",
      plugins: [terser()],
    },
  ];
}

if (process.env.mode === "umd") {
  config.output = [
    {
      file: "index.min.js",
      format: "umd",
      name: "storagens",
      plugins: [terser()],
    },
  ];
}

export default config;
