/* eslint-disable no-underscore-dangle */
import EventEmitter from "events";

const NOOP = () => {};

function removePortFromAddress(address) {
  return address
    ? address.replace(/:[0-9]*$/, "")
    : address;
}

/**
 * Create a fake connection object
 *
 * @param {Object} context Azure context object for a single HTTP request.
 * @returns {object} Connection object
 */
function createConnectionObject(context) {
  const req = context.bindings.req;
  const xForwardedFor = req.headers ? req.headers["x-forwarded-for"] : undefined;

  return {
    encrypted     : req.originalUrl && req.originalUrl.toLowerCase().startsWith("https"),
    remoteAddress : removePortFromAddress(xForwardedFor)
  };
}

/**
 * @private
 */
class IncomingMessage extends EventEmitter {

  /**
   * @param {Object} context Azure context object for a single HTTP request.
   * IncomingMessage assumes that all HTTP in is binded to "req" property.
   */
  constructor(context) {
    super();

    // Inherit
    Object.assign(this, context.bindings.req);

    this.url = this.originalUrl;
    this.headers = this.headers || {}; // Should always have a headers object

    this._readableState = { pipesCount: 0 }; // To make unpipe happy
    this.resume = NOOP;
    this.socket = { destroy: NOOP };
    this.connection = createConnectionObject(context);

    // Extra content
    this.context = { log: context.log.bind(context) };
  }

}

/**
 * @param {Object} context Azure Function context object (assigned to a single HTTP request).
 * @returns {Object} Wrapped request object
 */
export default function createIncomingMessage(context) {
  return new IncomingMessage(context);
}
