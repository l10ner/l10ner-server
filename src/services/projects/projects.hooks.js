const { authenticate } = require('feathers-authentication').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      function(hook) {
        hook.params.query = {
          owner_id: hook.params.user.id
        };
      }
    ],
    get: [],
    create: [
      function(hook) {
        hook.data.owner_id = hook.params.payload.userId;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [

    ],
    find: [
      function(hook) {
        hook.result.data = hook.result.data.sort((v1, v2) => v2.createdAt - v1.createdAt);
      }
    ],
    get: [
      function(hook) {
        const projectLocalesService = hook.app.service('projects/:projectId/locales');

        return projectLocalesService.find({
          query: {
            projectId: hook.id
          },
        }, hook.params).then((locales) => {
          hook.result = Object.assign(hook.result, { locales });
        });
      }
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
