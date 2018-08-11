const express = require("express");
const passport = require("passport");

const handle = require("../../lib/error_handler");

const customErrors = require("../../lib/custom_errors");
const handle404 = customErrors.handle404;
const requireOwnership = customErrors.requireOwnership;

const requireToken = passport.authenticate("bearer", { session: false });
const router = express.Router();
const Post = require("../models/post.js");
const fileUpload = require("../../lib/file-upload.js");

router.get("/posts", requireToken, (req, res) => {
  Post.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      handle(err, res);
      console.error(err);
    });
});

router.get("/posts/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(handle404)
    .then(post => res.status(200).json(post))
    .catch(err => handle(err, res));
});

router.post("/posts", requireToken, (req, res) => {
  const postPost = {
    title: req.body.post.title,
    text: req.body.post.text,
    image: req.body.post.image,
    blogID: req.body.post.blogID
  };
  Post.create(postPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => handle(err, res));
  // fileUpload(postPost.image)
  //   .then(data => {
  //     postPost.image = data.Location;
  //   })
  //   .then(data => {

  // console.log(data);
  // })
  // .catch(console.error);
});

router.patch("/posts/:id", requireToken, (req, res) => {
  const postUpdate = {
    title: req.body.post.title,
    text: req.body.post.text,
    image: req.body.post.image,
    blogID: req.body.post.blogID
  };
  Post.findByIdAndUpdate(
    req.params.id,
    postUpdate,
    { new: true },
    (err, todo) => {
      if (err) return res.status(500).send(err);
      return res.json(todo);
    }
  );
  // fileUpload(postUpdate.image)
  //   .then(data => {
  //     postUpdate.image = data.Location;
  //     console.log(postUpdate.image);
  //   })
  //   .then(() => {

  // })
  // .catch(err => handle(err, res));
});

router.delete("/posts/:id", requireToken, (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send("Post successfully deleted!!");
  });
});

module.exports = router;
