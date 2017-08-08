const assert = require('assert');
const app = require('../../src/app');

describe('\'projectsLocales\' service', () => {
  it('registered the service', () => {
    const service = app.service('projects-locales');

    assert.ok(service, 'Registered the service');
  });
});
