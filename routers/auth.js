module.exports = (router, app, controller) => {
  router.post(
    "/login",
    app.oauthServer.token(),
    controller.login
  );

  return router;
};
