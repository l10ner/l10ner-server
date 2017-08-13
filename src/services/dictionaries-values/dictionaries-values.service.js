// Initializes the `dictionaries-values` service on path `/dictionaries-values`
const createService = require('feathers-sequelize');
const createModel = require('../../models/dictionaries-values.model');
const hooks = require('./dictionaries-values.hooks');
const filters = require('./dictionaries-values.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'dictionaries-values',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/dictionaries-values', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('dictionaries-values');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
