/**
 * Centralised test data.
 * saucedemo.com publishes these demo credentials on its login page —
 * they are intentionally public and safe to commit.
 */
export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  invalid: { username: 'not_a_user', password: 'wrong_password' },
} as const;

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltShirt: 'Sauce Labs Bolt T-Shirt',
} as const;

export const checkoutCustomer = {
  firstName: 'Dipika',
  lastName: 'Acharya',
  postalCode: '44600',
} as const;
