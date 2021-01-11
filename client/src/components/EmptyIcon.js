import React from "react";
import emptyIcon from "./../assets/empty.svg";

export default function EmptyIcon({ message }) {
	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<img src={emptyIcon} alt="Empty Placeholder" style={{ width: "200px", opacity: 0.6 }} />
			<p>{message}</p>
		</div>
	);
}
