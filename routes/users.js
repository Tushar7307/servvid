const _ = require("lodash");
const Joi = require("joi");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const { findByIdAndUpdate } = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  
  const user = await User.find(
    _.pick(req.body, ["name", "dob", "address", "description", "createAt"])
  ).sort('-name');
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  const user = await User.findById(
    req.params.id,
    _.pick(req.body, ["name", "dob", "address", "description", "createAt"])
  );
  res.send(user);
});

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  const user = new User(
    _.pick(req.body, ["name", "dob", "address", "description", "createAt"])
  );
  await user.save();
  res.send(user);
});

router.put("/:id", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  let user = await User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  await user.save();
  res.send(user);
});

router.delete("/:id", async (req, res) => {
 
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) res.status(404).send("user is not found on the specified id");
  res.send(user);
});

module.exports = router;
