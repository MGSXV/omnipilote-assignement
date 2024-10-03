const authentication_handler = (
	username: string,
	password: string, 
	result: { username: string, password: string}
) => {
	if (username === result.username && password === result.password) {
		localStorage.setItem('token', btoa(`${username}${password}`));
		return true;
	}
	return false;
}

export const logout = () => {
	localStorage.removeItem('token');
	window.location.href = '/login';
}

export default authentication_handler;