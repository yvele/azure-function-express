import ExpressAdapter from "./ExpressAdapter";

/**
 * Creates a function ready to be exposed to Azure Function for request handling.
 *
 * @param {Object} requestListener Request listener (typically an express/connect instance)
 * @returns {function(context: Object)} Azure Function handle
 */
export default function createAzureFunctionHandler(requestListener) {
  const adapter = new ExpressAdapter(requestListener);
  return adapter.createAzureFunctionHandler();
}
