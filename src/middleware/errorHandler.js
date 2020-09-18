module.exports = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    if ((process.env.NODE_ENV = "production")) {
      return res.status(400).json(err.message);
    } else {
      return res.status(400).json(err.errors);
    }
  }
  console.log(error);
  return res.status(500).json("something unexpected happened");
};
