/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 David Padgett/Summit Street, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



function FnTest() {

	this.resultsId = "fn-test-results";
	this.summaryId = "fn-test-summary";
	this.totalPositiveTests = 0;
	this.failedPositiveTests = 0;
	this.totalNegativeTests = 0;
	this.failedNegativeTests = 0;
	this.totalErrorTests = 0;
	this.failedErrorTests = 0;
	this.lastTestCausedError = false;

	function format(value, width) {
		var rightJustified = value.constructor === Number;
		value = value.toString();
		var padding = new Array(Math.abs(value.length - width) + 1).join(' ');
		var str = rightJustified ? padding + value : value + padding;
		return (str);
	}

	this.assertError = function(description, testFunction, expectedError) {
		++this.totalErrorTests;
		var result = this.test("Error", null, description, testFunction, expectedError);
		if (result.error == null || result.status != null) {
			++this.failedErrorTests;
		}
		return (result);
	};

	this.assertFalse = function(description, testFunction) {
		++this.totalNegativeTests;
		var result = this.test("False", false, description, testFunction, null);
		if (result.status) {
			++this.failedNegativeTests;
		}
		return (result);
	};

	this.assertTrue = function(description, testFunction) {
		++this.totalPositiveTests;
		var result = this.test("True", true, description, testFunction, null);
		if (!result.status) {
			++this.failedPositiveTests;
		}
		return (result);
	};

	this.getResult = function(failedPositiveTests, failedNegativeTests, failedErrorTests) {
		if (arguments.length > 0) {
			return (this.failedPositiveTests == failedPositiveTests && this.failedNegativeTests == failedNegativeTests && this.failedErrorTests == failedErrorTests);
		}
		return (this.failedPositiveTests == 0 && this.failedNegativeTests == 0 && this.failedErrorTests == 0);
	};

	this.message = function(primary, secondary) {
		this.output(this.resultsId, "Message", "", primary + (secondary != null ?  " (" + secondary + ")": ""));
		this.lastTestCausedError = false;
	};

	this.output = function(id, prefix, status, description) {
		var str = (this.lastTestCausedError ? "\n" : "") + format(prefix, 10) + format(status, 10) + description;
		try {
			var textNode = document.createTextNode(str);
			var preNode = document.createElement("pre");
			preNode.appendChild(textNode);
			var resultsNode = document.getElementById(id);
			resultsNode.appendChild(preNode);
		}
		catch (e) {
			if (id == this.summaryId) {
				console.log()
			}
			console.log(str);
		}
	};

	this.summary = function() {
		var result = this.getResult();
		str = format("Type", 10) + " " + format("Total", 5) + " " + format("Passed", 6) + " " + format("Failed", 6) + "\n";
		str += format("----------", 10) + " " + format("-----", 5) + " " + format("------", 6) + " " + format("------", 6) + "\n";
		str += format("True", 10) + " " + format(this.totalPositiveTests, 5) + " " + format(this.totalPositiveTests - this.failedPositiveTests, 6) + " " + format(this.failedPositiveTests, 6) + "\n";
		str += format("False", 10) + " " + format(this.totalNegativeTests, 5) + " " + format(this.totalNegativeTests - this.failedNegativeTests, 6) + " " + format(this.failedNegativeTests, 6) + "\n";
		str += format("Error", 10) + " " + format(this.totalErrorTests, 5) + " " + format(this.totalErrorTests - this.failedErrorTests, 6) + " " + format(this.failedErrorTests, 6) + "\n";
		this.output(this.summaryId, str, "", "");
		return (result);
	};

	this.test = function(type, expectedStatus, description, testFunction, expectedError) {
		var result = {status: null, error: null};
		try {
			result.status = testFunction.apply(null, []);
		}
		catch (e) {
			result.error = e;
			var stack = e.stack == null ? "" : "\n\n" + (e.stack[e.stack.length - 1] != '\n' ? e.stack : e.stack.slice(0, -1));
			description += " (" + e.message + ")" + stack;
		}

		if (expectedError != null && (expectedError.constructor != result.error.constructor || (expectedError.message != null && expectedError.message != result.error.message))) {
			result.status = false;
		}

		this.output(this.resultsId, type, result.status === expectedStatus ? "Passed" : "Failed", description);
		this.lastTestCausedError = result.error != null && result.error.stack != null;
		return (result);
	};

	this.output(this.resultsId, "Type", "Result", "Description");
	this.output(this.resultsId, "---------", "---------", "-----------");

}

module.exports = FnTest;
