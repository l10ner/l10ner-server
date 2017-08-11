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
        const localesService = hook.app.service('locales');

        const data = commonHooks.getItems(hook);


        return localesService.create(data, hook.params).then((locale) => {
          commonHooks.replaceItems(hook, Object.assign(data, {
            projectId: hook.params.projectId,
            localeId: locale.id
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
            localeId: hook.id
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
        if (hook.params.query && hook.params.query.localeId) return hook;

        const data = commonHooks.getItems(hook);
        const localesService = hook.app.service('locales');
        const ids = data.map(a => a.localeId);

        return localesService.find({
          query: {
            id: { $in: ids }
          },
          paginate: false
        }, hook.params).then((locales) => {
          hook.result = locales;
        });
      }
    ],
    get: [],
    create: [
      function(hook) {
        const data = commonHooks.getItems(hook);
        const localesService = hook.app.service('locales');

        return localesService.get(data.localeId, hook.params).then((locale) => {
          commonHooks.replaceItems(hook, locale);
        });
      }
    ],
    update: [],
    patch: [],
    remove: [
      function(hook) {
        const localesService = hook.app.service('locales');
        const relation = commonHooks.getItems(hook);

        return localesService.remove(relation.localeId, hook.params).then((locales) => {
          hook.result = locales;
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
