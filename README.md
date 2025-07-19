# Test Automation Framework

> **⚠️ DEMO PROJECT NOTICE**: This is a portfolio demonstration project. Real application names and endpoints have been replaced with placeholders. The framework cannot be executed as-is and requires proper configuration for actual testing environments.

## 🚀 Overview

Multi-framework TypeScript test automation solution showcasing:

- **Multiple Frameworks**: Playwright, Jest, WebDriverIO, Mocha, Cucumber
- **Full-Stack Testing**: UI, API, and BDD capabilities
- **Enterprise Patterns**: Page Object Model, Data-Driven Testing, CI/CD integration
- **Advanced Features**: Cross-browser testing, parallel execution, comprehensive reporting

## 🛠️ Tech Stack

**Core**: TypeScript, Node.js  
**Testing**: Playwright, Jest, WebDriverIO, Mocha, Cucumber  
**API**: Pactum, Chai  
**Reporting**: Allure, Winston  
**Quality**: ESLint, Prettier, SonarQube, Jenkins

## 📁 Project Structure

```
framework/
├── api/              # API testing framework
├── ui/               # Page Object Model implementation
├── wdio/             # WebDriverIO tests
├── env/              # Environment configuration
└── [mocha,jest]/     # Framework-specific utilities

tests/
├── api/              # REST API test suites
├── ui/               # Playwright UI automation
├── cucumber/         # BDD features & step definitions
└── [jest,wdio]/      # Additional test implementations
```

## 🚀 Available Commands

### UI Testing

```bash
npm run ui:local              # Playwright local
npm run ui:remote             # Playwright remote
npm run ui-jest:local         # Jest + Playwright
npm run wdio                  # WebDriverIO execution
```

### API & BDD Testing

```bash
npm run api:local             # API tests local
npm run cucumber:remote       # BDD scenarios
npm run two-users:remote      # Multi-user scenarios
npm run ddt:remote            # Data-driven tests
```

### Reports & Quality

```bash
npm run allure-generate       # Generate test reports
npm run sonar                 # Code quality analysis
```

## 🎯 Demonstrated Skills

**TypeScript Expertise**: Advanced typing, interfaces, design patterns  
**Test Architecture**: Multi-framework integration, reusable components  
**Modern Testing**: Latest tools and best practices  
**Enterprise Ready**: CI/CD pipelines, quality gates, comprehensive reporting  
**Code Quality**: Strict TypeScript, linting, formatting standards

## 📊 Testing Approaches

- **Cross-Browser Automation** (Chromium, Firefox, WebKit)
- **API Validation** (Authentication, REST endpoints, error handling)
- **BDD Testing** (Gherkin scenarios, step definitions)
- **Data-Driven Testing** (External data sources, parameterization)
- **End-to-End Workflows** (Multi-system integration testing)

---

**Author**: Yevhen Sydorenko  
**Purpose**: TypeScript test automation skills demonstration
