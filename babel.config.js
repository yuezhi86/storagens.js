const config = {
  presets: ["@babel/preset-typescript"],
};

if (process.env.mode === "umd") {
  config.presets.unshift([
    "@babel/preset-env",
    {
      targets: "> 1%, last 2 versions",
    },
  ]);
}

module.exports = config;
