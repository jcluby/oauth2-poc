module.exports = {
    index,
};

function index(req, res) {
  return res.status(200).json({ message: 'successful accessing the protected route'});
}
