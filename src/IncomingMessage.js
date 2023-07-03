/* eslint-disable no-underscore-dangle */
import { Readable } from "stream";

const NOOP = () => {};

function removePortFromAddress(address) {
  return address
    ? address.replace(/:[0-9]*$/, "")
    : address;
}

/**
 * Create a fake connection object
 *
 * @param {Object} context Raw Azure context object for a single HTTP request
 * @returns {object} Connection object
 */
function createConnectionObject(context) {
  const { req } = context.bindings;
  const xForwardedFor = req.headers ? req.headers["x-forwarded-for"] : undefined;

  return {
    encrypted     : req.originalUrl && req.originalUrl.toLowerCase().startsWith("https"),
    remoteAddress : removePortFromAddress(xForwardedFor)
  };
}

/**
 * Copy usefull context properties from the native context provided by the Azure Function engine
 *
 * See:
 * - https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node#context-object
 * - https://github.com/christopheranderson/azure-functions-typescript/blob/master/src/context.d.ts
 *
 * @param {Object} context Raw Azure context object for a single HTTP request
 * @returns {Object} Filtered context
 */
function sanitizeContext(context) {
  const sanitizedContext = {
    ...context,
    log : context.log.bind(context)
  };

  // We don't want the developper to mess up express flow
  // See https://github.com/yvele/azure-function-express/pull/12#issuecomment-336733540
  delete sanitizedContext.done;

  return sanitizedContext;
}

/**
 * Request object wrapper
 *
 * @private
 */
export default class IncomingMessage extends Readable {

  /**
   * Note: IncomingMessage assumes that all HTTP in is binded to "req" property
   *
   * @param {Object} context Sanitized Azure context object for a single HTTP request
   */
  constructor(context) {
    super();

    Object.assign(this, context.bindings.req); // Inherit

    this.push(context.bindings.req.rawBody); // Push the request body onto this stream
    this.push(null); // Close the stream

    this.url = this.originalUrl;
    this.headers = this.headers || {}; // Should always have a headers object

    this.socket = { destroy: NOOP };
    this.connection = createConnectionObject(context);

    this.context = sanitizeContext(context); // Specific to Azure Function
  }

}
