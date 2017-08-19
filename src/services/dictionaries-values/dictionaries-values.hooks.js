const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      function(hook) {
        if (!hook.params.localeId) return hook;

        const service = hook.app.service('projects/:projectId/dictionaries/:dictionaryId/keys');

        return service.find({
          query: {
            dictionaryId: hook.params.dictionaryId,
          },
          paginate: false
        }, hook.params).then((keys) => {
          hook.params.query = {
            localeId: hook.params.localeId,
            keyId: { $in: keys.map(k => k.id) },
          };
        });
      }
    ],
    get: [],
    create: [
      function(hook) {

        const value = {
          value: hook.data.value,
          keyId: hook.data.keyId,
          localeId: hook.params.localeId,
          authorId: hook.params.payload.userId,
          comment: hook.data.comment || ''
        };
        console.log(value, 'VALUES CREATE');

        commonHooks.replaceItems(hook, value);
      }
    ],
    update: [
      function(hook) {
        console.log(hook.params, hook.data, 'VALUES UPDATE');
      }
    ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      // commonHooks.populate({
      //   schema: {
      //     include: {
      //       service: 'projects/:projectId/locales/:localeId/dictionaries/:dictionaryId/keys',
      //       nameAs: 'key',
      //       parentField: 'keyId',
      //       childField: 'id'
      //     }
      //   }
      // })
    ],
    get: [],
    create: [
      // commonHooks.populate({
      //   schema: {
      //     include: {
      //       service: 'projects/:projectId/locales/:localeId/dictionaries/:dictionaryId/keys',
      //       nameAs: 'key',
      //       parentField: 'keyId',
      //       childField: 'id'
      //     }
      //   }
      // })
    ],
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
