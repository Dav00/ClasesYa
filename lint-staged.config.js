module.exports = {
  "**/*.ts?(x)": () => "yarn type-check",
  "**/*.(js|ts)?(x)": (files) => `yarn lint ${files.join(" ")}`,
}
