let express = require("express");
let grunt = require("../helpers/actionModel");

let router = express.Router();

router.get("/actions", (req, res) => {
  grunt
    .get()
    .then((gruntActions) => {
      res.json(gruntActions);
    })
    .catch((error) => {
      res.status(500).json({
        error: "The gruntsActions couldn't be found",
      });
    });
});

router.post("/actions", (req, res) => {
  grunt
    .insert(req.body)
    .then((gruntPost) => {
      res.status(201).json(gruntPost);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Cannot add grunt",
      });
    });
});

router.put("/actions/:id", (req, res) => {
  grunt
    .update(req.params.id, req.body)
    .then((gruntAction) => {
      res.status(200).json(gruntAction);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Could not change grunt",
      });
    });
});

router.delete("/actions/:id", (req, res) => {
  grunt
    .remove(req.params.id)
    .then((num) => {
      if (num > 0) {
        res.status(200).json({
          message: "Grunt eliminated",
        });
      } else {
        res.status(404).json({
          message: "Grunt not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Could not kill grunt",
      });
    });
});

module.exports = router;
