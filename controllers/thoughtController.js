// Purpose: functions for thought routes
const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }

      res.json(updatedThought);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }

      res.json(deletedThought);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }
      );

      if (!reaction) {
        return res.status(404).json({ message: "No thought with this ID" });
      }

      res.json(reaction);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.body.reactionId } } }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No thought or reaction with this ID" });
      }

      res.json(reaction);
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
