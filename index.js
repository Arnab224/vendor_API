const express = require("express");
const axios = require("axios");
const { generateStan, generateHash } = require("./utils/hashUtil");

const app = express();
app.use(express.json());

const CLIENT_CODE = "VERI8556";
const API_KEY = "s2l4VcJCY774";
const SALT = "w#8FyhX5&CXd";
const VERIFICATION_URL = "https://sandbox.veri5digital.com/verification-service/verifyID";

app.post("/verifyVehicle", async (req, res) => {
  try {
    const { vehicle_number } = req.body;
    if (!vehicle_number) return res.status(400).json({ message: "Vehicle number is required" });

    const stan = generateStan();
    const hash = generateHash(CLIENT_CODE, stan, API_KEY, SALT);

    const response = await axios.post(
      VERIFICATION_URL,
      {
        sourceEntityType: "ET11",
        verificationType: "VEHICLE_RC",
        userId: "sandbox_gvsuser",
        clientCode: CLIENT_CODE,
        stan,
        requestId: stan,
        hash,
        toBeVerifiedData: { id_number: vehicle_number }
      },
      { headers: { "Content-Type": "application/json" }, timeout: 25000 }
    );

    // Return the vendor's original response
    return res.status(200).json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(err.response?.status || 500).json({
      message: err.response?.data?.status?.message || "Internal server error",
      error: err.response?.data || err.message
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));