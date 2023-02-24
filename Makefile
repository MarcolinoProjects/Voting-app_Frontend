APP_NAME=voting-app
DOCKER_REPO=vorkurk/react-voting-app
NODE_VERSION=$(shell node -v)
UNAME=$(shell uname)
ifeq ($(UNAME), Darwin)
    AVAILABLE_CPU=$(shell sysctl -n hw.logicalcpu)
    AVAILABLE_RAM=$(shell sysctl -n hw.memsize | awk '{print int($$1/1024^3)"GB"}')
else
    AVAILABLE_CPU=$(shell nproc)
    AVAILABLE_RAM=$(shell free -h | awk '/^Mem:/ {print $$2}')
endif

run:
	npm run serve

deps:
	npm install

test:
	npm test

build:
	npm run build

docker-build:
	docker build -t $(DOCKER_REPO) .

clean:
	rm -rf build
	rm -rf node_modules

info:
	@echo "Node version: $(NODE_VERSION)"
	@echo "Available CPU: $(AVAILABLE_CPU)"
	@echo "Available RAM: $(AVAILABLE_RAM)"

help:
	@echo "Available commands:"
	@echo "run: Run the project"
	@echo "deps: Installs project dependencies."
	@echo "test: Runs project tests."
	@echo "build: Builds the project."
	@echo "docker-build: Creates a Docker image with the name vorkurk/react-voting-app"
	@echo "clean: Cleans up built artifacts."
	@echo "info: Displays information about the system, including the version of Node installed, the available number of CPU cores, and the available RAM."
	@echo "help: Displays this help message."

.PHONY: deps test build docker-build clean info help
