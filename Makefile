build:
	docker-compose build
.PHONY: build

init:
	docker-compose run backend python manage.py migrate --noinput
	docker-compose run backend python manage.py createsuperuser
	docker-compose run backend python manage.py loaddata database.json
.PHONY: init

up:
	docker-compose up
.PHONY: up

lint:
	yarn lint
.PHONY: lint

test:
	yarn test
.PHONY: test

upload:
	expo build:android
	expo upload:android --track production --key ./api-key.json
.PHONY: upload

clean:
	docker-compose stop
	docker-compose rm -fv
.PHONY: clean