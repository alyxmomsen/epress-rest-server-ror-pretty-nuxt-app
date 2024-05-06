/**
 *
 * @param {Express.request} request - description
 * @param {Express.Response} response - description 2
 * @returns {void}
 */
function account(request, response) {
  const payload = {};

  return customResponse(response, 200, true, "message for the test", null);
}

module.exports = account;
