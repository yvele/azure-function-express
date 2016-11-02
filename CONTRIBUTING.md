# Contributing

[Setup](#setup) |
[Commands](#command) |
[Unit Testing](#test) |
[Git Commit Guidelines](#commit)

## <a name="setup"></a> Setup

```sh
$ npm run bootstrap
```

## <a name="test"></a> Unit Testing

### Running tests

```sh
$ npm run test
```

with coverage:

```sh
$ npm run coverage
```

### Writing tests

Test can be asserted with [Should.js](https://shouldjs.github.io) :

```js
test().should.be.type("string");

test().should.eql({ foo: "foo", bar: "bar" });

test().should.be.equal("foobar");
```

```js
import should from "should";

should.throws(() => {
  throw new ArgumentError();
}, /ArgumentError/);
```

```js
it("Should fail", () => {
  return testAsync().should.be.rejectedWith("Error message");
});
```

```js
import should from "should";

should.equal(test(), null);

should("foobar" == "foobar").be.ok;
```

## <a name="command"></a> Commands

All commands should be run at the root path of the project.

| Command                      | Description       |
|------------------------------|-------------------|
| `$ npm run bootstrap`        | Setup the project for development
| `$ npm run build`            | Build (with babel)
| `$ npm run clean`            | Delete all temporary files (NPM, build, etc.)
| `$ npm run clean:build`      | Delete build files (babel, etc.)
| `$ npm run clean:npm`        | Delete NPM generated files (node_modules, logs, etc.)
| `$ npm run coverage`         | Run unit tests with code coverage
| `$ npm run style`            | Check code style
| `$ npm run test`             | Run tests
| `$ npm run validate`         | Check the code is valid by checking code style and running tests

## <a name="commit"></a> Git Commit Guidelines

Write meaningful and straightforward commit summaries.

```sh
# Bad
git commit assets -m 'change something' # ORLY? What change?

# Good
git commit assets -m 'style(css): Switch `reset.css` to `normalize.css`'
```

Avoid long commit summaries by limiting the maximum characters to `50`.

> Detailed descriptions should go on the commit message.

```sh
# Bad
git commit assets/javascripts -m 'Add `FIXME` note to dropdown module because it wasnt working on IE8'

# Good
git commit assets/javascripts -m 'style(dropdown): Add `FIXME` note to dropdown module'
```

Write commit summaries in the imperative, present tense.

```sh
# Bad
git commit scripts -m 'Fixed CI integration'

# Bad
git commit scripts -m 'Fixes CI integration'

# Bad
git commit scripts -m 'Fixing CI integration'

# Good
git commit scripts -m 'fix(ci): Fix CI integration'
```

Use proper english writing on commits.

> Because SCM is also code documentation.

```sh
# Bad (Everything in lower case, no proper punctuation and "whatever" really?)
git commit assets/stylesheets -m 'update clearfix or whatever'

# Bad (Why are you screaming?)
git commit assets/stylesheets -m 'UPDATE CLEARFIX'

# Good (Meaningful commit summary with proper orthography)
git commit assets/stylesheets -m 'fix(clearfix): Update clearfix implementation to use a more modern approach'
```

### Type

Must be one of the following:

| Prefix      | Description   |
|-------------|---------------|
| `feat`      | A new feature
| `fix`       | A bug fix
| `docs`      | Documentation only changes
| `style`     | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
| `refactor ` | A code change that neither fixes a bug or adds a feature
| `test`      | Adding missing tests
| `chore`     | Changes to the build process or auxiliary tools and libraries such as documentation generation

### Scope
The scope could be anything specifying place of the commit change. For example `readme`,
`package.json`, `OptionManager`, `docs/Components`, etc...

### Subject
The subject contains succinct description of the change:

* Use the imperative, present tense: "change" not "changed" nor "changes"
* Capitalize first letter
* No dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### About

Those rules have been inspired by AngularJS [contributing page](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md) and Netshoes [styleguide](https://github.com/netshoes/styleguide).
