const { authenticate } = require('feathers-authentication').hooks;
// const commonHooks = require('feathers-hooks-common');

module.exports = {
  before: {
    // all: [ commonHooks.disallow('external') ],
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      function(hook) {
        console.log(hook.id, 'before need delete all values from this locale');
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
