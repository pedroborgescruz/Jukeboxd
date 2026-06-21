# Variables - Change "npm run" to "pnpm" or "yarn" if needed
PACKAGE_MANAGER = npm run

.PHONY: help dev build start lint clean type-check install format

# Default target: lists available commands
help:
	@echo "Available commands:"
	@echo "  make dev        - Start development server"
	@echo "  make build      - Build production application"
	@echo "  make start      - Start production server"
	@echo "  make lint       - Run linter and formatting checks"
	@echo "  make type-check - Run TypeScript compilation check"
	@echo "  make format     - Run Prettier code formatting"
	@echo "  make install    - Fresh install of node_modules"
	@echo "  make clean      - Remove build artifacts and cache"

# Development
dev:
	$(PACKAGE_MANAGER) dev

# Production Build
build:
	$(PACKAGE_MANAGER) build

# Run Production Server
start:
	$(PACKAGE_MANAGER) start

# Quality Assurance & Testing
lint:
	$(PACKAGE_MANAGER) lint

type-check:
	$(PACKAGE_MANAGER) tsc

format:
	npm run format

# Housekeeping & Setup
install:
	rm -rf node_modules package-lock.json
	npm install

clean:
	rm -rf .next out node_modules/.cache
