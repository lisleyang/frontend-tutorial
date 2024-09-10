const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

console.log('process.env.SENTRY_AUTH_TOKEN', process.env.SENTRY_AUTH_TOKEN)

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    sentryWebpackPlugin({
      org: "8aaee02f7eb8",
      project: "javascript-react",

      // Auth tokens can be obtained by creating an internal integration
      // at https://<organization_id>.sentry.io/settings/developer-settings/
      // and need "Release: Admin" and "Organization: Read & Write" permissions
      authToken: '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',

      // Enable automatically creating releases and associating commits
      release: {
        create: true,
        setCommits: {
          auto: true,
        },
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3000,
  },
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: "asset",
        parser: {
          dataUrlCondition: {
            // maxSize: 10000,
          },
        },
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // pass all js files through Babel
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
};
