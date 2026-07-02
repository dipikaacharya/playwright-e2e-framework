import { test, expect } from '../../src/fixtures/test-fixtures';
import { users } from '../../src/data/users';

test.describe('Authentication', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('valid user can log in @smoke', async ({ loginPage, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('invalid credentials show an error message @regression', async ({ loginPage }) => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    await expect(loginPage.errorMessage).toBeVisible();
    expect(await loginPage.getErrorText()).toContain('do not match');
  });

  test('locked out user is blocked with a clear message @regression', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    expect(await loginPage.getErrorText()).toContain('locked out');
  });

  test('empty username shows required-field error @regression', async ({ loginPage }) => {
    await loginPage.login('', users.standard.password);
    expect(await loginPage.getErrorText()).toContain('Username is required');
  });
});
