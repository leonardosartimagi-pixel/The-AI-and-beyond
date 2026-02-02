# =============================================================================
# Makefile - The AI and Beyond Website
# =============================================================================
# Run `make help` to see all available commands
# =============================================================================

.PHONY: help install dev build start test test-watch test-coverage lint lint-fix format typecheck security-check clean deploy preview e2e

# Default target
.DEFAULT_GOAL := help

# -----------------------------------------------------------------------------
# HELP
# -----------------------------------------------------------------------------
help: ## Show this help message
	@echo ""
	@echo "The AI and Beyond - Available Commands"
	@echo "======================================="
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""

# -----------------------------------------------------------------------------
# SETUP & INSTALLATION
# -----------------------------------------------------------------------------
install: ## Install all dependencies
	@echo "📦 Installing dependencies..."
	npm install
	@echo "✅ Dependencies installed"

install-clean: ## Clean install (remove node_modules first)
	@echo "🧹 Removing node_modules..."
	rm -rf node_modules
	rm -f package-lock.json
	@echo "📦 Installing fresh dependencies..."
	npm install
	@echo "✅ Clean install complete"

setup: ## First-time setup (install + prepare)
	@echo "🚀 Setting up project..."
	make install
	@echo "📝 Creating .env.local from .env.example..."
	@if [ ! -f .env.local ]; then \
		cp .env.example .env.local 2>/dev/null || echo "⚠️  .env.example not found, skipping"; \
	else \
		echo "ℹ️  .env.local already exists, skipping"; \
	fi
	@echo "✅ Setup complete! Run 'make dev' to start development server"

# -----------------------------------------------------------------------------
# DEVELOPMENT
# -----------------------------------------------------------------------------
dev: ## Run development server (http://localhost:3000)
	@echo "🚀 Starting development server..."
	npm run dev

dev-turbo: ## Run development server with Turbopack (faster)
	@echo "🚀 Starting development server with Turbopack..."
	npm run dev -- --turbo

# -----------------------------------------------------------------------------
# BUILD & PRODUCTION
# -----------------------------------------------------------------------------
build: ## Build for production
	@echo "🔨 Building for production..."
	npm run build
	@echo "✅ Build complete"

start: ## Start production server (run build first)
	@echo "🚀 Starting production server..."
	npm run start

analyze: ## Analyze bundle size (requires @next/bundle-analyzer)
	@echo "📊 Analyzing bundle..."
	ANALYZE=true npm run build

# -----------------------------------------------------------------------------
# TESTING
# -----------------------------------------------------------------------------
test: ## Run all tests
	@echo "🧪 Running tests..."
	npm run test

test-watch: ## Run tests in watch mode
	@echo "🧪 Running tests in watch mode..."
	npm run test:watch

test-coverage: ## Run tests with coverage report
	@echo "🧪 Running tests with coverage..."
	npm run test:coverage

test-ui: ## Run tests with UI
	@echo "🧪 Running tests with UI..."
	npm run test:ui

e2e: ## Run end-to-end tests (Playwright)
	@echo "🎭 Running E2E tests..."
	npm run test:e2e

e2e-ui: ## Run E2E tests with UI (Playwright)
	@echo "🎭 Running E2E tests with UI..."
	npm run test:e2e:ui

# -----------------------------------------------------------------------------
# CODE QUALITY
# -----------------------------------------------------------------------------
lint: ## Run ESLint
	@echo "🔍 Running linter..."
	npm run lint

lint-fix: ## Run ESLint and fix issues
	@echo "🔧 Running linter with auto-fix..."
	npm run lint -- --fix

format: ## Format code with Prettier
	@echo "✨ Formatting code..."
	npm run format

format-check: ## Check if code is formatted
	@echo "🔍 Checking code formatting..."
	npm run format:check

typecheck: ## Run TypeScript type checking
	@echo "🔎 Running type check..."
	npm run typecheck

# -----------------------------------------------------------------------------
# SECURITY
# -----------------------------------------------------------------------------
security-check: ## Run security audit
	@echo "🔒 Running security audit..."
	@echo ""
	@echo "--- NPM Audit ---"
	npm audit || true
	@echo ""
	@echo "--- Checking for secrets in code ---"
	@if grep -r "RESEND_API_KEY\s*=" --include="*.ts" --include="*.tsx" --include="*.js" src/ app/ 2>/dev/null | grep -v ".env"; then \
		echo "❌ WARNING: Possible hardcoded API keys found!"; \
		exit 1; \
	else \
		echo "✅ No hardcoded secrets found in source files"; \
	fi
	@echo ""
	@echo "--- Checking .gitignore for .env ---"
	@if grep -q "\.env" .gitignore 2>/dev/null; then \
		echo "✅ .env files are in .gitignore"; \
	else \
		echo "❌ WARNING: .env files may not be in .gitignore!"; \
	fi
	@echo ""
	@echo "🔒 Security check complete"

security-fix: ## Fix security vulnerabilities (where possible)
	@echo "🔧 Attempting to fix security vulnerabilities..."
	npm audit fix

# -----------------------------------------------------------------------------
# CLEANUP
# -----------------------------------------------------------------------------
clean: ## Remove build artifacts and caches
	@echo "🧹 Cleaning build artifacts..."
	rm -rf .next
	rm -rf out
	rm -rf coverage
	rm -rf .turbo
	rm -rf playwright-report
	@echo "✅ Clean complete"

clean-all: ## Remove all generated files (including node_modules)
	@echo "🧹 Deep cleaning..."
	make clean
	rm -rf node_modules
	@echo "✅ Deep clean complete"

# -----------------------------------------------------------------------------
# DEPLOYMENT
# -----------------------------------------------------------------------------
deploy: ## Deploy to Vercel (production)
	@echo "🚀 Deploying to Vercel..."
	@if command -v vercel &> /dev/null; then \
		vercel --prod; \
	else \
		echo "❌ Vercel CLI not installed. Run: npm i -g vercel"; \
		exit 1; \
	fi

preview: ## Deploy preview to Vercel
	@echo "👀 Creating preview deployment..."
	@if command -v vercel &> /dev/null; then \
		vercel; \
	else \
		echo "❌ Vercel CLI not installed. Run: npm i -g vercel"; \
		exit 1; \
	fi

# -----------------------------------------------------------------------------
# UTILITIES
# -----------------------------------------------------------------------------
check-all: ## Run all checks (lint, typecheck, test, security)
	@echo "🔍 Running all checks..."
	@echo ""
	make lint
	@echo ""
	make typecheck
	@echo ""
	make test
	@echo ""
	make security-check
	@echo ""
	@echo "✅ All checks complete"

pre-commit: ## Run pre-commit checks
	@echo "🔍 Running pre-commit checks..."
	make lint-fix
	make format
	make typecheck
	make test
	@echo "✅ Pre-commit checks passed"

lighthouse: ## Run Lighthouse audit (requires Chrome)
	@echo "🔦 Running Lighthouse audit..."
	@if command -v lighthouse &> /dev/null; then \
		lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html; \
		echo "📊 Report saved to lighthouse-report.html"; \
	else \
		echo "❌ Lighthouse CLI not installed. Run: npm i -g lighthouse"; \
	fi

# -----------------------------------------------------------------------------
# DOCUMENTATION
# -----------------------------------------------------------------------------
docs: ## Open documentation
	@echo "📚 Opening documentation..."
	@if [ -f DOCS/PRD.md ]; then \
		cat DOCS/PRD.md | head -100; \
		echo "..."; \
		echo "Run 'cat DOCS/PRD.md' to see full document"; \
	fi

tree: ## Show project structure
	@echo "📁 Project structure:"
	@if command -v tree &> /dev/null; then \
		tree -I 'node_modules|.next|.git|coverage' -L 3; \
	else \
		find . -type d -name node_modules -prune -o -type d -name .next -prune -o -type d -name .git -prune -o -type f -print | head -50; \
	fi
