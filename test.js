const { describe, it } = require('mocha');
const { borked } = require('./');
const assume = require('assume');
const bork = require('./');

describe('borked', function () {
  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  async function instant() {
    return 'foo';
  }

  async function toolong() {
    await wait(3000);

    return 'foo';
  }

  describe('bork', function () {
    it('is exported as a function', function () {
      assume(bork).is.a('function');
    });

    it('returns a function', function () {
      assume(bork()).is.a('function');
    });

    it('provides a default timeout', async function () {
      const next = assume.plan(3);
      const timeout = bork(20);

      const val = await timeout(instant());
      assume(val).equals('foo');

      try { await timeout(toolong()); }
      catch (e) {
        assume(e).is.a('error');
        assume(e.message).equals('Failed to resolve promise in a timely manner');
      }

      next();
    });

    it('providers a custom error', async function () {
      const timeout = bork(20, new Error('trololol'));
      const next = assume.plan(2);

      try { await timeout(toolong()); }
      catch (e) {
        assume(e).is.a('error');
        assume(e.message).equals('trololol');
      }

      next();
    });
  });

  describe('borked', function () {
    it('is a function', function () {
      assume(borked).is.a('function');
    });

    it('allows a custom timeout', async function () {
      const val = await timeout(instant());
      const next = assume.plan(3);

      assume(val).equals('foo');

      try { await timeout(toolong()); }
      catch (e) {
        assume(e).is.a('error');
        assume(e.message).equals('Failed to resolve promise in a timely manner');
      }

      next();
    });
  });
});
