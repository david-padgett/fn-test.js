"use strict";

/* eslint-disable no-console */

console.log();
var $test = new (require("./fn-test-node.js"))();

$test.message("fn-test", "test of message API");
$test.assertTrue("[test #1] assertPositive API (positive)", function() {return true;});
$test.assertTrue("[test #2] assertPositive API (negative)", function() {return false;});
$test.assertFalse("[test #3] assertNegative API (positive)", function() {return false;});
$test.assertFalse("[test #4] assertNegative API (negative)", function() {return true;});
$test.assertError("[test #5] assertError API (positive)", function() {throw new Error("uncaught exception assertion assertError");});
$test.assertError("[test #6] assertError API (positive)", function() {throw new Error("uncaught exception assertion assertError with matching expected assertError");}, new Error("uncaught exception assertion assertError with matching expected assertError"));
$test.assertError("[test #7] assertError API (positive)", function() {throw {message: "non-Error object"};});
$test.assertError("[test #8] assertError API (negative)", function() {throw {message: "non-Error object with non-matching expected assertError"};}, new Error("uncaught exception assertion assertError"));
$test.assertError("[test #9] assertError API (negative)", function() {throw new TypeError("incorrect assertError type");}, new Error("uncaught exception assertion assertError"));
$test.assertError("[test #10] assertError API (negative)", function() {return true;});
$test.assertError("[test #11] assertError API (negative)", function() {throw new Error("incorrect message");}, new Error("uncaught exception assertion assertError"));
$test.assertTrue("[test #12] assertPositive API (positive)", function() {return true;});

$test.summary();

process.exit($test.getResult(1, 1, 4) ? 0 : 1);

