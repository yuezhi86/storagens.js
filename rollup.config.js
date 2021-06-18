import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

const config = {
  input: "main.ts",
  output: [
    {
      file: "index.esm.js",
      format: "es",
    },
  ],
  plugins: [
    babel({
      babelHelpers: "bundled",
      extensions: [".ts"],
    }),
  ],
};

if (process.env.mode === "umd") {
  config.output = [
    {
      file: "index.umd.js",
      format: "umd",
      name: "storagens",
      plugins: [terser()],
    },
  ];
} else if (process.env.mode === "cjs") {
  config.output = [
    {
      file: "index.js",
      format: "cjs",
    },
    {
      file: "index.min.js",
      format: "cjs",
      plugins: [terser()],
    },
  ];
}

export default config;
