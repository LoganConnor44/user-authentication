/**
 * Returns an authorized header if the user and user.token are present.
 * @returns {object}
 */
export function authorizationHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}