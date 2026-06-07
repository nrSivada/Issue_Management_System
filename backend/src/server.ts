import dotenv from "dotenv";
import app from "./app";

dotenv.config();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);