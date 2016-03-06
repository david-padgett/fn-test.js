#fn-test.js
> A simple pass/fail functional test library for JavaScript.

##License

MIT

##Example

```javascript
var $test = __FnTest;
$test.expect(1, 2, 1);
$test.message("fn-test.html", "test of message API");
$test.error(new Error("test of error API, used to test known error conditions"));
$test.assert("test of assertion API - positive assertion", function() {return true;});
$test.assert("test of assertion API - negative assertion", function() {return false;});
$test.assert("test of assertion API - exception assertion", function() {throw new Error("uncaught exception assertion error");});
$test.summary();
```