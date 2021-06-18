import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
  input: "main.ts",
  output: [
    {
      file: "index.esm.js",
      format: "es",
      plugins: [terser()],
    },
    {
      file: "index.min.js",
      format: "umd",
      name: "storagens",
      plugins: [terser()],
    },
  ],
  plugins: [
    babel({
      babelHelpers: "bundled",
      extensions: [".ts"],
    }),
  ],
};
