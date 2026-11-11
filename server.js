const mongoose = require("mongoose");
const app = require("./app");
const { MONGODB_URI, PORT } = require("./config/settings");

mongoose.connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
