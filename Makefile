up:
	expo start
.PHONY: up

lint:
	yarn lint
.PHONY: lint

test:
	yarn test
.PHONY: test

build:
	expo build:android
.PHONY: build

upload:
	expo upload:android --track production --key ./api-key.json
.PHONY: upload