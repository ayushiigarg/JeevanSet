const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')

const registerController = async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: 'User Already exists',
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // Create a new user instance
    const user = new userModel(req.body);

    // Save the user to the database
    await user.save();

    // Send a success response
    return res.status(201).send({
      success: true,
      message: 'User Registered Successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error In Register API',
      error,
    });
  }
};


module.exports = {registerController}