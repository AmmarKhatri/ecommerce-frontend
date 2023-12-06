// Function to set a token in localStorage
export function setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
}

// Function to get a token from localStorage
export function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Function to delete the authentication token from localStorage
export function deleteAuthToken() {
    localStorage.removeItem('authToken');
}