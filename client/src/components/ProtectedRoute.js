import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/index";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function ProtectedRoute({ children, ...rest }) {
	let auth = useAuth();

	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.access_token ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
}
