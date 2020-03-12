const express = require("express");
let Users = require("./data/db.js");

const server = express();
server.use(express.json());

const port = 7000;

server.listen(port, () => {
  console.log(`Server Started at http://localhost:${port}`);
});

server.get("/", (req, res) => {
  res.send("Welcome");
});

server.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

server.post("/users", (req, res) => {
  const NewUser = req.body;

  Users.insert(NewUser)
    .then((user) => {
      res.status(201).json({ success: true, user });
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then((results) => {
      if (results) {
        res.status(200).json({ message: "Delete successfull" });
      } else {
        res.status(400).json({ message: "Error deleting user" });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Error deleting user", err })
    );
});

server.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const userInfo = req.body;
  Users.update(id, userInfo)
    .then((updated) => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({ success: false, message: "id not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});
