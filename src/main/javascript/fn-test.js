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

// fn-test.js/src/main/javascript/fn-test.js

/**
 * The object literal type FnTest provides a simple function-based, assertion
 * pass/fail test library/framework.
 */

function FnTest() {

	this.resultsId = "fn-test-results";
	this.summaryId = "fn-test-summary";
	this.failedAssertTests = 0;
	this.failedErrorTests = 0;
	this.totalAssertTests = 0;
	this.totalErrorTests = 0;
	this.validAssertTests = -1;
	this.validErrorTests = -1;
	this.lastTestHadError = false;

	this.assert = function(description, test) {
		var status = false;
		var stack = null;
		++this.totalAssertTests;
		try {
			status = test.apply(null, []);
		}
		catch (e) {
			stack = e.stack == null ? "" : "\n\n" + (e.stack[e.stack.length - 1] != '\n' ? e.stack : e.stack.slice(0, -1));
			description += " (" + e.message + ")" + stack;
		}
		if (!status) {
			++this.failedAssertTests;
		}
		var prefix = (this.lastTestHadError ? "\n" : "") + "Assert";
		status = status ? "Passed (+)" : "Failed (-)";
		this.output(this.resultsId, prefix, status, description);
		this.lastTestHadError = stack != null;
	};

	this.error = function(description, test, expectedError) {
		var status = true;
		var stack = null;
		++this.totalErrorTests;
		try {
			test.apply(null, []);
			status = false;
		}
		catch (e) {
			if (expectedError != null && (expectedError.constructor != e.constructor || (expectedError.message != null && expectedError.message != e.message))) {
				status = false;
			}
			stack = e.stack == null || status == true ? "" : "\n\n" + (e.stack[e.stack.length - 1] != '\n' ? e.stack : e.stack.slice(0, -1));
			description += " (" + e.message + ")" + stack;
		}
		if (!status) {
			++this.failedErrorTests;
		}
		var prefix = (this.lastTestHadError ? "\n" : "") + "Error";
		status = status ? "Passed (+)" : "Failed (-)";
		this.output(this.resultsId, prefix, status, description);
		this.lastTestHadError = stack != null && stack != "";
	};

	this.expect = function(validAssertTests, validErrorTests) {
		this.validAssertTests = validAssertTests;
		this.validErrorTests = validErrorTests;
		this.output(this.resultsId, "Expect", "Valid Tests", "assert: " + validAssertTests + ", error: " + validErrorTests);
	};

	this.getResult = function() {
		if (this.validAssertTests != -1 && this.validErrorTests != -1) {
			return (this.validAssertTests == this.totalAssertTests - this.failedAssertTests && this.validErrorTests == this.totalErrorTests - this.failedErrorTests);
		}
		return (this.failedAssertTests == 0 && this.failedErrorTests == 0);
	};

	this.message = function(primary, secondary) {
		this.output(this.resultsId, "Message", primary, (secondary != null ? secondary : ""));
	};

	this.output = function(id, prefix, status, description) {
		var str = prefix + "\t" + status + "\t" + description;
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
		var format = function(value) {
			value = value < 0 ? "N/A" : value;
			var prefix = "      ";
			var str = prefix + value;
			return (str.substr(str.length - prefix.length));
		}
		var result = this.getResult();
		var passedAssertTests = this.totalAssertTests - this.failedAssertTests;
		var passedErrorTests = this.totalErrorTests - this.failedErrorTests;
		str = "\t Total\t Valid\tPassed\tFailed\n";
		str += "Assert\t" + format(this.totalAssertTests) + "\t" + format(this.validAssertTests) + "\t" + format(passedAssertTests) + "\t" + format(this.failedAssertTests) + "\n";
		str += "Error\t" + format(this.totalErrorTests) + "\t" + format(this.validErrorTests) + "\t" + format(passedErrorTests) + "\t" + format(this.failedErrorTests) + "\n";
		this.output(this.summaryId, str, "", "");
		return (result);
	};

}
