/**
 * Configure the `borked` function with default timeout's and error messages.
 *
 * @param {number} time Default timeout in ms before we reject the promise.
 * @param {error} failure Error to use when rejecting the promise.
 * @returns {function} Pre-configured borked.
 * @public
 */
function bork(time, failure) {
  /**
   * Timeout if the given promise does not resolve in a timely manner.
   *
   * @param {promise} pinky Initialized promise that still has to resolve.
   * @param {number} timeout Duration in ms before we timeout.
   * @returns {promise} The promise race.
   * @public
   */
  return function borked(pinky, timeout) {
    return Promise.race([
      pinky,
      new Promise(function delay(resolve, reject) {
        const err = new Error('Failed to resolve promise in a timely manner');

        setTimeout(reject.bind(reject, failure || err), time || timeout);
      })
    ]);
  }
}

//
// Expose our module interface, with a pre-initialized borked.
//
bork.borked = bork();
module.exports = bork;
