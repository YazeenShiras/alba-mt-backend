const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/property");
const leadRoutes = require("./routes/lead");

const app = express();

const PORT = 5000;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
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
  .connect(
    "mongodb+srv://alba:j29jWiT3m78FcJ35@cluster0.4ilcphx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log("Connection error", e);
  });

app.use("/api/admin", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/leads", leadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
