const assert = require('assert');
const app = require('../../src/app');

describe('\'dictionaries-keys\' service', () => {
  it('registered the service', () => {
    const service = app.service('dictionaries-keys');

    assert.ok(service, 'Registered the service');
  });
});
