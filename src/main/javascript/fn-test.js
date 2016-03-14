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
 * The object literal type __FnTest provides a simple function-based, assertion
 * pass/fail test library/framework.
 */

var __FnTest = {

	resultsId: "fn-test-results",
	summaryId: "fn-test-summary",
	validAssertions: 0,
	invalidAssertions: 0,
	validErrors: 0,
	invalidErrors: 0,
	expectedValidAssertions: -1,
	expectedValidErrors: -1,
	lastAssertionWasError: false,

	assert: function(description, test) {
		var status = false;
		var error = false;
		try {
			status = test.apply(null, []);
			if (status) {
				++this.validAssertions;
			}
			else {
				++this.invalidAssertions;
			}
		}
		catch (e) {
			++this.invalidAssertions;
			error = true;
			var stack = e.stack == null ? "" : "\n\n" + (e.stack[e.stack.length - 1] != '\n' ? e.stack : e.stack.slice(0, -1));
			description += " (" + e.message + ")" + stack;
		}
		var prefix = this.lastAssertionWasError ? "\n" : "";
		this.output(this.resultsId, prefix + "Assert" + "\t" + (status ? "Passed (+)" : "Failed (-)") + "\t" + description);
		this.lastAssertionWasError = error;
	},

	error: function(description, test, expectedError) {
		var status = false;
		var error = false;
		try {
			test.apply(null, []);
			++this.invalidErrors;
		}
		catch (e) {
			if (expectedError != null && (expectedError.constructor != e.constructor || (expectedError.message != null && expectedError.message != e.message))) {
				++this.invalidErrors;
				error = e.stack != null;
				var stack = !error ? "" : "\n\n" + (e.stack[e.stack.length - 1] != '\n' ? e.stack : e.stack.slice(0, -1));
				description += " (" + e.message + ")" + stack;

			}
			else {
				status = true;
				++this.validErrors;
			}
		}
		var prefix = this.lastAssertionWasError ? "\n" : "";
		this.output(this.resultsId, prefix + "Error" + "\t" + (status ? "Passed (+)" : "Failed (-)") + "\t" + description);
		this.lastAssertionWasError = error;
	},

	expect: function(expectedValidAssertions, expectedValidErrors) {
		this.expectedValidAssertions = expectedValidAssertions;
		this.expectedValidErrors = expectedValidErrors
	},

	getResult: function() {
		var result = this.expectedValidAssertions == -1 || this.expectedValidAssertions == -1 ? this.invalidAssertions == 0 && this.invalidErrors == 0 : this.validAssertions == this.expectedValidAssertions && this.validErrors == this.expectedValidErrors;
		return (result);
	},

	message: function(primary, secondary) {
		this.output(this.resultsId, "Message" + "\t" + primary + "\t" + (secondary != null ? secondary : ""));
	},

	output: function(id, str) {
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
	},

	summary: function() {
		var result = this.getResult();

		str = "\tExpect\tPassed\tFailed\n";
		str += "Assert\t" + this.expectedValidAssertions + "\t" + this.validAssertions + "\t" + this.invalidAssertions + "\n";
		str += "Error\t" + this.expectedValidErrors + "\t" + this.validErrors + "\t" + this.invalidErrors + "\n";
//		str = "\t\tAssertions\tErrors\n";
// 		str += "Expected\t\t" + this.expectedValidAssertions + "\t" + this.expectedValidErrors + "\n";
// 		str += "Successes\t\t" + this.validAssertions + "\t" + this.validErrors + "\n";
// 		str += "Failures\t\t" + this.invalidAssertions + "\t" + this.invalidErrors + "\n";
		this.output(this.summaryId, str);
		return (result);
	}

}
