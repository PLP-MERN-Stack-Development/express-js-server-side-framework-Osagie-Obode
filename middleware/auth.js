const ApiError = require('../errors/ApiError');

// Authentication middleware: expect API key in 'x-api-key' header
module.exports = function auth(req, res, next) {
  const apiKey = process.env.API_KEY || 'secret-key';
  const provided = req.get('x-api-key');
  if (!provided) {
    return next(new ApiError(401, 'Missing API key'));
  }
  if (provided !== apiKey) {
    return next(new ApiError(403, 'Invalid API key'));
  }
  next();
};
