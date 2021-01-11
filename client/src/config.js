import axios from "axios";

export const configureAxios = (access_token) => {
	axios.interceptors.request.use(function (config) {
		config.headers["X-Requested-With"] = "XMLHttpRequest";

		if (access_token) {
			config.headers.Authorization = `Bearer ${access_token}`;
		}

		return config;
	});

	axios.interceptors.response.use(
		(response) => response,
		function (error) {
			if (error && error.response && error.response.status && error.response.status === 401) {
				localStorage.removeItem("access_token");
				window.location.replace("/login");
			}

			return Promise.reject(error);
		}
	);
};
