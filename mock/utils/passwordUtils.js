/**
 *
 * @param {string} password
 */
export function checkPassword(password) {
  if (password.length < 5) {
    return false;
  } else {
    return true;
  }
}
