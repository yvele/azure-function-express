# Azure Function

## Documentation

- Documentation
  - [Node Documentation](https://azure.microsoft.com/en-us/documentation/articles/functions-reference-node/)
  - [WebJobs SDK Wiki](https://github.com/Azure/azure-webjobs-sdk-script/wiki)
- Changelog
  - [Azure WebJobs SDK Releases](https://github.com/Azure/azure-webjobs-sdk-script/releases)
  - [Azure WebJobs SDK Changelog](https://github.com/Azure/azure-webjobs-sdk/wiki/Release-Notes) (outdated!)
- [Data binding](https://azure.microsoft.com/en-us/documentation/articles/functions-bindings-http-webhook/)

## Response example

```js
context.res = { status: 202, body: "You successfully ordered more coffee!" };
```

## Context example

```js
context = {
  invocationId  : 'f0f6e586-0b79-4407-aa53-97919f45eba6',
  log           : [Function],
  bindings: {
    req: {
      originalUrl: 'https://my-deployment-id.azurewebsites.net/api/get',
      method: 'POST',
      query: {},
      headers: {
        "connection"            : "Keep-Alive",
        "authorization"         : "Bearer eyJhbGciOiJIUzI1NiIsIn...",
        "host"                  : "my-deployment-id.azurewebsites.net",
        "max-forwards"          : "10",
        "x-liveupgrade"         : "1",
        "x-arr-log-id"          : "fe0ba896-00d0-4ce7-a790-c8978fcaa1fd",
        "disguised-host"        : "my-deployment-id.azurewebsites.net",
        "x-site-deployment-id"  : "my-deployment-id",
        "was-default-hostname"  : "my-deployment-id.azurewebsites.net",
        "x-original-url"        : "/api/get",
        "x-forwarded-for"       : "92.103.167.115:57996",
        "x-arr-ssl"             : "2048|256|C=US, S=Washington, L=Redmond, O=Microsoft Corporation, OU=Microsoft IT, CN=Microsoft IT SSL SHA2|CN=*.azurewebsites.net",
      },

      // form-data
      body: "------WebKitFormBoundaryUPAtNZMGi7yHMoIX\r\nContent-Disposition: form-data; name=\"a\"\r\n\r\nb\r\n------WebKitFormBoundaryUPAtNZMGi7yHMoIX\r\nContent-Disposition: form-data; name=\"aa\"\r\n\r\nbb\r\n------WebKitFormBoundaryUPAtNZMGi7yHMoIX--\r\n",
      rawBody: "------WebKitFormBoundaryUPAtNZMGi7yHMoIX\r\nContent-Disposition: form-data; name=\"a\"\r\n\r\nb\r\n------WebKitFormBoundaryUPAtNZMGi7yHMoIX\r\nContent-Disposition: form-data; name=\"aa\"\r\n\r\nbb\r\n------WebKitFormBoundaryUPAtNZMGi7yHMoIX--\r\n",

      // x-www-form-urlencoded
      body: "foo=bar&fou=barre",
      rawBody: "foo=bar&fou=barre",

      // raw --> application/json
      "body": {
        "foo": "bar",
        "fou": "barre"
      },
      "rawBody": "{\n    \"foo\": \"bar\",\n    \"fou\": \"barre\"\n    \n}",
    }
  },
  bind: [Function],
  bindingData: {
    req: 'Method: POST, RequestUri: \'https://my-deployment-id.azurewebsites.net/api/get\', Version: 1.1, Content: System.Web.Http.WebHost.HttpControllerHandler+LazyStreamContent, Headers:\r\n{\r\n  Connection: Keep-Alive\r\n  Accept: application/json\r\n  Accept: */*\r\n  Accept-Encoding: gzip\r\n  Accept-Encoding: deflate\r\n  Accept-Encoding: br\r\n  Accept-Language: fr\r\n  Accept-Language: en-US; q=0.8\r\n  Accept-Language: en; q=0.6\r\n  Host: my-deployment-id.azurewebsites.net\r\n  Max-Forwards: 10\r\n  Referer: https://functions.azure.com/?trustedAuthority=https://portal.azure.com/\r\n  User-Agent: Mozilla/5.0\r\n  User-Agent: (Macintosh; Intel Mac OS X 10_11_6)\r\n  User-Agent: AppleWebKit/537.36\r\n  User-Agent: (KHTML, like Gecko)\r\n  User-Agent: Chrome/52.0.2743.116\r\n  User-Agent: Safari/537.36\r\n  x-functions-key: G/6oEOahmJgI5Y1jfstIEpd1ygWwvERuylzEOnvUTUapJUsCYoEAyQ==\r\n  Origin: https://functions.azure.com\r\n  X-LiveUpgrade: 1\r\n  X-ARR-LOG-ID: 865e04b5-923e-496a-a759-b0b36ab5b99b\r\n  DISGUISED-HOST: my-deployment-id.azurewebsites.net\r\n  X-SITE-DEPLOYMENT-ID: my-deployment-id\r\n  WAS-DEFAULT-HOSTNAME: my-deployment-id.azurewebsites.net\r\n  X-Original-URL: /api/get\r\n  X-Forwarded-For: 92.103.167.115:58342\r\n  X-ARR-SSL: 2048|256|C=US, S=Washington, L=Redmond, O=Microsoft Corporation, OU=Microsoft IT, CN=Microsoft IT SSL SHA2|CN=*.azurewebsites.net\r\n  Content-Length: 0\r\n  Content-Type: plain/text\r\n}',
    InvocationId: 'f0f6e586-0b79-4407-aa53-97919f45eba6'
  },
  done  : [Function],
  res   : {}
}
```
