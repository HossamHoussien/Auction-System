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
	const token = localStorage.getItem("access_token");
	const [access_token, setAccessToken] = useState(token);
	const [isAuthenticated, setIsAuthenticated] = useState(!!token);
	const [maxAutoBid, setMaxAutoBid] = useState(null);

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
		setIsAuthenticated,
	};
}
