const userService = require("./user.service");
const ApiError = require("../utils/ApiError");

/**
 * Logs in a user using their email and password.
 *
 * This function attempts to retrieve a user by their email. If a user is found,
 * it checks if the provided password matches the stored password hash. If either
 * the user is not found or the password does not match, an error is thrown.
 *
 * @param {string} email - The email of the user attempting to log in.
 * @param {string} password - The password of the user attempting to log in.
 * @returns {Promise<Object>} - A promise that resolves to the user object if authentication is successful.
 * @throws {ApiError} - Throws an ApiError with a 401 status code if the credentials are incorrect.
 */

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(401, "Incorrect Credentials");
  }
  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
};