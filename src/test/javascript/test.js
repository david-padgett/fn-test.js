// fn-test.js/src/test/javascript/test.js

console.log("")
$test.message("fn-test", "test of message API");
$test.positive("[test #1] assertPositive API (positive)", function() {return true;});
$test.positive("[test #2] assertPositive API (negative)", function() {return false;});
$test.negative("[test #3] assertNegative API (positive)", function() {return false;});
$test.negative("[test #4] assertNegative API (negative)", function() {return true;});
$test.error("[test #5] assertError API (positive)", function() {throw new Error("uncaught exception assertion assertError");});
$test.error("[test #6] assertError API (positive)", function() {throw new Error("uncaught exception assertion assertError with matching expected assertError");}, new Error("uncaught exception assertion assertError with matching expected assertError"));
$test.error("[test #7] assertError API (positive)", function() {throw {message: "non-Error object"};});
$test.error("[test #8] assertError API (negative)", function() {throw {message: "non-Error object with non-matching expected assertError"};}, new Error("uncaught exception assertion assertError"));
$test.error("[test #9] assertError API (negative)", function() {throw new TypeError("incorrect assertError type");}, new Error("uncaught exception assertion assertError"));
$test.error("[test #10] assertError API (negative)", function() {return true;});
$test.error("[test #11] assertError API (negative)", function() {throw new Error("incorrect message");}, new Error("uncaught exception assertion assertError"));
$test.positive("[test #12] assertPositive API (positive)", function() {return true;});

$test.summary();
