const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
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
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
const blogRoutes = require("./routes/blogRoutes");

app.use("/api", blogRoutes);
// contact messages
const contactRoutes = require("./routes/contactRoutes");

app.use("/api", contactRoutes);
// Admin accessible
const session = require("express-session");

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login.html");
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin@example.com" && password === "adminpass") {
    req.session.user = username;
    res.json({ authorized: true, message: "Login successful!" });
  } else {
    res.json({ authorized: false, message: "Invalid credentials!" });
  }
});
