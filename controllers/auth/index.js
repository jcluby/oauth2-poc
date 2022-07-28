let clientDb;

module.exports = (injectedUserDB) => {
  clientDb = injectedUserDB;
  return {
    login,
  };
};

function login(req, res) {
    console.log(req);
    return res.json({})
}
