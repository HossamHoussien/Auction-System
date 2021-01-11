import { useContext, useState, useEffect } from "react";
import AuthContext from "./../contexts/AuthContext";
import { configureAxios } from "./../config";
import { useLocation } from "react-router-dom";

export const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

// Init Auth Context Provider
export function useProvideAuth() {
	const [access_token, setAccessToken] = useState(null);

	const [maxAutoBid, setMaxAutoBid] = useState(null);

	const token = localStorage.getItem("access_token");

	const isAuthenticated = token ? true : false;

	configureAxios(token);

	useEffect(() => {
		setAccessToken(token);
	}, [token]);

	return {
		isAuthenticated,
		access_token,
		maxAutoBid,
		setMaxAutoBid,
		setAccessToken,
	};
}
