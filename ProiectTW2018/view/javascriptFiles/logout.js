function logout() {
    console.log('am intrat pe logout')
    console.log(localStorage.key(0))
    console.log(localStorage.key(1))
    localStorage.removeItem(localStorage.key(1));
    localStorage.removeItem(localStorage.key(0));
}