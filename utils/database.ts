const mongoose = require("mongoose");
const env = require("dotenv").config();

const MONGODB_URI = process.env.DB;
const MONGODB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

/**
 * Connects app database 
 * @returns {Promise<any>}
 */
const dbConnect = async (): Promise<any> => {
    return await mongoose.connect(MONGODB_URI, MONGODB_OPTIONS);
};

module.exports = dbConnect;