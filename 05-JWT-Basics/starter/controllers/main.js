const customAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');
const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  console.log('username password', username, password);
  res.status(200).json({ msg: 'user created', token });
};
const dashboard = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader.split(' ')[1];
  console.log('token' + token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
  } catch (err) {
    throw new CustomAPIError('No authorized to route', 401);
  }
  console.log(req.headers);
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello Minh`,
    secret: `Here is your authorization data, your lucky number is ${luckyNumber}`,
  });
};
module.exports = {
  login,
  dashboard,
};
