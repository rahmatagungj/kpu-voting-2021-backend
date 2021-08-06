const client = require("../redis-client");

// Import vote model
Vote = require("../models/voteModel");

exports.index = async (req, res) => {
  const cachedVotes = await client.get("votes");

  if (cachedVotes) {
    const cache = JSON.parse(cachedVotes);
    res.json({
      status: cache.status,
      message: cache.message,
      date: cache.date,
      fromCached: cache.fromCached,
      data: JSON.parse(cache.data),
    });
  } else {
    Vote.get(async (err, votes) => {
      if (err) {
        res.json({
          status: "error",
          message: err,
        });
      } else {
        const response = await client.set(
          "votes",
          JSON.stringify({
            status: "success",
            message: "Vote retrieved successfully",
            date: new Date(),
            fromCached: true,
            data: JSON.stringify(votes),
          }),
          "EX",
          30
        );
        res.json({
          status: "success",
          message: "Vote retrieved successfully",
          date: new Date(),
          fromCached: false,
          data: votes,
        });
      }
    });
  }
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
  const cachedVoteInfo = await client.get(`vote-info-${req.params.nim}`);
  if (cachedVoteInfo) {
    res.json({
      message: "Vote details loading..",
      data: JSON.parse(cachedVoteInfo),
    });
  } else {
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
      async (err, votes) => {
        if (err) {
          res.send(err);
        } else {
          const response = await client.set(
            `vote-info-${req.params.nim}`,
            JSON.stringify(votes),
            "EX",
            150
          );
          res.json({
            message: "Vote details loading..",
            data: votes,
          });
        }
      }
    );
  }
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
  const cachedCount = await client.get(`vote-count-${req.params.vote_to}`);
  if (cachedCount) {
    res.json({
      status: "success",
      message: JSON.parse(cachedCount),
    });
  } else {
    Vote.countDocuments(
      {
        vote_to: req.params.vote_to,
      },
      async (err, votes) => {
        if (err) {
          res.send(err);
        } else {
          const response = await client.set(
            `vote-count-${req.params.vote_to}`,
            JSON.stringify(votes),
            "EX",
            30
          );
          res.json({
            status: "success",
            message: votes,
          });
        }
      }
    );
  }
};
