const { createNotification } = require("../services/email-service");

const create = async (req, res) => {
  try {
    const response = await createNotification(req.body);
    return res.status(201).json({
      success: true,
      data: response,
      message: "Successfully registered an email reminder",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: response,
      error: error,
      message: "Unable to register an email reminder",
    });
  }
};

module.exports = { create };
