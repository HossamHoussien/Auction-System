import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AutobidingConfig from "./AutobidingConfig";
import Auth from "../services/auth";
import { useAuth } from "../hooks";
import "./navbar.scss";

export default function Navbar() {
	const { isAuthenticated, setAccessToken } = useAuth();
	const [open, setOpen] = useState(false);
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

	const handleClickOpen = () => {
		setOpen(true);
	};

	return (
		<div>
			<ul className="nav-list">
				<li className="nav-item">
					<Link to="/">Home</Link>
				</li>
				<div style={{ display: "flex" }}>
					<li className="nav-item" onClick={handleClickOpen}>
						<span>Auto-Biding Settings</span>
					</li>
					<li className="nav-item" onClick={signout}>
						<span>Logout</span>
					</li>
				</div>
			</ul>
			<AutobidingConfig open={open} setOpen={setOpen} />
		</div>
	);
}
