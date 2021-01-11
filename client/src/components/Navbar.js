import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../hooks";
import Auth from "../services/auth";
import "./navbar.scss";

export default function Navbar() {
	const { isAuthenticated, setAccessToken } = useAuth();
	const history = useHistory();

	if (!isAuthenticated) {
		return <></>;
	}

	const signout = () => {
		Auth.signout().then((resp) => {
			setAccessToken(null);
			history.replace("/login");
		});
	};

	return (
		<div>
			<ul className="nav-list">
				<li className="nav-item">
					<Link to="/">Home</Link>
				</li>
				<li className="nav-item" onClick={signout}>
					<span>Logout</span>
				</li>
			</ul>
		</div>
	);
}
