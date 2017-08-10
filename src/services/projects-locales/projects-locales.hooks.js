const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      function(hook) {
        commonHooks.setByDot(hook, 'params.query.projectId', hook.params.projectId);

        // return hook;
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

          return hook;
        });
      },
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      function(hook) {
        const data = commonHooks.getItems(hook);
        const localesService = hook.app.service('locales');
        const ids = data.map(a => a.localeId);

        return localesService.find({
          query: {
            id: { $in: ids }
          }
        }, hook.params).then((locales) => {
          commonHooks.replaceItems(hook, locales);
          return hook;
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
          return hook;
        });
      }
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
