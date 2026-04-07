# UIAutomationSwaglabdemo

Playwright end-to-end tests for Sauce Labs demo application (https://www.saucedemo.com/). Tests cover user login, browsing products, checkout flows, and logout for various user types.

## Prerequisites

- **Node.js** (v16 or later) — [Download](https://nodejs.org/)
- **Git** — [Download](https://git-scm.com/)
- npm (bundled with Node.js)

## Tools and Frameworks

This project uses the following tools and frameworks:

- **Playwright** — End-to-end testing framework for web and API automation
- **Node.js** — JavaScript runtime environment
- **TypeScript** — Typed superset of JavaScript for better code quality
- **GitHub Actions** — CI/CD pipeline for automated testing
- **npm** — Package manager for Node.js dependencies

**Key Dependencies:**
- `@playwright/test` — Core testing framework
- `typescript` — TypeScript compiler
- `@types/node` — TypeScript definitions for Node.js

## Installation

Clone the repository:
```bash
git clone https://github.com/ashwiniahinge/UIAutomationSwaglabdemo.git
cd UIAutomationSwaglabdemo
```

Install dependencies:
```bash
npm ci
```

Install Playwright browsers:
```bash
npx playwright install --with-deps
```

## Running Tests Locally

Run all tests:
```bash
npx playwright test
```

Run tests in headed mode (see browser):
```bash
npx playwright test --headed
```

Run a single test file:
```bash
npx playwright test tests/Login-Logout.test.ts
```

Run API tests only:
```bash
npx playwright test --project=api
```

Run both UI and API tests:
```bash
npx playwright test
```

View test report:
```bash
npx playwright show-report
```

## Running Tests on GitHub (CI/CD)

Tests run automatically on every push to `main` or when a PR is created.

### Manual Trigger
1. Go to your repo → **Actions** tab
2. Click **Playwright Tests** workflow
3. Click **Run workflow** → select branch → **Run workflow**

### View Results
1. Go to **Actions** tab
2. Click the latest workflow run
3. View test results and download HTML report (playwright-report artifact)

## Project Structure

```
tests/
├── Browsecatalogue.test.ts      # Product catalog browsing
├── Login-Logout.test.ts          # Login & logout flow
├── ProblemUser.test.ts           # Problem user account tests
├── StandardUsercheckout.test.ts  # Standard user checkout flow
├── locked_out_user.test.ts       # Locked out user behavior
├── ErrorUse.test.ts              # Error user account (SKIPPED - see Known Issues)
└── visual_user.test.ts           # Visual user account (SKIPPED - see Known Issues)

api-tests/
└── PetstoreAPI.test.ts           # Petstore API CRUD operations

playwright.config.ts              # Playwright configuration
package.json                       # Dependencies & scripts
```

## API Testing

This project includes API automation tests for the [Petstore API](https://petstore.swagger.io/) using Playwright's request context.

### How to Run API Test Cases

Run all API tests:
```bash
npx playwright test --project=api
```

Run API tests in verbose mode:
```bash
npx playwright test --project=api --reporter=line
```

Run a specific API test:
```bash
npx playwright test api-tests/PetstoreAPI.test.ts --grep "Create a new pet"
```

Run API tests with debugging:
```bash
npx playwright test --project=api --debug
```

### API Endpoints Covered

The API tests cover the following Petstore endpoints:

| Endpoint | Method | Description | Test Status |
|----------|--------|-------------|-------------|
| `/pet` | POST | Create a new pet | ✅ Covered |
| `/pet/{petId}` | GET | Get pet by ID | ✅ Covered |
| `/pet` | PUT | Update an existing pet | ✅ Covered |
| `/pet/findByStatus` | GET | Find pets by status | ✅ Covered |
| `/pet/{petId}` | DELETE | Delete a pet | ✅ Covered |

### API Test Details

**Test File:** `api-tests/PetstoreAPI.test.ts`

**Test Cases:**
1. **Create a new pet** — Validates pet creation with all required fields
2. **Get pet by ID** — Retrieves and validates pet data by ID
3. **Update pet** — Updates pet information and verifies changes
4. **Find pets by status** — Searches pets by availability status
5. **Delete pet** — Removes pet and validates deletion

**Base URL:** `https://petstore.swagger.io/v2`

**Data Format:** JSON

**Authentication:** None required (public API)

## Test Users

The demo site provides pre-configured test accounts:

| User | Password | Notes |
|------|----------|-------|
| `standard_user` | `secret_sauce` | Normal user account |
| `problem_user` | `secret_sauce` | Has product issues/loading delays |
| `locked_out_user` | `secret_sauce` | Cannot login (403 error) |
| `performance_glitch_user` | `secret_sauce` | Slow performance |
| `error_user` | `secret_sauce` | Returns errors |
| `visual_user` | `secret_sauce` | Image comparison tests |

## Known Issues

⚠️ The following tests are currently **skipped** due to element timing/visibility issues:

- **ErrorUse.test.ts** — Elements not loading properly for error_user account
- **visual_user.test.ts** — Logout button visibility issues in webkit browser

**Status**: 15 tests passing, 6 tests skipped (across 3 browsers: chromium, firefox, webkit)

To fix:
- Add explicit waits: `locator.waitFor({ state: 'visible' })`
- Handle error account page restrictions
- Use `page.waitForURL()` for navigation

## CI/CD Configuration

See `.github/workflows/playwright.yml` for GitHub Actions configuration:
- Runs on: Ubuntu latest
- Node.js: LTS
- Browsers: Chromium, Firefox, WebKit
- Retries: 2 (CI only)
- Artifacts: HTML test report (30-day retention)

## Troubleshooting

**Tests timeout locally?**
- Check internet connection (tests hit live saucedemo.com)
- Increase timeout: `test.setTimeout(90_000);`

**Playwright browsers not installed?**
```bash
npx playwright install --with-deps
```

**Want to debug a failing test?**
```bash
npx playwright test tests/YourTest.test.ts --debug
```

## Contributing

1. Create a feature branch: `git checkout -b fix/test-name`
2. Run tests: `npx playwright test`
3. Commit & push: `git push origin fix/test-name`
4. Open a Pull Request

## References

- [Playwright Documentation](https://playwright.dev)
- [Sauce Labs Demo App](https://www.saucedemo.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
