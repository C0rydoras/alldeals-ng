.DEFAULT_GOAL := help

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort -k 1,1 | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


.PHONY: api-lint
api-lint: ## Lint the backend
	@docker compose run --rm api sh -c "black . --check ; ruff ."

.PHONY: api-lint-fix
api-lint-fix: ## Lint and fix the API
	@docker compose run --rm api sh -c "black . && ruff . --fix"

.PHONY: api-start
api-start: ## Start the API
	@docker compose up api -d --build

.PHONY: api-test
api-test: ## Test the API
	@docker compose run --rm api pytest --no-cov-on-fail --cov -vvv -s

.PHONY: build
build: ## Build the containers
	@docker compose build

.PHONY: cleanup
cleanup: ## Cleanup all docker containers, images, volumes and networks from the project
	@docker compose down -v --timeout 0

.PHONY: solid-lint
solid-lint: ## lint solid
	@cd solid && pnpm lint

.PHONY: solid-lint-fix
solid-lint-fix: ## lint and fix solid
	@cd solid && pnpm lint:fix

.PHONY: solid-start
solid-start: ## Start solid
	@docker compose up solid --build -d

.PHONY: solid-start-livereload
solid-start-livereload: ## Start solid with livereload
	@docker compose up -d --build api caddy && cd solid && pnpm && pnpm run dev

.PHONY: solid-test
solid-test: ## test the frontend
	@cd solid && yarn test:solid

.PHONY: lint
lint: api-lint solid-lint ## Lint the API and solid

.PHONY: lint-fix
lint-fix: api-lint-fix solid-lint-fix ## Lint and fix the API and solid

.PHONY: start
start: ## Start the application
	@docker compose up -d --build

.PHONY: test
test: api-test solid-test ## Test the API and solid