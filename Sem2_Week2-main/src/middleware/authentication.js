const AdminSchema = require('../models/adminSchema');
const bcrypt = require('bcrypt');

authenticateAdmin = async (username, password) => {
    console.log("authentication verifying...");
    try {
        const user = await AdminSchema.findOne({ username });

        if (!user) {
            console.log("No admin found X")
            return { success: false, message: 'Authentication failed. User not found.'};
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            console.log('Authentication failed X');
            return { success: false, message: 'Authentication failed. Incorrect password.'};
        }
        console.log("Authentication successful")
        return { success: true, message: 'Authentication successful.', };
    } catch (error) {
        throw new Error('Authentication failed. Error occurred.');
    }
}

module.exports = authenticateAdmin;