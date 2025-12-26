const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "login-secret",
  resave: false,
  saveUninitialized: false
}));

// Fake user (απλό demo)
const USER = { username: "admin", password: "1234" };

app.get("/", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST">
      <input name="username" placeholder="Username"><br>
      <input name="password" type="password" placeholder="Password"><br>
      <button>Login</button>
    </form>
  `);
});

app.post("/", (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    req.session.logged = true;

    // 🔁 ΓΥΡΙΖΕΙ ΠΙΣΩ ΣΤΟ SITE ΣΟΥ
    res.redirect("https://sites.google.com/view/tasos-projects/%CE%B1%CF%81%CF%87%CE%B9%CE%BA%CE%AE-%CF%83%CE%B5%CE%BB%CE%AF%CE%B4%CE%B1");
  } else {
    res.send("Wrong login");
  }
});

// endpoint για έλεγχο login
app.get("/check", (req, res) => {
  res.json({ logged: !!req.session.logged });
});

app.listen(3001, () =>
  console.log("Login app running on port 3001")
);