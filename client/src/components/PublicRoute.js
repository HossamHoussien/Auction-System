import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/index";

// A wrapper for <Route> that redirects to the home
// screen if user already authenticated.
export default function PublicRoute({ children, ...rest }) {
	let auth = useAuth();

	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.access_token ? (
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
