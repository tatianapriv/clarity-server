const express = require("express");
const app = express();
const cors = require("cors");
const moodData = require("./routes/moodData");

require("dotenv").config();

const PORT = process.env.PORT || 1111;

app.use(cors());
app.use(express.json());

app.use("/mood", moodData);

app.get("/ping", (req, res) => {
  res.send("received call from backend");
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
