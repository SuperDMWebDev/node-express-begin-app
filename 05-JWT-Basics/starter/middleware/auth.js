const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader.split(' ')[1];
  console.log('token' + token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
    console.log(decoded);
  } catch (err) {
    throw new CustomAPIError('No authorized to route', 401);
  }
};
module.exports = authenticationMiddleware;
