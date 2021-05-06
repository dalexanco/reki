const packageInfo = require("./package.json");

module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.ts",
    },
  },
  configureWebpack: {
    devtool: "source-map",
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = packageInfo.productName;
      return args;
    });
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      // @/ is an alias to src/
      // so this assumes you have a file named `src/variables.sass`
      // Note: this option is named as "prependData" in sass-loader v8
      sass: {
        data: `@import "~@/style.scss";`,
      },
    },
  },
};
