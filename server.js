require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/property");
const leadRoutes = require("./routes/lead");

const app = express();

const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
const clientUrl = process.env.CLIENT_URL;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "*", clientUrl],
    credentials: true,
    allowedHeaders: [
      "set-cookie",
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
);

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log("Connection error", e);
  });

app.use("/api/admin", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/leads", leadRoutes);

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
