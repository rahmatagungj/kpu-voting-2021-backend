// Import vote model
Vote = require("../models/voteModel");

exports.index = async (req, res) => {
  Vote.get(async (err, votes) => {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      res.json({
        status: "success",
        message: "Vote retrieved successfully",
        date: new Date(),
        fromCached: false,
        data: votes,
      });
    }
  });
};

// Handle create vote actions
exports.new = (req, res) => {
  var vote = new Vote();
  vote.nim = req.body.nim;
  vote.name = req.body.name ? req.body.name : vote.name;
  vote.email = req.body.email;
  vote.phone = req.body.phone;
  vote.vote_to = req.body.vote_to;

  vote.save((err) => {
    // Check for validation error
    if (err) {
      res.json(err);
    } else {
      res.json({
        message: "New vote created!",
        data: vote,
      });
    }
  });
};

// Handle view vote info
exports.view = async (req, res) => {
  Vote.find(
    { nim: req.params.nim },
    {
      _id: 1,
      name: 1,
      email: 1,
      nim: 1,
      vote_to: 1,
      create_date: 1,
    },
    (err, votes) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: "Vote details loading..",
          data: votes,
        });
      }
    }
  );
};

// Handle update vote info
exports.update = function (req, res) {
  Vote.findById(req.params.nim, function (err, votes) {
    if (err) res.send(err);
    vote.nim = req.body.nim;
    vote.name = req.body.name ? req.body.name : vote.name;
    vote.email = req.body.email;
    vote.phone = req.body.phone;
    vote.vote_to = req.body.vote_to;

    votes.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: "Vote Info updated",
          data: votes,
        });
      }
    });
  });
};

// Handle delete vote
exports.delete = function (req, res) {
  Vote.remove(
    {
      nim: req.params.nim,
    },
    function (err, votes) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: "success",
          message: "Vote deleted",
        });
      }
    }
  );
};

// Handle count vote
exports.count = async (req, res) => {
  Vote.countDocuments(
    {
      vote_to: req.params.vote_to,
    },
    async (err, votes) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: "success",
          message: votes,
        });
      }
    }
  );
};
