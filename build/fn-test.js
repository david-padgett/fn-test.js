/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 David Padgett
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



var __FnTest = {

	resultsId: "fn-test-results",
	errorsId: "fn-test-errors",
	summaryId: "fn-test-summary",
	successes: 0,
	failures: 0,
	errors: 0,
	expectedSuccesses: -1,
	expectedFailures: -1,
	expectedErrors: -1,
	lastAssertionWasError: false,

	assert: function(description, condition) {
		var status = false;
		var error = false;
		try {
			status = condition.apply(null, []);
		}
		catch (e) {
			error = true
			stack = e.stack[e.stack.length - 1] != '\n' ? e.stack : e.stack.slice(0, -1)
			description += " (" + e.message + ")\n\n" + stack + "\n"
		}

		if (status) {
			++this.successes;
		}
		else {
			++this.failures;
		}
		prefix = this.lastAssertionWasError ? "\n" : "";
		this.output(this.resultsId, prefix + "Assert" + "\t" + (status ? "Passed (+)" : "Failed (-)") + "\t" + description);
		this.lastAssertionWasError = error
	},

	error: function(e) {
		prefix = this.errors > 0 ? "\n" : ""
		++this.errors;
		this.output(this.errorsId, prefix + "Error" + "\t" + e.message + "\n\n" + e.stack + "\n");
	},

	message: function(primary, secondary) {
		this.output(this.resultsId, "Message" + "\t" + primary + "\t" + (secondary != null ? secondary : ""));
	},

	expect: function(expectedSuccesses, expectedFailures, expectedErrors) {
		this.expectedSuccesses = expectedSuccesses;
		this.expectedFailures = expectedFailures;
		this.expectedErrors = expectedErrors
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
		summary = (this.expectedSuccesses == -1 || this.expectedFailures == -1) ? this.failures == 0 && this.errors == 0 : this.successes == this.expectedSuccesses && this.failures == this.expectedFailures && (this.expectedErrors != -1 ? this.errors == this.expectedErrors : true);
		str = "\t\tPassed\tFailed\tErrors\n";
		str += "Expected\t" + this.expectedSuccesses + "\t" + this.expectedFailures + "\t" + this.expectedErrors + "\n";
		str += "Actual\t\t" + this.successes + "\t" + this.failures + "\t" + this.errors + "\n";
		str += "Result\t" + "\t" + (summary ? "PASSED": "FAILED") + "\n";
		this.output(this.summaryId, str);
	}

}
