import app from "./app";
import AppConfig from "./config/config";
import ConnectDB from "./db";

ConnectDB()
  .then(() => {
    app.listen(AppConfig.PORT, () =>
      console.log(`server running on port http://localhost:${AppConfig.PORT}`)
    );
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
