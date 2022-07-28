let clientDB;
let tokenDB;
let tokenGenerate;

module.exports = (injectedClientDB, injectedTokenDB, injectTokenGenerate) => {
  clientDB = injectedClientDB;
  tokenDB = injectedTokenDB;
  tokenGenerate = injectTokenGenerate;

  return {
    getClient,
    getUserFromClient,
    saveToken,
    getAccessToken,
    validateScope,
    generateAccessToken,
  };
};

async function getClient(clientID, clientSecret) {
  try {
    await clientDB.findByClientId(clientID, clientSecret);
  } catch (error) {
    return null;
  }
  const client = {
    clientId: clientID,
    clientSecret: clientSecret,
    redirectUris: null,
    grants: ["client_credentials"],
    redirectUris: null,
  };

  return new Promise((resolve) => {
    resolve(client);
  });
}

function getUserFromClient(client) {
  let user = { id: client.clientId };
  return new Promise((resolve) => {
    resolve(user);
  });
}

async function saveToken(token, client, user) {
  const accessToken = {
    access_token: token.accessToken,
    expires_at: token.accessTokenExpiresAt,
    scope: token.scope,
    client_id: client.clientId,
    user_id: user.id,
  };
  await tokenDB.saveAccessToken(accessToken);
  return new Promise((resolve) =>
    resolve({
      accessToken: accessToken.access_token,
      accessTokenExpiresAt: accessToken.expires_at,
      scope: accessToken.scope,
      client: { id: accessToken.client_id },
      user: { id: accessToken.user_id },
    })
  );
}

function generateAccessToken(client, user, scope) {
  return new Promise(async (resolve, reject) => {
    let payload = { client_id: client.clientId, scope: scope };
    const token = await tokenGenerate.generateToken(payload);
    resolve(token);
  });
}

async function getAccessToken(token) {
  // find unique token
  const accessTokenResult = await tokenDB.getUserIDFromBearerToken(token);
  let accessToken = null;
  if (accessTokenResult) {
    accessToken = {
      accessToken: accessTokenResult.access_token,
      accessTokenExpiresAt: accessTokenResult.expires_at,
      scope: accessTokenResult.scope,
      client: accessTokenResult.client_id,
      user: accessTokenResult.user,
    };
    // verifyToken jwt
    try {
      const isValidToken = await tokenGenerate.verifyToken(token);
      if (!isValidToken) {
        accessToken = null;
      }
    } catch (error) {
      accessToken = null;
    }
  }
  return new Promise((resolve) => resolve(accessToken));
}

async function validateScope(user, client, scope) {
  const scopes = await clientDB.findScopes();
  if (!scope.split(" ").every((s) => scopes.indexOf(s) >= 0)) {
    scope = false;
  }
  return new Promise((resolve) => resolve(scope));
}
