import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/index";

// A wrapper for <Route> that redirects to the home
// screen if user already authenticated.
export default function PublicRoute({ children, ...rest }) {
	let { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Redirect to="/" />;
	}

	return <Route {...rest} render={() => children} />;
}
