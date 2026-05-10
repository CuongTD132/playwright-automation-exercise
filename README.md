# Playwright Automation Test — AutomationExercise.com

E2E automation test project sử dụng Playwright + TypeScript cho [automationexercise.com](https://automationexercise.com)

---

## Test Coverage

| Task | Mô tả | Trạng thái |
|------|-------|-----------|
| Task 1 | Register User | ✅ |
| Task 2 | Login User | ✅ |
| Task 3 | Add Product To Cart | ✅ |
| Task 4 | Checkout Flow | ✅ |
| Task 5 | Negative Test Cases (Login) | ✅ |

---

## Project Structure
```plaintext
playwright-automation-exercise/
├── pages/
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── AuthPage.ts
│   ├── RegisterPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── DeleteAccountPage.ts
│
├── tests/
│   ├── task1-register-user.spec.ts
│   ├── task2-login-user.spec.ts
│   ├── task3-add-product-to-cart.spec.ts
│   ├── task4-checkout-flow.spec.ts
│   └── task5-negative-login.spec.ts
│
├── test-data/
│   └── users.ts
│
├── utils/
│   └── testState.ts
│
├── reports/
│   └── html-report/
│
├── playwright.config.ts
└── tsconfig.json
```

---

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

---

## Setup & Installation

```bash
# 1. Clone repository
git clone https://github.com/CuongTD132/playwright-automation-exercise.git
cd playwright-automation-exercise

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install chromium
```

---

## Running Tests

```bash
# Chạy tất cả tests (phải chạy theo thứ tự)
npx playwright test

# Chạy từng task
npx playwright test task1 --headed
npx playwright test task2 --headed
npx playwright test task3 --headed
npx playwright test task4 --headed
npx playwright test task5 --headed

# Xem HTML report
npx playwright show-report reports/html-report
```

---

## Notes

Task 2 và Task 4 sử dụng account được tạo từ Task 1 nên khi chạy full suite cần chạy đúng thứ tự.

Project hiện tại dùng shared state (`testState.ts`) để lưu account test giữa các task.

---

## Design Patterns / Approach

- Sử dụng Page Object Model để tách riêng logic của từng page
- Reuse test data giữa các task bằng shared state (`testState.ts`)
- Locator ưu tiên `data-qa`, `role`, `text` để hạn chế flaky test
- Có highlight element khi chạy headed mode để dễ quan sát luồng test
- Block ads/popup ở network layer để test ổn định hơn