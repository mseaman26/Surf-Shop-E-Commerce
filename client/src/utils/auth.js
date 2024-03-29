import decode from 'jwt-decode';
const adminUsers = require('./adminUsers.json')

class AuthService {
	getProfile() {
		return decode(this.getToken());
	}

	loggedIn() {
		const token = this.getToken();
		// If there is a token and it's not expired, return `true`
		return token && !this.isTokenExpired(token) ? true : false;
	}
	isAdmin(){
		if(adminUsers.includes(localStorage.getItem('email'))){
			return true
		} else {
			return false
		}
	}
	isTokenExpired(token) {
		try {
			// Decode the token to get its expiration time that was set by the server
			const decoded = decode(token);
			// If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
			if (decoded.exp < Date.now() / 1000) {
				localStorage.removeItem('id_token');
				localStorage.removeItem('email')
				return true;
				// If token hasn't passed its expiration time, return `false`
			} else return false;
		} catch (err) {
      console.error(err);
		}
	}

	getToken() {
		return localStorage.getItem('id_token');
	}

  login(idToken, email) {
    localStorage.setItem('email', email)
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
