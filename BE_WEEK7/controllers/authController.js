const User = require('../models/User'); // Ensure the path is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed Password: ${hashedPassword}`); // Log the hashed password for debugging

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
        res.status(201).json({ 
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            token: generateToken(user._id) 
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(await bcrypt.compare(password, user.password))

  if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
    
      });
  } else {
      res.status(400).json({ message: 'Invalid email or password' });
  }
};

// Change Password
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (user && (await bcrypt.compare(oldPassword, user.password))) {
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({ message: 'Password changed successfully' });
    } else {
        res.status(400).json({ message: 'Invalid old password' });
    }
};

// Delete Account
const deleteAccount = async (req, res) => {
    const user = await User.findByIdAndDelete(req.user._id);
    if (user) {
        res.json({ message: 'Account deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Exporting the functions
module.exports = {
    registerUser,
    loginUser, 
    changePassword,
    deleteAccount,
};
