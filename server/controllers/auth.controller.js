const { authService, userService, tokenService } = require("../services");
const {catchAsync} = require("../utils");

/**
 * Registers a new user with the provided user data.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the registration is successful.
 */

const register = async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(201).send({ user, tokens });
};

/**
 * Logs in a user with the provided email and password.
 *
 * @param {Object} req - The request object containing the user's email and password.
 * @param {string} req.body.email - The email address of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the login is successful.
 */

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(200).json({ user, tokens });
};

module.exports = {
  register: catchAsync(register),
  login: catchAsync(login),
};