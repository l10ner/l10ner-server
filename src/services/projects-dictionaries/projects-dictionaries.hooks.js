const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      // commonHooks.iff(
      //   hook => hook.params.projectId,
      //   [hook => commonHooks.setByDot(hook, 'params.query.projectId', hook.params.projectId)]
      // )
      function(hook) {
        if (hook.params.projectId) {
          commonHooks.setByDot(hook, 'params.query.projectId', hook.params.projectId);
        }
      }
    ],
    get: [],
    create: [
      function(hook) {
        const service = hook.app.service('dictionaries');

        const data = commonHooks.getItems(hook);


        return service.create(data, hook.params).then((dict) => {
          commonHooks.replaceItems(hook, Object.assign(data, {
            projectId: hook.params.projectId,
            dictionaryId: dict.id
          }));
        });
      },
    ],
    update: [],
    patch: [],
    remove: [
      function(hook) {
        return hook.service.find({
          query: {
            dictionaryId: hook.id
          },
          paginate: false
        }).then(relation => {
          if (relation.length > 0) {
            hook.id = relation[0].id;
          }
        });
      },
    ]
  },

  after: {
    all: [],
    find: [
      function(hook) {
        // if using like service, dont replace result
        if (hook.params.query && hook.params.query.dictionaryId) return hook;

        const data = commonHooks.getItems(hook);
        const service = hook.app.service('dictionaries');
        const ids = data.map(a => a.dictionaryId);

        return service.find({
          query: {
            id: { $in: ids }
          },
          paginate: false
        }, hook.params).then((dictionaries) => {
          hook.result = dictionaries;
        });
      }
    ],
    get: [],
    create: [
      function(hook) {
        const data = commonHooks.getItems(hook);
        const service = hook.app.service('dictionaries');

        return service.get(data.dictionaryId, hook.params).then((dict) => {
          commonHooks.replaceItems(hook, dict);
        });
      }
    ],
    update: [],
    patch: [],
    remove: [
      function(hook) {
        const service = hook.app.service('dictionaries');
        const relation = commonHooks.getItems(hook);

        return service.remove(relation.dictionaryId, hook.params).then((dict) => {
          hook.result = dict;
        });
      }
    ]
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
