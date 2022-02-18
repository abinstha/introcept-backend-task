// handle resource not found error
const notFoundError = (req,res) => res.status(404).send('Resource does not exist.');

module.exports = notFoundError;