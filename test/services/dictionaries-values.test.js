const assert = require('assert');
const app = require('../../src/app');

describe('\'dictionaries-values\' service', () => {
  it('registered the service', () => {
    const service = app.service('dictionaries-values');

    assert.ok(service, 'Registered the service');
  });
});
