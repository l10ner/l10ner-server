const { authenticate } = require('feathers-authentication').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      function(hook) {
        hook.data.owner_id = hook.params.user.id;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      function(hook) {
        hook.result.data = hook.result.data.sort((v1, v2) => v2.ctime - v1.ctime);
      }
    ],
    find: [],
    get: [

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
