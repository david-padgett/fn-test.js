
var __FnTest = require("./fn-test-node.js");

console.log("")
var $test = __FnTest;
$test.expect(2, 2);
$test.message("fn-test.html", "test of message API");
$test.assert("test of assert API - positive test 1", function() {return true;});
$test.assert("test of assert API - negative test 1", function() {return false;});
$test.error("test of error API - positive test 1", function() {throw new Error("uncaught exception assertion error");});
$test.error("test of error API - positive test 2", function() {throw new Error("uncaught exception assertion error");}, new Error("uncaught exception assertion error"));
$test.error("test of error API - negative test 1", function() {throw {message: "non-Error object"};}, new Error("uncaught exception assertion error"));
$test.error("test of error API - negative test 2", function() {throw new TypeError("incorrect error type");}, new Error("uncaught exception assertion error"));
$test.error("test of error API - negative test 3", function() {return true;});
$test.error("test of error API - negative test 4", function() {throw new Error("incorrect message");}, new Error("uncaught exception assertion error"));
$test.assert("test of assert API - positive test 2", function() {return true;});

$test.summary();

process.exit($test.getResult() ? 0 : -1);
