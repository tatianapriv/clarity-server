const express = require("express");
const router = express.Router();
const fs = require("fs");
const { stringify } = require("querystring");

//look at prev projects for guideline on fs
router.get("/", (req, res) => {
  fs.readFile("./data/moodData.json", "utf8", (err, data) => {
    const moodData = JSON.parse(data);
    if (moodData) {
      res.status(200).json(moodData);
    } else if (err) {
      res.status(500).send("Failed to retrieve data");
    }
  });
});

router.post("/", (req, res) => {
   
  fs.readFile("./data/moodData.json", (err, data) => {
    if (data) {
      const moodData = JSON.parse(data);

      const foundUserId = moodData.findIndex((user) => {
        return user.userId === req.body.userId;
      });
      const newEntry = {
        value: req.body.value,
        date: req.body.date,
        comment: req.body.comment,
        
      };
     
      moodData[foundUserId].values.push(newEntry);
      const newMoodData = JSON.stringify(moodData);
      fs.writeFile("./data/moodData.json", newMoodData, (err) => {
        if (err) console.log(err);
      });
      res.status(200).send("Your request was completed!");
    } else {
      res.status(500).send("Failed to retrieve data");
    }
  });
});

module.exports = router;
