import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch } from "react-router-dom";

// Pages
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import ItemPage from "./pages/Item";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/Navbar";
import AuthProvider from "./components/AuthProvider";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function App() {
	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<Switch>
					<PublicRoute path="/login">
						<LoginPage />
					</PublicRoute>

					<ProtectedRoute path="/items/:id">
						<ItemPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/">
						<HomePage />
					</ProtectedRoute>
				</Switch>
			</Router>
		</AuthProvider>
	);
}
