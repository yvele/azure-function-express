export default function assertContext(context) {
  if (!context) {
    throw new Error("context is null or undefined");
  }

  if (!context.bindings) {
    throw new Error("context.bindings is null or undefined");
  }

  if (!context.bindings.req) {
    throw new Error("context.bindings.req is null or undefined");
  }

  if (!context.bindings.req.originalUrl) {
    throw new Error("context.bindings.req.originalUrl is null or undefined");
  }
}
