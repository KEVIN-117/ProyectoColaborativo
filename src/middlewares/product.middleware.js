export const logError = (err, req, res, next) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json({ message: 'success' });
    next(err);
  };
  
  export const errorHandler = (err, req, res, next) => {
    if (err)
      return res.status(500).json({ message: err.message, stack: err.stack });
    res.json({ message: 'success' });
  };
  
  export const boomHandler = (err, req, res, next) => {
    if (err.isBoom) {
      const { output } = err;
      res.status(output.statusCode).json(output.payload);
    } else {
      next(err);
    }
  };
  