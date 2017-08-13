// Initializes the `projects-dictionaries` service on path `/projects-dictionaries`
const createService = require('feathers-sequelize');
const createModel = require('../../models/projects-dictionaries.model');
const hooks = require('./projects-dictionaries.hooks');
const filters = require('./projects-dictionaries.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'projects-dictionaries',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/projects/:projectId/dictionaries', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('projects/:projectId/dictionaries');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
