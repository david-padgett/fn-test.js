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

	assert: function(description, condition) {
		var status = false;
		try {
			status = condition.apply(null, []);
		}
		catch (e) {
		}

		if (status) {
			++this.successes;
		}
		else {
			++this.failures;
		}
		this.output(this.resultsId, "Assert" + "\t" + (status ? "Passed (+)" : "Failed (-)") + "\t" + description);
	},

	error:function(e) {
		this.output(this.errorsId, "Error" + "\t" + e.message + "\n" + e.stack);
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
			console.log(str);
		}
	},

	summary: function() {
		this.output(this.summaryId, "Summary" + "\t" + "Passed: " + this.successes + "\tFailed: " + this.failures);
	}

}

module.exports = __FnTest;
