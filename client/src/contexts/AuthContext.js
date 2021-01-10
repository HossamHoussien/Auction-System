import React from "react";

export default React.createContext({
	user: null,
	access_token: null,
	isAuthenticated: false,
	signin: () => {},
	signup: () => {},
	signout: () => {},
});
