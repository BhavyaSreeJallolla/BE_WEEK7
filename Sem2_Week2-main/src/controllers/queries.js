const bcrypt = require('bcrypt');
const AdminSchema = require('../models/adminSchema');

const addAdmin = async (username, password) => {
    console.log(1)
    // Check if the admin already exists
    const existingAdmin = await AdminSchema.findOne({ username});

    if (existingAdmin) {
        throw new Error('Admin with this username already exists'); 
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new AdminSchema ({ 
        username: username,
        password: hashedPassword, 
    });

    // Save the new admin to the database
    const savedAdmin = await newAdmin.save();
    console.log(savedAdmin);

    return savedAdmin;
};

module.exports = { addAdmin };