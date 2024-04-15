exports.login = (req, res) => {
  const adminUser = {
    username: "admin@gmail.com",
    password: "password123",
  };

  const { username, password } = req.body;

  if (username === adminUser.username && password === adminUser.password) {
    res.status(200).json({ message: "Login successful", authorized: true });
  } else {
    res
      .status(401)
      .json({ message: "Authentication failed", authorized: false });
  }
};
