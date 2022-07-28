const OAuthServer = require("express-oauth-server");
const clientDB = require("../db/memory/client-db");
const tokenDB = require("../db/memory/token-db");
const tokenGenerate = require("../helper/token-jwt");
const oauthModel = require("./oauth-model")(clientDB, tokenDB, tokenGenerate);

const EXPIRES_TOKEN_INSECONDS = process.env.EXPIRES_TOKEN_INSECONDS
  ? (parseInt(process.env.EXPIRES_TOKEN_INSECONDS) + 1)
  : 3600;
module.exports = new OAuthServer({
  model: oauthModel,
  grants: ["client_credentials"],
  accessTokenLifetime: EXPIRES_TOKEN_INSECONDS,
  useErrorHandler: false,
});
