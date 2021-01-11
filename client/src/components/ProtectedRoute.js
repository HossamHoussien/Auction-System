import { Route, Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/index";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function ProtectedRoute({ children, ...rest }) {
	let { access_token, isAuthenticated } = useAuth();
	// const token = localStorage.getItem("access_token");
	if (!isAuthenticated) {
		return <Redirect to="/login" />;
	}

	return <Route {...rest} render={() => children} />;
}
