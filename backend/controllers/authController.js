const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

const loginController = async (req, res) => {
  try {
    // Find the user by email
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Invalid Credentials'
      });
    }

    // Compare password
    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    if (!comparePassword) {
      return res.status(400).send({
        success: false,
        message: 'Invalid Credentials'
      });
    }

    // Create a payload with user ID and email
    const payload = { userId: user._id, email: user.email };
    // Sign the access token with a 1-day expiration
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send the access token in the response
    res.status(200).send({
      success: true,
      accessToken,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Login API',
      error
    });
  }
}

const currentUserController = async(req,res)=>{
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
      return res.status(200).send({
        success: true,
        message: 'User fetched successfully',
        user
      })
      
    } catch (error) {
      console.log(error)
      res.status(500).send({
      success: false,
      message: 'Unable to get current user',
      error
    });
    }
}

module.exports = { registerController, loginController,currentUserController };
