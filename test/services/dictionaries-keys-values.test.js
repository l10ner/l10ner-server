const assert = require('assert');
const app = require('../../src/app');

describe('\'dictionaries-keys-values\' service', () => {
  it('registered the service', () => {
    const service = app.service('dictionaries-keys-values');

    assert.ok(service, 'Registered the service');
  });
});
