const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
// роли https://github.com/feathersjs/feathers-authentication/issues/293

module.exports = function () {
  const app = this;
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local(config.local));

  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies),
      ],
      remove: [
        authentication.hooks.authenticate('jwt'),
      ]
    },
    after: {
      create: [
        hook => {
          Object.assign(hook.result, {email: hook.params.user.email});
        }
      ],
    }
  });
};
