const { authenticate } = require('feathers-authentication').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      function(hook) {
        hook.params.query = {
          ownerId: hook.params.user.id
        };
      }
    ],
    get: [],
    create: [
      function(hook) {
        hook.data.ownerId = hook.params.payload.userId;
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
        const projectDictionariesService = hook.app.service('projects/:projectId/dictionaries');

        return Promise.all([
          projectLocalesService.find({
            query: {
              projectId: hook.id
            },
          }, hook.params),
          projectDictionariesService.find({
            query: {
              projectId: hook.id
            },
          }, hook.params),
        ]).then(([locales, dictionaries]) => {
          hook.result = Object.assign(hook.result, { locales, dictionaries, members: [] });
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
