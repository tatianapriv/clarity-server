const express = require("express");
const app = express();
const cors = require("cors");
const moodData = require("./routes/moodData");

require("dotenv").config();

const PORT = process.env.PORT || 1234;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use("/", moodData);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
