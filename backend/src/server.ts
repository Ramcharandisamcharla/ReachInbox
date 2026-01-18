import dotenv from "dotenv";
dotenv.config();
import app from "./app";

app.listen(4000, () => console.log("Backend running on port 4000"));