// hash-app.js
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.json());

// Replace with your real credentials
const CLIENT_CODE = "VERI8556";
const API_KEY = "s2l4VcJCY774";
const SALT = "w#8FyhX5&CXd";

// Function to generate hash
function generateHash(stan) {
  const str = `${CLIENT_CODE}|${stan}|${API_KEY}|${SALT}`;
  return crypto.createHash("sha256").update(str).digest("hex");
}

// API endpoint
app.post("/generate-hash", (req, res) => {
  const { stan } = req.body;
  if (!stan) {
    return res.status(400).json({ message: "stan is required" });
  }

  const hash = generateHash(stan);
  return res.json({ stan, hash });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Hash generator running on port ${PORT}`);
});