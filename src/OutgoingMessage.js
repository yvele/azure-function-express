/* eslint-disable no-magic-numbers, no-underscore-dangle */
import { OutgoingMessage as NativeOutgoingMessage } from "http";
import statusCodes from "./statusCodes";

/**
 * @param {Object|string|Buffer} body Express/connect body object
 * @param {string} encoding
 * @returns {Object|string} Azure Function body
 */
function convertToBody(body, encoding) {
  // This may be removed on Azure Function native support for Buffer
  // https://github.com/Azure/azure-webjobs-sdk-script/issues/814
  // https://github.com/Azure/azure-webjobs-sdk-script/pull/781
  return Buffer.isBuffer(body)
    ? body.toString(encoding)
    : body;
}

/**
 * @param {Object} context Azure Function context
 * @param {string|Buffer} data
 * @param {string} encoding
 * @this {OutgoingMessage}
 */
function end(context, data, encoding) {
  // 1. Write head
  this.writeHead(this.statusCode); // Make jshttp/on-headers able to trigger

  // 2. Return raw body to Azure Function runtime
  context.res.body = convertToBody(data, encoding);
  context.res.isRaw = true;
  context.done();
}

/**
 * https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
 * Original implementation: https://github.com/nodejs/node/blob/v6.x/lib/_http_server.js#L160
 *
 * @param {Object} context Azure Function context
 * @param {number} statusCode
 * @param {string} statusMessage
 * @param {Object} headers
 * @this {OutgoingMessage}
 */
function writeHead(context, statusCode, statusMessage, headers) {
  // 1. Status code
  statusCode |= 0; // eslint-disable-line no-param-reassign
  if (statusCode < 100 || statusCode > 999) {
    throw new RangeError(`Invalid status code: ${statusCode}`);
  }

  // 2. Status message
  if (typeof statusMessage === "string") {
    this.statusMessage = statusMessage;
  } else {
    this.statusMessage = statusCodes[statusCode] || "unknown";
  }

  // 3. Headers
  if (typeof statusMessage === "object" && typeof headers === "undefined") {
    headers = statusMessage; // eslint-disable-line no-param-reassign
  }
  if (this._headers) {
    // Slow-case: when progressive API and header fields are passed.
    if (headers) {
      const keys = Object.keys(headers);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (k) {
          this.setHeader(k, headers[k]);
        }
      }
    }
    // only progressive api is used
    headers = this._renderHeaders(); // eslint-disable-line no-param-reassign
  }

  // 4. Sets everything
  context.res.status = statusCode;
  context.res.headers = headers;
}

/**
 * OutgoingMessage mock based on https://github.com/nodejs/node/blob/v6.x
 *
 * Note: This implementation is only meant to be working with Node.js v6.x
 *
 * @private
 */
export default class OutgoingMessage extends NativeOutgoingMessage {

  /**
   * Original implementation: https://github.com/nodejs/node/blob/v6.x/lib/_http_outgoing.js#L48
   */
  constructor(context) {
    super();
    this._headers = null;
    this._headerNames = {};
    this._removedHeader = {};
    this._hasBody = true;

    // Those methods cannot be prototyped because express explicitelly overrides __proto__
    // See https://github.com/expressjs/express/blob/master/lib/middleware/init.js#L29
    this.writeHead = writeHead.bind(this, context);
    this.end = end.bind(this, context);
  }

}
