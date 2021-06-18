const config = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};

if (process.env.mode === "umd" || process.env.mode === "cjs") {
  config.presets = [
    ["@babel/preset-env", { targets: "> 1%, last 2 versions" }],
    "@babel/preset-typescript",
  ];
}

module.exports = config;
