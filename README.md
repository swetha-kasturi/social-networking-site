# 🌐 Social Networking Site

A full-stack social networking web application where users can register, create posts, like and comment, update their profile, switch between dark/light mode, search content, and receive notifications – all built with **Node.js**, **Express**, **MongoDB**, **EJS**, and **Bootstrap**.

![Screenshot](public/images/social-network-banner.png)

---

## 🚀 Features

- 📝 **User Authentication** (Register/Login/Logout using Passport.js)
- 👤 **User Profile** (Update image, name, email, password)
- 📸 **Post Creation** (Image, caption, timestamp)
- ❤️ **Like System** (One like per user per post)
- 💬 **Comment System** (Add and view comments below posts)
- 🔦 **Dark Mode Toggle** (Save preference in browser)
- 🔍 **Search Bar** (Live search for posts by caption or username)
- 🛎️ **Notification Alerts** (Basic in-app alerts)
- 📱 **Responsive Design** (Mobile-friendly UI with Bootstrap)

---

## 🧰 Tech Stack

| Frontend           | Backend              | Database          | Tools              |
|--------------------|----------------------|-------------------|--------------------|
| HTML, CSS, EJS     | Node.js, Express.js  | MongoDB + Mongoose| Git, GitHub, VSCode|
| Bootstrap          | Passport.js, Multer  |                   |                    |

---

## 📂 Project Structure
<pre><code> ## 📂 Project Structure ``` social-networking-site/ ├── app.js ├── .env ├── .gitignore ├── package.json ├── /models │ ├── User.js │ ├── Post.js │ └── Comment.js ├── /routes │ ├── auth.js │ ├── post.js │ ├── user.js │ └── index.js ├── /views │ ├── partials/ │ ├── home.ejs │ ├── login.ejs │ ├── register.ejs │ ├── settings.ejs │ └── profile.ejs ├── /public │ ├── css/ │ │ └── style.css │ ├── js/ │ │ └── darkmode.js │ └── images/ │ └── default.png, icons, etc. ├── /uploads │ └── (user profile images) ``` </code></pre>
