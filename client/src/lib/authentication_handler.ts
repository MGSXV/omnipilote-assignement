const authentication_handler = (
	username: string,
	password: string, 
	result: { username: string, password: string}
) => {
	console.log(result);
	console.log(username);
	console.log(password);
	if (username === result.username && password === result.password) {
		localStorage.setItem('token', btoa(`${username}${password}`));
		return true;
	}
	return false;
}

export default authentication_handler;