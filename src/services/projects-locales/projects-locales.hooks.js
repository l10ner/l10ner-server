const { authenticate } = require('feathers-authentication').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      function(hook) {
        console.log(hook.params, 'search by projectId in service-locales');
      }
    ],
    get: [],
    create: [
      function(hook) {
        console.log(hook.params, 'create locale, pass localeId to params');
      }
    ],
    update: [],
    patch: [],
    remove: []
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
