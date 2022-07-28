module.exports = (router, app, controller) => {
    
  router.get("/", app.oauthServer.authenticate(), controller.index);

  return router;
};
