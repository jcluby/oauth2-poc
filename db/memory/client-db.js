const clients = [
  {
    id: "1",
    name: "SCT01",
    clientId: "SCT01",
    clientSecret: "834737fcf9b3434da8262bd25650205e",
    scopes: ["sist_gct"],
  },
];

const scopes = ["sist_gct"];

module.exports = {
    find,
    findByClientId,
    findScopes,
};

function find(id) {
  return new Promise((resolve, reject) => {
    const client = clients.find((client) => client.id === id);
    if (client) {
      return resolve(client);
    }
    return reject("client invalid");
  });
}

function findByClientId(clientId, clientSecret) {
  return new Promise((resolve, reject) => {
    const client = clients.find((client) => client.clientId === clientId && client.clientSecret === clientSecret);
    if (client) {
      return resolve(client);
    }
    return reject(false);
  });
}

function findScopes() {
  return new Promise((resolve) => {
    return resolve(scopes);
  });
}
