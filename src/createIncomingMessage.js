/* eslint-disable no-underscore-dangle */
import EventEmitter from "events";

const NOOP = () => {};

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
