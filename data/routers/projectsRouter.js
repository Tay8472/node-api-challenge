let express = require("express");
let elite = require("../helpers/projectModel");
let router = express.Router();

router.get("/projects", (req, res) => {
  elite
    .get()
    .then((eliteProject) => {
      res.json(eliteProject);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Could not find Elites",
      });
    });
});

router.post("/projects", (req, res) => {
  elite
    .insert(req.body)
    .then((elitePost) => {
      res.status(201).json(elitePost);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Could not add Elite",
      });
    });
});

router.put("/projects/:id", (req, res) => {
  elite
    .update(req.params.id, req.body)
    .then((eliteProject) => {
      res.json(eliteProject);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Cannot update elite",
      });
    });
});

router.delete("/projects/:id", (req, res) => {
  elite
    .remove(req.params.id)
    .then((num) => {
      if (num > 0) {
        res.status(200).json({
          message: "Elite Eliminated",
        });
      } else {
        res.status(404).json({
          message: "Could not find Elite",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Failed to kill Elite",
      });
    });
});

module.exports = router;