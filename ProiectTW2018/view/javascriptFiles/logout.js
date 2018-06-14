function logout() {
    console.log('am intrat pe logout')
    localStorage.removeItem(localStorage.key(4));
    localStorage.removeItem(localStorage.key(3));
    localStorage.removeItem(localStorage.key(2));
    localStorage.removeItem(localStorage.key(1));
    localStorage.removeItem(localStorage.key(0));
}