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

| Frontend           | Backend              | Database          | Tools               |
|--------------------|----------------------|-------------------|---------------------|
| HTML, CSS, EJS     | Node.js, Express.js  | MongoDB + Mongoose| Git, GitHub, VSCode,|
| Bootstrap          | Passport.js, Multer  |                   | connect-flash,dotenv|

---

## 📂 Project Structure
social-networking-site/
├── app.js
├── package.json
├── .env
├── models/
│   ├── User.js
│   └── Post.js
├── public/
│   ├── css/
│   │   └── style.css
│   ├── uploads/
│   └── screenshots/
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── profile.ejs
│   ├── settings.ejs
│   ├── compose.ejs
│   └── post.ejs

---

## 🔧 Installation & Running Locally

1. Clone the repository  
   `git clone https://github.com/Swetha0812/social-networking-site.git`

2. Navigate to the folder  
   `cd social-networking-site`

3. Install dependencies  
   `npm install`

4. Create a .env file in the root folder and add:  
MONGO_URI=your_mongodb_connection_string  
SESSION_SECRET=your_session_secret

5. Run the app  
`node app.js` or `nodemon app.js`

6. Visit `http://localhost:3000` in your browser.

---


