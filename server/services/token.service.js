const jwt = require("jsonwebtoken");
const config = require("../config/index");
const tokenTypes = require("../config/tokenTypes");

/**
 * Generates a JWT token with the given user ID, expiration time, and type.
 *
 * @param {string} userId - The user ID for which the token is generated.
 * @param {number} expires - The expiration time of the token (Unix timestamp).
 * @param {string} type - The type of token to generate.
 * @param {string} [secret=config.jwt.secret] - The secret key used to sign the token. Defaults to the JWT secret from the configuration.
 * @returns {string} - The generated JWT token.
 */

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    type: type,
    exp: expires,
    iat: Date.now() / 1000,
  };
  const jwtToken = jwt.sign(payload, secret);
  return jwtToken;
};

/**
 * Generates authentication tokens for the given user.
 *
 * @param {Object} user - The user object for which authentication tokens are generated.
 * @param {string} user.id - The ID of the user.
 * @returns {Object} - An object containing the generated authentication tokens.
 * @returns {Object} access - An object containing the access token and its expiration date.
 * @returns {string} access.token - The access token.
 * @returns {Date} access.expires - The expiration date of the access token.
 */

const generateAuthTokens = async (user) => {
  const expires =
    Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;
  const accessToken = generateToken(user.id, expires, tokenTypes.ACCESS);
  return {
    access: {
      token: accessToken,
      expires: new Date(expires * 1000),
    },
  };
};

module.exports = {
  generateToken,
  generateAuthTokens,
};