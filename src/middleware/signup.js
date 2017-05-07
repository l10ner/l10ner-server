module.exports = function(app) {
  return function(req, res, next) {
    const body = req.body;
    console.log('llllllll', body);
    // Get the user service and `create` a new user
    app.service('users').create({
      email: body.email,
      password: body.password
    })
    // Then redirect to the login page
      .then(user => {
        console.log(user);
        return res.json(user);
      })
      // On errors, just call our error middleware
      .catch(next);
  };
};
