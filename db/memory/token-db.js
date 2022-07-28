let tokens = {};

module.exports = {
    saveAccessToken,
    getUserIDFromBearerToken,
};

function saveAccessToken(token) {
  // console.log('TOKENS --> ', tokens);
  return new Promise((resolve, reject) => {
    tokens[token.client_id] = {
      access_token: token.access_token,
      expires_at: token.expires_at,
      scope: token.scope,
      client_id: token.client_id,
      user: token.user_id,
    };
    resolve(true);
  });
}


function getUserIDFromBearerToken(token) {
  return new Promise((resolve, reject) => {
    const res = Object.values(tokens).find(t => t.access_token === token)
    resolve(res);
  });
}
