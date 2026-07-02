# Playwright E2E Test Automation Framework

![E2E Tests](https://github.com/dipikaacharya/playwright-e2e-framework/actions/workflows/e2e-tests.yml/badge.svg)

An end-to-end test automation framework built with **Playwright + TypeScript**, demonstrating the **Page Object Model**, custom fixtures, centralised test data, multi-browser execution, and CI integration with GitHub Actions.

**Application under test:** [saucedemo.com](https://www.saucedemo.com) — a public demo e-commerce app by Sauce Labs.

## What this project demonstrates

- **Page Object Model (POM):** every page is a class with locators and actions; test specs contain no raw selectors.
- **Custom fixtures:** page objects and an authenticated session are injected into tests, keeping specs short and readable.
- **Centralised test data:** users, products, and checkout data live in one typed module — no magic strings in tests.
- **Test tagging:** `@smoke` and `@regression` tags allow selective suite execution.
- **Multi-browser testing:** Chromium, Firefox, and WebKit via Playwright projects.
- **CI/CD:** GitHub Actions matrix runs all three browsers on every push and nightly, with HTML reports uploaded as artifacts.
- **Failure diagnostics:** screenshots, videos, and traces captured automatically on failure.

## Architecture

```
├── playwright.config.ts        # browsers, reporters, baseURL, retries
├── src/
│   ├── pages/                  # Page Object Model classes
│   │   ├── BasePage.ts         # shared page behaviour
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   └── CartPage.ts         # cart + checkout
│   ├── fixtures/
│   │   └── test-fixtures.ts    # injects page objects + loggedIn session
│   └── data/
│       └── users.ts            # typed test data (public demo credentials)
├── tests/e2e/
│   ├── login.spec.ts           # auth: happy path + 3 negative cases
│   └── checkout.spec.ts        # add-to-cart, sorting, full checkout flow
└── .github/workflows/
    └── e2e-tests.yml           # CI matrix: chromium / firefox / webkit
```

**Flow:** spec → fixture (injects page object, handles login) → page object (owns locators + actions) → application. Assertions stay in specs; interaction details stay in page objects.

## Getting started

```bash
npm install
npx playwright install

npm test                 # all tests, all browsers
npm run test:smoke       # smoke suite only
npm run test:chromium    # single browser
npm run report           # open the HTML report
```

## Test coverage

| Suite | Tests | Tags |
|---|---|---|
| Authentication | valid login, invalid credentials, locked-out user, empty username | `@smoke`, `@regression` |
| Cart & Checkout | add to cart, cart contents, full checkout, price sorting | `@smoke`, `@regression` |

## Test reports

Every run produces an HTML report in `playwright-report/` (gitignored — reports are run artifacts, not source).

```bash
npm run report          # serves the latest report at http://localhost:9323
```

On failure, the report includes a screenshot, video, and (on CI retry) a full Playwright trace for each failing test. In CI, the report for each browser is uploaded as a workflow artifact.

### Troubleshooting

**Firefox fails to launch on Windows** with `Host system is missing dependencies: msvcp140_1.dll` — the Playwright Firefox build requires the Microsoft Visual C++ Redistributable. Install it and re-run:

```powershell
winget install Microsoft.VCRedist.2015+.x64
npm run test:firefox
```

Chromium and WebKit are unaffected.

## CI pipeline

Every push and pull request triggers a 3-browser matrix run; a nightly schedule catches regressions in the application under test. HTML reports for each browser are published as workflow artifacts (14-day retention).

## Author

**Dipika Acharya** — Software QA Engineer
