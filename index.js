import app from "./app.js"
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config(
    {
        path: './.env.production'
    }
);


const PORT = process.env.PORT || 3001;

connectDB()
    .then(() => {
      app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      })
    })
    .catch((error) => {
      console.error("Failed to connect to the database", error.message);
      process.exit(1);
    })