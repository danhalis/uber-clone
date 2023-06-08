module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["./"],
          alias: {
            "assets": "./assets",
            "hooks": "./hooks",
            "components": "./components",
            "screens": "./screens",
            "slices": "./slices",
            "styles": "./styles",
          },
        },
      ],
      [
        require.resolve("react-native-dotenv"),
        {
          moduleName: "@env",
          path: ".env",
        }
      ]
    ]
  };
};
