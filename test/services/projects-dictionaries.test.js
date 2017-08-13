const assert = require('assert');
const app = require('../../src/app');

describe('\'projects-dictionaries\' service', () => {
  it('registered the service', () => {
    const service = app.service('projects-dictionaries');

    assert.ok(service, 'Registered the service');
  });
});
