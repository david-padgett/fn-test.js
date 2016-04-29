#fn-test.js
> A simple pass/fail functional test library for JavaScript.

##License

MIT

##Example

```javascript
var $test = __FnTest;
$test.message("fn-test.html", "test of message API");

$test.assertError("assertError API (pass)", function() {throw new Error("uncaught exception");});
$test.assertError("assertError API (pass)", function() {throw new Error("specific exception");}, new Error("specific exception"));
$test.assertError("assertError API (fail)", function() {return});
$test.assertError("assertError API (fail)", function() {throw new Error("specific exception");}, new Error("other exception"));

$test.assertTrue("assertTrue API (pass)", function() {return true;});
$test.assertTrue("assertTrue API (fail)", function() {return false;});
$test.assertTrue("assertTrue API (fail)", function() {throw new Error("uncaught exception");});

$test.assertFalse("assertFalse API (pass)", function() {return false;});
$test.assertFalse("assertFalse API (fail)", function() {return true;});
$test.assertFalse("assertFalse API (fail)", function() {throw new Error("uncaught exception");});

$test.summary();

// Returns true - total # of failed assertTrue, assertFalse, and assertError tests match specified values
$test.getResult(2, 2, 2)

// Returns false - total number of failed tests is not 0
$test.getResult()

// Returns false - total # of failed assertTrue, assertFalse, and assertError tests doesn't match specified values
$test.getResult(1, 1, 1)
```
