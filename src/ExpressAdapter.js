import EventEmitter from "events";
import createOutgoingMessage from "./createOutgoingMessage";
import createIncomingMessage from "./createIncomingMessage";
import assertContext from "./assertContext";

/**
 * Express adapter allowing to handle Azure Function requests by wrapping in request events.
 *
 * @class
 * @fires request
 */
export default class ExpressAdapter extends EventEmitter {

  /**
   * @param {Object=} requestListener Request listener (typically an express/connect instance)
   */
  constructor(requestListener) {
    super();

    if (requestListener !== undefined) {
      this.addRequestListener(requestListener);
    }
  }

  /**
   * Adds a request listener (typically an express/connect instance).
   *
   * @param {Object} requestListener Request listener (typically an express/connect instance)
   */
  addRequestListener(requestListener) {
    this.addListener("request", requestListener);
  }

  /**
   * Handles Azure Function requests.
   *
   * @param {Object} context Azure context object for a single request
   */
  handleAzureFunctionRequest(context) {
    assertContext(context);

    // 1. Context basic initialization
    context.res = context.res || {};

    // 2. Wrapping
    const req = createIncomingMessage(context);
    const res = createOutgoingMessage(context);

    // 3. Synchronously calls each of the listeners registered for the event
    this.emit("request", req, res);
  }

  /**
   * Create function ready to be exposed to Azure Function for request handling.
   *
   * @returns {function(context: Object)} Azure Function handle
   */
  createAzureFunctionHandler() {
    return this.handleAzureFunctionRequest.bind(this);
  }

}
