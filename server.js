const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use(authRoutes);

const dbURI = "mongodb://localhost:27017";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send(
    "Starting the back-end of my brand and I have made the change on starting  server"
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
const blogRoutes = require("./routes/blogRoutes");

app.use("/api", blogRoutes);
