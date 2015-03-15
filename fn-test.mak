SED_SLC_REGEX="/\/\//d"
SED_MLC_REGEX="/\/\*\*/,/\*\//d"

SED_ARGS=$(if grep -c 'Darwin',-i "",-i)

dist/fn-test.js : src/main/javascript/fn-test.js
	@echo Building $@
	@mkdir -p dist
	@cat $+ > $@
	@sed $(SED_ARGS) $(SED_SLC_REGEX) $@
	@sed $(SED_ARGS) $(SED_MLC_REGEX) $@

dist/fn-test-node.js : src/main/javascript/fn-test-node-prefix.js src/main/javascript/fn-test.js src/main/javascript/fn-test-node-suffix.js
	@echo Building $@
	@mkdir -p dist
	@cat $+ > $@
	@sed $(SED_ARGS) $(SED_SLC_REGEX) $@
	@sed $(SED_ARGS) $(SED_MLC_REGEX) $@

dist/fn-test-node-tests.js : src/test/javascript/node-prefix.js src/test/javascript/test.js src/test/javascript/node-suffix.js
	@echo Building $@
	@mkdir -p dist
	@cat $+ > $@
	@sed $(SED_ARGS) $(SED_SLC_REGEX) $@
	@sed $(SED_ARGS) $(SED_MLC_REGEX) $@

all: dist/fn-test.js dist/fn-test-node.js dist/fn-test-node-tests.js

test: all
	@echo Running unit tests
	@node dist/fn-test-node-tests.js
