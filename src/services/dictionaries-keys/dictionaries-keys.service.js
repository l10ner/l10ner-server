// Initializes the `dictionaries-keys` service on path `/dictionaries-keys`
const createService = require('feathers-sequelize');
const createModel = require('../../models/dictionaries-keys.model');
const hooks = require('./dictionaries-keys.hooks');
const filters = require('./dictionaries-keys.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'dictionaries-keys',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/projects/:projectId/dictionaries/:dictionaryId/keys', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('projects/:projectId/dictionaries/:dictionaryId/keys');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
