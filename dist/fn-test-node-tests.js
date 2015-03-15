
var __FnTest = require("./fn-test-node.js");

var $test = __FnTest;
$test.message("fn-test.html", "test of message API");
$test.error(new Error("test of error API"));
$test.assert("test of assertion API - positive assertion", function() {return true;});
$test.assert("test of assertion API - negative assertion", function() {return false;});
$test.assert("test of assertion API - exception assertion", function() {throw new Error("exception assertion error");});
$test.summary();
