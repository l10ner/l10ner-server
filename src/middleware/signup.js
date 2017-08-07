const jwt = require('jsonwebtoken');

module.exports = function(app) {
  return function(req, res, next) {
    const body = req.body;

    app.service('users').create({
      email: body.email,
      password: body.password
    })
    .then(user => {
      const config = app.get('authentication');
      const token = jwt.sign({ userId: user.id }, config.secret, config.jwt);

      return res.json({
        email: user.email,
        accessToken: token
      });
    })
    .catch(next);
  };
};
