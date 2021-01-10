import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

export default function Navbar() {
	return (
		<div>
			<ul className="nav-list">
				<li className="nav-item">
					<Link to="/">Home</Link>
				</li>
				<li className="nav-item">
					<Link to="/logout">Logout</Link>
				</li>
			</ul>
		</div>
	);
}
