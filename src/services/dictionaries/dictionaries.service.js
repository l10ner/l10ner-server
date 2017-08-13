// Initializes the `dictionaries` service on path `/dictionaries`
const createService = require('feathers-sequelize');
const createModel = require('../../models/dictionaries.model');
const hooks = require('./dictionaries.hooks');
const filters = require('./dictionaries.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/dictionaries', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('dictionaries');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
