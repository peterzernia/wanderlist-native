build:
	expo build:android
.PHONY: build

upload:
	expo upload:android --track production --key ./api-key.json
.PHONY: upload