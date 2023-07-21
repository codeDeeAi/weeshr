const jwt = require('jsonwebtoken');

const accessToken: String = (process.env.JWT_ACCESS_TOKEN) ? process.env.JWT_ACCESS_TOKEN : "";
const refreshToken: String = (process.env.JWT_REFRESH_TOKEN) ? process.env.JWT_REFRESH_TOKEN : "";

module.exports = {
    accessToken,
    refreshToken,
    jwt
};

