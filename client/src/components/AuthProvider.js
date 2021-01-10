import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { configureAxios } from "./../config";

export default function AuthProvider({ children }) {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Init Auth Context
function useProvideAuth() {
	const [access_token, setAccessToken] = useState(null);

	useEffect(() => {
		let token = localStorage.getItem("access_token");

		setAccessToken(token);

		configureAxios(access_token);
	}, [access_token]);

	const signin = (email, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post("http://scopic.test/auth/api/login", { email, password })
				.then((response) => {
					setAccessToken(response.data.access_token);
					localStorage.setItem("access_token", response.data.access_token);
					resolve(response);
				})
				.catch((error) => {
					setAccessToken(null);
					localStorage.removeItem("access_token");
					reject(error);
				});
		});
	};

	const signup = (email, password) => {
		console.log("signup...");
	};

	const signout = () => {
		console.log("signout...");
	};

	return {
		access_token,
		signin,
		signup,
		signout,
	};
}
