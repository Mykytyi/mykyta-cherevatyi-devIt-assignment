class ErrorHandler {
  async handle(error, req, res, next) {
    console.log('Main error handler: ', error);

    res.status(400).send({ message: error.message });
  }
}

module.exports = new ErrorHandler();
