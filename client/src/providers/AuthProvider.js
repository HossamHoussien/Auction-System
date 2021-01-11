import React from "react";
import AuthContext from "../contexts/AuthContext";
import { useProvideAuth } from "../hooks";

export default function AuthProvider({ children }) {
	const auth = useProvideAuth();

	return <AuthContext.Provider value={{ ...auth }}>{children}</AuthContext.Provider>;
}
