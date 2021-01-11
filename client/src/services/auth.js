import axios from "axios";

export default class Auth {
	static signin = (email, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${process.env.REACT_APP_API_ROUTE}/auth/api/login`, { email, password })
				.then((response) => {
					localStorage.setItem("access_token", response.data.access_token);
					resolve(response.data);
				})
				.catch((error) => {
					localStorage.removeItem("access_token");
					reject(error);
				});
		});
	};

	static signup = (email, password) => {
		console.log("signup...");
	};

	static signout = () => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${process.env.REACT_APP_API_ROUTE}/auth/api/logout`)
				.then((response) => {
					localStorage.removeItem("access_token");
					resolve(response);
				})
				.catch((error) => {
					localStorage.removeItem("access_token");
					reject(error);
				});
		});
	};
}
