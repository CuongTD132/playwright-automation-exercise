# TEST_STRATEGY.md

## 1. Scope

### Target System

* URL: https://automationexercise.com
* Browser: Chromium, Firefox, Safari
* Test Type: End-to-End UI Automation

### Covered Test Cases

| #  | Module         | Test Case                            | Status |
| -- | -------------- | ------------------------------------ | ------ |
| 1  | Authentication | Register new user                    | ✅      |
| 2  | Authentication | Login with valid credentials         | ✅      |
| 3  | Authentication | Verify username after login          | ✅      |
| 4  | Authentication | Logout                               | ✅      |
| 5  | Authentication | Login with invalid password          | ✅      |
| 6  | Products       | Add 2 products to cart               | ✅      |
| 7  | Cart           | Verify product name, quantity, price | ✅      |
| 8  | Checkout       | Complete checkout flow               | ✅      |
| 9  | Checkout       | Verify delivery address              | ✅      |
| 10 | Checkout       | Verify "Order Placed!" message       | ✅      |

---

## 2. Not Covered

| Module        | Test Case                   | Reason                |
| ------------- | --------------------------- | --------------------- |
| Search        | Search products             | Outside current scope |
| Products      | Filter by category          | Outside current scope |
| Cart          | Remove item from cart       | Outside current scope |
| Cart          | Update quantity             | Outside current scope |
| Account       | Update profile/account info | Outside current scope |
| Cross-browser | Firefox / Safari            | Time limitation       |
| Mobile        | Responsive testing          | Time limitation       |

---

## 3. Automation Risks & Handling

| Risk            | Description                                             | Mitigation                                  |
| --------------- | ------------------------------------------------------- | ------------------------------------------- |
| Ads / popup     | Ads may overlap elements and block interactions         | Block ads at network level                  |
| Duplicate email | Registering same email multiple times                   | Generate unique email using timestamp       |
| UI changes      | Locator may break if UI changes                         | Prefer stable selectors like `data-qa`      |
| Slow loading    | Some pages load slower occasionally                     | Use Playwright auto-wait and timeout config |
| Test dependency | Task 2 and Task 4 require account from Task 1           | Run tests serially with shared state        |
| Shared state    | State file may become outdated when running single test | Recommend running full suite from Task 1    |

---

## 4. Locator Strategy

Thứ tự ưu tiên khi viết locator:

1. `data-qa` attribute
2. ARIA roles
3. CSS selector ổn định
4. Text-based selector

Hạn chế dùng Absolute XPath vì dễ bị vỡ khi UI thay đổi.

---

## 5. Improvements (Nếu có thêm thời gian)

* Dùng Playwright fixtures thay cho shared state hiện tại
* Thêm API layer để setup test data nhanh hơn
* Tích hợp Allure Report
* Cover thêm các case như search, filter, cart management
* Thêm mobile/responsive testing

