const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      function(hook) {
        if (!hook.params.dictionaryId) return hook;

        hook.params.query = {
          dictionaryId: hook.params.dictionaryId
        };
      }
    ],
    get: [],
    create: [
      function(hook) {
        const data = commonHooks.getItems(hook);

        commonHooks.replaceItems(hook, Object.assign(data, {
          dictionaryId:hook.params.dictionaryId,
          projectId:hook.params.projectId,
        }));
      }
    ],
    update: [],
    patch: [],
    remove: [
      function(hook) {
        const service = hook.app.service('projects/:projectId/dictionaries/:dictionaryId/locales/:localeId/values');

        service.remove(null, {
          query: {
            keyId: hook.id
          }
        });
      }
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
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
