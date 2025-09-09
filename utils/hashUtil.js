const crypto = require("crypto");

const generateStan = () => {
  return Date.now().toString(); // example unique STAN using timestamp
};

const generateHash = (clientCode, stan, apiKey, salt) => {
  // Use your proprietary hash logic here
  const data = `${clientCode}|${stan}|${apiKey}|${salt}`;
  return crypto.createHash("sha256").update(data).digest("hex");
};

module.exports = { generateStan, generateHash };