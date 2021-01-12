import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/index";
import Auth from "../services/auth";
import "./login.scss";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const auth = useAuth();
	const history = useHistory();
	const location = useLocation();

	const onEmailChange = (e) => setEmail(e.target.value);
	const onPasswordChange = (e) => setPassword(e.target.value);

	let { from } = location.state || { from: { pathname: "/" } };

	const login = () => {
		setIsLoading(true);
		Auth.signin(email, password)
			.then((response) => {
				setIsLoading(false);
				auth.setAccessToken(response.access_token);
				auth.setIsAuthenticated(true);
				auth.setMaxAutoBid(response.user.max_bid_amount);
				history.replace(from);
			})
			.catch((e) => {
				setIsLoading(false);
			});
	};

	return (
		<div className="login-form-wrapper">
			<div className="logo-wrapper">
				<img src="https://cdn.scopicsoftware.com/wp-content/uploads/2020/01/Scopic-Logo-Horizontal-White.png" alt="Scopic Logo" />
			</div>

			<div className="card-body">
				<div className="card-header">Account Credentials</div>

				<div className="form">
					<div className="form-group">
						<input id="email" type="email" placeholder="E-mail Address" className="form-control" name="email" onChange={onEmailChange} autoComplete="email" autoFocus />
					</div>

					<div className="form-group">
						<input id="password" type="password" placeholder="Password" className="form-control" name="password" onChange={onPasswordChange} autoComplete="current-password" />
					</div>

					<div className="form-group">
						<button className={isLoading ? "loading" : ""} disabled={isLoading} onClick={() => login()}>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
