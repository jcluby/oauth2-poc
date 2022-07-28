const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  verifyToken,
};

function generateToken(payload) {
  const EXPIRES_TOKEN_INSECONDS = process.env.EXPIRES_TOKEN_INSECONDS
    ? `${parseInt(process.env.EXPIRES_TOKEN_INSECONDS) * 1000}ms`
    : "1h";
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT || "4bcc-a3bf-b95fc4d8d4e9",
      { expiresIn: EXPIRES_TOKEN_INSECONDS },
      async (err, token) => {
        if (err) return reject({ message: err.message });
        return resolve(token);
      }
    );
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_JWT || "4bcc-a3bf-b95fc4d8d4e9", async (err, authData) => {
      if (err) {
        return reject(false);
      }
      resolve(true);
    });
  });
}
