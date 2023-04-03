const router = express.Router();
const fs = require("fs");
const moodData = require("../data/moodData.json");

//look at prev projects for guideline on fs
router.get("/", (req, res) => {
  fs.readFile(moodData, (err, data) => {
    const moodData = JSON.parse(data);
    if (moodData) {
      res.status(200).json(moodData);
    } else if (err) {
      res.status(500).send("Failed to retrieve data");
    }
  });
});

router.post("/", (req, res) => {
  fs.readFile(moodData, (err, data) => {
    if (data) {
      const moodData = JSON.parse(data);
      const incomingData = req.body;

      const foundUserId = moodData.findIndex((user) => {
        return user.userId === incomingData.id;
      });

      moodData[foundUserId].values.push(incomingData.value);
    } else {
      res.status(500).send("Failed to retrieve data");
    }
  });
});

module.exports = router;
