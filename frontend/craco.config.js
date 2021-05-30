const path = require("path");
module.exports = {
  webpack: {
    alias: {
      '@form-inputs': path.resolve(__dirname, "src/components/form-inputs"),
    }
  }
}