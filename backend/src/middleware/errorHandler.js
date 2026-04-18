module.exports = function errorHandler(err, _req, res, _next) {
  console.error(err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate key', fields: err.keyValue });
  }
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
};
