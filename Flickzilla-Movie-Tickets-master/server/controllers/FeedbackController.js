const FeedbackModel = require("../models/FeedbackModel");

// Controller to handle submitting feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { userId,text} = req.body;

    FeedbackModel.create({ userId,text}).then(
      (data) => {
        console.log("Added Successfully...");
        console.log(data);
        res.status(200).json({ msg: "Thank you for your message. It has been sent." });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error." });
  }
};

// Controller to handle getting all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find().sort({ _id: -1 }); // Sort by _id in descending order
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching feedbacks' });
  }
};

// Controller to handle deleting feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id; // Assuming the feedback ID is passed as a URL parameter

    // Use the model to find and remove the feedback
    await FeedbackModel.findByIdAndRemove(feedbackId);

    res.status(200).json({ msg: "Feedback deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting feedback" });
  }
};

// Controller to handle updating isAddedToSlider property
exports.updateSliderStatus = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const { isAddedToSlider } = req.body;

    await FeedbackModel.findByIdAndUpdate(feedbackId, { isAddedToSlider });

    res.status(200).json({ msg: "Slider status updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating slider status" });
  }
};
