/**
 * The address of the backend api.
 */
export let config;
if (process.env.NODE_ENV === 'production') {
    config = {
        apiUrl: 'https://localhost:5001'
    };
} else {
    config = {
        apiUrl: 'http://localhost:5000'
    };
}