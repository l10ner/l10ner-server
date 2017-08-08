// Initializes the `projectsLocales` service on path `/projects-locales`
const createService = require('feathers-sequelize');
const createModel = require('../../models/projects-locales.model');
const hooks = require('./projects-locales.hooks');
const filters = require('./projects-locales.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/projects/:projectId/locales', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('projects/:projectId/locales');
  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
