import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../hooks/index";

// A wrapper for <Route> that redirects to the home
// screen if user already authenticated.
export default function PublicRoute({ children, ...rest }) {
	const { access_token, isAuthenticated } = useAuth();
	// const token = localStorage.getItem("access_token");
	if (isAuthenticated) {
		return <Redirect to={{ pathname: "/" }} />;
	}
	return (
		<Route
			{...rest}
			render={({ location }) =>
				access_token ? (
					<Redirect
						to={{
							pathname: "/",
							state: { from: location },
						}}
					/>
				) : (
					children
				)
			}
		/>
	);
}
