const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const MongoStore = require("connect-mongo");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://swetha_user:mypassword123@socialwebcluster.rytvr9k.mongodb.net/socialDB?retryWrites=true&w=majority&appName=SocialWebCluster")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Models
const Post = require("./models/Post");
const User = require("./models/User");

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(session({
  secret: "supersecretkey",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://swetha_user:mypassword123@socialwebcluster.rytvr9k.mongodb.net/socialDB"
  })
}));

// Flash messages
app.use(flash());

// Set locals for flash and current user
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.session.user;
  next();
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// isLoggedIn middleware
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    req.user = req.session.user; // Expose user to req
    return next();
  }
  req.flash("error", "Please login first.");
  res.redirect("/login");
}

// Routes
app.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render("home", { title: "Home", posts });
});

app.get("/compose", isLoggedIn, (req, res) => {
  res.render("compose", { title: "Compose" });
});

app.post("/compose", isLoggedIn, async (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    createdAt: new Date(),
    author: req.session.user.name
  });
  await post.save();
  res.redirect("/");
});

app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.render("post", { post, title: post.title });
  } catch {
    res.status(500).send("Error loading post");
  }
});

app.post("/posts/:id/like", isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes) post.likes = [];
  if (!post.likes.includes(req.session.user._id)) {
    post.likes.push(req.session.user._id);
  }
  await post.save();
  res.redirect("/");
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

app.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    profileImage: "default.png"
  });
  await newUser.save();
  req.flash("success", "Registration successful. Please login.");
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    req.session.user = user;
    req.flash("success", "Welcome back!");
    res.redirect("/");
  } else {
    req.flash("error", "Invalid credentials.");
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/profile/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const posts = await Post.find({ author: user.name }).sort({ createdAt: -1 });
  res.render("profile", { title: "Profile", user, posts });
});

// Settings GET
app.get("/settings", isLoggedIn, (req, res) => {
  res.render("settings", {
    currentUser: req.user
  });
});

// Settings POST: Profile update
app.post("/settings/profile", isLoggedIn, upload.single("profileImage"), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.file) {
      user.profileImage = "/uploads/" + req.file.filename;
    }

    await user.save();
    req.flash("success", "Profile updated successfully.");
    res.redirect("/settings");
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to update profile.");
    res.redirect("/settings");
  }
});

// Settings POST: Change password
app.post("/settings/password", isLoggedIn, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      req.flash("error", "Old password is incorrect.");
      return res.redirect("/settings");
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    user.password = hashed;
    await user.save();

    req.flash("success", "Password changed successfully.");
    res.redirect("/settings");
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to change password.");
    res.redirect("/settings");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
