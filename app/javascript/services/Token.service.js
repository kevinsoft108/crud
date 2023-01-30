class TokenService {
  saveToken(token) {
    localStorage.setItem('token', token);
    return Promise.resolve();
  }

  deleteToken() {
    localStorage.removeItem('token');
    return;
  }
}

export default TokenService;
