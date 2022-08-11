const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      //   res.status(500).json({ err });
      next(err);
    }
  };
};
module.exports = asyncWrapper;
