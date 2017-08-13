const users = require('./users/users.service.js');
const projects = require('./projects/projects.service.js');
const locales = require('./locales/locales.service.js');
const projectsLocales = require('./projects-locales/projects-locales.service.js');
const dictionaries = require('./dictionaries/dictionaries.service.js');
const projectsDictionaries = require('./projects-dictionaries/projects-dictionaries.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(projects);
  app.configure(locales);
  app.configure(projectsLocales);
  app.configure(dictionaries);
  app.configure(projectsDictionaries);
};
