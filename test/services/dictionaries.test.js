const assert = require('assert');
const app = require('../../src/app');

describe('\'dictionaries\' service', () => {
  it('registered the service', () => {
    const service = app.service('dictionaries');

    assert.ok(service, 'Registered the service');
  });
});
