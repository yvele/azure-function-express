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
 * Request object wrapper
 *
 * @private
 */
export default class IncomingMessage extends EventEmitter {

  /**
   * Note: IncomingMessage assumes that all HTTP in is binded to "req" property.
   *
   * @param {Object} context Azure context object for a single HTTP request.
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

    // Add access to log via context.log
    this.context = { log: context.log.bind(context) };
  }

}
