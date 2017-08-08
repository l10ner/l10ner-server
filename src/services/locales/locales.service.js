const createService = require('feathers-sequelize');
const createModel = require('../../models/locales.model');
const hooks = require('./locales.hooks');
const filters = require('./locales.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };


  app.use('/locales', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('locales');
  service.hooks(hooks);


  if (service.filter) {
    service.filter(filters);
  }
};
