/**
 *
 * my custom response
 *
 * @param { Express.Response} response
 * @param { boolean } customStatus
 * @param { string } message
 * @param { {subject:string , content:{type:string , data:any}} | null} payload
 * @returns { void }
 */

function customResponse(response, htttpStatus, customStatus, message, payload) {
  const data = {
    status: customStatus,
    message,
    payload,
  };

  return response.status(htttpStatus).json(data);
}

module.exports = {
  customResponse,
};
