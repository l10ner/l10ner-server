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
        // const service = hook.app.service('projects/:projectId/dictionaries/:dictionaryId/locales/:localeId/values');
        //
        // console.log(service);
        // console.log(hook.app.get('sequelizeClient'));
        // service.destroy({
        //   where: {
        //     keyId: hook.id
        //   }
        // }).then(r => console.log(r));
        //   const keys = commonHooks.getItems(hook);
        console.log(hook, 'delete all values for this key');
      }
    ]
  },

  after: {
    all: [],
    find: [
      // function(hook) {
      //   if (!hook.params.localeId) return hook;
      //
      //   const service = hook.app.service('projects/:projectId/locales/:localeId/dictionaries/:dictionaryId/values');
      //   const keys = commonHooks.getItems(hook);
      //
      //   return service.find({
      //     query: {
      //       localeId: hook.params.localeId,
      //       keyId: { $in: keys.map(k => k.id) },
      //     },
      //     paginate: false
      //   }, hook.params).then((values) => {
      //     hook.result.data = { keys, values };
      //     // commonHooks.replaceItems(hook, { keys, values });
      //   });
      // },

      // commonHooks.remove('keyId', '_include')
    ],
    get: [],
    create: [
      // function(hook) {
      //   const service = hook.app.service('projects/:projectId/locales/:localeId/dictionaries/:dictionaryId/values');
      //   const key = commonHooks.getItems(hook);
      //
      //   // если есть значение, то попутно создаем запись и для значения
      //   const keyValue = {
      //     value: hook.data.value,
      //     keyId: key.id,
      //     localeId: hook.params.localeId,
      //     authorId: hook.params.payload.userId,
      //     comment: hook.data.comment || ''
      //   };
      //
      //
      //   return service.create(keyValue, hook.params).then((response) => {
      //     commonHooks.replaceItems(hook, response);
      //   });
      //   // return hook;
      // },
      // commonHooks.remove('keyId', '_include')
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
